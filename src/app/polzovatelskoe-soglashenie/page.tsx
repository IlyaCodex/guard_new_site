import SchemaMarkup from "@/components/SchemaMarkup/SchemaMarkup";
import { breadcrumbSchema } from "@/utils/schema";
import UserAgreement from "@/components/UserAgreement/UserAgreement";

export const metadata = {
  title: "Пользовательское соглашение",
  description: "Условия использования сервиса Guard Tunnel VPN",
};

export default function UserAgreementPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Главная", url: "https://gt-vpn.ru" },
    {
      name: "Пользовательское соглашение",
      url: "https://gt-vpn.ru/polzovatelskoe-soglashenie",
    },
  ]);

  const termsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Пользовательское соглашение",
    description: "Условия использования сервиса Guard Tunnel VPN",
    url: "https://gt-vpn.ru/polzovatelskoe-soglashenie",
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
      <SchemaMarkup schema={termsSchema} />
      <UserAgreement />
    </>
  );
}
