import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import type { Metadata } from "next";
import "./globals.css";
import SnowWrapper from "@/components/SnowWrapper/SnowWrapper";
import { SnowProvider } from "@/contexts/SnowContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://gt-vpn.ru"),
  title: {
    default: "Быстрый VPN сервис | Обход белых списков | Guard Tunnel VPN",
    template: "%s | Guard Tunnel VPN",
  },
  description:
    "Быстрый и безопасный VPN сервис на протоколе xRay. Обход белых списков, высокая скорость.Подключись уже сегодня!",
  keywords: [
    "VPN",
    "ВПН",
    "Guard Tunnel",
    "безопасность",
    "приватность",
    "анонимность",
    "шифрование",
    "обход блокировок",
    "белые списки",
    "xRay протокол",
    "VLESS",
    "Shadowsocks",
    "быстрый VPN",
    "VPN для России",
    "обход белых списков",
  ],
  authors: [{ name: "Guard Tunnel Team" }],
  creator: "Guard Tunnel",
  publisher: "Guard Tunnel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Guard Tunnel VPN - Быстрый, безопасный VPN сервис",
    description:
      "Безопасный и быстрый VPN сервис с высоким уровнем шифрования. Обход белых списков, протокол xRay, 10+ серверов по всему миру.",
    url: "https://gt-vpn.ru",
    siteName: "Guard Tunnel VPN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Guard Tunnel VPN - Быстрый и безопасный VPN сервис",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guard Tunnel VPN - Быстрый и безопасный VPN сервис",
    description: "Безопасный и быстрый VPN сервис с обходом белых списков",
    site: "@guardtunnel",
    creator: "@guardtunnel",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
      { url: "/apple-touch-icon-180x180.png", sizes: "180x180" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#e91e63",
      },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://gt-vpn.ru",
    languages: {
      "ru-RU": "https://gt-vpn.ru",
      "en-US": "https://gt-vpn.ru/en",
    },
  },
  category: "technology",
  classification: "VPN Service",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="canonical" href="https://gt-vpn.ru" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#e91e63" />
      </head>
      <body>
        <SnowProvider>
          <SnowWrapper>
            {children}
            <Header />
            <Footer />
          </SnowWrapper>
        </SnowProvider>
      </body>
    </html>
  );
}
