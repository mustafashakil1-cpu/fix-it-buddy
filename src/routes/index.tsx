import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/pages/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TaxSaathi — Free Pakistan, USA & India Tax and Business Tools" },
      {
        name: "description",
        content:
          "Free tax tools for Pakistan, the United States and India: salary tax, US federal, FICA and state tax, India New vs Old Regime comparisons, payroll, invoices and guides.",
      },
      { property: "og:title", content: "TaxSaathi — Free Pakistan, USA & India Tax and Business Tools" },
      {
        property: "og:description",
        content:
          "Calculate Pakistan and US taxes, compare India’s New and Old Tax Regimes, check PTA mobile duty, run payroll and create invoices — free, no signup.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://taxsaathi.site/" },
    ],
    links: [{ rel: "canonical", href: "https://taxsaathi.site/" }],
  }),
  component: HomePage,
});
