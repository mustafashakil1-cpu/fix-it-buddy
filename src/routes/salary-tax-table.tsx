import { createFileRoute } from "@tanstack/react-router";
import SalaryTaxTablePage from "@/pages/SalaryTaxTablePage";

const title = "Pakistan Salary Tax Table 2026-27 & Raise Calculator | TaxSaathi";
const description =
  "Monthly income tax and take-home pay for Rs. 50,000 to Rs. 1,000,000 salaries in Tax Year 2027, plus a calculator showing how much of a raise you keep.";

export const Route = createFileRoute("/salary-tax-table")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://taxsaathi.site/salary-tax-table" },
    ],
    links: [{ rel: "canonical", href: "https://taxsaathi.site/salary-tax-table" }],
  }),
  component: SalaryTaxTablePage,
});
