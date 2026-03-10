import { notFound } from "next/navigation";
import { Metadata } from "next";
import NewsDetail from "@/components/News/NewsDetail";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getNews(slug: string) {
  try {
    const news = await prisma.news.findFirst({
      where: { slug, published: true },
    });
    if (!news) return null;

    await prisma.news.update({
      where: { id: news.id },
      data: { views: { increment: 1 } },
    });

    return news;
  } catch (error) {
    console.error("Error fetching news:", error);
    return null;
  }
}

async function getAdjacentNews(publishedAt: Date | null, currentId: string) {
  try {
    const date = publishedAt || new Date();

    const prevNews = await prisma.news.findFirst({
      where: {
        published: true,
        id: { not: currentId },
        publishedAt: { lt: date },
      },
      orderBy: { publishedAt: "desc" },
      select: { title: true, slug: true },
    });

    const nextNews = await prisma.news.findFirst({
      where: {
        published: true,
        id: { not: currentId },
        publishedAt: { gt: date },
      },
      orderBy: { publishedAt: "asc" },
      select: { title: true, slug: true },
    });

    return { prevNews, nextNews };
  } catch {
    return { prevNews: null, nextNews: null };
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const news = await getNews(params.slug);
  if (!news) return { title: "Новость не найдена" };

  // SEO берётся из отдельных полей metaTitle / metaDescription
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
  params: { slug: string };
}) {
  const news = await getNews(params.slug);
  if (!news) notFound();

  const { prevNews, nextNews } = await getAdjacentNews(
    news.publishedAt,
    news.id,
  );

  // Передаём title (заголовок контента), а НЕ metaTitle
  const newsData = {
    id: news.id,
    title: news.title, // заголовок новости (контент)
    slug: news.slug,
    excerpt: news.excerpt, // описание для карточки
    content: news.content,
    image: news.image,
    views: news.views,
    publishedAt: news.publishedAt?.toISOString() || null,
    createdAt: news.createdAt.toISOString(),
  };

  return <NewsDetail news={newsData} prevNews={prevNews} nextNews={nextNews} />;
}
