import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/lib/minio";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const folder = (formData.get("folder") as string) || "uploads";

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "Файлы не выбраны" }, { status: 400 });
    }

    const urls: string[] = [];

    for (const file of files) {
      // Проверка типа
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          {
            error: `Недопустимый тип файла: ${file.type}. Разрешены: JPG, PNG, WebP, GIF, SVG`,
          },
          { status: 400 },
        );
      }

      // Проверка размера
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `Файл "${file.name}" слишком большой. Максимум 10MB` },
          { status: 400 },
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const url = await uploadFile(buffer, file.name, file.type);
      urls.push(url);
    }

    return NextResponse.json({
      urls,
      url: urls[0], // для совместимости — одиночная загрузка
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Ошибка загрузки файла" },
      { status: 500 },
    );
  }
}
