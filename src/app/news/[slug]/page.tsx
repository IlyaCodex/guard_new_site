import { notFound } from "next/navigation";
import { Metadata } from "next";
import NewsDetail from "@/components/News/NewsDetail";
import { PrismaClient } from "@prisma/client";
import { cache } from "react";

// Singleton Prisma — не создаём новый клиент каждый раз
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// cache() — React дедупликация: вызов getNews в generateMetadata и в компоненте
// выполнится только ОДИН раз за запрос
const getNews = cache(async (slug: string) => {
  try {
    const news = await prisma.news.findFirst({
      where: { slug, published: true },
    });
    return news || null;
  } catch (error) {
    console.error("Error fetching news:", error);
    return null;
  }
});

// Инкремент views — отдельная функция, вызывается только 1 раз
async function incrementViews(id: string) {
  try {
    await prisma.news.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
  } catch (error) {
    console.error("Error incrementing views:", error);
  }
}

async function getAdjacentNews(publishedAt: Date | null, currentId: string) {
  try {
    const date = publishedAt || new Date();

    const [prevNews, nextNews] = await Promise.all([
      prisma.news.findFirst({
        where: {
          published: true,
          id: { not: currentId },
          publishedAt: { lt: date },
        },
        orderBy: { publishedAt: "desc" },
        select: { title: true, slug: true },
      }),
      prisma.news.findFirst({
        where: {
          published: true,
          id: { not: currentId },
          publishedAt: { gt: date },
        },
        orderBy: { publishedAt: "asc" },
        select: { title: true, slug: true },
      }),
    ]);

    return { prevNews, nextNews };
  } catch {
    return { prevNews: null, nextNews: null };
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNews(slug);
  if (!news) return { title: "Новость не найдена" };

  return {
    title: news.metaTitle || `${news.title} | Guard Tunnel VPN`,
    description: news.metaDescription || news.excerpt,
    keywords: news.metaKeywords || undefined,
    openGraph: {
      title: news.metaTitle || news.title,
      description: news.metaDescription || news.excerpt,
      images: news.image ? [news.image] : [],
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const news = await getNews(slug);
  if (!news) notFound();

  // Инкремент views только здесь, 1 раз (не в generateMetadata)
  await incrementViews(news.id);

  const { prevNews, nextNews } = await getAdjacentNews(
    news.publishedAt,
    news.id,
  );

  const newsData = {
    id: news.id,
    title: news.title,
    slug: news.slug,
    excerpt: news.excerpt,
    content: news.content,
    image: news.image,
    views: news.views,
    publishedAt: news.publishedAt?.toISOString() || null,
    createdAt: news.createdAt.toISOString(),
  };

  return <NewsDetail news={newsData} prevNews={prevNews} nextNews={nextNews} />;
}
