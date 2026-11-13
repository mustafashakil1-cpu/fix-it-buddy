import { Link, useParams } from '@tanstack/react-router';
import { getArticleBySlug } from '@/data/articles';
import AdSlot from '@/components/AdSlot';
import { getArticleTags } from '@/lib/articleTags';
import { ArticleToolCta, RelatedArticles, readingMinutes } from '@/components/ArticleExtras';

function ArticleDetailPage() {
  const { slug } = useParams({ from: '/articles/$slug' });
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-10 text-center">
        <p className="text-green-800 dark:text-green-200">Article not found.</p>
        <Link to="/articles" search={{ page: 1 }} className="text-green-700 dark:text-green-300 underline mt-2 inline-block">
          Back to Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-10">
      <Link to="/articles" search={{ page: 1 }} className="text-sm text-green-700 dark:text-green-300 hover:underline">
        ← Back to Blog
      </Link>
      <span className="block text-xs font-semibold uppercase tracking-wide text-green-600 dark:text-green-400 mt-4">
        {article.category}
      </span>
      <h1 className="text-2xl md:text-3xl font-bold text-green-900 dark:text-green-100 mt-1">{article.title}</h1>
      <p className="text-xs text-green-500 mt-2">
        Published{' '}
        {new Date(article.date).toLocaleDateString('en-PK', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}{' '}
        · {readingMinutes(article)} min read · Written and reviewed by the TaxSaathi Editorial Team
      </p>

      <div className="mt-4 flex flex-wrap gap-2" aria-label="Topics">
        {getArticleTags(article).map((t) => (
          <span key={t} className="rounded-full bg-green-100 dark:bg-slate-800 px-3 py-1 text-xs font-medium text-green-800 dark:text-green-200">
            #{t}
          </span>
        ))}
      </div>

      <div className="mt-6 space-y-4 text-green-800 dark:text-green-200 leading-relaxed">
        {article.content.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <ArticleToolCta article={article} />


      <div className="mt-10 pop-panel bg-card p-5 text-sm">
        <p className="font-bold text-green-900 dark:text-white">About the TaxSaathi Editorial Team</p>
        <p className="text-green-700 dark:text-green-300 mt-2">
          Our guides are written in-house and revised whenever the rules change. For Pakistan, we
          use the Income Tax Ordinance, Finance Act, FBR, PTA and SECP publications. For the United
          States, we use IRS and US Treasury releases, Social Security Administration figures and
          the relevant state revenue agency. For India, our references include the Central Board
          of Direct Taxes (CBDT), Income Tax Department circulars and notifications, and the
          official income-tax e-Filing portal. See the official links on our{' '}
          <Link to="/resources" className="underline">
            Tax Resources page
          </Link>
          . Our articles are general guidance, not personal tax advice; see our{' '}
          <Link to="/disclaimer" className="underline">
            disclaimer
          </Link>
          . Spotted something out of date?{' '}
          <Link to="/contact" className="underline">
            Tell us
          </Link>
          .
        </p>
      </div>

      <RelatedArticles article={article} />

      <div className="mt-8">
        <AdSlot />
      </div>
    </div>
  );
}

export default ArticleDetailPage;
