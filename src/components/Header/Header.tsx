"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
// import { useSnow } from "@/contexts/SnowContext";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showInstructionsDropdown, setShowInstructionsDropdown] =
    useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  // const { snowEnabled, toggleSnow } = useSnow();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash;
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowInstructionsDropdown(false);
      }
    };

    if (showInstructionsDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showInstructionsDropdown]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleStartNow = () => {
    window.open(
      "https://t.me/GuardTunnel_bot",
      "_blank",
      "noopener,noreferrer"
    );
    closeMenu();
  };

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
      closeMenu();
      setShowInstructionsDropdown(false);
    }
  };

  const menuItems = [
    { href: "#features", label: "Преимущества" },
    { href: "#pricing", label: "Тарифы" },
    { href: "#apps", label: "Приложения" },
    {
      href: "/instruction",
      label: "Инструкции подключения",
      hasDropdown: true,
    },
    { href: "/news", label: "Новости" },
  ];

  const instructionSubmenu = [
    {
      href: "/instruction",
      label: "Стандартное подключение",
      icon: "🔐",
      description: "Базовая настройка VPN",
    },
    // {
    //   href: "/instruction-whitelist",
    //   label: "Обход белых списков",
    //   icon: "🚀",
    //   description: "Для российских пользователей",
    // },
  ];

  const instructionPlatforms = [
    { type: "android", label: "Android", icon: "/Android.svg" },
    { type: "ios", label: "iOS", icon: "/Apple.svg" },
    { type: "windows", label: "Windows", icon: "/Windows.svg" },
    { type: "macos", label: "macOS", icon: "/Apple.svg" },
    { type: "linux", label: "Linux", icon: "/Linux.svg" },
    { type: "smarttv", label: "Smart TV", icon: "/SmartTV.svg" },
  ];

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/logo_vpn.svg"
              alt="Guard Tunnel VPN"
              width={50}
              height={50}
              priority
            />
            <span className={styles.logoText}>GUARD TUNNEL</span>
          </Link>

          {/* Десктоп меню */}
          <ul className={styles.desktopMenu}>
            {menuItems.map((item) => (
              <li key={item.href}>
                {item.hasDropdown ? (
                  <div className={styles.dropdownWrapper} ref={dropdownRef}>
                    <button
                      className={styles.dropdownTrigger}
                      onMouseEnter={() => setShowInstructionsDropdown(true)}
                      onMouseLeave={() => setShowInstructionsDropdown(false)}
                    >
                      {item.label}
                      <svg
                        className={`${styles.dropdownArrow} ${
                          showInstructionsDropdown ? styles.rotated : ""
                        }`}
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="currentColor"
                      >
                        <path
                          d="M1 1L5 5L9 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          fill="none"
                        />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {showInstructionsDropdown && (
                        <motion.div
                          className={styles.dropdownMenu}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          onMouseEnter={() => setShowInstructionsDropdown(true)}
                          onMouseLeave={() =>
                            setShowInstructionsDropdown(false)
                          }
                        >
                          <div className={styles.dropdownMainSection}>
                            {instructionSubmenu.map((subitem) => (
                              <Link
                                key={subitem.href}
                                href={subitem.href}
                                className={styles.dropdownMainItem}
                              >
                                <span className={styles.dropdownIcon}>
                                  {subitem.icon}
                                </span>
                                <div className={styles.dropdownContent}>
                                  <span className={styles.dropdownTitle}>
                                    {subitem.label}
                                  </span>
                                  <span className={styles.dropdownDesc}>
                                    {subitem.description}
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>

                          <div className={styles.dropdownDivider} />

                          <div className={styles.platformsSection}>
                            <span className={styles.dropdownLabel}>
                              Инструкции по платформам:
                            </span>
                            <div className={styles.platformsGrid}>
                              {instructionPlatforms.map((platform) => (
                                <Link
                                  key={platform.type}
                                  href={`/instruction?type=${platform.type}&mode=text`}
                                  className={styles.platformItem}
                                >
                                  <Image
                                    src={platform.icon}
                                    alt={platform.label}
                                    width={24}
                                    height={24}
                                    className={styles.platformIcon}
                                  />
                                  <span className={styles.platformTooltip}>
                                    {platform.label}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : item.href.startsWith("#") ? (
                  <a
                    href={item.href}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className={styles.menuLink}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href} className={styles.menuLink}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <button className={styles.ctaButton} onClick={handleStartNow}>
            Начать сейчас
          </button>

          {/* <button
            onClick={toggleSnow}
            className={styles.snowButton}
            aria-label="Toggle snow effect"
            title={snowEnabled ? "Отключить снег" : "Включить снег"}
          >
            <span className={styles.snowIcon}>{snowEnabled ? "❄️" : "🌨️"}</span>
            <span className={styles.snowStatus}>
              {snowEnabled ? "ON" : "OFF"}
            </span>
          </button> */}

          {/* Бургер меню для мобильных */}
          <button
            className={`${styles.burgerButton} ${
              isMenuOpen ? styles.active : ""
            }`}
            onClick={toggleMenu}
            aria-label="Меню"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </header>

      {/* Мобильное меню */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className={styles.menuOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />
            <motion.div
              className={styles.mobileMenu}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className={styles.mobileMenuHeader}>
                <Link
                  href="/"
                  className={styles.mobileLogo}
                  onClick={closeMenu}
                >
                  <Image
                    src="/logo_vpn.svg"
                    alt="Guard Tunnel VPN"
                    width={40}
                    height={40}
                  />
                  <span>GUARD TUNNEL</span>
                </Link>
                <button
                  className={styles.closeButton}
                  onClick={closeMenu}
                  aria-label="Закрыть меню"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 6L18 18M6 18L18 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <ul className={styles.mobileMenuList}>
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.hasDropdown ? (
                      <>
                        <div className={styles.mobileDropdownHeader}>
                          <Link href={item.href} onClick={closeMenu}>
                            {item.label}
                          </Link>
                        </div>
                        <div className={styles.mobileSubmenu}>
                          {instructionSubmenu.map((subitem) => (
                            <Link
                              key={subitem.href}
                              href={subitem.href}
                              onClick={closeMenu}
                              className={styles.mobileSubmenuItem}
                            >
                              <span className={styles.mobileSubmenuIcon}>
                                {subitem.icon}
                              </span>
                              <span>{subitem.label}</span>
                            </Link>
                          ))}
                          <div className={styles.mobileDivider} />
                          <div className={styles.mobilePlatforms}>
                            <span className={styles.mobilePlatformsLabel}>
                              Платформы:
                            </span>
                            <div className={styles.mobilePlatformsGrid}>
                              {instructionPlatforms.map((platform) => (
                                <Link
                                  key={platform.type}
                                  href={`/instruction?type=${platform.type}&mode=text`}
                                  onClick={closeMenu}
                                  className={styles.mobilePlatformItem}
                                >
                                  <Image
                                    src={platform.icon}
                                    alt={platform.label}
                                    width={20}
                                    height={20}
                                  />
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : item.href.startsWith("#") ? (
                      <a
                        href={item.href}
                        onClick={(e) => handleAnchorClick(e, item.href)}
                        className={styles.mobileMenuLink}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className={styles.mobileMenuLink}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>

              <motion.button
                className={styles.mobileCtaButton}
                onClick={handleStartNow}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Начать сейчас
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
