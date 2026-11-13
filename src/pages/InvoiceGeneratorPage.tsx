import { useState } from 'react';
import InvoiceForm from '@/components/InvoiceForm';
import InvoiceView from '@/components/InvoiceView';
import { InvoiceData } from '@/types/document';
import { createEmptyLineItem } from '@/lib/invoiceCalculator';
import PageGuide from '@/components/PageGuide';
import { invoiceGuide } from '@/data/pageGuides';

function createInitialInvoice(): InvoiceData {
  return {
    documentNumber: 'INV-001',
    date: new Date().toISOString().slice(0, 10),
    dueDate: '',
    fromName: '',
    fromAddress: '',
    fromContact: '',
    toName: '',
    toAddress: '',
    toContact: '',
    items: [createEmptyLineItem()],
    taxRatePercent: 17,
    notes: 'Thank you for your business.',
  };
}

function InvoiceGeneratorPage() {
  const [data, setData] = useState<InvoiceData>(createInitialInvoice);

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-10">
      <div className="flex items-center justify-between flex-wrap gap-3 print:hidden">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-green-900 dark:text-green-100">Invoice Generator</h1>
          <p className="text-green-700 dark:text-green-300 mt-1">
            Create a professional invoice for your clients with automatic tax calculation.
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="bg-green-600 hover:bg-red-800 text-white font-semibold px-4 py-2 rounded-md transition-colors"
        >
          Print / Download PDF
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2 [&>*]:min-w-0">
        <div className="min-w-0 print:hidden">
          <InvoiceForm data={data} onChange={setData} />
        </div>
        <InvoiceView data={data} />
      </div>

      <PageGuide guide={invoiceGuide} />
    </div>
  );
}

export default InvoiceGeneratorPage;
