import { createFileRoute } from "@tanstack/react-router";
import QuotationGeneratorPage from "@/pages/QuotationGeneratorPage";

export const Route = createFileRoute("/quotation-generator")({
  head: () => ({
    meta: [
      { title: "Free Quotation Generator for Businesses — TaxSaathi" },
      { name: "description", content: "Send formal price quotations in your chosen currency with your logo, validity dates, taxes and terms. Free for businesses and freelancers worldwide." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Free Quotation Generator — TaxSaathi" },
      { property: "og:description", content: "Create branded price quotations with validity dates, taxes and terms in minutes." },
      { property: "og:url", content: "https://taxsaathi.site/quotation-generator" },
    ],
    links: [{ rel: "canonical", href: "https://taxsaathi.site/quotation-generator" }],
  }),
  component: QuotationGeneratorPage,
});
