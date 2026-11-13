import { createFileRoute } from "@tanstack/react-router";
import ContactUsPage from "@/pages/ContactUsPage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact TaxSaathi — Tax & Payroll Support" },
      { name: "description", content: "Questions about our Pakistan tax calculators, payroll tools or professional services? Send us a message and we will get back to you." },
      { property: "og:title", content: "Contact TaxSaathi" },
      { property: "og:description", content: "Send us your question about tax calculators, payroll tools or professional tax services." },
      { property: "og:url", content: "https://taxsaathi.site/contact" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://taxsaathi.site/contact" }],
  }),
  component: ContactUsPage,
});
