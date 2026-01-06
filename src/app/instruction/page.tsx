import { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup/SchemaMarkup";
import { breadcrumbSchema, howToSchema } from "@/utils/schema";
import InstructionPage from "@/components/InstructionPage/InstructionPage";

export const metadata: Metadata = {
  title: "Инструкция по подключению VPN",
  description:
    "Подробные инструкции по установке и настройке Guard Tunnel VPN на всех устройствах: Android, iOS, Windows, macOS, Linux, Smart TV",
  keywords:
    "vpn инструкция, настройка vpn, установка vpn, guard tunnel инструкция",
  openGraph: {
    title: "Инструкция по настройке | Guard Tunnel VPN",
    description:
      "Настройте VPN для обхода блокировок за 2 минуты. Работает на Android, IOS, Windows, Linux, SmartTV",
    images: ["/og-whitelist.jpg"],
  },
  alternates: {
    canonical: "https://gt-vpn.ru/instruction",
  },
};

export default function Instruction() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Главная", url: "https://gt-vpn.ru" },
    { name: "Инструкции", url: "https://gt-vpn.ru/instruction" },
  ]);

  return (
    <>
      <SchemaMarkup schema={breadcrumbs} />
      <SchemaMarkup schema={howToSchema} />
      <InstructionPage />
    </>
  );
}
