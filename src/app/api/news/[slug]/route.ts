import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const news = await prisma.news.findFirst({
      where: {
        slug: params.slug,
        published: true,
      },
      include: {
        blocks: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    // Увеличиваем просмотры
    await prisma.news.update({
      where: { id: news.id },
      data: { views: { increment: 1 } },
    });

    // Преобразуем даты в строки для JSON
    const newsData = {
      ...news,
      publishedAt: news.publishedAt?.toISOString() || null,
      createdAt: news.createdAt.toISOString(),
      updatedAt: news.updatedAt.toISOString(),
    };

    return NextResponse.json(newsData);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
