import { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup/SchemaMarkup";
import { breadcrumbSchema, howToSchema } from "@/utils/schema";
import InstructionWhitelistPage from "@/components/InstructionWhitelistPage/InstructionWhitelistPage";

export const metadata: Metadata = {
  title: "Инструкция по обходу белых списков",
  description:
    "Подробная инструкция по настройке VPN для обхода белых списков в России. Приложения v2Box, Happ, v2RayTun для Android и iOS.",
  keywords:
    "обход белых списков, белый список сайтов, VPN обход ограничений, v2Box, Happ, v2RayTun, настройка VPN Android, настройка VPN iOS",
  openGraph: {
    title: "Обход белых списков - Инструкция | Guard Tunnel VPN",
    description:
      "Настройте VPN для обхода белых списков за 2 минуты. Работает на Android и iOS.",
    images: ["/og-whitelist.jpg"],
  },
  alternates: {
    canonical: "https://gt-vpn.ru/instruction-whitelist",
  },
};

export default function Instruction() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Главная", url: "https://gt-vpn.ru" },
    {
      name: "Инструкции",
      url: "https://gt-vpn.ru/instruction-whitelist",
    },
  ]);

  return (
    <>
      <SchemaMarkup schema={breadcrumbs} />
      <SchemaMarkup schema={howToSchema} />
      <InstructionWhitelistPage />
    </>
  );
}