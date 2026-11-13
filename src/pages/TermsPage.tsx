function TermsPage() {
  return (
    <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-10 text-green-900 dark:text-green-100">
      <h1 className="text-2xl md:text-3xl font-bold">Terms of Service</h1>
      <p className="text-sm text-green-600 dark:text-green-400 mt-1">Last updated: {new Date().getFullYear()}</p>

      <div className="mt-6 space-y-5 text-green-800 dark:text-green-200 leading-relaxed">
        <section>
          <h2 className="font-semibold text-lg text-green-900 dark:text-white">1. Estimates Only</h2>
          <p>
            All Pakistan and US tax calculators, payroll tools and document generators provide
            estimates for general guidance only. They are not official filings or legal advice.
            Verify Pakistan results with FBR, PTA or SECP and US results with the IRS, SSA or the
            relevant state revenue agency, or consult a qualified professional.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-lg text-green-900 dark:text-white">2. No Liability</h2>
          <p>
            We make reasonable efforts to keep tax slabs and rates up to date, but rules change
            frequently. We are not liable for any financial, legal, or tax decisions made based on
            results from this website.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-lg text-green-900 dark:text-white">3. Service Inquiries</h2>
          <p>
            Submitting a request through our Company Registration, Tax Appeal, or Legal Drafting
            pages does not create a client relationship until confirmed separately by our team.
          </p>
        </section>
        <section>
          <h2 className="font-semibold text-lg text-green-900 dark:text-white">4. Acceptable Use</h2>
          <p>
            You agree to use this site for lawful purposes only and not to misuse, scrape, or
            disrupt the service.
          </p>
        </section>
      </div>
    </div>
  );
}

export default TermsPage;
