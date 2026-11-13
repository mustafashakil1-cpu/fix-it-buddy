import { createFileRoute } from "@tanstack/react-router";
import ArticleDetailPage from "@/pages/ArticleDetailPage";
import { getArticleBySlug } from "@/data/articles";
import { getArticleTags } from "@/lib/articleTags";

export const Route = createFileRoute("/articles/$slug")({
  head: ({ params }) => {
    const article = getArticleBySlug(params.slug);
    if (!article) {
      return {
        meta: [
          { title: "Article not found — TaxSaathi" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${article.title} — TaxSaathi`;
    const tags = getArticleTags(article);
    const url = `https://taxsaathi.site/articles/${article.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: article.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: article.summary },
        { property: "og:type", content: "article" },
        { name: "author", content: "TaxSaathi Editorial Team" },
        { name: "keywords", content: tags.join(", ") },
        { property: "article:section", content: article.category },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: article.summary },
        { property: "article:published_time", content: article.date },
        { property: "og:url", content: `https://taxsaathi.site/articles/${article.slug}` },
      ],
      links: [{ rel: "canonical", href: `https://taxsaathi.site/articles/${article.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.summary,
            datePublished: article.date,
            dateModified: article.date,
            articleSection: article.category,
            keywords: tags.join(", "),
            inLanguage: "en",
            author: { "@type": "Organization", name: "TaxSaathi Editorial Team" },
            publisher: { "@type": "Organization", name: "TaxSaathi" },
            mainEntityOfPage: `https://taxsaathi.site/articles/${article.slug}`,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://taxsaathi.site/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://taxsaathi.site/articles" },
              { "@type": "ListItem", position: 3, name: article.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: ArticleDetailPage,
});
