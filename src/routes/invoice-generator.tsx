import { createFileRoute } from "@tanstack/react-router";
import InvoiceGeneratorPage from "@/pages/InvoiceGeneratorPage";

export const Route = createFileRoute("/invoice-generator")({
  head: () => ({
    meta: [
      { title: "Free Invoice Generator with Sales Tax — TaxSaathi" },
      { name: "description", content: "Create professional invoices in your chosen currency with your company logo, sales tax and totals, then print or download as PDF." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Free Invoice Generator — TaxSaathi" },
      { property: "og:description", content: "Build branded invoices with automatic tax and totals, ready to print or send as PDF." },
      { property: "og:url", content: "https://taxsaathi.site/invoice-generator" },
    ],
    links: [{ rel: "canonical", href: "https://taxsaathi.site/invoice-generator" }],
  }),
  component: InvoiceGeneratorPage,
});
