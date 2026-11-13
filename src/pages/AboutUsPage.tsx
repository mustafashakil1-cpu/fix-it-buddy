import { Link } from '@tanstack/react-router';

const points = [
  {
    title: 'Free, always',
    body: 'Every calculator and generator on TaxSaathi is free to use, with no sign-up and no hidden limits.',
  },
  {
    title: 'Built for Pakistan & the US',
    body: 'Our tools follow current FBR rules and PTA bands alongside US federal, payroll, and selected state tax rules.',
  },
  {
    title: 'Your data stays yours',
    body: 'Calculators run in your browser. Figures you type are never uploaded to our servers.',
  },
];

const tools = [
  {
    title: 'Pakistan & US Tax Calculators',
    body: 'Estimate Pakistan salary tax or US federal, Social Security, Medicare, and selected state income taxes using clearly identified tax years.',
  },
  {
    title: 'PTA Mobile Tax Checker',
    body: 'Estimate PTA registration duty for an imported handset on both CNIC and Passport, based on the phone value band.',
  },
  {
    title: 'Payroll & Payslip Generator',
    body: 'Run payroll in PKR or USD, use Pakistan or US employee tax estimates, add allowances and deductions, and print professional payslips.',
  },
  {
    title: 'Invoice & Quotation Generator',
    body: 'Add your company logo, line items, and tax, then print or save a clean document you can send to a client the same day.',
  },
];

const values = [
  {
    title: 'Plain language first',
    body: 'Tax rules are written for specialists. We explain Pakistan and US concepts for employees, freelancers, and business owners with practical examples.',
  },
  {
    title: 'Kept current',
    body: 'When Pakistan or US tax rules, thresholds, payroll limits, or PTA bands change, we review the calculators and supporting guides.',
  },
  {
    title: 'No account, no clutter',
    body: 'You should not have to sign up, install an app, or sit through a sales call to answer a simple question about your own money.',
  },
  {
    title: 'Honest about limits',
    body: 'Our results are careful estimates for planning. For a filing, an assessment, or a dispute, talk to a professional — we will tell you when that is the right call.',
  },
];

function AboutUsPage() {
  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
      <span className="inline-block text-xs font-bold uppercase tracking-widest text-green-600">About Us</span>
      <h1 className="text-3xl md:text-4xl font-extrabold text-green-900 dark:text-green-100 mt-2">
        Practical tax and business tools for Pakistan and the United States
      </h1>
      <p className="text-green-700 dark:text-green-300 mt-4 leading-relaxed">
        TaxSaathi serves salaried people, freelancers, and small business owners in Pakistan and the
        United States who need a clear starting point. Estimate country-specific tax, run payroll in
        PKR or USD, and create payslips, invoices, or quotations in a few clicks.
      </p>
      <p className="text-green-700 dark:text-green-300 mt-4 leading-relaxed">
        The idea came from an ordinary problem shared across borders: people open a payslip and cannot
        tell how the deductions were calculated. In Pakistan, that may mean understanding FBR salary
        slabs or PTA registration duty. In the US, it may mean separating federal income tax from
        Social Security, Medicare, and state tax. Small businesses in both countries also need clear
        documents without complicated software.
      </p>
      <p className="text-green-700 dark:text-green-300 mt-4 leading-relaxed">
        So we built one place that answers those questions in seconds, and paired it with a growing
        library of guides on Pakistan and US income tax, filing, withholding, payroll, freelancing,
        business formation, and personal finance. Country labels and source notes show which rules
        apply. Everything is free, works on a phone, and asks nothing beyond the figures you enter.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {points.map((p) => (
          <div
            key={p.title}
            className="pop-panel bg-card p-5"
          >
            <h2 className="font-bold text-green-900 dark:text-white">{p.title}</h2>
            <p className="text-sm text-green-700 dark:text-green-300 mt-2">{p.body}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mt-12">What you can do here</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {tools.map((t) => (
          <div
            key={t.title}
            className="pop-panel bg-card p-5"
          >
            <h3 className="font-bold text-green-900 dark:text-white">{t.title}</h3>
            <p className="text-sm text-green-700 dark:text-green-300 mt-2">{t.body}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mt-12">How we work</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {values.map((v) => (
          <div
            key={v.title}
            className="pop-panel bg-card p-5"
          >
            <h3 className="font-bold text-green-900 dark:text-white">{v.title}</h3>
            <p className="text-sm text-green-700 dark:text-green-300 mt-2">{v.body}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mt-12">Who it is for</h2>
      <p className="text-green-700 dark:text-green-300 mt-3 leading-relaxed">
        Employees in Pakistan or the US checking deductions before payday. Freelancers invoicing
        international clients and setting aside tax. HR and admin staff running small-team payroll.
        Business owners preparing quotations and invoices, and first-time filers learning the system
        before using FBR IRIS or IRS filing services.
      </p>

      <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mt-12">A note on accuracy</h2>
      <p className="text-green-700 dark:text-green-300 mt-3 leading-relaxed">
        We take the numbers seriously and follow the rates currently in force, but a calculator cannot
        see your full picture — exemptions, credits, multiple income sources, or a notice already
        issued against you. Treat our results as informed guidance for planning, and confirm anything
        with material consequences before you act on it. Our guides always say what an estimate covers
        and what it leaves out.
      </p>

      <div className="mt-10 rounded-2xl bg-green-900 p-8 text-white">
        <h2 className="text-xl font-bold">Need professional help?</h2>
        <p className="text-sm text-green-100 mt-2">
          Alongside the free tools, our team accepts enquiries about company registration, tax matters,
          and legal drafting. Availability and professional coverage depend on the country and jurisdiction.
        </p>
        <Link
          to="/contact"
          className="inline-block mt-4 rounded-md bg-green-600 hover:bg-red-800 px-4 py-2 text-sm font-semibold text-white transition-colors"
        >
          Talk to us
        </Link>
      </div>
    </div>
  );
}

export default AboutUsPage;
