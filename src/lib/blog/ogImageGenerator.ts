import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function getBlogClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { db: { schema: "atasa_edu" } }
    );
}

/**
 * DALL-E 3 ile blog yazısı için OG görseli üretir ve Supabase Storage'a yükler.
 * Hata olursa null döndürür (makale yayını etkilenmez).
 */
export async function generateOgImage(
    title: string,
    slug: string
): Promise<string | null> {
    try {
        // DALL-E ile görsel üret
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: `Create a modern, minimal Notion-style scribble illustration for a blog article titled: "${title}". 
The illustration should be:
- Clean and professional
- Use soft pastel colors with white background
- Feature simple line drawings related to education, Turkey, documents, university
- NO text in the image
- Suitable as an Open Graph social media preview image
- 1200x630 aspect ratio feel`,
            n: 1,
            size: "1792x1024",
            quality: "standard",
        });

        const imageUrl = response.data?.[0]?.url;
        if (!imageUrl) return null;

        // Görseli indir
        const imageResponse = await fetch(imageUrl);
        if (!imageResponse.ok) return null;

        const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

        // Supabase Storage'a yükle
        const db = getBlogClient();
        const fileName = `blog/${slug}-${Date.now()}.png`;

        const { error: uploadError } = await db.storage
            .from("public-assets")
            .upload(fileName, imageBuffer, {
                contentType: "image/png",
                cacheControl: "31536000", // 1 yıl cache
                upsert: true,
            });

        if (uploadError) {
            console.error(`OG image upload failed for ${slug}:`, uploadError.message);
            return null;
        }

        // Public URL oluştur
        const { data: publicUrl } = db.storage
            .from("public-assets")
            .getPublicUrl(fileName);

        return publicUrl.publicUrl;
    } catch (err) {
        console.error(`OG image generation failed for ${slug}:`, err);
        return null; // Görsel opsiyonel — hata olursa sessizce devam et
    }
}
