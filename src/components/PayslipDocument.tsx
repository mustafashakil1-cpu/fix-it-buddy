import { formatMoney, defaultCurrency, type CurrencyCode } from '@/lib/currency';

export interface PayslipLine {
  id: string;
  label: string;
  amount: number;
}

export interface PayslipData {
  country: 'PK' | 'US';
  currency?: CurrencyCode;
  companyName: string;
  companyAddress: string;
  period: string;
  employeeName: string;
  employeeId: string;
  designation: string;
  department: string;
  joiningDate: string;
  bankAccount: string;
  paymentMode: string;
  daysWorked: string;
  basicSalary: number;
  allowances: PayslipLine[];
  deductions: PayslipLine[];
  logoDataUrl?: string;
}


const ONES = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
  'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen',
];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function twoDigits(n: number): string {
  if (n < 20) return ONES[n];
  return `${TENS[Math.floor(n / 10)]}${n % 10 ? ` ${ONES[n % 10]}` : ''}`;
}

function numberToWords(n: number, southAsian = true): string {
  n = Math.floor(Math.abs(n));
  if (n === 0) return 'Zero';
  const units: [number, string][] = southAsian ? [
    [10000000, 'Crore'],
    [100000, 'Lakh'],
    [1000, 'Thousand'],
    [100, 'Hundred'],
  ] : [[1000000000000, 'Trillion'], [1000000000, 'Billion'], [1000000, 'Million'], [1000, 'Thousand'], [100, 'Hundred']];
  let out = '';
  for (const [value, name] of units) {
    if (n >= value) {
      out += `${numberToWords(Math.floor(n / value), southAsian)} ${name} `;
      n %= value;
    }
  }
  if (n > 0) out += twoDigits(n);
  return out.trim();
}

interface Props {
  data: PayslipData;
  onClose: () => void;
}

function PayslipDocument({ data, onClose }: Props) {
  const currency = data.currency ?? defaultCurrency(data.country);
  const allowances = data.allowances.filter((l) => l.label.trim() && l.amount > 0);
  const deductions = data.deductions.filter((l) => l.label.trim() && l.amount > 0);
  const totalAllowances = allowances.reduce((s, l) => s + l.amount, 0);
  const totalEarnings = data.basicSalary + totalAllowances;
  const totalDeductions = deductions.reduce((s, l) => s + l.amount, 0);
  const netPay = totalEarnings - totalDeductions;

  const rows = Math.max(allowances.length + 1, deductions.length);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4 print:hidden">
        <button onClick={onClose} className="text-sm font-medium text-green-700 hover:underline">
          ← Back to editor
        </button>
        <button
          onClick={() => window.print()}
          className="bg-green-600 hover:bg-red-800 text-white text-sm font-semibold px-4 py-2 rounded-lg"
        >
          Print / Download PDF
        </button>
      </div>

      <div
        id="printable-document"
        className="rounded-2xl border border-green-200 bg-white p-4 sm:p-8 print:p-8 shadow-sm print:shadow-none print:border-none"
      >
        <div className="text-center border-b-2 border-green-600 pb-4">
          {data.logoDataUrl && (
            <img
              src={data.logoDataUrl}
              alt={`${data.companyName || 'Company'} logo`}
              className="mx-auto mb-2 h-16 w-auto max-w-40 object-contain"
            />
          )}
          <h2 className="text-xl font-bold text-green-900">{data.companyName || 'Company Name'}</h2>
          {data.companyAddress && (
            <p className="text-xs text-green-600 mt-0.5">{data.companyAddress}</p>
          )}
          <p className="mt-2 inline-block bg-green-600 text-white text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded">
            Salary Slip — {data.period || '—'}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5 text-sm py-4 border-b border-green-100">
          <Field label="Employee Name" value={data.employeeName} />
          <Field label="Employee ID" value={data.employeeId} />
          <Field label="Designation" value={data.designation} />
          <Field label="Department" value={data.department} />
          <Field label="Date of Joining" value={data.joiningDate} />
          <Field label="Days Worked" value={data.daysWorked} />
          <Field label="Payment Mode" value={data.paymentMode} />
          <Field label="Bank / Account" value={data.bankAccount} />
        </div>

        <div className="mt-4 overflow-x-auto rounded-lg border border-green-200 print:overflow-visible">
          <table className="w-full min-w-[520px] text-sm print:min-w-0">
            <thead>
              <tr className="bg-green-50 text-green-900">
                <th className="text-left font-semibold px-3 py-2 w-1/4">Earnings</th>
                <th className="text-right font-semibold px-3 py-2 w-1/4">Amount</th>
                <th className="text-left font-semibold px-3 py-2 w-1/4 border-l border-green-200">
                  Deductions
                </th>
                <th className="text-right font-semibold px-3 py-2 w-1/4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: rows }).map((_, i) => {
                const earning = i === 0 ? { label: 'Basic Salary', amount: data.basicSalary } : allowances[i - 1];
                const deduction = deductions[i];
                return (
                  <tr key={i} className="border-t border-green-100">
                    <td className="px-3 py-1.5 text-green-800">{earning?.label ?? ''}</td>
                    <td className="px-3 py-1.5 text-right text-green-900 font-medium">
                      {earning ? formatMoney(earning.amount, currency) : ''}
                    </td>
                    <td className="px-3 py-1.5 text-green-800 border-l border-green-200">
                      {deduction?.label ?? ''}
                    </td>
                    <td className="px-3 py-1.5 text-right text-red-600 font-medium">
                      {deduction ? formatMoney(deduction.amount, currency) : ''}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-green-50 border-t border-green-200 font-bold text-green-900">
                <td className="px-3 py-2">Total Earnings</td>
                <td className="px-3 py-2 text-right">{formatMoney(totalEarnings, currency)}</td>
                <td className="px-3 py-2 border-l border-green-200">Total Deductions</td>
                <td className="px-3 py-2 text-right">{formatMoney(totalDeductions, currency)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 rounded-lg bg-green-900 text-white px-4 py-3">
          <span className="text-sm font-semibold uppercase tracking-wide">Net Pay</span>
          <span className="text-xl font-extrabold">{formatMoney(netPay, currency)}</span>
        </div>
        <p className="mt-2 text-xs text-green-700">
          Amount in words: {netPay < 0 ? 'Minus ' : ''}{numberToWords(netPay, ['PKR', 'INR', 'BDT', 'NPR', 'LKR'].includes(currency))} {currency}{(() => {
            const digits = new Intl.NumberFormat('en-GB', { style: 'currency', currency }).resolvedOptions().maximumFractionDigits ?? 2;
            const factor = 10 ** digits;
            const minor = Math.round(Math.abs(netPay) * factor) % factor;
            return minor ? ` and ${minor}/${factor}` : '';
          })()} Only
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 text-xs text-green-700 print:grid-cols-2">
          <div className="border-t border-green-300 pt-2 text-center">Employee Signature</div>
          <div className="border-t border-green-300 pt-2 text-center">
            Authorised Signatory (HR / Accounts)
          </div>
        </div>
        <p className="mt-4 text-[10px] text-center text-green-600">
          This is a computer-generated payslip and is valid without a company seal.
        </p>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-green-600">{label}</span>
      <span className="font-medium text-green-900 text-right">{value || '—'}</span>
    </div>
  );
}

export default PayslipDocument;
