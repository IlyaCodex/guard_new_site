"use client";
import styles from "./NotFound.module.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const NotFound: React.FC = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundAnimation}>
        <div className={styles.orb2} />
        <div className={styles.orb3} />
      </div>

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        <motion.div
          className={styles.errorCode}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <span className={styles.number}>4</span>
          <span className={styles.zero}>0</span>
          <span className={styles.number}>4</span>
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Страница не найдена
        </motion.h1>


        <motion.div
          className={styles.vpnJoke}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className={styles.jokeIcon}>🔒</div>
          <p>Даже наш VPN не может найти эту страницу!</p>
        </motion.div>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link href="/" className={styles.homeButton}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2.69l5 4.5V15h-2v-4H7v4H5V7.19l5-4.5M10 0L0 9h3v8h6v-5h2v5h6V9h3L10 0z" />
            </svg>
            На главную
          </Link>

          <button onClick={handleGoBack} className={styles.backButton}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M15 10H5m0 0l5-5m-5 5l5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            Назад
          </button>
        </motion.div>

        <motion.div
          className={styles.countdown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>Автоматический переход на главную через {countdown} сек...</p>
          <div className={styles.progressBar}>
            <div
              className={styles.progress}
              style={{ width: `${(countdown / 10) * 100}%` }}
            />
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default NotFound;
