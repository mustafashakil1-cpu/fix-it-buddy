import { createFileRoute } from "@tanstack/react-router";
import CompanyRegistrationPage from "@/pages/CompanyRegistrationPage";

export const Route = createFileRoute("/company-registration")({
  head: () => ({
    meta: [
      { title: "Pakistan Company & US LLC Registration Guide — TaxSaathi" },
      { name: "description", content: "Compare Pakistan company registration and US LLC formation, including SECP, registered agents, EINs, operating agreements, tax choices, and annual compliance." },
      { property: "og:title", content: "Pakistan Company & US LLC Registration Guide — TaxSaathi" },
      { property: "og:description", content: "Understand Pakistan business registration and the essential steps, terms, and state-specific obligations for forming a US LLC." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://taxsaathi.site/company-registration" },
    ],
    links: [{ rel: "canonical", href: "https://taxsaathi.site/company-registration" }],
  }),
  component: CompanyRegistrationPage,
});
