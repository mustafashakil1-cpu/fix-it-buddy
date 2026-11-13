import { Link } from '@tanstack/react-router';
import { articles } from '@/data/articles';
import NewsletterSignup from '@/components/NewsletterSignup';
import AdSlot from '@/components/AdSlot';
import { getArticleTags } from '@/lib/articleTags';
import { readingMinutes } from '@/components/ArticleExtras';
import { Route } from '@/routes/articles.index';

const PER_PAGE = 5;

function ArticlesPage() {
  const { page } = Route.useSearch();
  const totalPages = Math.max(1, Math.ceil(articles.length / PER_PAGE));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * PER_PAGE;
  const pageArticles = articles.slice(start, start + PER_PAGE);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (n) => n === 1 || n === totalPages || Math.abs(n - current) <= 1,
  );

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-green-900 dark:text-green-100">Pakistan, US &amp; India Tax Guides</h1>
      <p className="text-green-700 dark:text-green-300 mt-2">
        Practical tax, PTA, and business guides to help you understand your money better.
      </p>
      <p className="text-xs text-green-600 dark:text-green-400 mt-2">
        Showing {start + 1}–{Math.min(start + PER_PAGE, articles.length)} of {articles.length} articles
      </p>

      <div className="mt-6 grid gap-4">
        {pageArticles.map((article) => (
          <Link
            key={article.slug}
            to="/articles/$slug"
            params={{ slug: article.slug }}
            className="block pop-card bg-card p-5"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-green-600 dark:text-green-400">
              {article.category}
            </span>
            <h2 className="text-lg font-bold text-green-900 dark:text-white mt-1">{article.title}</h2>
            <p className="text-green-700 dark:text-green-300 text-sm mt-1">{article.summary}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-green-500">{article.date} · {readingMinutes(article)} min read</span>
              {getArticleTags(article).slice(0, 3).map((t) => (
                <span key={t} className="rounded-full bg-green-50 dark:bg-slate-700 px-2 py-0.5 text-green-700 dark:text-green-300">
                  #{t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Blog pagination">
        <Link
          to="/articles"
          search={{ page: Math.max(1, current - 1) }}
          aria-disabled={current === 1}
          className={`rounded-md border border-green-200 dark:border-slate-700 px-3 py-2 text-sm font-medium ${
            current === 1
              ? 'pointer-events-none opacity-40 text-green-500'
              : 'text-green-800 dark:text-green-200 hover:bg-green-50 dark:hover:bg-slate-800'
          }`}
        >
          Previous
        </Link>

        {pageNumbers.map((n, i) => (
          <span key={n} className="flex items-center gap-2">
            {i > 0 && n - (pageNumbers[i - 1] as number) > 1 && (
              <span className="text-green-500 text-sm">…</span>
            )}
            <Link
              to="/articles"
              search={{ page: n }}
              aria-current={n === current ? 'page' : undefined}
              className={`rounded-md px-3 py-2 text-sm font-semibold border ${
                n === current
                  ? 'bg-green-900 text-white border-green-900'
                  : 'border-green-200 dark:border-slate-700 text-green-800 dark:text-green-200 hover:bg-green-50 dark:hover:bg-slate-800'
              }`}
            >
              {n}
            </Link>
          </span>
        ))}

        <Link
          to="/articles"
          search={{ page: Math.min(totalPages, current + 1) }}
          aria-disabled={current === totalPages}
          className={`rounded-md border border-green-200 dark:border-slate-700 px-3 py-2 text-sm font-medium ${
            current === totalPages
              ? 'pointer-events-none opacity-40 text-green-500'
              : 'text-green-800 dark:text-green-200 hover:bg-green-50 dark:hover:bg-slate-800'
          }`}
        >
          Next
        </Link>
      </nav>

      <div className="mt-8">
        <AdSlot />
      </div>

      <div className="mt-8 bg-green-900 dark:bg-slate-800 rounded-xl p-6">
        <NewsletterSignup variant="dark" />
      </div>
    </div>
  );
}

export default ArticlesPage;
