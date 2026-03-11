import { NextResponse } from "next/server";
import { getSources, addSource, deleteSource } from "@/lib/blog/blogService";

export async function GET() {
    try {
        const sources = await getSources();
        return NextResponse.json({ sources });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, url } = body;

        if (!name || !url) {
            return NextResponse.json(
                { error: "name and url are required" },
                { status: 400 }
            );
        }

        const source = await addSource(name, url);
        return NextResponse.json({ source }, { status: 201 });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { error: "id is required" },
                { status: 400 }
            );
        }

        await deleteSource(id);
        return NextResponse.json({ success: true });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
