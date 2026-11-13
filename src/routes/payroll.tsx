import { createFileRoute } from "@tanstack/react-router";
import PayrollPage from "@/pages/PayrollPage";

export const Route = createFileRoute("/payroll")({
  head: () => ({
    meta: [
      { title: "Free Pakistan & US Multi-Employee Payroll — TaxSaathi" },
      { name: "description", content: "Run small-team payroll in your chosen currency with Pakistan or US federal, Social Security, Medicare, and state tax estimates, then print individual payslips." },
      { property: "og:title", content: "Free Pakistan & US Multi-Employee Payroll — TaxSaathi" },
      { property: "og:description", content: "Add employees, estimate country-specific taxes, and print branded Pakistan or US payslips." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://taxsaathi.site/payroll" },
    ],
    links: [{ rel: "canonical", href: "https://taxsaathi.site/payroll" }],
  }),
  component: PayrollPage,
});
