import { Suspense } from "react";
import Link from "next/link";
import NewsList from "@/components/News/NewsList";
import styles from "./page.module.css";

export const metadata = {
  title: "Новости",
  description: "Последние новости и обновления Guard Tunnel VPN",
};

export default function NewsPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Хлебные крошки */}
        <nav className={styles.breadcrumbs}>
          <Link href="/" className={styles.breadcrumbLink}>
            Главная
          </Link>
          <svg
            className={styles.breadcrumbSep}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className={styles.breadcrumbCurrent}>Новости</span>
        </nav>

        <div className={styles.header}>
          <h1 className={styles.title}>
            Новости, инновации и{" "}
            <span className={styles.accent}>обновления</span>
          </h1>
          <p className={styles.description}>
            Публикуем новости о технологиях, рассказываем как обходить
            блокировки, рассказываем о самом интересном
          </p>
        </div>

        <Suspense
          fallback={
            <div
              style={{ color: "#555", textAlign: "center", padding: "3rem 0" }}
            >
              Загрузка...
            </div>
          }
        >
          <NewsList />
        </Suspense>
      </div>
    </main>
  );
}
