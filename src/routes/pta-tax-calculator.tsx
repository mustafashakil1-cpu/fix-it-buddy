import { createFileRoute } from "@tanstack/react-router";
import PtaTaxCalculatorPage from "@/pages/PtaTaxCalculatorPage";

export const Route = createFileRoute("/pta-tax-calculator")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "PTA Mobile Tax Checker — Phone Registration Duty | TaxSaathi" },
      { name: "description", content: "Check PTA mobile registration tax for any phone on CNIC or Passport, with the duty breakdown for popular models in Pakistan." },
      { property: "og:title", content: "PTA Mobile Tax Checker — TaxSaathi" },
      { property: "og:description", content: "Find out how much PTA registration duty your phone needs on CNIC or Passport before you buy or import." },
      { property: "og:url", content: "https://taxsaathi.site/pta-tax-calculator" },
    ],
    links: [{ rel: "canonical", href: "https://taxsaathi.site/pta-tax-calculator" }],
  }),
  component: PtaTaxCalculatorPage,
});
