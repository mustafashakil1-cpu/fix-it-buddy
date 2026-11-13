import { createFileRoute } from "@tanstack/react-router";
import ResourcesPage from "@/pages/ResourcesPage";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Official Tax Resources — FBR, IRS & India CBDT | TaxSaathi" },
      {
        name: "description",
        content:
          "Official Pakistan, US and India tax references: FBR, IRS, CBDT, Income Tax Department and e-Filing links, plus expert commentary and filing guidance.",
      },
      {
        property: "og:title",
        content: "Official Tax Resources — FBR, IRS & India CBDT | TaxSaathi",
      },
      {
        property: "og:description",
        content:
          "Find authoritative Pakistan, US and India tax sources, including CBDT circulars and Income Tax Department guidance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://taxsaathi.site/resources" },
    ],
    links: [{ rel: "canonical", href: "https://taxsaathi.site/resources" }],
  }),
  component: ResourcesPage,
});
