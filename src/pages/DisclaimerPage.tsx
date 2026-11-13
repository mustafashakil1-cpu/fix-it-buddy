import { Link } from '@tanstack/react-router';

function DisclaimerPage() {
  return (
    <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-10 text-green-900 dark:text-green-100">
      <h1 className="text-2xl md:text-3xl font-bold">Disclaimer</h1>
      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
        Last updated: {new Date().getFullYear()}
      </p>

      <div className="mt-6 space-y-5 text-green-800 dark:text-green-200 leading-relaxed">
        <section>
          <h2 className="font-semibold text-lg text-green-900 dark:text-white">General information only</h2>
          <p>
            TaxSaathi publishes free calculators, document generators and educational articles about
            taxation, payroll and business compliance in Pakistan and the United States. Everything
            on this website is provided for general information and educational purposes only. It is
            not tax, legal, accounting or financial advice, and it does not create a professional or
            client relationship between you and TaxSaathi.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg text-green-900 dark:text-white">No guarantee of accuracy</h2>
          <p>
            Pakistan tax rules change through Finance Acts and notices from the Federal Board of
            Revenue (FBR), Pakistan Telecommunication Authority (PTA) and Securities and Exchange
            Commission of Pakistan (SECP). US federal and state rules change through legislation and
            releases from the Internal Revenue Service (IRS), US Treasury, Social Security
            Administration (SSA) and state revenue agencies. We update our tools after announced
            changes, but calculator results remain estimates.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg text-green-900 dark:text-white">Always verify before acting</h2>
          <p>
            Before filing a return, paying a liability, registering a business or acting on anything
            you read here, confirm Pakistan guidance with FBR, PTA or SECP and US guidance with the
            IRS, SSA or the relevant state revenue agency. Consult a qualified tax practitioner,
            accountant or lawyer for advice about your circumstances. TaxSaathi is not responsible
            for any loss, penalty or liability arising from reliance on this website.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg text-green-900 dark:text-white">How we write and review content</h2>
          <p>
            Articles are written and reviewed in-house by the TaxSaathi editorial team using primary
            sources. Pakistan coverage uses the Income Tax Ordinance, Finance Act and official FBR,
            PTA and SECP publications. US coverage uses IRS and Treasury releases, SSA figures and
            state revenue agencies. Our <Link to="/resources" className="underline">Tax Resources page</Link>{' '}
            provides direct official links. Articles carry a publication date so you can judge how
            current they are. If you spot an error, tell us through our{' '}
            <Link to="/contact" className="underline">contact page</Link> and we will correct it.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg text-green-900 dark:text-white">External links and advertising</h2>
          <p>
            This site links to government portals and other third-party websites. We do not control
            their content and are not responsible for it. This site is supported by advertising;
            adverts are supplied by third parties and do not constitute an endorsement by us. See
            our <Link to="/privacy-policy" className="underline">Privacy Policy</Link> for how
            advertising cookies are used.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg text-green-900 dark:text-white">Paid services</h2>
          <p>
            TaxSaathi provides full registration and compliance services for Pakistan entities. For US LLCs and US agreements, our professional assistance is limited to educational roadmaps, drafting support, and document review to help you prepare for filing through a licensed US agent or attorney. No engagement exists until scope and fees are agreed in writing.
          </p>
        </section>
      </div>
    </div>
  );
}

export default DisclaimerPage;
