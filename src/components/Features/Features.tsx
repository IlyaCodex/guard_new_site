import React from "react";
import styles from "./Features.module.css";

interface Feature {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path
          d="M20 5L6 15V25C6 32.55 11.84 39.74 20 41C28.16 39.74 34 32.55 34 25V15L20 5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 20L18 24L26 16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Шифрование в сети",
    description:
      "Трафик защищён современным TLS (AEAD), что предотвращает перехват и подмену.",
  },
  {
    id: 2,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="2" />
        <path
          d="M20 10V20L26 26"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "Молниеносная скорость",
    description:
      "10 Гбит/с серверы обеспечивают максимальную скорость без ограничений трафика",
  },
  {
    id: 3,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path
          d="M20 5C28.284 5 35 11.716 35 20C35 28.284 28.284 35 20 35C11.716 35 5 28.284 5 20C5 11.716 11.716 5 20 5Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M5 20H35" stroke="currentColor" strokeWidth="2" />
        <path
          d="M20 5C24 9 26 14 26 20C26 26 24 31 20 35C16 31 14 26 14 20C14 14 16 9 20 5Z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    title: "10+ серверов",
    description:
      "Серверы в 10+ странах мира для доступа к любому контенту без ограничений",
  },
  {
    id: 4,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="15" r="5" stroke="currentColor" strokeWidth="2" />
        <path
          d="M10 30C10 25 14 21 20 21C26 21 30 25 30 30"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M20 21V35" stroke="currentColor" strokeWidth="2" />
        <path d="M15 35H25" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    title: "Полная анонимность",
    description:
      "Никаких логов, полная приватность и защита вашей личности в интернете",
  },
  {
    id: 5,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect
          x="5"
          y="10"
          width="30"
          height="20"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M10 15H30" stroke="currentColor" strokeWidth="2" />
        <circle cx="15" cy="22" r="2" fill="currentColor" />
        <circle cx="25" cy="22" r="2" fill="currentColor" />
      </svg>
    ),
    title: "Обход белых списков",
    description:
      "Наши технологии позволяют обходить даже самую сильную цензуру (это когда провайдеры дают пользоваться сайтами и сервисами только из своего белого списка)",
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Наши <span className={styles.gradient}>преимущества</span>
          </h2>
          <p className={styles.subtitle}>
            Мы предоставляем лучшие технологии для вашей безопасности
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature) => (
            <div key={feature.id} className={styles.card}>
              <div className={styles.iconWrapper}>
                <div className={styles.iconGlow}></div>
                <div className={styles.icon}>{feature.icon}</div>
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
