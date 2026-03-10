import { NextRequest, NextResponse } from "next/server";
import { deleteFile } from "@/lib/minio";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL не указан" }, { status: 400 });
    }

    await deleteFile(url);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Ошибка удаления файла" },
      { status: 500 },
    );
  }
}
