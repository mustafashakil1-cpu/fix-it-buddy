import LeadCaptureForm from '@/components/LeadCaptureForm';
import PageGuide from '@/components/PageGuide';
import { companyRegistrationGuide } from '@/data/pageGuides';

function CompanyRegistrationPage() {
  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-green-900 dark:text-green-100">
        Business Registration: Pakistan & US LLCs
      </h1>
      <p className="text-green-700 dark:text-green-300 mt-2">
        Compare Pakistan business structures and learn the core steps for forming a US LLC. Rules,
        fees, and professional service availability depend on the country and state.
      </p>

      <div className="mt-6 grid md:grid-cols-2 gap-6 [&>*]:min-w-0">
        <div className="space-y-4">
          <div className="pop-panel bg-card p-5">
            <h2 className="font-semibold text-green-900 dark:text-white">Sole Proprietorship</h2>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              Simplest setup for individual business owners — NTN registration and bank account
              opening support.
            </p>
          </div>
          <div className="pop-panel bg-card p-5">
            <h2 className="font-semibold text-green-900 dark:text-white">US Limited Liability Company (LLC)</h2>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              State formation filing, registered agent, EIN, operating agreement, tax classification,
              beneficial ownership review, licences, and annual state compliance.
            </p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">
              Educational guidance only. A US attorney or tax professional should confirm your state-specific requirements.
            </p>
          </div>
          <div className="pop-panel bg-card p-5">
            <h2 className="font-semibold text-green-900 dark:text-white">Partnership Firm</h2>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              Partnership deed drafting and registration with the Registrar of Firms.
            </p>
          </div>
          <div className="pop-panel bg-card p-5">
            <h2 className="font-semibold text-green-900 dark:text-white">Private Limited Company (SECP)</h2>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              End-to-end SECP incorporation, including name reservation, memorandum & articles of
              association, and post-incorporation compliance.
            </p>
          </div>
        </div>

        <div>
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6 text-sm text-amber-900 dark:text-amber-200">
            <p className="font-semibold">Service Distinction:</p>
            <p className="mt-1">We offer full-service registration for Pakistan entities. US LLC support is provided as a roadmap and drafting service to prepare you for state filing.</p>
          </div>
          <h2 className="font-semibold text-green-900 dark:text-white mb-2">Get Started</h2>
          <LeadCaptureForm
            category="company_registration"
            fields={[
              { name: 'name', label: 'Full Name', required: true },
              { name: 'email', label: 'Email', type: 'email', required: true },
              { name: 'phone', label: 'Phone Number', type: 'tel' },
              { name: 'country', label: 'Country (Pakistan / United States)', required: true },
              { name: 'stateProvince', label: 'State / Province (e.g. Wyoming, Punjab)', required: true },
              { name: 'businessType', label: 'Structure (e.g. US LLC, PK PVT LTD)', required: true },
              { name: 'details', label: 'Tell us about your business', type: 'textarea' },
            ]}
            submitLabel="Request a Callback"
          />
        </div>
      </div>

      <PageGuide guide={companyRegistrationGuide} />
    </div>
  );
}

export default CompanyRegistrationPage;
