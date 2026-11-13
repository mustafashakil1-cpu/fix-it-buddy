import { Link } from '@tanstack/react-router';
import NewsletterSignup from '@/components/NewsletterSignup';
import AdSlot from '@/components/AdSlot';

const tools = [
  {
    to: '/tax-calculator',
    icon: '🇵🇰',
    title: 'Pakistan Salary Tax Calculator',
    desc: 'Enter your monthly or annual salary and instantly see your income tax and net take-home pay for Tax Year 2027.',
    cta: 'Calculate Pakistan Tax',
  },
  {
    to: '/us-tax-calculator',
    icon: '🇺🇸',
    title: 'US Income Tax Calculator',
    desc: 'Federal tax, Social Security, Medicare and state income tax for tax year 2026 — by filing status.',
    cta: 'Calculate US Tax',
  },
  {
    to: '/india-tax-calculator',
    icon: '🇮🇳',
    title: 'India Income Tax Calculator',
    desc: 'Compare New vs Old Regime tax for FY 2025-26 with the ₹75,000 standard deduction and 87A rebate.',
    cta: 'Calculate India Tax',
  },
  {
    to: '/pta-tax-calculator',
    icon: '📱',
    title: 'PTA Mobile Tax Checker',
    desc: "Check how much PTA tax you'll pay to register your phone on CNIC or Passport.",
    cta: 'Check PTA Tax',
  },
  {
    to: '/payroll',
    icon: '🧾',
    title: 'Payroll & Payslips',
    desc: "Add your employees, calculate each one's tax and net salary, and print payslips — free.",
    cta: 'Run Your Payroll',
  },
  {
    to: '/invoice-generator',
    icon: '📄',
    title: 'Invoice Generator',
    desc: 'Create professional invoices with automatic tax calculation for your clients.',
    cta: 'Create an Invoice',
  },
  {
    to: '/quotation-generator',
    icon: '📋',
    title: 'Quotation Generator',
    desc: 'Send formal price quotations to customers, with validity dates and terms.',
    cta: 'Create a Quotation',
  },
  {
    to: '/articles',
    icon: '📰',
    title: 'Articles & Guides',
    desc: 'Read simple guides on tax, PTA registration, and running a small business.',
    cta: 'Read Articles',
  },
];

const services = [
  { to: '/company-registration', title: 'Company & Firm Registration' },
  { to: '/tax-appeal', title: 'Tax Appeal & Litigation' },
  { to: '/legal-drafting', title: 'Legal Drafting' },
];

function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <section className="mb-14 rounded-3xl bg-green-900 px-6 py-12 lg:py-14 text-white text-center">
        <div>
        <span className="inline-block rounded-full border border-green-600 px-3 py-1 text-xs font-bold uppercase tracking-widest text-green-400">
          Free • No sign-up
        </span>
        <h1 className="text-4xl sm:text-6xl font-bold mt-5 mb-4 leading-[1.15]">
          Free Tax, Payroll & Business Tools for{' '}
          <span className="inline-block -rotate-1 rounded-xl bg-pop px-3 text-pop-foreground">Pakistan, the USA &amp; India</span> <span aria-hidden>💸</span>
        </h1>
        <p className="text-green-300 text-lg max-w-2xl mx-auto">
          Work out Pakistani salary tax, US federal, payroll and state tax, or compare India’s
          New and Old Tax Regimes. Check PTA mobile duty, run payroll, and generate invoices,
          quotations and payslips — all in one place.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            to="/tax-calculator"
            className="rounded-md bg-green-600 hover:bg-red-800 px-5 py-2.5 text-sm font-semibold transition-colors"
          >
            🇵🇰 Pakistan Tax
          </Link>
          <Link
            to="/us-tax-calculator"
            className="rounded-md bg-white/10 hover:bg-white/20 px-5 py-2.5 text-sm font-semibold transition-colors"
          >
            🇺🇸 US Tax
          </Link>
          <Link
            to="/india-tax-calculator"
            className="rounded-md bg-white/10 hover:bg-white/20 px-5 py-2.5 text-sm font-semibold transition-colors"
          >
            🇮🇳 India Tax
          </Link>
          <Link
            to="/invoice-generator"
            className="rounded-md border border-green-700 px-5 py-2.5 text-sm font-semibold hover:border-green-600 transition-colors"
          >
            Create an Invoice
          </Link>
        </div>
        </div>
      </section>


      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.to}
            to={tool.to}
            className="block pop-card bg-card p-6"
          >
            <div className="text-3xl mb-3">{tool.icon}</div>
            <h2 className="text-lg font-bold text-green-900 dark:text-white mb-2">{tool.title}</h2>
            <p className="text-green-700 dark:text-green-300 text-sm mb-3">{tool.desc}</p>
            <span className="text-green-600 dark:text-green-400 font-semibold text-sm">{tool.cta} →</span>
          </Link>
        ))}
      </section>

      <div className="mt-10">
        <AdSlot />
      </div>

      <section className="mt-14 pop-panel bg-card p-8">
        <h2 className="text-xl font-bold text-green-900 dark:text-white mb-1">Need Professional Help?</h2>
        <p className="text-green-700 dark:text-green-300 text-sm mb-4">
          Beyond our free tools, our team also assists with:
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {services.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="rounded-xl border border-green-200 dark:border-slate-600 px-4 py-3 text-sm font-medium text-green-800 dark:text-green-200 hover:bg-green-50 dark:hover:bg-slate-700 transition-colors"
            >
              {s.title} →
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-green-900 dark:bg-slate-800 rounded-2xl p-8">
        <NewsletterSignup variant="dark" />
      </section>
    </div>
  );
}

export default HomePage;
