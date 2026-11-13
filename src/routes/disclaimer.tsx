import { createFileRoute } from "@tanstack/react-router";
import DisclaimerPage from "@/pages/DisclaimerPage";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — TaxSaathi Tax & Payroll Tools" },
      {
        name: "description",
        content:
          "TaxSaathi calculators and articles are general guidance on Pakistani tax, not professional advice. How we source, review and update our content.",
      },
      { property: "og:title", content: "Disclaimer — TaxSaathi Tax & Payroll Tools" },
      {
        property: "og:description",
        content:
          "TaxSaathi calculators and articles are general guidance on Pakistani tax, not professional advice.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://taxsaathi.site/disclaimer" },
    ],
    links: [{ rel: "canonical", href: "https://taxsaathi.site/disclaimer" }],
  }),
  component: DisclaimerPage,
});
