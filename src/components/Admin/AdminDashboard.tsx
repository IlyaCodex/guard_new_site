"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NewsEditor from "./NewsEditor";
import styles from "./AdminDashboard.module.css";

interface AdminDashboardProps {
  secretToken: string;
}

export default function AdminDashboard({ secretToken }: AdminDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"news" | "admins" | "security">(
    "news",
  );
  const [newsList, setNewsList] = useState<any[]>([]);
  const [editingNews, setEditingNews] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);

  // Admins
  const [admins, setAdmins] = useState<any[]>([]);
  const [newAdmin, setNewAdmin] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [adminError, setAdminError] = useState("");

  // IPs
  const [allowedIPs, setAllowedIPs] = useState<any[]>([]);
  const [newIP, setNewIP] = useState({ ip: "", label: "" });
  const [ipError, setIpError] = useState("");

  // Secret URL
  const [secretUrl, setSecretUrl] = useState("");
  const [urlSaved, setUrlSaved] = useState(false);

  // Текущий IP
  const [currentIP, setCurrentIP] = useState("");

  useEffect(() => {
    loadNews();
    // Получить текущий IP
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setCurrentIP(data.ip))
      .catch(() => {});
  }, []);

  const loadNews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/news");
      if (res.ok) setNewsList(await res.json());
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const loadAdmins = async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) setAdmins(await res.json());
    } catch {}
  };

  const loadIPs = async () => {
    try {
      const res = await fetch("/api/admin/allowed-ips");
      if (res.ok) setAllowedIPs(await res.json());
    } catch {}
  };

  const loadSecretUrl = async () => {
    try {
      const res = await fetch("/api/admin/settings/secret-url");
      if (res.ok) {
        const data = await res.json();
        setSecretUrl(data.secretUrl);
      }
    } catch {}
  };

  useEffect(() => {
    if (activeTab === "admins") loadAdmins();
    if (activeTab === "security") {
      loadIPs();
      loadSecretUrl();
    }
  }, [activeTab]);

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push(`/secure/${secretToken}`);
  };

  const handleDeleteNews = async (id: string) => {
    if (!confirm("Удалить новость?")) return;
    const res = await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
    if (res.ok) loadNews();
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAdmin),
      });
      const data = await res.json();
      if (res.ok) {
        setNewAdmin({ email: "", name: "", password: "" });
        loadAdmins();
      } else {
        setAdminError(data.error);
      }
    } catch {
      setAdminError("Ошибка");
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    if (!confirm("Удалить этого администратора?")) return;
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    if (res.ok) loadAdmins();
    else {
      const data = await res.json();
      alert(data.error || "Ошибка");
    }
  };

  const handleAddIP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIpError("");
    try {
      const res = await fetch("/api/admin/allowed-ips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newIP),
      });
      const data = await res.json();
      if (res.ok) {
        setNewIP({ ip: "", label: "" });
        loadIPs();
      } else {
        setIpError(data.error);
      }
    } catch {
      setIpError("Ошибка");
    }
  };

  const handleDeleteIP = async (id: string) => {
    if (!confirm("Удалить этот IP?")) return;
    const res = await fetch(`/api/admin/allowed-ips/${id}`, {
      method: "DELETE",
    });
    if (res.ok) loadIPs();
  };

  const handleSaveSecretUrl = async () => {
    try {
      const res = await fetch("/api/admin/settings/secret-url", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secretUrl }),
      });
      if (res.ok) {
        setUrlSaved(true);
        setTimeout(() => setUrlSaved(false), 3000);
      }
    } catch {}
  };

  if (editingNews || isCreating) {
    return (
      <NewsEditor
        news={editingNews}
        onClose={() => {
          setEditingNews(null);
          setIsCreating(false);
        }}
        onSave={loadNews}
      />
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.headerLogo}>🛡️</div>
            <div>
              <h1 className={styles.headerTitle}>Guard Tunnel</h1>
              <p className={styles.headerSub}>Панель управления</p>
            </div>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Выйти
          </button>
        </header>

        {/* Tabs */}
        <nav className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "news" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("news")}
          >
            📰 Новости
          </button>
          <button
            className={`${styles.tab} ${activeTab === "admins" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("admins")}
          >
            👥 Администраторы
          </button>
          <button
            className={`${styles.tab} ${activeTab === "security" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("security")}
          >
            🔒 Безопасность
          </button>
        </nav>

        {/* ===== Новости ===== */}
        {activeTab === "news" && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Управление новостями</h2>
              <button
                onClick={() => setIsCreating(true)}
                className={styles.createBtn}
              >
                + Создать новость
              </button>
            </div>

            {loading ? (
              <p className={styles.loadingText}>Загрузка...</p>
            ) : newsList.length === 0 ? (
              <div className={styles.empty}>
                <p>Новостей пока нет</p>
                <button
                  onClick={() => setIsCreating(true)}
                  className={styles.createBtnSmall}
                >
                  Создать первую
                </button>
              </div>
            ) : (
              <div className={styles.newsList}>
                {newsList.map((item) => (
                  <div key={item.id} className={styles.newsItem}>
                    <div className={styles.newsInfo}>
                      <h3 className={styles.newsTitle}>{item.title}</h3>
                      <div className={styles.newsMeta}>
                        <span
                          className={
                            item.published
                              ? styles.statusPublished
                              : styles.statusDraft
                          }
                        >
                          {item.published ? "Опубликовано" : "Черновик"}
                        </span>
                        <span>{item.views} 👁️</span>
                        <span>
                          {new Date(item.createdAt).toLocaleDateString("ru-RU")}
                        </span>
                      </div>
                    </div>
                    <div className={styles.newsActions}>
                      <button
                        onClick={() => setEditingNews(item)}
                        className={styles.editBtn}
                        title="Редактировать"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteNews(item.id)}
                        className={styles.delBtn}
                        title="Удалить"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== Администраторы ===== */}
        {activeTab === "admins" && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Администраторы</h2>

            <form onSubmit={handleCreateAdmin} className={styles.addForm}>
              <h3>Добавить администратора</h3>
              {adminError && (
                <div className={styles.formError}>{adminError}</div>
              )}
              <div className={styles.formRow}>
                <input
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, email: e.target.value })
                  }
                  placeholder="Email *"
                  required
                  className={styles.formInput}
                />
                <input
                  type="text"
                  value={newAdmin.name}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, name: e.target.value })
                  }
                  placeholder="Имя"
                  className={styles.formInput}
                />
                <input
                  type="password"
                  value={newAdmin.password}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, password: e.target.value })
                  }
                  placeholder="Пароль *"
                  required
                  className={styles.formInput}
                />
                <button type="submit" className={styles.formSubmit}>
                  Добавить
                </button>
              </div>
            </form>

            <div className={styles.list}>
              {admins.map((admin) => (
                <div key={admin.id} className={styles.listItem}>
                  <div>
                    <strong>{admin.name || admin.email}</strong>
                    <span className={styles.listSub}>{admin.email}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteAdmin(admin.id)}
                    className={styles.listDelete}
                  >
                    Удалить
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== Безопасность ===== */}
        {activeTab === "security" && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Безопасность</h2>

            {/* Секретный URL */}
            <div className={styles.securityBlock}>
              <h3>🔗 Секретный URL панели</h3>
              <p className={styles.securityHint}>
                Панель доступна только по адресу: /secure/
                <strong>{secretUrl}</strong>
              </p>
              <div className={styles.formRow}>
                <input
                  type="text"
                  value={secretUrl}
                  onChange={(e) => setSecretUrl(e.target.value)}
                  placeholder="Минимум 8 символов"
                  className={styles.formInput}
                />
                <button
                  onClick={handleSaveSecretUrl}
                  className={styles.formSubmit}
                >
                  {urlSaved ? "✓ Сохранено" : "Сохранить"}
                </button>
              </div>
              <p className={styles.securityWarning}>
                ⚠️ После изменения URL текущая ссылка перестанет работать!
              </p>
            </div>

            {/* Разрешённые IP */}
            <div className={styles.securityBlock}>
              <h3>🌐 Разрешённые IP адреса</h3>
              <p className={styles.securityHint}>
                Если список пуст — доступ разрешён всем. Ваш IP:{" "}
                <strong>{currentIP || "..."}</strong>
              </p>
              {ipError && <div className={styles.formError}>{ipError}</div>}

              <form onSubmit={handleAddIP} className={styles.formRow}>
                <input
                  type="text"
                  value={newIP.ip}
                  onChange={(e) => setNewIP({ ...newIP, ip: e.target.value })}
                  placeholder="IP адрес (например 192.168.1.1)"
                  required
                  className={styles.formInput}
                />
                <input
                  type="text"
                  value={newIP.label}
                  onChange={(e) =>
                    setNewIP({ ...newIP, label: e.target.value })
                  }
                  placeholder="Метка (например: Офис)"
                  className={styles.formInput}
                />
                <button type="submit" className={styles.formSubmit}>
                  Добавить
                </button>
              </form>

              <button
                type="button"
                onClick={() => {
                  if (currentIP)
                    setNewIP({ ...newIP, ip: currentIP, label: "Мой IP" });
                }}
                className={styles.addMyIP}
              >
                Добавить мой IP ({currentIP || "..."})
              </button>

              <div className={styles.list}>
                {allowedIPs.length === 0 ? (
                  <p className={styles.listEmpty}>
                    Список пуст — доступ разрешён с любого IP
                  </p>
                ) : (
                  allowedIPs.map((item) => (
                    <div key={item.id} className={styles.listItem}>
                      <div>
                        <strong>{item.ip}</strong>
                        {item.label && (
                          <span className={styles.listSub}>{item.label}</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteIP(item.id)}
                        className={styles.listDelete}
                      >
                        Удалить
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
