"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./GiftPopup.module.css";

interface GiftPopupProps {
  telegramBotUrl?: string;
}

const GiftPopup: React.FC<GiftPopupProps> = ({
  telegramBotUrl = "https://t.me/GuardTunnel_bot",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);
  const pathname = usePathname();

  const excludedPages = [
    "/instruction",
    "/instruction-whitelist",
    "/privacy",
    "/polzovatelskoe-soglashenie",
  ];

  useEffect(() => {
    const isExcludedPage = excludedPages.some((page) =>
      pathname.startsWith(page)
    );
    if (isExcludedPage) {
      return;
    }

    const popupShown = sessionStorage.getItem("giftPopupShown");

    if (!popupShown && !hasBeenShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasBeenShown(true);
        sessionStorage.setItem("giftPopupShown", "true");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [hasBeenShown, pathname]);


  useEffect(() => {
    if (isVisible) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      const originalStyles = {
        overflow: document.body.style.overflow,
        paddingRight: document.body.style.paddingRight,
        position: document.documentElement.style.position,
        scrollBehavior: document.documentElement.style.scrollBehavior,
        width: document.body.style.width,
      };

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.width = "100%";
      document.documentElement.style.position = "relative";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.scrollBehavior = "auto";

      return () => {
        document.body.style.overflow = originalStyles.overflow;
        document.body.style.paddingRight = originalStyles.paddingRight;
        document.body.style.width = originalStyles.width;
        document.documentElement.style.position = originalStyles.position;
        document.documentElement.style.overflow = "";
        document.documentElement.style.scrollBehavior =
          originalStyles.scrollBehavior;
      };
    }
  }, [isVisible]);

  const handleClose = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setIsVisible(false);
  };

  const handleClaim = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(
      `${telegramBotUrl}?start=gift7days`,
      "_blank",
      "noopener,noreferrer"
    );
    setIsVisible(false);
  };

  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <div className={styles.modalContainer}>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            style={{ cursor: "pointer" }}
          />
          <motion.div
            className={styles.popupWrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
          >
            <motion.div
              className={styles.popup}
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.3,
              }}
              onClick={handlePopupClick}
            >
              <button
                className={styles.closeButton}
                onClick={handleClose}
                type="button"
                aria-label="Закрыть"
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

              <div className={styles.giftIcon}>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  🎁
                </motion.div>
              </div>

              <h2 className={styles.title}>Ваш подарок готов!</h2>

              <div className={styles.offer}>
                <div className={styles.offerBadge}>
                  <span className={styles.offerDays}>3 ДНЯ</span>
                  <span className={styles.offerText}>БЕСПЛАТНО</span>
                </div>
              </div>

              <p className={styles.description}>
                Специальное предложение для новых пользователей! Получите{" "}
                <strong>3 дня премиум-доступа</strong> совершенно бесплатно.
              </p>

              <div className={styles.features}>
                <div className={styles.feature}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle
                      cx="10"
                      cy="10"
                      r="10"
                      fill="currentColor"
                      opacity="0.2"
                    />
                    <path
                      d="M6 10L9 13L14 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>Безлимитный трафик</span>
                </div>
                <div className={styles.feature}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle
                      cx="10"
                      cy="10"
                      r="10"
                      fill="currentColor"
                      opacity="0.2"
                    />
                    <path
                      d="M6 10L9 13L14 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>10+ серверов</span>
                </div>
                <div className={styles.feature}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle
                      cx="10"
                      cy="10"
                      r="10"
                      fill="currentColor"
                      opacity="0.2"
                    />
                    <path
                      d="M6 10L9 13L14 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>Максимальная скорость</span>
                </div>
              </div>

              <button
                className={styles.claimButton}
                onClick={handleClaim}
                type="button"
              >
                <span>Получить в Telegram</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm4.912 6.851l-1.642 7.733c-.123.549-.448.682-.903.424l-2.5-1.842-1.205 1.162c-.117.15-.298.246-.5.246l.178-2.545 4.633-4.185c.2-.178-.045-.278-.311-.101l-5.724 3.605-2.467-.77c-.533-.169-.548-.533.112-.795l9.638-3.715c.448-.164.838.107.69.784z"
                    fill="currentColor"
                  />
                </svg>
              </button>

              <p className={styles.disclaimer}>
                * Предложение действительно только для новых пользователей
              </p>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GiftPopup;
