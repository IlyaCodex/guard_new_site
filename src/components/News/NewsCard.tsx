import Link from "next/link";
import Image from "next/image";
import styles from "./NewsCard.module.css";

interface NewsCardProps {
  news: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    image?: string | null;
    views: number;
    publishedAt: string | null;
    createdAt: string;
  };
}

export default function NewsCard({ news }: NewsCardProps) {
  const formatDate = (date: string | null) => {
    if (!date) return "Дата не указана";
    return new Date(date).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Link href={`/news/${news.slug}`} className={styles.card}>
      <div className={styles.imageContainer}>
        {news.image ? (
          <Image
            src={news.image}
            alt={news.title}
            fill
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder}>
            <span>📰</span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{news.title}</h3>
        <p className={styles.excerpt}>{news.excerpt}</p>

        <div className={styles.meta}>
          <span className={styles.date}>
            📅 {formatDate(news.publishedAt || news.createdAt)}
          </span>
          <span className={styles.views}>👁 {news.views}</span>
        </div>
      </div>
    </Link>
  );
}
