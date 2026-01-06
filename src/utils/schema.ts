export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Guard Tunnel VPN",
  url: "https://gt-vpn.ru",
  logo: "https://gt-vpn.ru/logo_vpn.svg",
  description:
    "Быстрый и безопасный VPN сервис, на протоколе xRay, позволяющий обходить белые списки, Guard Tunnel VPN, подключись уже сегодня",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "",
    contactType: "Customer Support",
    availableLanguage: ["Russian", "English"],
    url: "https://t.me/guardtunnel_support",
  },
  sameAs: ["https://t.me/GuardTunnel_bot", "https://t.me/guardtunnel_support"],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Guard Tunnel VPN",
  url: "https://gt-vpn.ru",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://gt-vpn.ru/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export const serviceSchema = {
  provider: {
    "@type": "Organization",
    name: "Guard Tunnel VPN",
    url: "https://gt-vpm.ru",
  },
  areaServed: {
    "@type": "Country",
    name: "Worldwide",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "VPN Plans",
    itemListElement: [
      {
        "@type": "Offer",
        name: "1 месяц",
        price: "100",
        priceCurrency: "RUB",
        url: "https://gt-vpn.ru/#pricing",
      },
      {
        "@type": "Offer",
        name: "3 месяца",
        price: "270",
        priceCurrency: "RUB",
        url: "https://gt-vpn.ru/#pricing",
      },
      {
        "@type": "Offer",
        name: "6 месяцев",
        price: "500",
        priceCurrency: "RUB",
        url: "https://gt-vpn.ru/#pricing",
      },
      {
        "@type": "Offer",
        name: "12 месяцев",
        price: "900",
        priceCurrency: "RUB",
        url: "https://gt-vpn.ru/#pricing",
      },
    ],
  },
};

export const breadcrumbSchema = (items: { name: string; url?: string }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  };
};

export const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Как настроить Guard Tunnel VPN",
  description: "Пошаговая инструкция по настройке VPN на различных устройствах",
  step: [
    {
      "@type": "HowToStep",
      name: "Регистрация",
      text: "Откройте Telegram бот @GuardTunnel_bot и нажмите 'Старт'",
    },
    {
      "@type": "HowToStep",
      name: "Выбор тарифа",
      text: "Выберите подходящий тарифный план и оплатите подписку",
    },
    {
      "@type": "HowToStep",
      name: "Получение конфигурации",
      text: "Получите конфигурационный файл или ключ подключения",
    },
    {
      "@type": "HowToStep",
      name: "Установка приложения",
      text: "Скачайте и установите рекомендованное приложение для вашего устройства",
    },
    {
      "@type": "HowToStep",
      name: "Подключение",
      text: "Импортируйте конфигурацию и подключитесь к VPN",
    },
  ],
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Guard Tunnel VPN Client",
  operatingSystem: "Windows, macOS, Linux, Android, iOS",
  applicationCategory: "SecurityApplication",
};
