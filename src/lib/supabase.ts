import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * logo_url iki formatta olabilir:
 * 1. HTTP URL → direkt kullan
 * 2. Storage path → Supabase public URL oluştur
 */
export function getLogoUrl(logoUrl: string | null): string {
    if (!logoUrl) return "/placeholder-university.png";
    if (logoUrl.startsWith("http")) return logoUrl;

    const { data } = supabase.storage
        .from("public-assets")
        .getPublicUrl(logoUrl);

    return data.publicUrl;
}
