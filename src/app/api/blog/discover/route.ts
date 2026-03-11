import { NextResponse } from "next/server";
import { discoverAllTopics } from "@/lib/blog/blogScraper";

export async function POST() {
    try {
        const result = await discoverAllTopics();
        return NextResponse.json(result);
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
