import * as cheerio from "cheerio";
import {
    getSources,
    upsertTopic,
    updateSourceScrapedAt,
    type BlogSource,
} from "./blogService";

interface DiscoveredTopic {
    title: string;
    url: string;
}

/**
 * Bir kaynak sayfasından blog makale linklerini çeker.
 * StudyFans gibi sitelerde kategori sayfaları makale kartlarını listeler.
 */
async function scrapeSourcePage(
    sourceUrl: string
): Promise<DiscoveredTopic[]> {
    const topics: DiscoveredTopic[] = [];
    let currentPage = 1;
    const maxPages = 5; // Güvenlik limiti

    while (currentPage <= maxPages) {
        const pageUrl =
            currentPage === 1
                ? sourceUrl
                : `${sourceUrl}?page=${currentPage}`;

        const response = await fetch(pageUrl, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (compatible; AtasaBot/1.0; +https://atasaedu.com)",
            },
        });

        if (!response.ok) break;

        const html = await response.text();
        const $ = cheerio.load(html);

        const pageTopics: DiscoveredTopic[] = [];

        // StudyFans yapısı: makale kartları içinde link ve başlık
        $("a[href*='/blogs/']").each((_, el) => {
            const href = $(el).attr("href");
            const title = $(el).text().trim();

            if (!href || !title || title.length < 10) return;
            if (title === "Explore More") return; // CTA linklerini atla

            const fullUrl = href.startsWith("http")
                ? href
                : `https://studyfans.com${href}`;

            // Duplikat kontrolü
            if (!pageTopics.find((t) => t.url === fullUrl)) {
                pageTopics.push({ title, url: fullUrl });
            }
        });

        if (pageTopics.length === 0) break;
        topics.push(...pageTopics);

        // Sonraki sayfa var mı?
        const hasNextPage = $(`a[href*="page=${currentPage + 1}"]`).length > 0;
        if (!hasNextPage) break;

        currentPage++;
    }

    return topics;
}

/**
 * Belirli bir blog makalesinin tam içeriğini çeker.
 */
export async function scrapeArticleContent(
    articleUrl: string
): Promise<{ title: string; content: string } | null> {
    try {
        const response = await fetch(articleUrl, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (compatible; AtasaBot/1.0; +https://atasaedu.com)",
            },
        });

        if (!response.ok) return null;

        const html = await response.text();
        const $ = cheerio.load(html);

        // Başlık
        const title =
            $("h1").first().text().trim() ||
            $('meta[property="og:title"]').attr("content") ||
            $("title").text().trim();

        // İçerik — ana makale bölümünü bul
        // StudyFans'ta makale içeriği genellikle article veya main içinde
        let content = "";

        const selectors = [
            "article",
            ".blog-content",
            ".post-content",
            ".article-content",
            "main",
            ".content",
        ];

        for (const selector of selectors) {
            const el = $(selector);
            if (el.length > 0) {
                // Script ve style'ları temizle
                el.find("script, style, nav, header, footer").remove();
                content = el.text().trim();
                if (content.length > 200) break;
            }
        }

        // Fallback: body'den al
        if (content.length < 200) {
            $("script, style, nav, header, footer").remove();
            content = $("body").text().trim();
        }

        if (!title || content.length < 100) return null;

        return { title, content: content.slice(0, 5000) }; // Token limiti için kırp
    } catch {
        return null;
    }
}

/**
 * Tüm aktif kaynakları tarar ve yeni konuları keşfeder.
 */
export async function discoverAllTopics(): Promise<{
    sourcesScanned: number;
    newTopics: number;
}> {
    const sources = await getSources();
    const activeSources = sources.filter((s) => s.is_active);

    let newTopics = 0;

    for (const source of activeSources) {
        const discovered = await discoverTopicsFromSource(source);
        newTopics += discovered;
    }

    return {
        sourcesScanned: activeSources.length,
        newTopics,
    };
}

/**
 * Tek bir kaynak için konu keşfi yapar.
 */
export async function discoverTopicsFromSource(
    source: BlogSource
): Promise<number> {
    const topics = await scrapeSourcePage(source.url);
    let newCount = 0;

    for (const topic of topics) {
        const result = await upsertTopic(source.id, topic.url, topic.title);
        if (result) newCount++;
    }

    await updateSourceScrapedAt(source.id);
    return newCount;
}
