import { createFileRoute } from "@tanstack/react-router";
import FaqPage from "@/pages/FaqPage";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — TaxSaathi Tax & PTA Tool Questions" },
      { name: "description", content: "Answers about our salary tax calculator, PTA mobile tax checker, payroll, invoices, data privacy and professional services." },
      { property: "og:title", content: "FAQ — TaxSaathi Tax & PTA Tool Questions" },
      { property: "og:description", content: "Common questions about TaxSaathi's free Pakistan tax calculators and document generators." },
      { property: "og:url", content: "https://taxsaathi.site/faq" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://taxsaathi.site/faq" }],
  }),
  component: FaqPage,
});
