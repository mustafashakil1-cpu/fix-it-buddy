import { createFileRoute } from "@tanstack/react-router";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Privacy Policy — Cookies, Ads & Your Data | TaxSaathi" },
      { name: "description", content: "How TaxSaathi collects, uses and protects your information, including cookies, analytics, advertising partners and your choices." },
      { property: "og:title", content: "Privacy Policy — TaxSaathi" },
      { property: "og:description", content: "What data TaxSaathi collects, how cookies and adverts work, and the choices you have." },
      { property: "og:url", content: "https://taxsaathi.site/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "https://taxsaathi.site/privacy-policy" }],
  }),
  component: PrivacyPolicyPage,
});
