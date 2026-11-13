import { InvoiceData } from '@/types/document';
import { createEmptyLineItem } from '@/lib/invoiceCalculator';
import LogoUpload from '@/components/LogoUpload';
import CurrencySelect from '@/components/CurrencySelect';

interface InvoiceFormProps {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

const inputClass =
  'mt-1 w-full min-w-0 rounded-md border border-green-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500';

function InvoiceForm({ data, onChange }: InvoiceFormProps) {
  function update<K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) {
    onChange({ ...data, [key]: value });
  }

  function updateItem(id: string, field: 'description' | 'quantity' | 'unitPrice', value: string) {
    onChange({
      ...data,
      items: data.items.map((item) =>
        item.id === id
          ? { ...item, [field]: field === 'description' ? value : Number(value) || 0 }
          : item,
      ),
    });
  }

  function addItem() {
    onChange({ ...data, items: [...data.items, createEmptyLineItem()] });
  }

  function removeItem(id: string) {
    onChange({ ...data, items: data.items.filter((item) => item.id !== id) });
  }

  return (
    <div className="pop-panel bg-card p-4 sm:p-6 space-y-5">
      <CurrencySelect value={data.currency ?? 'PKR'} onChange={(currency) => update('currency', currency)} />
      <LogoUpload value={data.logoDataUrl} onChange={(v) => update('logoDataUrl', v)} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-green-900 dark:text-green-100">Invoice #</span>
          <input className={inputClass} value={data.documentNumber} onChange={(e) => update('documentNumber', e.target.value)} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-green-900 dark:text-green-100">Date</span>
          <input type="date" className={inputClass} value={data.date} onChange={(e) => update('date', e.target.value)} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-green-900 dark:text-green-100">Due Date</span>
          <input type="date" className={inputClass} value={data.dueDate} onChange={(e) => update('dueDate', e.target.value)} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-green-900 dark:text-green-100">Tax Rate (%)</span>
          <input type="number" className={inputClass} value={data.taxRatePercent} onChange={(e) => update('taxRatePercent', Number(e.target.value) || 0)} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="min-w-0 space-y-2">
          <p className="text-sm font-semibold text-green-900 dark:text-white">From (Your Business)</p>
          <input className={inputClass} placeholder="Business Name" value={data.fromName} onChange={(e) => update('fromName', e.target.value)} />
          <input className={inputClass} placeholder="Address" value={data.fromAddress} onChange={(e) => update('fromAddress', e.target.value)} />
          <input className={inputClass} placeholder="Phone / Email" value={data.fromContact} onChange={(e) => update('fromContact', e.target.value)} />
        </div>
        <div className="min-w-0 space-y-2">
          <p className="text-sm font-semibold text-green-900 dark:text-white">Bill To (Client)</p>
          <input className={inputClass} placeholder="Client Name" value={data.toName} onChange={(e) => update('toName', e.target.value)} />
          <input className={inputClass} placeholder="Address" value={data.toAddress} onChange={(e) => update('toAddress', e.target.value)} />
          <input className={inputClass} placeholder="Phone / Email" value={data.toContact} onChange={(e) => update('toContact', e.target.value)} />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-green-900 dark:text-white">Line Items</p>
          <button type="button" onClick={addItem} className="text-sm text-green-700 dark:text-green-300 font-medium hover:underline">
            + Add Item
          </button>
        </div>
        <div className="mt-2 space-y-2">
          {data.items.map((item) => (
            <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
              <input
                className={`${inputClass} col-span-12 sm:col-span-6 mt-0`}
                placeholder="Description"
                value={item.description}
                onChange={(e) => updateItem(item.id, 'description', e.target.value)}
              />
              <input
                type="number"
                className={`${inputClass} col-span-4 sm:col-span-2 mt-0`}
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
              />
              <input
                type="number"
                className={`${inputClass} col-span-6 sm:col-span-3 mt-0`}
                placeholder="Unit Price"
                value={item.unitPrice}
                onChange={(e) => updateItem(item.id, 'unitPrice', e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="col-span-2 sm:col-span-1 text-red-500 hover:text-red-700 text-sm"
                aria-label="Remove item"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-green-900 dark:text-green-100">Notes</span>
        <textarea className={inputClass} rows={3} value={data.notes} onChange={(e) => update('notes', e.target.value)} />
      </label>
    </div>
  );
}

export default InvoiceForm;
