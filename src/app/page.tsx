import HeroSection from "@/components/HeroSection/HeroSection";
import Features from "@/components/Features/Features";
import Pricing from "@/components/Pricing/Pricing";
import Apps from "@/components/Apps/Apps";
import GiftPopup from "@/components/GiftPopup/GiftPopup";
import SchemaMarkup from "@/components/SchemaMarkup/SchemaMarkup";
import {
  organizationSchema,
  websiteSchema,
  serviceSchema,
  softwareApplicationSchema,
} from "@/utils/schema";

export default function Home() {
  return (
    <>
      <SchemaMarkup schema={organizationSchema} />
      <SchemaMarkup schema={websiteSchema} />
      <SchemaMarkup schema={serviceSchema} />
      <SchemaMarkup schema={softwareApplicationSchema} />
      <main>
        <HeroSection />
        <Features />
        <Pricing />
        <Apps />
      </main>

      <GiftPopup telegramBotUrl="https://t.me/GuardTunnel_bot" />
    </>
  );
}
