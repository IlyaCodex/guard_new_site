"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./AdminLogin.module.css";

interface AdminLoginPageProps {
  secretToken: string;
}

export default function AdminLoginPage({ secretToken }: AdminLoginPageProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Проверяем есть ли уже сессия
    fetch("/api/admin/auth/check")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          router.push(`/secure/${secretToken}/dashboard`);
        }
        setChecking(false);
      })
      .catch(() => setChecking(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push(`/secure/${secretToken}/dashboard`);
      } else {
        setError(data.error || "Ошибка входа");
      }
    } catch {
      setError("Ошибка соединения");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className={styles.page}>
        <div className={styles.loader}>Проверка сессии...</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <div className={styles.shield}>🛡️</div>
          <h1>Guard Tunnel</h1>
          <p>Панель управления</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@guardtunnel.com"
              required
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>

        <p className={styles.sessionInfo}>Сессия активна 12 часов</p>
      </div>
    </div>
  );
}
