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
