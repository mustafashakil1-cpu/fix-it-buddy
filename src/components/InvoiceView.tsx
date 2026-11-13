import { InvoiceData } from '@/types/document';
import { formatMoney } from '@/lib/currency';
import { calculateDocumentTotals, calculateLineTotal } from '@/lib/invoiceCalculator';

interface InvoiceViewProps {
  data: InvoiceData;
}

function InvoiceView({ data }: InvoiceViewProps) {
  const totals = calculateDocumentTotals(data.items, data.taxRatePercent);

  return (
    <div id="printable-document" className="bg-white text-green-950 rounded-xl border border-green-100 p-5 sm:p-8 print:p-8 print:border-0 print:rounded-none">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
        <div className="flex min-w-0 items-start gap-3">
          {data.logoDataUrl && (
            <img src={data.logoDataUrl} alt={`${data.fromName || 'Company'} logo`} className="h-16 w-16 shrink-0 object-contain" />
          )}
          <div className="min-w-0">
            <h2 className="text-xl font-bold break-words">{data.fromName || 'Your Business Name'}</h2>
            <p className="text-sm text-green-700">{data.fromAddress}</p>
            <p className="text-sm text-green-700">{data.fromContact}</p>
          </div>
        </div>
        <div className="shrink-0 sm:text-right">
          <h3 className="text-2xl font-bold text-green-800">INVOICE</h3>
          <p className="text-sm text-green-600">#{data.documentNumber || '—'}</p>
          <p className="text-sm text-green-600">Date: {data.date || '—'}</p>
          <p className="text-sm text-green-600">Due: {data.dueDate || '—'}</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs uppercase text-green-500 font-semibold">Bill To</p>
        <p className="font-medium">{data.toName || 'Client Name'}</p>
        <p className="text-sm text-green-700">{data.toAddress}</p>
        <p className="text-sm text-green-700">{data.toContact}</p>
      </div>

      <div className="mt-6 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0 print:overflow-visible">
      <table className="w-full min-w-[420px] text-sm print:min-w-0">
        <thead>
          <tr className="border-b-2 border-green-800 text-left">
            <th className="py-2">Description</th>
            <th className="py-2 text-right">Qty</th>
            <th className="py-2 text-right">Unit Price</th>
            <th className="py-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item.id} className="border-b border-green-100">
              <td className="py-2">{item.description || '—'}</td>
              <td className="py-2 text-right">{item.quantity}</td>
              <td className="py-2 text-right">{formatMoney(item.unitPrice, data.currency ?? 'PKR')}</td>
              <td className="py-2 text-right">{formatMoney(calculateLineTotal(item), data.currency ?? 'PKR')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="mt-4 flex justify-end">
        <div className="w-full max-w-sm space-y-1 text-sm">
          <div className="flex justify-between gap-3">
            <span className="text-green-700">Subtotal</span>
            <span>{formatMoney(totals.subtotal, data.currency ?? 'PKR')}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-green-700">Tax ({data.taxRatePercent}%)</span>
            <span>{formatMoney(totals.taxAmount, data.currency ?? 'PKR')}</span>
          </div>
          <div className="flex justify-between gap-3 font-bold text-base border-t border-green-300 pt-1 mt-1">
            <span>Total</span>
            <span>{formatMoney(totals.total, data.currency ?? 'PKR')}</span>
          </div>
        </div>
      </div>

      {data.notes && (
        <div className="mt-6 text-sm text-green-700">
          <p className="font-semibold text-green-900">Notes</p>
          <p>{data.notes}</p>
        </div>
      )}
    </div>
  );
}

export default InvoiceView;
