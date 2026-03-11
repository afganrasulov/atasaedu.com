import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/** Service role client for blog schema operations */
function getBlogClient() {
    return createClient(supabaseUrl, serviceRoleKey, {
        db: { schema: "atasa_edu" },
    });
}

// ─── Types ───────────────────────────────────────────────────

export interface BlogSource {
    id: string;
    name: string;
    url: string;
    is_active: boolean;
    last_scraped_at: string | null;
    created_at: string;
}

export type TopicStatus =
    | "discovered"
    | "approved"
    | "generating"
    | "published"
    | "rejected"
    | "failed";

export interface BlogTopic {
    id: string;
    source_id: string;
    original_url: string;
    original_title: string;
    status: TopicStatus;
    created_at: string;
    source?: BlogSource;
}

export interface BlogPost {
    id: string;
    topic_id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    meta_description: string;
    keywords: string[];
    schema_markup: Record<string, unknown> | null;
    category: string | null;
    image_url: string | null;
    seo_score: number;
    created_at: string;
    published_at: string | null;
}

// ─── Sources ─────────────────────────────────────────────────

export async function getSources(): Promise<BlogSource[]> {
    const db = getBlogClient();
    const { data, error } = await db
        .from("sources")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw new Error(`Sources fetch failed: ${error.message}`);
    return data ?? [];
}

export async function addSource(
    name: string,
    url: string
): Promise<BlogSource> {
    const db = getBlogClient();
    const { data, error } = await db
        .from("sources")
        .insert({ name, url })
        .select()
        .single();

    if (error) throw new Error(`Source add failed: ${error.message}`);
    return data;
}

export async function deleteSource(id: string): Promise<void> {
    const db = getBlogClient();
    const { error } = await db.from("sources").delete().eq("id", id);
    if (error) throw new Error(`Source delete failed: ${error.message}`);
}

export async function updateSourceScrapedAt(id: string): Promise<void> {
    const db = getBlogClient();
    const { error } = await db
        .from("sources")
        .update({ last_scraped_at: new Date().toISOString() })
        .eq("id", id);

    if (error)
        throw new Error(`Source scrape timestamp update failed: ${error.message}`);
}

// ─── Topics ──────────────────────────────────────────────────

export async function getTopics(
    status?: TopicStatus
): Promise<BlogTopic[]> {
    const db = getBlogClient();
    let query = db
        .from("topics")
        .select("*, source:sources(name, url)")
        .order("created_at", { ascending: false });

    if (status) {
        query = query.eq("status", status);
    }

    const { data, error } = await query;
    if (error) throw new Error(`Topics fetch failed: ${error.message}`);
    return data ?? [];
}

export async function upsertTopic(
    sourceId: string,
    originalUrl: string,
    originalTitle: string
): Promise<BlogTopic | null> {
    const db = getBlogClient();

    // Check if already exists
    const { data: existing } = await db
        .from("topics")
        .select("id")
        .eq("original_url", originalUrl)
        .single();

    if (existing) return null; // Skip duplicates

    const { data, error } = await db
        .from("topics")
        .insert({
            source_id: sourceId,
            original_url: originalUrl,
            original_title: originalTitle,
            status: "discovered",
        })
        .select()
        .single();

    if (error) throw new Error(`Topic upsert failed: ${error.message}`);
    return data;
}

export async function updateTopicStatus(
    id: string,
    status: TopicStatus
): Promise<void> {
    const db = getBlogClient();
    const { error } = await db
        .from("topics")
        .update({ status })
        .eq("id", id);

    if (error) throw new Error(`Topic status update failed: ${error.message}`);
}

// ─── Posts ────────────────────────────────────────────────────

export async function getPosts(
    page = 1,
    limit = 10
): Promise<{ posts: BlogPost[]; total: number }> {
    const db = getBlogClient();
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await db
        .from("posts")
        .select("*", { count: "exact" })
        .not("published_at", "is", null)
        .order("published_at", { ascending: false })
        .range(from, to);

    if (error) throw new Error(`Posts fetch failed: ${error.message}`);
    return { posts: data ?? [], total: count ?? 0 };
}

export async function getPostBySlug(
    slug: string
): Promise<BlogPost | null> {
    const db = getBlogClient();
    const { data, error } = await db
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error && error.code !== "PGRST116") {
        throw new Error(`Post fetch failed: ${error.message}`);
    }
    return data ?? null;
}

export async function createPost(
    post: Omit<BlogPost, "id" | "created_at">
): Promise<BlogPost> {
    const db = getBlogClient();
    const { data, error } = await db
        .from("posts")
        .insert(post)
        .select()
        .single();

    if (error) throw new Error(`Post create failed: ${error.message}`);
    return data;
}

export type BlogPostPreview = Pick<
    BlogPost,
    "title" | "slug" | "excerpt" | "image_url" | "published_at" | "category"
>;

export async function getLatestPosts(
    limit = 3
): Promise<BlogPostPreview[]> {
    const db = getBlogClient();
    const { data, error } = await db
        .from("posts")
        .select("title, slug, excerpt, image_url, published_at, category")
        .not("published_at", "is", null)
        .order("published_at", { ascending: false })
        .limit(limit);

    if (error) throw new Error(`Latest posts fetch failed: ${error.message}`);
    return (data ?? []) as BlogPostPreview[];
}

// ─── Post Translations ──────────────────────────────────────

export interface PostTranslation {
    id: string;
    post_id: string;
    locale: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    meta_description: string | null;
    keywords: string[];
    faq: Array<{ question: string; answer: string }>;
    schema_markup: Record<string, unknown> | null;
    created_at: string;
    updated_at: string;
}

