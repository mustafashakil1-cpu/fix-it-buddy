import { useState } from 'react';
import QuotationForm from '@/components/QuotationForm';
import QuotationView from '@/components/QuotationView';
import { QuotationData } from '@/types/document';
import { createEmptyLineItem } from '@/lib/invoiceCalculator';
import PageGuide from '@/components/PageGuide';
import { quotationGuide } from '@/data/pageGuides';

function createInitialQuotation(): QuotationData {
  return {
    documentNumber: 'QUO-001',
    date: new Date().toISOString().slice(0, 10),
    validUntil: '',
    fromName: '',
    fromAddress: '',
    fromContact: '',
    toName: '',
    toAddress: '',
    toContact: '',
    items: [createEmptyLineItem()],
    taxRatePercent: 17,
    terms: 'Prices are valid until the date mentioned above.',
    notes: '',
  };
}

function QuotationGeneratorPage() {
  const [data, setData] = useState<QuotationData>(createInitialQuotation);

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-10">
      <div className="flex items-center justify-between flex-wrap gap-3 print:hidden">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-green-900 dark:text-green-100">Quotation Generator</h1>
          <p className="text-green-700 dark:text-green-300 mt-1">
            Create a formal price quotation for your customers, with tax included.
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="bg-green-600 hover:bg-red-800 text-white font-semibold px-4 py-2 rounded-md transition-colors"
        >
          Print / Download PDF
        </button>
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-6 [&>*]:min-w-0">
        <div className="print:hidden">
          <QuotationForm data={data} onChange={setData} />
        </div>
        <QuotationView data={data} />
      </div>

      <PageGuide guide={quotationGuide} />
    </div>
  );
}

export default QuotationGeneratorPage;
