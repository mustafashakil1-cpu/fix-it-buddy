import { Link } from '@tanstack/react-router';

function EditorialStandardsPage() {
  return (
    <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-green-900 dark:text-green-100">
        Editorial Standards
      </h1>
      <p className="mt-3 text-green-700 dark:text-green-300 leading-relaxed">
        TaxSaathi publishes tax calculators, payroll and business document tools, and explanatory
        guides for people and small businesses in Pakistan, the United States and India. Because a wrong number can cost a
        reader money, we are explicit about where our figures come from, who writes them, and how
        often we check them. This page describes that process.
      </p>

      <h2 className="mt-8 text-xl font-bold text-green-900 dark:text-green-100">Who writes our content</h2>
      <p className="mt-3 text-green-800 dark:text-green-300 leading-relaxed">
        Everything on TaxSaathi is produced by the TaxSaathi editorial team — a small group with
        working experience in Pakistani income tax compliance, payroll administration and corporate
        registration. We deliberately publish under a team byline rather than individual names,
        because each calculator and guide passes through more than one person: one to draft the
        explanation, one to check the arithmetic and statutory references, and one to confirm the
        page still matches the current tax year before it goes live.
      </p>

      <h2 className="mt-8 text-xl font-bold text-green-900 dark:text-green-100">Sources we rely on</h2>
      <ul className="mt-3 space-y-2 text-green-800 dark:text-green-300">
        <li>
          India’s Central Board of Direct Taxes (CBDT) and Income Tax Department publications,
          the applicable Finance Act, circulars and notifications for income-tax regimes, slabs,
          deductions and rebates; the official e-Filing portal for filing guidance.
          {' '}<Link to="/resources" className="underline">View official India source links</Link>.
        </li>
        <li>
          US Internal Revenue Service (IRS), Treasury, Social Security Administration and state
          revenue agencies for federal and state tax guidance and payroll thresholds.
        </li>
        <li>
          The Income Tax Ordinance, 2001 and the Sales Tax Act, 1990, as amended by the most recent
          Finance Act, for rates, slabs, thresholds and filing obligations.
        </li>
        <li>
          Federal Board of Revenue (FBR) circulars, SROs and the IRIS portal itself for filing
          procedure, due dates and Active Taxpayer List rules.
        </li>
        <li>
          Securities and Exchange Commission of Pakistan (SECP) fee tables and eServices guidance for
          company incorporation steps and costs.
        </li>
        <li>
          Pakistan Telecommunication Authority (PTA) DIRBS notifications for mobile device
          registration duties and taxes.
        </li>
        <li>
          Provincial revenue authority rules (SRB, PRA, KPRA, BRA) where a topic touches services
          sales tax.
        </li>
      </ul>
      <p className="mt-3 text-green-800 dark:text-green-300 leading-relaxed">
        Where a figure is an estimate — for example an approximate customs value used by our PTA
        checker, or professional fees that vary by consultant — we label it as an estimate on the
        page rather than presenting it as an official rate.
      </p>

      <h2 className="mt-8 text-xl font-bold text-green-900 dark:text-green-100">How our calculators are built and tested</h2>
      <p className="mt-3 text-green-800 dark:text-green-300 leading-relaxed">
        Each calculator encodes the statutory slabs directly, including the fixed amount and the
        marginal rate for each band, and applies surcharges separately so the workings stay visible.
        Before a change to any rate goes live, we test the calculator at the boundary of every slab
        and against worked examples, so that income exactly at a threshold produces the correct
        result. Our tools run entirely in your browser: salary figures, employee records and invoice
        details are not transmitted to us or stored on our servers.
      </p>

      <h2 className="mt-8 text-xl font-bold text-green-900 dark:text-green-100">Update schedule</h2>
      <ul className="mt-3 space-y-2 text-green-800 dark:text-green-300">
        <li>
          <strong>Every budget season (June–July):</strong> we review every calculator, slab table and
          guide against the new Finance Act and republish with an updated review date.
        </li>
        <li>
          <strong>Whenever a notification lands:</strong> mid-year SROs, PTA duty revisions and SECP fee
          changes are applied as we become aware of them.
        </li>
        <li>
          <strong>Rolling review:</strong> guides that are not affected by a rate change are still
          re-read at least once a year for accuracy and clarity, and the review date on the page
          reflects the last time a human checked it.
        </li>
      </ul>

      <h2 className="mt-8 text-xl font-bold text-green-900 dark:text-green-100">Corrections</h2>
      <p className="mt-3 text-green-800 dark:text-green-300 leading-relaxed">
        If you believe a number, rate or procedure on TaxSaathi is wrong, please tell us through our{' '}
        <Link to="/contact" className="underline font-medium">
          contact page
        </Link>{' '}
        or by email at taxsaaathi@gmail.com, ideally with the page address and the source you are
        relying on. We verify reports against the primary source, correct the page, and update its
        review date. We would rather be corrected quickly than be quietly wrong.
      </p>

      <h2 className="mt-8 text-xl font-bold text-green-900 dark:text-green-100">Independence and limits</h2>
      <p className="mt-3 text-green-800 dark:text-green-300 leading-relaxed">
        Our tools are free to use and supported by advertising. Advertisers have no involvement in
        what we publish, and no guide is written or amended in exchange for payment. Equally, our
        content has limits: it explains the general rules and cannot account for your particular
        facts, exemptions, prior-year positions or pending proceedings. For a decision with real
        money attached, speak to a tax practitioner or lawyer — our{' '}
        <Link to="/disclaimer" className="underline font-medium">
          disclaimer
        </Link>{' '}
        sets this out in full.
      </p>
    </div>
  );
}

export default EditorialStandardsPage;
