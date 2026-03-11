import { NextResponse } from "next/server";
import {
    getKeywords,
    addKeyword,
    updateKeyword,
    deleteKeyword,
} from "@/lib/blog/blogService";

/** GET /api/blog/keywords — Tüm keyword'leri listele */
export async function GET() {
    try {
        const keywords = await getKeywords();
        return NextResponse.json({ keywords });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

/** POST /api/blog/keywords — Yeni keyword ekle */
export async function POST(request: Request) {
    try {
        const { keyword } = await request.json();
        if (!keyword || typeof keyword !== "string") {
            return NextResponse.json(
                { error: "keyword is required" },
                { status: 400 }
            );
        }

        const result = await addKeyword(keyword);
        return NextResponse.json(result, { status: 201 });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

/** PUT /api/blog/keywords — Keyword güncelle */
export async function PUT(request: Request) {
    try {
        const { id, keyword, is_active } = await request.json();
        if (!id) {
            return NextResponse.json(
                { error: "id is required" },
                { status: 400 }
            );
        }

        await updateKeyword(id, { keyword, is_active });
        return NextResponse.json({ success: true });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

/** DELETE /api/blog/keywords — Keyword sil */
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json(
                { error: "id query parameter is required" },
                { status: 400 }
            );
        }

        await deleteKeyword(id);
        return NextResponse.json({ success: true });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
