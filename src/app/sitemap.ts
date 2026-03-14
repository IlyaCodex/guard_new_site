import { MetadataRoute } from "next";

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
  ];

  const instructionPages: MetadataRoute.Sitemap = [
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
    {
      url: `${baseUrl}/instruction?type=android&mode=text`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction?type=android&mode=video`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction?type=ios&mode=text`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction?type=ios&mode=video`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction?type=windows&mode=text`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction?type=windows&mode=video`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction?type=macos&mode=text`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction?type=macos&mode=video`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction-whitelist?type=android&mode=text`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction-whitelist?type=android&mode=video`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction-whitelist?type=ios&mode=text`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction-whitelist?type=ios&mode=video`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction-whitelist?type=windows&mode=text`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction-whitelist?type=windows&mode=video`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction-whitelist?type=macos&mode=text`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction-whitelist?type=macos&mode=video`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Новости — пробуем получить, если не получится — пропускаем
  let newsPages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${baseUrl}/api/news?limit=150`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      const newsList = data.news || data;
      if (Array.isArray(newsList)) {
        newsPages = newsList.map(
          (news: { slug: string; updatedAt?: string }) => ({
            url: `${baseUrl}/news/${news.slug}`,
            lastModified: news.updatedAt
              ? new Date(news.updatedAt).toISOString()
              : now,
            changeFrequency: "weekly" as const,
            priority: 0.70,
          }),
        );
      }
    }
  } catch {
    // При сборке API недоступен — это нормально
  }

  return [...staticPages, ...instructionPages, ...newsPages];
}
