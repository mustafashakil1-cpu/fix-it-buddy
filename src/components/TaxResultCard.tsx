import type { TaxResult } from '@/types/tax';

function formatPKR(value: number): string {
  return `Rs ${Math.round(value).toLocaleString('en-PK')}`;
}

interface Props {
  result: TaxResult;
}

function TaxResultCard({ result }: Props) {
  return (
    <div className="pop-panel bg-card p-6">
      <h3 className="text-lg font-bold text-green-900 mb-4">Your Tax Breakdown</h3>
      <dl className="space-y-3 text-sm">
        <Row label="Gross Annual Income" value={formatPKR(result.grossAnnual)} />
        <Row label="Gross Monthly Income" value={formatPKR(result.grossMonthly)} />
        <Row label="Taxable Annual Income" value={formatPKR(result.taxableAnnual)} />
        <Row label="Annual Tax Payable" value={formatPKR(result.taxAnnual)} highlight />
        <Row label="Monthly Tax Deduction" value={formatPKR(result.taxMonthly)} highlight />
        <Row label="Effective Tax Rate" value={`${result.effectiveRate.toFixed(2)}%`} />
        <div className="border-t border-green-100 pt-3">
          <Row label="Net Annual Take-Home" value={formatPKR(result.netAnnual)} bold />
          <Row label="Net Monthly Take-Home" value={formatPKR(result.netMonthly)} bold />
        </div>
      </dl>
    </div>
  );
}

function Row({
  label,
  value,
  highlight,
  bold,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  bold?: boolean;
}) {
  return (
    <div className="flex justify-between items-center">
      <dt className="text-green-700">{label}</dt>
      <dd
        className={
          bold
            ? 'font-bold text-green-900 text-base'
            : highlight
            ? 'font-semibold text-red-600'
            : 'font-medium text-green-900'
        }
      >
        {value}
      </dd>
    </div>
  );
}

export default TaxResultCard;
