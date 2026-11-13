import { createFileRoute } from "@tanstack/react-router";
import TermsPage from "@/pages/TermsPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Terms of Service — TaxSaathi" },
      { name: "description", content: "Terms of using TaxSaathi's free Pakistan tax calculators, payroll tools and document generators, including accuracy limits and acceptable use." },
      { property: "og:title", content: "Terms of Service — TaxSaathi" },
      { property: "og:description", content: "The rules for using TaxSaathi's free tax calculators, payroll and document tools." },
      { property: "og:url", content: "https://taxsaathi.site/terms" },
    ],
    links: [{ rel: "canonical", href: "https://taxsaathi.site/terms" }],
  }),
  component: TermsPage,
});
