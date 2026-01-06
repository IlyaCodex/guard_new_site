"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TechBackground from "../TechBackground/TechBackground";
import styles from "./HeroSection.module.css";

const HeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handlePrimaryClick = () => {
    window.open(
      "https://t.me/GuardTunnel_bot",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleSecondaryClick = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.hero}>
      <TechBackground />

      <div className={styles.content}>
        <motion.h1
          className={styles.title}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            duration: 0.8,
            delay: 0.2,
          }}
        >
          <span className={styles.gradient}>Безопасность</span> и{" "}
          <span className={styles.gradient}>свобода</span>
          <br />в Интернете
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            duration: 0.6,
            delay: 0.4,
          }}
        >
          VPN-сервис нового поколения с высоким уровнем шифрования на протоколе
          xRay. Защитите свою приватность и получите доступ к любому контенту.
        </motion.p>

        <motion.div
          className={styles.stats}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            duration: 0.6,
            delay: 0.6,
          }}
        >
          {[
            { number: "10+", label: "Серверов" },
            { number: "10+", label: "Стран" },
            { number: "300 Мбит/с", label: "Скорость" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className={styles.statItem}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                delay: 0.8 + index * 0.1,
                duration: 0.5,
              }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
            >
              <span className={styles.statNumber}>{stat.number}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={styles.actions}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            duration: 0.6,
            delay: 1.2,
          }}
        >
          <motion.button
            className={styles.primaryBtn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrimaryClick}
          >
            Попробовать бесплатно
          </motion.button>
          <motion.button
            className={styles.secondaryBtn}
            whileHover={{ scale: 1.05, x: 10 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSecondaryClick}
          >
            <span>Узнать больше</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 18L18 10L10 2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
