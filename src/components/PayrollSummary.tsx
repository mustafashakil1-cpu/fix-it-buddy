import type { PayrollSummaryTotals } from '@/lib/payrollCalculator';
import { formatMoney, type CurrencyCode, type SupportedCountry } from '@/lib/currency';

interface Props {
  summary: PayrollSummaryTotals;
  country: SupportedCountry;
  currency: CurrencyCode;
}

function PayrollSummary({ summary, country, currency }: Props) {
  return (
    <div className="pop-panel bg-card p-5">
      <h3 className="text-base font-bold text-green-900 mb-3">
        Payroll Summary ({summary.employeeCount} employee{summary.employeeCount !== 1 ? 's' : ''})
      </h3>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-xs text-green-600 mb-1">Total Gross</p>
          <p className="font-bold text-green-900 text-sm">{formatMoney(summary.totalGross, currency)}</p>
        </div>
        <div>
          <p className="text-xs text-green-600 mb-1">Total Tax</p>
          <p className="font-bold text-red-600 text-sm">{formatMoney(summary.totalTax, currency)}</p>
        </div>
        <div>
          <p className="text-xs text-green-600 mb-1">Total Net</p>
          <p className="font-bold text-green-900 text-sm">{formatMoney(summary.totalNet, currency)}</p>
        </div>
      </div>
    </div>
  );
}

export default PayrollSummary;
