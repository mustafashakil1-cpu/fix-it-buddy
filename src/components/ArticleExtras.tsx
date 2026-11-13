import { Link } from '@tanstack/react-router';
import { articles } from '@/data/articles';
import type { Article } from '@/types/article';

type Tool = { to: string; label: string; blurb: string };

const TOOLS: Record<string, Tool> = {
  us: { to: '/us-tax-calculator', label: 'US Federal Tax Calculator', blurb: 'Estimate your 2026 federal, FICA and state tax in a minute.' },
  in: { to: '/india-tax-calculator', label: 'India Income Tax Calculator', blurb: 'Compare New vs Old Regime tax for FY 2025-26.' },
  pk: { to: '/tax-calculator', label: 'Pakistan Income Tax Calculator', blurb: 'Work out your Tax Year 2027 salary tax using the latest FBR bands.' },
  pta: { to: '/pta-tax-calculator', label: 'PTA Mobile Tax Calculator', blurb: 'Check the PTA tax on an imported phone before you register it.' },
  payroll: { to: '/payslip-generator', label: 'Payslip Generator', blurb: 'Create a professional payslip with allowances and deductions.' },
  business: { to: '/invoice-generator', label: 'Invoice Generator', blurb: 'Make a clean, printable invoice for your clients for free.' },
};

function pickTool(a: Article): Tool {
  const text = `${a.category} ${a.title}`.toLowerCase();
  if (a.category === 'US Taxes') return TOOLS.us;
  if (a.category === 'India Taxes') return TOOLS.in;
  if (text.includes('pta') || text.includes('phone') || text.includes('mobile')) return TOOLS.pta;
  if (text.includes('payroll') || text.includes('payslip') || text.includes('eobi') || text.includes('provident')) return TOOLS.payroll;
  if (text.includes('invoice') || text.includes('freelanc') || a.category === 'Business Tax') return TOOLS.business;
  return TOOLS.pk;
}

export function readingMinutes(a: Article) {
  const words = a.content.join(' ').split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function ArticleToolCta({ article }: { article: Article }) {
  const tool = pickTool(article);
  return (
    <div className="mt-8 rounded-2xl border-2 border-green-600 bg-white dark:bg-slate-800 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-green-600 dark:text-green-400">Try the free tool</p>
        <p className="font-bold text-green-900 dark:text-white mt-1">{tool.label}</p>
        <p className="text-sm text-green-700 dark:text-green-300 mt-1">{tool.blurb}</p>
      </div>
      <Link
        to={tool.to}
        className="shrink-0 rounded-md bg-green-600 hover:bg-red-800 px-5 py-2.5 text-sm font-semibold text-white text-center transition-colors"
      >
        Open calculator →
      </Link>
    </div>
  );
}

export function RelatedArticles({ article }: { article: Article }) {
  const same = articles.filter((a) => a.slug !== article.slug && a.category === article.category);
  const others = articles.filter((a) => a.slug !== article.slug && a.category !== article.category);
  const list = [...same, ...others].slice(0, 4);
  if (!list.length) return null;
  return (
    <section className="mt-10">
      <h2 className="text-lg font-bold text-green-900 dark:text-white">Keep reading</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {list.map((a) => (
          <Link
            key={a.slug}
            to="/articles/$slug"
            params={{ slug: a.slug }}
            className="block pop-card bg-card p-4"
          >
            <span className="text-[11px] font-semibold uppercase tracking-wide text-green-600 dark:text-green-400">
              {a.category} · {readingMinutes(a)} min read
            </span>
            <p className="font-semibold text-green-900 dark:text-white mt-1 leading-snug">{a.title}</p>
            <p className="text-xs text-green-700 dark:text-green-300 mt-1 line-clamp-2">{a.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
