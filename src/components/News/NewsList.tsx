"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import NewsCard from "./NewsCard";
import styles from "./NewsList.module.css";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image?: string | null;
  views: number;
  publishedAt: string | null;
  createdAt: string;
}

export default function NewsList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const [news, setNews] = useState<NewsItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/news?page=${currentPage}&limit=6`)
      .then((res) => res.json())
      .then((data) => {
        setNews(data.news || []);
        setTotalPages(data.totalPages || 1);
        setTotal(data.total || 0);
      })
      .catch((err) => {
        console.error("Error loading news:", err);
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  const goToPage = (page: number) => {
    if (page === 1) {
      router.push("/news");
    } else {
      router.push(`/news?page=${page}`);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Генерация номеров страниц
  const getPageNumbers = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  if (loading) {
    return (
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
        <p>Загрузка новостей...</p>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className={styles.empty}>
        <p>📰 Новостей пока нет</p>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.grid}>
        {news.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <nav className={styles.pagination}>
          {/* Назад */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className={`${styles.pageArrow} ${currentPage <= 1 ? styles.pageArrowDisabled : ""}`}
            aria-label="Предыдущая страница"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Номера */}
          <div className={styles.pageNumbers}>
            {getPageNumbers().map((page, index) => {
              if (page === "...") {
                return (
                  <span key={`dots-${index}`} className={styles.pageDots}>
                    •••
                  </span>
                );
              }

              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`${styles.pageNumber} ${page === currentPage ? styles.pageNumberActive : ""}`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {/* Вперёд */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className={`${styles.pageArrow} ${currentPage >= totalPages ? styles.pageArrowDisabled : ""}`}
            aria-label="Следующая страница"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </nav>
      )}

      {totalPages > 1 && (
        <p className={styles.totalInfo}>
          Всего {total}{" "}
          {total === 1 ? "новость" : total < 5 ? "новости" : "новостей"}
        </p>
      )}
    </div>
  );
}
