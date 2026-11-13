import { createFileRoute } from "@tanstack/react-router";
import IndiaTaxCalculatorPage from "@/pages/IndiaTaxCalculatorPage";

const title = "India Income Tax Calculator FY 2025-26 — New vs Old Regime | TaxSaathi";
const description =
  "Compare New and Old Regime income tax for FY 2025-26 (AY 2026-27) with the ₹75,000 standard deduction, 87A rebate, 80C, 80D and HRA. Free and instant.";

export const Route = createFileRoute("/india-tax-calculator")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://taxsaathi.site/india-tax-calculator" },
    ],
    links: [{ rel: "canonical", href: "https://taxsaathi.site/india-tax-calculator" }],
  }),
  component: IndiaTaxCalculatorPage,
});
