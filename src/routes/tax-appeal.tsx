import { createFileRoute } from "@tanstack/react-router";
import TaxAppealPage from "@/pages/TaxAppealPage";

export const Route = createFileRoute("/tax-appeal")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "FBR Tax Appeal & Litigation Support — TaxSaathi" },
      { name: "description", content: "Help with FBR notices, audits, assessment orders and appeals before the Commissioner and Appellate Tribunal in Pakistan." },
      { property: "og:title", content: "FBR Tax Appeal & Litigation Support — TaxSaathi" },
      { property: "og:description", content: "Received an FBR notice or assessment order? Get professional help with replies and appeals." },
      { property: "og:url", content: "https://taxsaathi.site/tax-appeal" },
    ],
    links: [{ rel: "canonical", href: "https://taxsaathi.site/tax-appeal" }],
  }),
  component: TaxAppealPage,
});
