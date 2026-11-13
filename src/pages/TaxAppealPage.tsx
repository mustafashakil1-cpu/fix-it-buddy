import LeadCaptureForm from '@/components/LeadCaptureForm';
import PageGuide from '@/components/PageGuide';
import { taxAppealGuide } from '@/data/pageGuides';

function TaxAppealPage() {
  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-green-900 dark:text-green-100">
        Tax Appeal & Litigation Assistance
      </h1>
      <p className="text-green-700 dark:text-green-300 mt-2">
        Received a tax notice or an unfavorable assessment order from FBR? We help individuals and
        businesses respond, appeal, and represent their case.
      </p>

      <div className="mt-6 grid md:grid-cols-2 gap-6 [&>*]:min-w-0">
        <div className="space-y-4">
          <div className="pop-panel bg-card p-5">
            <h2 className="font-semibold text-green-900 dark:text-white">Notice Response</h2>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              Drafting replies to FBR notices under the Income Tax Ordinance / Sales Tax Act.
            </p>
          </div>
          <div className="pop-panel bg-card p-5">
            <h2 className="font-semibold text-green-900 dark:text-white">Appeals (Commissioner / ATIR)</h2>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              Filing and pursuing appeals before the Commissioner Inland Revenue (Appeals) and the
              Appellate Tribunal Inland Revenue.
            </p>
          </div>
          <div className="pop-panel bg-card p-5">
            <h2 className="font-semibold text-green-900 dark:text-white">Litigation Support</h2>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              Coordination with tax lawyers for High Court references where required.
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-green-900 dark:text-white mb-2">Describe Your Case</h2>
          <LeadCaptureForm
            category="tax_appeal"
            fields={[
              { name: 'name', label: 'Full Name', required: true },
              { name: 'email', label: 'Email', type: 'email', required: true },
              { name: 'phone', label: 'Phone Number', type: 'tel' },
              { name: 'noticeType', label: 'Type of Notice / Order Received' },
              { name: 'details', label: 'Briefly describe your situation', type: 'textarea', required: true },
            ]}
            submitLabel="Request Consultation"
          />
        </div>
      </div>

      <PageGuide guide={taxAppealGuide} />
    </div>
  );
}

export default TaxAppealPage;
