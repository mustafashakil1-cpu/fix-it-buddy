import { createFileRoute } from "@tanstack/react-router";
import PayslipGeneratorPage from "@/pages/PayslipGeneratorPage";

export const Route = createFileRoute("/payslip-generator")({
  head: () => ({
    meta: [
      { title: "Free Pakistan & US Payslip Generator — your chosen currency | TaxSaathi" },
      { name: "description", content: "Create Pakistan or US payslips in your chosen currency with a company logo, itemised earnings and deductions, plus country-specific automatic tax estimates." },
      { property: "og:title", content: "Free Payslip Generator — TaxSaathi" },
      { property: "og:description", content: "Build professional Pakistan or US payslips with your chosen currency amounts and country-specific tax estimates." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://taxsaathi.site/payslip-generator" },
    ],
    links: [{ rel: "canonical", href: "https://taxsaathi.site/payslip-generator" }],
  }),
  component: PayslipGeneratorPage,
});
