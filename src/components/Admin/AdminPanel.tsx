"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NewsEditor from "./NewsEditor";
import styles from "./AdminPanel.module.css";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  views: number;
  createdAt: string;
  publishedAt: string | null;
}

export default function AdminPanel() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("news");
  const [showNewsEditor, setShowNewsEditor] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const res = await fetch("/api/admin/news");
      if (res.ok) {
        const data = await res.json();
        setNewsList(data);
      }
    } catch (error) {
      console.error("Error loading news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin");
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm("Удалить эту новость?")) return;

    try {
      const res = await fetch(`/api/admin/news/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        loadNews();
      }
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  const handleEditNews = (news: NewsItem) => {
    setEditingNews(news);
    setShowNewsEditor(true);
  };

  const handleCreateNews = () => {
    setEditingNews(null);
    setShowNewsEditor(true);
  };

  const handleCloseEditor = () => {
    setShowNewsEditor(false);
    setEditingNews(null);
    loadNews(); // Обновляем список после закрытия
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Админ панель</h1>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Выйти
        </button>
      </header>

      <nav className={styles.nav}>
        <button
          className={activeTab === "news" ? styles.active : ""}
          onClick={() => setActiveTab("news")}
        >
          Новости
        </button>
        <button
          className={activeTab === "settings" ? styles.active : ""}
          onClick={() => setActiveTab("settings")}
        >
          Настройки
        </button>
      </nav>

      <main className={styles.main}>
        {activeTab === "news" && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Управление новостями</h2>
              <button onClick={handleCreateNews} className={styles.createBtn}>
                + Создать новость
              </button>
            </div>

            {loading ? (
              <div className={styles.loading}>Загрузка...</div>
            ) : (
              <div className={styles.newsTable}>
                <table>
                  <thead>
                    <tr>
                      <th>Заголовок</th>
                      <th>Статус</th>
                      <th>Просмотры</th>
                      <th>Дата создания</th>
                      <th>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newsList.map((news) => (
                      <tr key={news.id}>
                        <td>{news.title}</td>
                        <td>
                          <span
                            className={
                              news.published ? styles.published : styles.draft
                            }
                          >
                            {news.published ? "Опубликовано" : "Черновик"}
                          </span>
                        </td>
                        <td>{news.views}</td>
                        <td>
                          {new Date(news.createdAt).toLocaleDateString("ru-RU")}
                        </td>
                        <td>
                          <div className={styles.actions}>
                            <button
                              onClick={() => handleEditNews(news)}
                              className={styles.editBtn}
                            >
                              ✏️
                            </button>
                            <button
                              onClick={() => handleDeleteNews(news.id)}
                              className={styles.deleteBtn}
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {newsList.length === 0 && (
                  <div className={styles.empty}>Новостей пока нет</div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div className={styles.section}>
            <h2>Настройки</h2>
            <p>Здесь будут настройки сайта</p>
          </div>
        )}
      </main>

      {showNewsEditor && (
        <NewsEditor
          news={editingNews}
          onClose={handleCloseEditor}
          onSave={loadNews}
        />
      )}
    </div>
  );
}
