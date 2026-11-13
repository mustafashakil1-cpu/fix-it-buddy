import LeadCaptureForm from '@/components/LeadCaptureForm';
import PageGuide from '@/components/PageGuide';
import { legalDraftingGuide } from '@/data/pageGuides';

function LegalDraftingPage() {
  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-green-900 dark:text-green-100">
        Legal Agreement & Contract Drafting
      </h1>
      <p className="text-green-700 dark:text-green-300 mt-2">
        Request clear agreements for Pakistan or the United States. Governing law, signing rules,
        employment terms, and enforceability are reviewed by country and state or province.
      </p>

      <div className="mt-6 grid md:grid-cols-2 gap-6 [&>*]:min-w-0">
        <div className="space-y-4">
          <div className="pop-panel bg-card p-5">
            <h2 className="font-semibold text-green-900 dark:text-white">Rent / Lease Agreements</h2>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              Residential and commercial rent agreements compliant with local tenancy laws.
            </p>
          </div>
          <div className="pop-panel bg-card p-5">
            <h2 className="font-semibold text-green-900 dark:text-white">US Business Agreements</h2>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              LLC operating agreements, NDAs, independent-contractor, vendor, employment, and commercial lease documents with a named state law.
            </p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">
              US rules vary by state. High-value, regulated, disputed, or employment matters should be reviewed by a licensed attorney in that state.
            </p>
          </div>
          <div className="pop-panel bg-card p-5">
            <h2 className="font-semibold text-green-900 dark:text-white">Partnership Deeds</h2>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              Clear profit-sharing, roles, and exit terms between business partners.
            </p>
          </div>
          <div className="pop-panel bg-card p-5">
            <h2 className="font-semibold text-green-900 dark:text-white">Service & Employment Agreements</h2>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              Freelance/vendor service contracts and employment agreements for your team.
            </p>
          </div>
        </div>

        <div>
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6 text-sm text-amber-900 dark:text-amber-200">
            <p className="font-semibold">Drafting vs. Legal Advice:</p>
            <p className="mt-1">We provide professional drafting and document review. US-specific contracts should be final-reviewed by an attorney licensed in your governing state.</p>
          </div>
          <h2 className="font-semibold text-green-900 dark:text-white mb-2">Request a Draft</h2>
          <LeadCaptureForm
            category="legal_drafting"
            fields={[
              { name: 'name', label: 'Full Name', required: true },
              { name: 'email', label: 'Email', type: 'email', required: true },
              { name: 'phone', label: 'Phone Number', type: 'tel' },
              { name: 'country', label: 'Country (Pakistan / United States)', required: true },
              { name: 'jurisdiction', label: 'Governing State / Province (e.g. Delaware, Sindh)', required: true },
              { name: 'agreementType', label: 'Agreement Type (e.g. US NDA, PK Lease)', required: true },
              { name: 'details', label: 'Any specific terms or requirements', type: 'textarea' },
            ]}
            submitLabel="Request Draft"
          />
        </div>
      </div>

      <PageGuide guide={legalDraftingGuide} />
    </div>
  );
}

export default LegalDraftingPage;
