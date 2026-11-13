import { createFileRoute } from "@tanstack/react-router";
import LegalDraftingPage from "@/pages/LegalDraftingPage";

export const Route = createFileRoute("/legal-drafting")({
  head: () => ({
    meta: [
      { title: "Pakistan & US Agreement and Contract Drafting — TaxSaathi" },
      { name: "description", content: "Request agreements for Pakistan or the United States, including leases, partnership and LLC operating agreements, NDAs, service, contractor, and employment contracts." },
      { property: "og:title", content: "Legal Drafting Services — TaxSaathi" },
      { property: "og:description", content: "Country- and jurisdiction-aware agreement guidance for Pakistan and US businesses and individuals." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://taxsaathi.site/legal-drafting" },
    ],
    links: [{ rel: "canonical", href: "https://taxsaathi.site/legal-drafting" }],
  }),
  component: LegalDraftingPage,
});
