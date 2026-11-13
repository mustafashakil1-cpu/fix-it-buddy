import type { Payslip } from '@/types/tax';
import { formatMoney, type CurrencyCode, type SupportedCountry } from '@/lib/currency';

interface Props {
  payslip: Payslip;
  companyName?: string;
  companyAddress?: string;
  logoDataUrl?: string;
  country: SupportedCountry;
  currency: CurrencyCode;
  onClose: () => void;
}

function PayslipView({ payslip, companyName, companyAddress, logoDataUrl, country, currency, onClose }: Props) {
  const { employee, grossMonthly, taxMonthly, federalTaxMonthly, socialSecurityMonthly, medicareMonthly, stateTaxMonthly, netMonthly } = payslip;
  const now = new Date();
  const period = now.toLocaleDateString('en-PK', { month: 'long', year: 'numeric' });

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4 print:hidden">
        <button
          onClick={onClose}
          className="text-sm font-medium text-green-700 hover:underline"
        >
          ← Back to payroll
        </button>
        <button
          onClick={() => window.print()}
          className="bg-green-600 hover:bg-red-800 text-white text-sm font-semibold px-4 py-2 rounded-lg"
        >
          Print / Download
        </button>
      </div>

      <div
        id="printable-document"
        className="rounded-2xl border border-green-200 bg-white p-8 shadow-sm print:shadow-none print:border-none"
      >
        <div className="text-center mb-6 border-b border-green-100 pb-4">
          {logoDataUrl && <img src={logoDataUrl} alt={`${companyName || 'Company'} logo`} className="mx-auto mb-2 h-16 w-auto max-w-40 object-contain" />}
          <h2 className="text-xl font-bold text-green-900">
            {companyName?.trim() || 'Your Company Name'}
          </h2>
          {companyAddress?.trim() && (
            <p className="text-xs text-green-600 mt-0.5">{companyAddress}</p>
          )}
          <p className="text-sm text-green-600">Payslip for {period}</p>
        </div>

        <div className="grid grid-cols-2 gap-y-2 text-sm mb-6">
          <span className="text-green-600">Employee Name</span>
          <span className="text-right font-medium text-green-900">{employee.name}</span>
          <span className="text-green-600">Designation</span>
          <span className="text-right font-medium text-green-900">{employee.designation}</span>
        </div>

        <div className="space-y-2 text-sm border-t border-green-100 pt-4">
          <Row label="Basic Salary" value={formatMoney(employee.basicSalary, currency)} />
          <Row label="Allowances" value={formatMoney(employee.allowances, currency)} />
          <Row label="Gross Salary" value={formatMoney(grossMonthly, currency)} bold />
          {country === 'US' && currency === 'USD' ? (
            <>
              <Row label="Federal Income Tax (estimate)" value={`- ${formatMoney(federalTaxMonthly ?? 0, currency)}`} negative />
              <Row label="Social Security" value={`- ${formatMoney(socialSecurityMonthly ?? 0, currency)}`} negative />
              <Row label="Medicare" value={`- ${formatMoney(medicareMonthly ?? 0, currency)}`} negative />
              <Row label="State Income Tax (estimate)" value={`- ${formatMoney(stateTaxMonthly ?? 0, currency)}`} negative />
            </>
          ) : (
            <Row label={currency === (country === 'US' ? 'USD' : 'PKR') ? 'Income Tax' : 'Income Tax (manual)'} value={`- ${formatMoney(taxMonthly, currency)}`} negative />
          )}
          <Row label="Other Deductions" value={`- ${formatMoney(employee.deductions, currency)}`} negative />
          <div className="border-t border-green-100 pt-2">
            <Row label="Net Pay" value={formatMoney(netMonthly, currency)} bold large />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-8 text-xs text-green-700">
          <div className="border-t border-green-300 pt-2 text-center">Employee Signature</div>
          <div className="border-t border-green-300 pt-2 text-center">
            Authorised Signatory (HR / Accounts)
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  negative,
  large,
}: {
  label: string;
  value: string;
  bold?: boolean;
  negative?: boolean;
  large?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-green-700">{label}</span>
      <span
        className={`${bold ? 'font-bold' : 'font-medium'} ${
          negative ? 'text-red-600' : 'text-green-900'
        } ${large ? 'text-base' : ''}`}
      >
        {value}
      </span>
    </div>
  );
}

export default PayslipView;
