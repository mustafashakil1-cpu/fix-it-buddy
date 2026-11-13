import { createFileRoute } from "@tanstack/react-router";
import EditorialStandardsPage from "@/pages/EditorialStandardsPage";

export const Route = createFileRoute("/editorial-standards")({
  head: () => ({
    meta: [
      { title: "Editorial Standards — How TaxSaathi Researches & Updates Its Tax Content" },
      {
        name: "description",
        content:
          "TaxSaathi’s editorial policy, official FBR, IRS and India CBDT sources, calculator testing, content reviews and corrections process.",
      },
      {
        property: "og:title",
        content: "Editorial Standards — How TaxSaathi Researches & Updates Its Tax Content",
      },
      {
        property: "og:description",
        content:
          "Our sources, review schedule, calculator testing and corrections policy for Pakistan, US and India tax content.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://taxsaathi.site/editorial-standards" },
    ],
    links: [{ rel: "canonical", href: "https://taxsaathi.site/editorial-standards" }],
  }),
  component: EditorialStandardsPage,
});