/** Çevrilmiş post'u slug + locale ile getir. Yoksa null döndür. */
export async function getTranslatedPost(
    slug: string,
    locale: string
): Promise<PostTranslation | null> {
    const db = getBlogClient();
    const { data, error } = await db
        .from("post_translations")
        .select("*")
        .eq("slug", slug)
        .eq("locale", locale)
        .single();

    if (error && error.code !== "PGRST116") {
        throw new Error(`Translated post fetch failed: ${error.message}`);
    }
    return data ?? null;
}

/** Belirli bir locale için çevrilmiş post listesi. Çevirisi yoksa orijinali döndürür. */
export async function getTranslatedPosts(
    page = 1,
    limit = 10,
    locale?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ posts: any[]; total: number }> {
    if (!locale || locale === "tr") {
        return getPosts(page, limit);
    }

    const db = getBlogClient();
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Çevirisi olan postları getir, orijinal post bilgileriyle birlikte
    const { data, error, count } = await db
        .from("post_translations")
        .select(`
            *,
            post:posts!post_id (image_url, published_at, category)
        `, { count: "exact" })
        .eq("locale", locale)
        .order("created_at", { ascending: false })
        .range(from, to);

    if (error) throw new Error(`Translated posts fetch failed: ${error.message}`);

    const posts = (data ?? []).map((item: Record<string, unknown>) => {
        const post = item.post as Record<string, unknown> | null;
        return {
            ...item,
            image_url: post?.image_url as string | null ?? null,
            published_at: post?.published_at as string | null ?? null,
            category: post?.category as string | null ?? null,
        };
    });

    return { posts, total: count ?? 0 };
}

/** Yeni çeviri kaydet */
export async function createPostTranslation(
    translation: Omit<PostTranslation, "id" | "created_at" | "updated_at">
): Promise<PostTranslation> {
    const db = getBlogClient();
    const { data, error } = await db
        .from("post_translations")
        .upsert(translation, { onConflict: "post_id,locale" })
        .select()
        .single();

    if (error) throw new Error(`Post translation create failed: ${error.message}`);
    return data;
}

/** Çevirisi eksik olan post'ları bul */
export async function getUntranslatedPosts(
    locale: string
): Promise<BlogPost[]> {
    const db = getBlogClient();

    // Zaten çevrilmiş post ID'lerini al
    const { data: translated } = await db
        .from("post_translations")
        .select("post_id")
        .eq("locale", locale);

    const translatedIds = (translated ?? []).map((t: { post_id: string }) => t.post_id);

    // Çevirisi olmayan published post'ları getir
    let query = db
        .from("posts")
        .select("*")
        .not("published_at", "is", null)
        .order("published_at", { ascending: false });

    if (translatedIds.length > 0) {
        query = query.not("id", "in", `(${translatedIds.join(",")})`);
    }

    const { data, error } = await query;
    if (error) throw new Error(`Untranslated posts fetch failed: ${error.message}`);
    return data ?? [];
}

// ─── Keywords ────────────────────────────────────────────────

export interface BlogKeyword {
    id: string;
    keyword: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export async function getKeywords(): Promise<BlogKeyword[]> {
    const db = getBlogClient();
    const { data, error } = await db
        .from("keywords")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw new Error(`Keywords fetch failed: ${error.message}`);
    return data ?? [];
}

export async function addKeyword(keyword: string): Promise<BlogKeyword> {
    const db = getBlogClient();
    const { data, error } = await db
        .from("keywords")
        .insert({ keyword: keyword.toLowerCase().trim() })
        .select()
        .single();

    if (error) throw new Error(`Keyword add failed: ${error.message}`);
    return data;
}

export async function updateKeyword(
    id: string,
    updates: Partial<Pick<BlogKeyword, "keyword" | "is_active">>
): Promise<void> {
    const db = getBlogClient();
    const { error } = await db
        .from("keywords")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id);

    if (error) throw new Error(`Keyword update failed: ${error.message}`);
}

export async function deleteKeyword(id: string): Promise<void> {
    const db = getBlogClient();
    const { error } = await db.from("keywords").delete().eq("id", id);
    if (error) throw new Error(`Keyword delete failed: ${error.message}`);
}

// ─── Auto-Approve & Daily Limit ─────────────────────────────

/** En yeni N adet discovered topic'i otomatik onaylar */
export async function autoApproveTopics(limit = 3): Promise<number> {
    const db = getBlogClient();

    const { data: topics, error } = await db
        .from("topics")
        .select("id")
        .eq("status", "discovered")
        .order("created_at", { ascending: false })
        .limit(limit);

    if (error || !topics || topics.length === 0) return 0;

    const ids = topics.map((t: { id: string }) => t.id);

    const { error: updateError } = await db
        .from("topics")
        .update({ status: "approved" })
        .in("id", ids);

    if (updateError) throw new Error(`Auto-approve failed: ${updateError.message}`);
    return ids.length;
}

/** Bugün kaç makale üretildiğini sayar */
export async function getTodayGenerationCount(): Promise<number> {
    try {
        const db = getBlogClient();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const { count, error } = await db
            .from("posts")
            .select("id", { count: "exact", head: true })
            .gte("created_at", today.toISOString());

        if (error) {
            console.error("getTodayGenerationCount error:", JSON.stringify(error));
            return 0; // Hata durumunda pipeline'ı durdurma, 0 kabul et
        }
        return count ?? 0;
    } catch {
        return 0;
    }
}

// ─── Automation Logging ──────────────────────────────────────

export interface AutomationLog {
    discovered: number;
    approved: number;
    generated: number;
    errors: string[];
    duration_ms: number;
    status: "success" | "partial" | "failed";
}

export async function logAutomationRun(log: AutomationLog): Promise<void> {
    const db = getBlogClient();
    const { error } = await db.from("automation_logs").insert(log);
    if (error) console.error(`Automation log failed: ${error.message}`);
}
