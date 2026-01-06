"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      if (pathname !== "/") {
        router.push("/" + href);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brandColumn}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <Link href="/" className={styles.logo}>
                  <Image
                    src="/logo_vpn.svg"
                    alt="Guard Tunnel VPN"
                    width={50}
                    height={50}
                    priority
                  />
                </Link>
                <span className={styles.logoText}>GUARD TUNNEL</span>
              </div>
              <p className={styles.tagline}>
                Ваша безопасность - наш приоритет
              </p>
            </div>
          </div>

          <div className={styles.linksSection}>
            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Продукт</h4>
              <ul className={styles.linkList}>
                <li>
                  <a
                    href="#features"
                    onClick={(e) => handleAnchorClick(e, "#features")}
                  >
                    Возможности
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    onClick={(e) => handleAnchorClick(e, "#pricing")}
                  >
                    Тарифы
                  </a>
                </li>
                <li>
                  <a
                    href="#apps"
                    onClick={(e) => handleAnchorClick(e, "#apps")}
                  >
                    Приложения
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Информация</h4>
              <ul className={styles.linkList}>
                <li>
                  <Link href="/privacy">Политика конфиденциальности</Link>
                </li>
                <li>
                  <Link href="/polzovatelskoe-soglashenie">
                    Пользовательское соглашение
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            <p>© {currentYear} Guard Tunnel VPN. Все права защищены.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
