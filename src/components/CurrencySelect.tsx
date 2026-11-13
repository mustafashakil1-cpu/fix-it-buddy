import { CURRENCIES, isCurrencyCode, type CurrencyCode } from '@/lib/currency';

export default function CurrencySelect({ value, onChange }: {
  value: CurrencyCode;
  onChange: (currency: CurrencyCode) => void;
}) {
  return (
    <label className="block min-w-0">
      <span className="text-sm font-semibold text-foreground">Currency</span>
      <select aria-label="Currency" value={value} onChange={(event) => {
        if (isCurrencyCode(event.target.value)) onChange(event.target.value);
      }} className="mt-1 w-full min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
        {Object.entries(CURRENCIES).map(([code, name]) => <option key={code} value={code}>{code} — {name}</option>)}
      </select>
    </label>
  );
}