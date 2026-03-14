import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://gt-vpn.ru";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/polzovatelskoe-soglashenie`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // Инструкции
  const instructionPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/instruction`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/instruction-whitelist`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // Инструкции по устройствам
    {
      url: `${baseUrl}/instruction?type=android&mode=text`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction?type=android&mode=video`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction?type=ios&mode=text`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction?type=ios&mode=video`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction?type=windows&mode=text`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction?type=windows&mode=video`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction?type=macos&mode=text`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction?type=macos&mode=video`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Инструкции whitelist по устройствам
    {
      url: `${baseUrl}/instruction-whitelist?type=android&mode=text`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction-whitelist?type=android&mode=video`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction-whitelist?type=ios&mode=text`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction-whitelist?type=ios&mode=video`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction-whitelist?type=windows&mode=text`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction-whitelist?type=windows&mode=video`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction-whitelist?type=macos&mode=text`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/instruction-whitelist?type=macos&mode=video`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Новости из БД
  let newsPages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${baseUrl}/api/news?limit=100`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      const newsList = data.news || data;
      newsPages = newsList.map((news: { slug: string; updatedAt: string }) => ({
        url: `${baseUrl}/news/${news.slug}`,
        lastModified: new Date(news.updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }
  } catch (e) {
    console.error("Sitemap: ошибка получения новостей", e);
  }

  return [...staticPages, ...instructionPages, ...newsPages];
}
