"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./Apps.module.css";

interface App {
  name: string;
  description: string;
  downloadLink: string;
  size?: string;
}

interface Platform {
  id: number;
  name: string;
  icon: string;
  description: string;
  apps?: App[];
}

const platforms: Platform[] = [
  {
    id: 1,
    name: "Windows",
    icon: "/Windows.svg",
    description: "Windows 10/11",
    apps: [
      {
        name: "v2RayN",
        description: "Официальный клиент",
        downloadLink: "https://github.com/2dust/v2rayN/releases",
      },
      {
        name: "Hiddify",
        description: "Официальный клиент",
        downloadLink: "https://github.com/hiddify/hiddify-next/releases",
      },
      {
        name: "Happ",
        description: "Официальный клиент",
        downloadLink:
          "https://github.com/Happ-proxy/happ-desktop/releases/download/1.0.1/setup-Happ.x86.exe",
      },
    ],
  },
  {
    id: 2,
    name: "IOS",
    icon: "/Apple.svg",
    description: "iOS 12.0+",
    apps: [
      {
        name: "v2RayTun",
        description: "Официальный клиент",
        downloadLink: "https://apps.apple.com/us/app/v2raytun/id6476628951",
      },
      {
        name: "v2Box",
        description: "Официальный клиент",
        downloadLink:
          "https://apps.apple.com/us/app/v2box-v2ray-client/id6446814690",
      },
      {
        name: "Happ",
        description: "Официальный клиент",
        downloadLink:
          "https://apps.apple.com/us/app/happ-proxy-utility/id6504287215",
      },
    ],
  },
  {
    id: 3,
    name: "macOS",
    icon: "/Apple.svg",
    description: "macOS 10.12+",
    apps: [
      {
        name: "v2Box",
        description: "Официальный клиент",
        downloadLink:
          "https://apps.apple.com/us/app/v2box-v2ray-client/id6446814690",
      },
      {
        name: "Happ",
        description: "Официальный клиент",
        downloadLink:
          "https://apps.apple.com/us/app/happ-proxy-utility/id6504287215",
      },
      {
        name: "v2RayTun",
        description: "Официальный клиент",
        downloadLink: "https://apps.apple.com/us/app/v2raytun/id6476628951",
      },
    ],
  },
  {
    id: 4,
    name: "Android",
    icon: "/Android.svg",
    description: "Android 5.0+",
    apps: [
      {
        name: "v2Box",
        description: "Официальный клиент",
        downloadLink:
          "https://play.google.com/store/apps/details?id=dev.hexasoftware.v2box",
      },
      {
        name: "Happ",
        description: "Официальный клиент",
        downloadLink:
          "https://play.google.com/store/apps/details?id=com.happproxy",
      },
      {
        name: "v2Ray Client",
        description: "Официальный клиент",
        downloadLink:
          "https://play.google.com/store/apps/details?id=com.v2ray.client",
      },
    ],
  },
  {
    id: 5,
    name: "Linux",
    icon: "/Linux.svg",
    description: "Ubuntu, Debian, Fedora",
    apps: [
      {
        name: "Hiddify",
        description: "Официальный клиент",
        downloadLink: "https://github.com/hiddify/hiddify-next/releases",
      },
      {
        name: "v2RayN",
        description: "Официальный клиент",
        downloadLink: "https://github.com/2dust/v2rayN/releases",
      },
    ],
  },
  {
    id: 6,
    name: "Smart TV",
    icon: "/SmartTV.svg",
    description: "Android TV",
    apps: [
      {
        name: "v2RayTun",
        description: "Официальный клиент",
        downloadLink:
          "https://play.google.com/store/apps/details?id=com.v2raytun.android",
      },
      {
        name: "Happ",
        description: "Официальный клиент",
        downloadLink:
          "https://play.google.com/store/apps/details?id=com.happproxy",
      },
    ],
  },
];

