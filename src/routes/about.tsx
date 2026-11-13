import { createFileRoute } from "@tanstack/react-router";
import AboutUsPage from "@/pages/AboutUsPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About TaxSaathi — Pakistan & US Tax Tools" },
      { name: "description", content: "Why TaxSaathi provides free Pakistan and US tax calculators, payroll, payslips, invoicing tools, and practical guides for people and small businesses." },
      { property: "og:title", content: "About TaxSaathi — Pakistan & US Tax Tools" },
      { property: "og:description", content: "Free Pakistan and US tax, payroll, and business document tools with country-specific guidance and official sources." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://taxsaathi.site/about" },
    ],
    links: [{ rel: "canonical", href: "https://taxsaathi.site/about" }],
  }),
  component: AboutUsPage,
});
