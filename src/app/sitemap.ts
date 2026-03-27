import { MetadataRoute } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://gt-vpn.ru";
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/polzovatelskoe-soglashenie`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/instruction`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/instruction-whitelist`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  let newsPages: MetadataRoute.Sitemap = [];
  try {
    const newsList = await prisma.news.findMany({
      where: { published: true },
      select: {
        slug: true,
        updatedAt: true,
        publishedAt: true,
      },
      orderBy: { publishedAt: "desc" },
      take: 100,
    });

    console.log(`Sitemap: found ${newsList.length} news articles`);

    newsPages = newsList.map((news) => ({
      url: `${baseUrl}/news/${news.slug}`,
      lastModified: news.updatedAt?.toISOString() || now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Sitemap: error fetching news:", error);
  }

  return [...staticPages, ...newsPages];
}
