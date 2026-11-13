import { createFileRoute } from "@tanstack/react-router";
import ArticlesPage from "@/pages/ArticlesPage";

export const Route = createFileRoute("/articles/")({
  validateSearch: (search: Record<string, unknown>) => ({
    page: Math.max(1, Number(search['page']) || 1),
  }),
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Blog — Pakistan Tax & PTA Guides | TaxSaathi" },
      { name: "description", content: "Guides on Pakistan taxation, FBR filing, sales tax, freelancer tax, payroll and PTA mobile registration, written in plain language." },
      { property: "og:title", content: "Blog — Pakistan Tax & PTA Guides" },
      { property: "og:description", content: "Practical guides on tax filing, FBR, sales tax, payroll and PTA mobile registration in Pakistan." },
      { property: "og:url", content: "https://taxsaathi.site/articles" },
    ],
    links: [{ rel: "canonical", href: "https://taxsaathi.site/articles" }],
  }),
  component: ArticlesPage,
});
