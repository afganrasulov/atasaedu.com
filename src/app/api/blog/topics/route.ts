import { NextResponse } from "next/server";
import {
    getTopics,
    updateTopicStatus,
    type TopicStatus,
} from "@/lib/blog/blogService";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status") as TopicStatus | null;

        const topics = await getTopics(status ?? undefined);
        return NextResponse.json({ topics });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json(
                { error: "id and status are required" },
                { status: 400 }
            );
        }

        const validStatuses: TopicStatus[] = [
            "discovered",
            "approved",
            "rejected",
        ];
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { error: `status must be one of: ${validStatuses.join(", ")}` },
                { status: 400 }
            );
        }

        await updateTopicStatus(id, status);
        return NextResponse.json({ success: true });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
