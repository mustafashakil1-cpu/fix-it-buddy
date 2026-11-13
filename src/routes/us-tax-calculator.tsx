import { createFileRoute } from "@tanstack/react-router";
import UsTaxCalculatorPage from "@/pages/UsTaxCalculatorPage";

const title = "US Income Tax Calculator 2026 — Federal, FICA & State | TaxSaathi";
const description =
  "Estimate your 2026 US federal income tax, Social Security and Medicare, and state income tax by filing status. Free, instant, no signup.";

export const Route = createFileRoute("/us-tax-calculator")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://taxsaathi.site/us-tax-calculator" },
    ],
    links: [{ rel: "canonical", href: "https://taxsaathi.site/us-tax-calculator" }],
  }),
  component: UsTaxCalculatorPage,
});
