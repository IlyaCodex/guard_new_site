"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./NewsArticle.module.css";

interface NewsBlock {
  id: string;
  type: string;
  content: any;
  order: number;
}

interface NewsArticleProps {
  news: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage?: string | null;
    views: number;
    publishedAt: string | null;
    createdAt: string;
    blocks?: NewsBlock[];
  };
}

export default function NewsArticle({ news }: NewsArticleProps) {
  const [copied, setCopied] = useState(false);

  const formatDate = (date: string | null) => {
    if (!date) return "Дата не указана";
    return new Date(date).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderBlock = (block: NewsBlock) => {
    switch (block.type) {
      case "paragraph":
        return (
          <p key={block.id} className={styles.paragraph}>
            {block.content.text || ""}
          </p>
        );

      case "heading":
        const level = block.content.level || 2;
        const text = block.content.text || "";

        if (level === 2) {
          return (
            <h2 key={block.id} className={styles.heading2}>
              {text}
            </h2>
          );
        } else if (level === 3) {
          return (
            <h3 key={block.id} className={styles.heading3}>
              {text}
            </h3>
          );
        } else {
          return (
            <h4 key={block.id} className={styles.heading4}>
              {text}
            </h4>
          );
        }

      case "image":
        if (!block.content.url) return null;
        return (
          <figure key={block.id} className={styles.figure}>
            <div className={styles.imageWrapper}>
              <Image
                src={block.content.url}
                alt={block.content.caption || ""}
                width={900}
                height={500}
                className={styles.blockImage}
              />
            </div>
            {block.content.caption && (
              <figcaption className={styles.caption}>
                {block.content.caption}
              </figcaption>
            )}
          </figure>
        );

      case "quote":
        return (
          <blockquote key={block.id} className={styles.quote}>
            <p>{block.content.text || ""}</p>
            {block.content.author && <cite>— {block.content.author}</cite>}
          </blockquote>
        );

      case "list":
        if (!block.content.items || block.content.items.length === 0)
          return null;
        const ListTag = block.content.ordered ? "ol" : "ul";
        return (
          <ListTag key={block.id} className={styles.list}>
            {block.content.items.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ListTag>
        );

      default:
        return null;
    }
  };

  const hasBlocks = news.blocks && news.blocks.length > 0;

  return (
    <article className={styles.article}>
      <Link href="/news" className={styles.backLink}>
        ← Вернуться к новостям
      </Link>

      <h1 className={styles.title}>{news.title}</h1>

      <div className={styles.meta}>
        <div className={styles.metaLeft}>
          <span className={styles.date}>
            📅 {formatDate(news.publishedAt || news.createdAt)}
          </span>
          <span className={styles.views}>👁 {news.views} просмотров</span>
        </div>
      </div>

      {news.excerpt && <p className={styles.excerpt}>{news.excerpt}</p>}

      {news.coverImage && (
        <div className={styles.coverImage}>
          <Image
            src={news.coverImage}
            alt={news.title}
            width={1200}
            height={600}
            className={styles.cover}
            priority
          />
        </div>
      )}


      <div className={styles.shareSection}>
        <h3>Поделиться новостью</h3>
        <div className={styles.shareButtons}>
          <button onClick={handleShare} className={styles.shareButton}>
            {copied ? "✅ Скопировано!" : "📋 Копировать ссылку"}
          </button>
        </div>
      </div>
    </article>
  );
}
