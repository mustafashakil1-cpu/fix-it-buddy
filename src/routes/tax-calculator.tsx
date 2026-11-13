import { createFileRoute } from "@tanstack/react-router";
import TaxCalculatorPage from "@/pages/TaxCalculatorPage";

export const Route = createFileRoute("/tax-calculator")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Salary Tax Calculator 2026 Pakistan — TaxSaathi" },
      { name: "description", content: "Calculate your Pakistan salary income tax, surcharge and monthly take-home pay using the latest FBR slabs. Free and instant." },
      { property: "og:title", content: "Pakistan Salary Tax Calculator — TaxSaathi" },
      { property: "og:description", content: "Enter your salary and see income tax, surcharge and net monthly take-home on the latest FBR slabs." },
      { property: "og:url", content: "https://taxsaathi.site/tax-calculator" },
    ],
    links: [{ rel: "canonical", href: "https://taxsaathi.site/tax-calculator" }],
  }),
  component: TaxCalculatorPage,
});
