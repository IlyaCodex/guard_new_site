import SchemaMarkup from "@/components/SchemaMarkup/SchemaMarkup";
import { breadcrumbSchema } from "@/utils/schema";
import PrivacyPolicy from "@/components/PrivacyPolicy/PrivacyPolicy";

export const metadata = {
  title: "Политика конфиденциальности",
  description:
    "Соглашение о конфиденциальности и использовании персональных данных Guard Tunnel VPN",
};

export default function PrivacyPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Главная", url: "https://gt-vpn.ru" },
    {
      name: "Политика конфиденциальности",
      url: "https://gt-vpn.ru/privacy",
    },
  ]);

  const privacySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Политика конфиденциальности",
    description: "Политика конфиденциальности Guard Tunnel VPN",
    url: "https://gt-vpn.ru/privacy",
    inLanguage: "ru-RU",
    isPartOf: {
      "@type": "WebSite",
      name: "Guard Tunnel VPN",
      url: "https://gt-vpn.ru",
    },
  };
 
  return (
    <>
      <SchemaMarkup schema={breadcrumbs} />
      <SchemaMarkup schema={privacySchema} />
      <PrivacyPolicy />
    </>
  );
}