const Apps: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const dropdownRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown !== null) {
        const activeRef = dropdownRefs.current.get(activeDropdown);
        if (activeRef && !activeRef.contains(event.target as Node)) {
          setActiveDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  const setDropdownRef = (id: number) => (element: HTMLDivElement | null) => {
    if (element) {
      dropdownRefs.current.set(id, element);
    } else {
      dropdownRefs.current.delete(id);
    }
  };

  const handlePlatformClick = (platformId: number, e: React.MouseEvent) => {
    e.preventDefault();
    const platform = platforms.find((p) => p.id === platformId);

    if (platform?.apps && platform.apps.length > 0) {
      setActiveDropdown(activeDropdown === platformId ? null : platformId);
    }
  };

  const handleAppDownload = (
    app: App,
    platformName: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    console.log(`Downloading ${app.name} for ${platformName}`);
    // Открываем ссылку в новой вкладке
    if (app.downloadLink !== "#") {
      window.open(app.downloadLink, "_blank", "noopener,noreferrer");
    }
  };


  return (
    <section id="apps" className={styles.apps}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <h2 className={styles.title}>
              Доступно на всех{" "}
              <span className={styles.gradient}>платформах</span>
            </h2>
            <p className={styles.description}>
              Защитите все свои устройства одним аккаунтом. Наши приложения
              работают на всех популярных платформах с поддержкой различных
              протоколов.
            </p>

            <div className={styles.features}>
              <div className={styles.featureItem}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12L11 14L15 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <span>Простая установка за 60 секунд</span>
              </div>
              <div className={styles.featureItem}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12L11 14L15 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <span>Поддержка Xray, Trojan</span>
              </div>
              <div className={styles.featureItem}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12L11 14L15 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <span>Автоматические обновления</span>
              </div>
            </div>

            <div className={styles.platformsGrid}>
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className={styles.platformWrapper}
                  ref={setDropdownRef(platform.id)}
                >
                  <div
                    className={`${styles.platformCard} ${
                      activeDropdown === platform.id ? styles.active : ""
                    }`}
                    onClick={(e) => handlePlatformClick(platform.id, e)}
                  >
                    <div className={styles.platformIcon}>
                      <Image
                        src={platform.icon}
                        alt={platform.name}
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className={styles.platformInfo}>
                      <h4 className={styles.platformName}>{platform.name}</h4>
                      <p className={styles.platformDesc}>
                        {platform.description}
                      </p>
                    </div>
                    {platform.apps && platform.apps.length > 0 ? (
                      <svg
                        className={`${styles.dropdownIcon} ${
                          activeDropdown === platform.id ? styles.rotated : ""
                        }`}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M5 7L10 12L15 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        className={styles.downloadIcon}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M10 2V14M10 14L6 10M10 14L14 10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 17H17"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </div>

                  {platform.apps && activeDropdown === platform.id && (
                    <div className={styles.dropdown}>
                      <div className={styles.dropdownHeader}>
                        Выберите приложение для {platform.name}:
                      </div>
                      {platform.apps.map((app, appIndex) => (
                        <div
                          key={appIndex}
                          className={styles.appItem}
                          onClick={(e) =>
                            handleAppDownload(app, platform.name, e)
                          }
                        >
                          <div className={styles.appInfo}>
                            <h5 className={styles.appName}>{app.name}</h5>
                            <p className={styles.appDescription}>
                              {app.description}
                            </p>
                          </div>
                          <div className={styles.appMeta}>
                            {app.size && (
                              <span className={styles.appSize}>{app.size}</span>
                            )}
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              className={styles.downloadSmallIcon}
                            >
                              <path
                                d="M8 2V10M8 10L5 7M8 10L11 7"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M2 13H14"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>

          <div className={styles.rightSection}>
            <div className={styles.mockupContainer}>
              <div className={styles.phoneFrame}>
                <div className={styles.phoneScreen}>
                  <div className={styles.appInterface}>
                    <div className={styles.appHeader}>
                      <div className={styles.appLogo}>GT</div>
                      <div className={styles.appStatus}>Защищено</div>
                    </div>
                    <div className={styles.connectionButton}>
                      <div className={styles.powerIcon}>⚡</div>
                    </div>
                    <div className={styles.serverInfo}>
                      <span className={styles.serverLocation}>
                        🇩🇪 Германия, Берлин
                      </span>
                      <span className={styles.connectionTime}>00:24:15</span>
                    </div>
                    <div className={styles.statsRow}>
                      <div className={styles.stat}>
                        <span className={styles.statLabel}>Скорость</span>
                        <span className={styles.statValue}>156 Mbps</span>
                      </div>
                      <div className={styles.stat}>
                        <span className={styles.statLabel}>Пинг</span>
                        <span className={styles.statValue}>12 ms</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Apps;
