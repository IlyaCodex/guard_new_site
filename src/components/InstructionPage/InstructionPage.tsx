"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  instructionsData,
  DeviceInstruction,
  AppType,
} from "@/data/instructions";
import Link from "next/link";
import styles from "./InstructionPage.module.css";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
  loading: () => (
    <div className={styles.videoLoading}>
      <div className={styles.spinner}></div>
      <p>Загрузка видеоплеера...</p>
    </div>
  ),
});

// Компонент загрузки
const LoadingSpinner = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background:
        "linear-gradient(135deg, rgba(10, 10, 15, 1) 0%, rgba(20, 15, 25, 1) 50%, rgba(15, 10, 20, 1) 100%)",
      color: "white",
      fontSize: "1.2rem",
    }}
  >
    <div style={{ textAlign: "center" }}>
      <div className={styles.loadingSpinner}></div>
      <div style={{ marginTop: "20px" }}>Загрузка инструкций...</div>
    </div>
  </div>
);

// Основной контент компонента
const InstructionContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedDevice, setSelectedDevice] = useState<string>("android");
  const [selectedApp, setSelectedApp] = useState<string>("");
  const [instructionMode, setInstructionMode] = useState<"text" | "video">(
    "text"
  );
  const [currentInstruction, setCurrentInstruction] =
    useState<DeviceInstruction | null>(null);
  const [currentApp, setCurrentApp] = useState<AppType | null>(null);
  const [showAppSelection, setShowAppSelection] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const type = searchParams.get("type") || "android";
    const app = searchParams.get("app") || "";
    const mode = (searchParams.get("mode") as "text" | "video") || "text";

    setSelectedDevice(type);
    setSelectedApp(app);
    setInstructionMode(mode);

    const instruction = instructionsData.find((item) => item.type === type);
    setCurrentInstruction(instruction || instructionsData[0]);

    if (instruction && app && instruction.apps) {
      const appData = instruction.apps.find((a) => a.id === app);
      setCurrentApp(appData || null);
    }
  }, [searchParams]);

  const updateUrl = (device: string, app: string, mode: "text" | "video") => {
    const params = new URLSearchParams();
    params.set("type", device);
    if (app) params.set("app", app);
    params.set("mode", mode);
    router.push(`/instruction?${params.toString()}`);
  };

  const handleDeviceSelect = (device: string) => {
    setSelectedDevice(device);
    setSelectedApp("");
    setCurrentApp(null);
    const instruction = instructionsData.find((item) => item.type === device);
    setCurrentInstruction(instruction || null);
    setShowAppSelection(true);
    updateUrl(device, "", instructionMode);
  };

  const handleAppSelect = (appId: string) => {
    if (!currentInstruction) return;

    const app = currentInstruction.apps?.find((a) => a.id === appId);
    if (app) {
      setSelectedApp(appId);
      setCurrentApp(app);
      setShowAppSelection(false);
      updateUrl(selectedDevice, appId, instructionMode);
    }
  };

  const handleModeChange = (mode: "text" | "video") => {
    setInstructionMode(mode);
    updateUrl(selectedDevice, selectedApp, mode);
  };

  const deviceIconPaths: { [key: string]: string } = {
    android: "/Android.svg",
    windows: "/Windows.svg",
    ios: "/Apple.svg",
    macos: "/Apple.svg",
    linux: "/Linux.svg",
    smarttv: "/SmartTV.svg",
  };

  return (
    <div className={styles.instructionPage}>
      <div className={styles.container}>
        <motion.div
          className={styles.breadcrumbs}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Link href="/" className={styles.breadcrumbLink}>
            Главная
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>Инструкции</span>
          {currentInstruction && (
            <>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbCurrent}>
                {currentInstruction.name}
              </span>
            </>
          )}
          {currentApp && (
            <>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbCurrent}>
                {currentApp.name}
              </span>
            </>
          )}
        </motion.div>

        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className={styles.title}>Инструкция по подключению</h1>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            className={styles.sidebar}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className={styles.sidebarTitle}>Тип устройства</h3>
            <div className={styles.deviceList}>
              {instructionsData.map((device) => (
                <button
                  key={device.type}
                  className={`${styles.deviceItem} ${
                    selectedDevice === device.type ? styles.active : ""
                  }`}
                  onClick={() => handleDeviceSelect(device.type)}
                >
                  <span className={styles.deviceIcon}>
                    <Image
                      src={deviceIconPaths[device.type] || "/logo_vpn.svg"}
                      alt={device.name}
                      width={24}
                      height={24}
                      className={styles.deviceIconImage}
                    />
                  </span>
                  <span className={styles.deviceName}>{device.name}</span>
                </button>
              ))}
            </div>
          </motion.div>

          <div className={styles.mainContent}>
            <AnimatePresence>
              {showAppSelection &&
                currentInstruction &&
                currentInstruction.apps && (
                  <motion.div
                    className={styles.appSelectionOverlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowAppSelection(false)}
                  >
                    <motion.div
                      className={styles.appSelectionModal}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h2>Выберите приложение для {currentInstruction.name}</h2>
                      <div className={styles.appGrid}>
                        {currentInstruction.apps.map((app) => (
                          <motion.div
                            key={app.id}
                            className={`${styles.appCard} ${
                              app.recommended ? styles.recommended : ""
                            }`}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => handleAppSelect(app.id)}
                          >
                            {app.recommended && (
                              <div className={styles.recommendedBadge}>
                                Рекомендуем
                              </div>
                            )}
                            <h3>{app.name}</h3>
                            <p>{app.description}</p>
                            <div className={styles.appFeatures}>
                              {app.features.map((feature, idx) => (
                                <span key={idx} className={styles.featureTag}>
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
            </AnimatePresence>

            {currentApp && (
              <div className={styles.selectedAppHeader}>
                <div className={styles.appMockup}>
                  {currentApp.mockup && (
                    <Image
                      src={currentApp.mockup}
                      alt={`${currentApp.name} interface`}
                      width={400}
                      height={300}
                      className={styles.mockupImage}
                    />
                  )}
                </div>

                <div className={styles.appInfo}>
                  <h2>{currentApp.name}</h2>
                  <p>{currentApp.description}</p>
                  <div className={styles.appFeaturesList}>
                    {currentApp.features.map((feature, idx) => (
                      <div key={idx} className={styles.featureItem}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="var(--primary-red)"
                        >
                          <path d="M6 12l-4-4 1.4-1.4L6 9.2l6.6-6.6L14 4z" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      marginTop: "1rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <a
                      href={currentApp.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.downloadButton}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0zm-1 14.4l-4-4L6.4 9l2.6 2.6V4h2v7.6L13.6 9l1.4 1.4-5 5z" />
                      </svg>
                      Скачать приложение
                    </a>
                    <button
                      className={styles.changeAppButton}
                      onClick={() => setShowAppSelection(true)}
                    >
                      Выбрать другое приложение
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentApp && (
              <div className={styles.modeSwitcher}>
                <button
                  className={`${styles.modeButton} ${
                    instructionMode === "text" ? styles.active : ""
                  }`}
                  onClick={() => handleModeChange("text")}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={styles.modeIcon}
                  >
                    <path d="M3 3h14v2H3V3zm0 4h14v2H3V7zm0 4h14v2H3v-2zm0 4h10v2H3v-2z" />
                  </svg>
                  Текстовая инструкция
                </button>
                <button
                  className={`${styles.modeButton} ${
                    instructionMode === "video" ? styles.active : ""
                  }`}
                  onClick={() => handleModeChange("video")}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={styles.modeIcon}
                  >
                    <path d="M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0zm-2 14.5v-9l6 4.5-6 4.5z" />
                  </svg>
                  Видеоинструкция
                </button>
              </div>
            )}

            <AnimatePresence mode="wait">
              {currentApp && currentInstruction ? (
                <motion.div
                  key={`${selectedDevice}-${selectedApp}-${instructionMode}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={styles.instructionContent}
                >
                  {instructionMode === "video" ? (
                    <div className={styles.videoContent}>
                      <div className={styles.videoHeader}>
                        <Image
                          src={deviceIconPaths[currentInstruction.type]}
                          alt={currentInstruction.name}
                          width={32}
                          height={32}
                        />
                        <h2>Видеоинструкция для {currentApp.name}</h2>
                      </div>

                      <div className={styles.playerWrapper}>
                        {isClient && (
                          <ReactPlayer
                            url={
                              currentApp.videoUrl ||
                              "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                            }
                            width="100%"
                            height="100%"
                            controls
                            light={currentInstruction.videoPoster || false}
                            playing={false}
                            pip={true}
                            stopOnUnmount={false}
                            volume={0.8}
                            muted={false}
                            playbackRate={1}
                            className={styles.reactPlayer}
                            config={{
                              youtube: {
                                playerVars: {
                                  showinfo: 1,
                                  modestbranding: 1,
                                  rel: 0,
                                  fs: 1,
                                },
                              },
                              file: {
                                attributes: {
                                  controlsList: "nodownload",
                                },
                              },
                            }}
                          />
                        )}
                      </div>

                      <div className={styles.videoInfo}>
                        <p>
                          Следуйте пошаговой видеоинструкции для быстрой
                          настройки VPN на вашем устройстве с помощью{" "}
                          {currentApp.name}.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.textContent}>
                      <div className={styles.deviceHeader}>
                        <Image
                          src={deviceIconPaths[currentInstruction.type]}
                          alt={currentInstruction.name}
                          width={40}
                          height={40}
                        />
                        <div>
                          <h2>
                            Настройка {currentApp.name} на{" "}
                            {currentInstruction.name}
                          </h2>
                          <p>Пошаговая инструкция по установке и настройке</p>
                        </div>
                      </div>

                      {((currentApp?.textSteps &&
                        currentApp.textSteps.length > 0) ||
                        (currentInstruction?.textSteps &&
                          currentInstruction.textSteps.length > 0)) && (
                        <div className={styles.textInstructions}>
                          {(
                            currentApp?.textSteps ||
                            currentInstruction?.textSteps ||
                            []
                          ).map((step, index) => (
                            <motion.div
                              key={step.id}
                              className={styles.step}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className={styles.stepNumber}>{step.id}</div>
                              <div className={styles.stepContent}>
                                <h3>{step.title}</h3>
                                <p>{step.description}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ) : (
                currentInstruction &&
                !currentApp && (
                  <div className={styles.noAppSelected}>
                    <Image
                      src={deviceIconPaths[currentInstruction.type]}
                      alt={currentInstruction.name}
                      width={80}
                      height={80}
                      className={styles.placeholderIcon}
                    />
                    <h2>Выберите приложение для {currentInstruction.name}</h2>
                    <p>
                      Нажмите на платформу слева и выберите подходящее
                      приложение
                    </p>
                    <button
                      className={styles.selectAppButton}
                      onClick={() => setShowAppSelection(true)}
                    >
                      Выбрать приложение
                    </button>
                  </div>
                )
              )}
            </AnimatePresence>

            {currentApp && (
              <motion.div
                className={styles.helpSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className={styles.helpCard}>
                  <div className={styles.helpIcon}>❓</div>
                  <div className={styles.helpContent}>
                    <h3>Нужна помощь?</h3>
                    <p>
                      Если у вас возникли сложности с настройкой, наша служба
                      поддержки готова помочь вам 24/7
                    </p>
                    <div className={styles.helpActions}>
                      <a
                        href="https://t.me/guardtunnel_support"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.helpButton}
                      >
                        Telegram поддержка
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Компонент-обертка с Suspense
const InstructionPage: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <InstructionContent />
    </Suspense>
  );
};

export default InstructionPage;
