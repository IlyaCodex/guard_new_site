"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "./NewsDetail.module.css";

const NewsGallery = dynamic(() => import("./NewsGallery"), { ssr: false });

interface AdjacentNews {
  title: string;
  slug: string;
}

interface NewsDetailProps {
  news: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image?: string | null;
    views: number;
    publishedAt: string | null;
    createdAt: string;
  };
  prevNews?: AdjacentNews | null;
  nextNews?: AdjacentNews | null;
}

export default function NewsDetail({
  news,
  prevNews,
  nextNews,
}: NewsDetailProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const formatDate = (date: string | null) => {
    if (!date) return "Дата не указана";
    return new Date(date).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    telegram: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(news.title)}`,
    vk: `https://vk.com/share.php?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(news.title)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(news.title)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(news.title + " " + currentUrl)}`,
  };

  // JSON-LD для SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: news.title,
    description: news.excerpt,
    image: news.image || undefined,
    datePublished: news.publishedAt || news.createdAt,
    author: { "@type": "Organization", name: "Guard Tunnel" },
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className={styles.main}>
        <div className={styles.container}>
          {/* Хлебные крошки */}
          <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
            <ol itemScope itemType="https://schema.org/BreadcrumbList">
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <Link href="/" itemProp="item">
                  <span itemProp="name">Главная</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <li className={styles.breadcrumbSep}>/</li>
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <Link href="/news" itemProp="item">
                  <span itemProp="name">Новости</span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              <li className={styles.breadcrumbSep}>/</li>
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <span itemProp="name" className={styles.breadcrumbCurrent}>
                  {news.title}
                </span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          <article className={styles.article}>
            {/* Заголовок */}
            <header className={styles.header}>
              <h1 className={styles.title}>{news.title}</h1>
              <div className={styles.meta}>
                <time dateTime={news.publishedAt || news.createdAt}>
                  {formatDate(news.publishedAt || news.createdAt)}
                </time>
                <span className={styles.dot}>•</span>
                <span>{news.views} просмотров</span>
              </div>
            </header>

            {/* Обложка */}
            {news.image && (
              <div className={styles.cover}>
                <Image
                  src={news.image}
                  alt={news.title}
                  width={1200}
                  height={600}
                  className={styles.coverImg}
                  priority
                />
              </div>
            )}

            {/* Контент */}
            <ContentRenderer content={news.content} />

            {/* Теги / Поделиться */}
            <div className={styles.shareBlock}>
              <p className={styles.shareTitle}>Поделиться</p>
              <div className={styles.shareButtons}>
                <a
                  href={shareLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.shareBtn} ${styles.shareTg}`}
                  title="Telegram"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                  Telegram
                </a>
                <a
                  href={shareLinks.vk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.shareBtn} ${styles.shareVk}`}
                  title="ВКонтакте"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.524-2.049-1.713-1.033-1.003-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.564c0 .426-.135.677-1.253.677-1.846 0-3.896-1.12-5.336-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.372 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.15-3.575 2.15-3.575.119-.254.322-.491.762-.491h1.744c.525 0 .643.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.474-.085.728-.576.728z" />
                  </svg>
                  VK
                </a>
                <a
                  href={shareLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.shareBtn} ${styles.shareTw}`}
                  title="Twitter/X"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Twitter
                </a>
                <a
                  href={shareLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.shareBtn} ${styles.shareWa}`}
                  title="WhatsApp"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
                <button
                  onClick={handleCopy}
                  className={`${styles.shareBtn} ${styles.shareCopy}`}
                  title="Копировать ссылку"
                >
                  {copied ? (
                    <>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      Скопировано
                    </>
                  ) : (
                    <>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                      </svg>
                      Копировать
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Навигация между статьями */}
            {(prevNews || nextNews) && (
              <nav className={styles.navigation}>
                <div className={styles.navItem}>
                  {prevNews && (
                    <Link
                      href={`/news/${prevNews.slug}`}
                      className={styles.navLink}
                    >
                      <span className={styles.navLabel}>← Предыдущая</span>
                      <span className={styles.navTitle}>{prevNews.title}</span>
                    </Link>
                  )}
                </div>
                <div className={`${styles.navItem} ${styles.navRight}`}>
                  {nextNews && (
                    <Link
                      href={`/news/${nextNews.slug}`}
                      className={styles.navLink}
                    >
                      <span className={styles.navLabel}>Следующая →</span>
                      <span className={styles.navTitle}>{nextNews.title}</span>
                    </Link>
                  )}
                </div>
              </nav>
            )}
          </article>
        </div>
      </main>
    </>
  );
}

// Рендер контента с поддержкой галерей
function ContentRenderer({ content }: { content: string }) {
  const parts = content.split(/(<div data-gallery[^>]*>[\s\S]*?<\/div>)/g);

  return (
    <div className={styles.content}>
      {parts.map((part, i) => {
        if (part.includes("data-gallery")) {
          const imgMatches = [...part.matchAll(/src="([^"]+)"/g)];
          const images = imgMatches.map((m) => m[1]);
          if (images.length > 0) {
            return <NewsGallery key={i} images={images} />;
          }
        }
        if (part.trim()) {
          return <div key={i} dangerouslySetInnerHTML={{ __html: part }} />;
        }
        return null;
      })}
    </div>
  );
}
