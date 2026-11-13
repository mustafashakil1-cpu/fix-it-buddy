import { useState } from 'react';
import PayslipDocument, { type PayslipData, type PayslipLine } from '@/components/PayslipDocument';
import { calculateAnnualTax } from '@/lib/taxCalculator';
import LogoUpload from '@/components/LogoUpload';
import PageGuide from '@/components/PageGuide';
import { payslipGuide } from '@/data/pageGuides';
import { calculateUsTax, FILING_STATUS_LABELS, STATES, type FilingStatus } from '@/lib/usTax';
import { formatMoney, defaultCurrency, supportsAutomaticTax, type CurrencyCode, type SupportedCountry } from '@/lib/currency';
import CurrencySelect from '@/components/CurrencySelect';

const inputClass =
  'mt-1 w-full rounded-lg border border-green-200 bg-white px-3 py-2 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400';

const smallInput =
  'w-full rounded-lg border border-green-200 bg-white px-2.5 py-1.5 text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400';

function line(label: string, amount = 0): PayslipLine {
  return { id: crypto.randomUUID(), label, amount };
}

function currentPeriod(): string {
  return new Date().toLocaleDateString('en-PK', { month: 'long', year: 'numeric' });
}

function PayslipGeneratorPage() {
  const [data, setData] = useState<PayslipData>({
    country: 'PK',
    currency: 'PKR',
    companyName: '',
    companyAddress: '',
    period: currentPeriod(),
    employeeName: '',
    employeeId: '',
    designation: '',
    department: '',
    joiningDate: '',
    bankAccount: '',
    paymentMode: 'Bank Transfer',
    daysWorked: '30',
    basicSalary: 0,
    allowances: [line('House Rent Allowance'), line('Conveyance Allowance'), line('Medical Allowance')],
    deductions: [line('Income Tax'), line('Provident Fund'), line('Loan Repayment'), line('EOBI')],
  });
  const [showPayslip, setShowPayslip] = useState(false);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [stateCode, setStateCode] = useState('OTHER');

  function set<K extends keyof PayslipData>(key: K, value: PayslipData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function changeCountry(country: SupportedCountry) {
    setData((current) => ({
      ...current,
      country,
      currency: defaultCurrency(country),
      allowances: country === 'US'
        ? [line('Bonus'), line('Overtime'), line('Commission')]
        : [line('House Rent Allowance'), line('Conveyance Allowance'), line('Medical Allowance')],
      deductions: country === 'US'
        ? [line('Federal Income Tax (estimate)'), line('Social Security'), line('Medicare'), line('State Income Tax (estimate)'), line('401(k) / Benefits')]
        : [line('Income Tax'), line('Provident Fund'), line('Loan Repayment'), line('EOBI')],
    }));
  }

  function updateLine(group: 'allowances' | 'deductions', id: string, patch: Partial<PayslipLine>) {
    setData((d) => ({
      ...d,
      [group]: d[group].map((l) => (l.id === id ? { ...l, ...patch } : l)),
    }));
  }

  function addLine(group: 'allowances' | 'deductions') {
    setData((d) => ({ ...d, [group]: [...d[group], line('')] }));
  }

  function removeLine(group: 'allowances' | 'deductions', id: string) {
    setData((d) => ({ ...d, [group]: d[group].filter((l) => l.id !== id) }));
  }

  const currency = data.currency ?? defaultCurrency(data.country);
  const automaticTax = supportsAutomaticTax(data.country, currency);

  const totalAllowances = data.allowances.reduce((s, l) => s + l.amount, 0);
  const totalEarnings = data.basicSalary + totalAllowances;
  const totalDeductions = data.deductions.reduce((s, l) => s + l.amount, 0);
  const netPay = totalEarnings - totalDeductions;

  function autoIncomeTax() {
    if (!automaticTax) return;
    if (data.country === 'US') {
      const result = calculateUsTax({
        wages: totalEarnings * 12,
        selfEmployment: 0,
        otherIncome: 0,
        filingStatus,
        useStandardDeduction: true,
        itemisedDeductions: 0,
        pretaxContributions: 0,
        credits: 0,
        stateCode,
      });
      const calculated = [
        ['Federal Income Tax (estimate)', result.federalTax / 12],
        ['Social Security', result.socialSecurity / 12],
        ['Medicare', (result.medicare + result.additionalMedicare) / 12],
        ['State Income Tax (estimate)', result.stateTax / 12],
      ] as const;
      setData((d) => {
        const labels = new Set(calculated.map(([label]) => label));
        const retained = d.deductions.filter((item) => !labels.has(item.label as (typeof calculated)[number][0]) && item.label !== 'Income Tax');
        return { ...d, deductions: [...calculated.map(([label, amount]) => line(label, Math.round(amount))), ...retained] };
      });
      return;
    }
    const monthlyTax = calculateAnnualTax(totalEarnings * 12) / 12;
    const existing = data.deductions.find((l) => l.label.toLowerCase().includes('income tax'));
    if (existing) updateLine('deductions', existing.id, { amount: Math.round(monthlyTax) });
    else setData((d) => ({ ...d, deductions: [line('Income Tax', Math.round(monthlyTax)), ...d.deductions] }));
  }

  if (showPayslip) {
    return (
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-10">
        <PayslipDocument data={data} onClose={() => setShowPayslip(false)} />
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-green-900">Payslip Generator</h1>
      <p className="text-green-700 mt-2">
         Build a Pakistan or US salary slip with itemised earnings, deductions, country-specific tax estimates, and your company logo.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setShowPayslip(true);
        }}
        className="mt-6 space-y-6"
      >
        <section className="pop-panel bg-card p-6">
          <h2 className="text-lg font-bold text-green-900 mb-4">Company & Pay Period</h2>
           <label className="block mb-4">
             <span className="text-sm font-semibold text-green-900">Tax Country</span>
             <select
               className={inputClass}
               value={data.country}
               onChange={(e) => changeCountry(e.target.value as SupportedCountry)}
             >
               <option value="PK">Pakistan</option>
               <option value="US">United States</option>
             </select>
           </label>
           <div className="mb-4"><CurrencySelect value={currency} onChange={(value) => set('currency', value)} /></div>
           {!automaticTax && <p className="mb-4 text-sm text-muted-foreground">Automatic {data.country === 'US' ? 'US' : 'Pakistan'} tax requires {defaultCurrency(data.country)}. Enter tax deductions manually for {currency}; amounts are not converted.</p>}
          <div className="mb-4">
            <LogoUpload value={data.logoDataUrl} onChange={(v) => set('logoDataUrl', v)} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-semibold text-green-900">Company Name</span>
              <input required className={inputClass} value={data.companyName} onChange={(e) => set('companyName', e.target.value)} placeholder={data.country === 'US' ? 'e.g. Acme LLC' : 'e.g. TaxSaathi (Pvt) Ltd'} />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-green-900">Company Address</span>
               <input className={inputClass} value={data.companyAddress} onChange={(e) => set('companyAddress', e.target.value)} placeholder={data.country === 'US' ? 'e.g. Austin, Texas' : 'e.g. Karachi, Pakistan'} />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-green-900">Salary Month</span>
              <input required className={inputClass} value={data.period} onChange={(e) => set('period', e.target.value)} placeholder="e.g. August 2026" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-green-900">Days Worked</span>
              <input className={inputClass} value={data.daysWorked} onChange={(e) => set('daysWorked', e.target.value)} placeholder="e.g. 26 / 30" />
            </label>
          </div>
        </section>

        <section className="pop-panel bg-card p-6">
          <h2 className="text-lg font-bold text-green-900 mb-4">Employee Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-semibold text-green-900">Employee Name</span>
              <input required className={inputClass} value={data.employeeName} onChange={(e) => set('employeeName', e.target.value)} />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-green-900">Employee ID / Code</span>
              <input className={inputClass} value={data.employeeId} onChange={(e) => set('employeeId', e.target.value)} placeholder="e.g. EMP-014" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-green-900">Designation</span>
              <input required className={inputClass} value={data.designation} onChange={(e) => set('designation', e.target.value)} />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-green-900">Department</span>
              <input className={inputClass} value={data.department} onChange={(e) => set('department', e.target.value)} placeholder="e.g. Finance" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-green-900">Date of Joining</span>
              <input className={inputClass} value={data.joiningDate} onChange={(e) => set('joiningDate', e.target.value)} placeholder="e.g. 01-Jan-2024" />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-green-900">Bank / Account No.</span>
              <input className={inputClass} value={data.bankAccount} onChange={(e) => set('bankAccount', e.target.value)} placeholder={data.country === 'US' ? 'e.g. Bank — ending 1234' : 'e.g. Meezan — 0123456789'} />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-green-900">Payment Mode</span>
              <select className={inputClass} value={data.paymentMode} onChange={(e) => set('paymentMode', e.target.value)}>
                <option>Bank Transfer</option>
                <option>Cash</option>
                <option>Cheque</option>
              </select>
            </label>
            <label className="block">
               <span className="text-sm font-semibold text-green-900">Monthly Basic Salary ({currency})</span>
              <input type="number" min="0" required className={inputClass} value={data.basicSalary || ''} onChange={(e) => set('basicSalary', Number(e.target.value) || 0)} />
            </label>
          </div>
           {data.country === 'US' && (
             <div className="mt-4 grid sm:grid-cols-2 gap-4">
               <label className="block">
                 <span className="text-sm font-semibold text-green-900">Federal Filing Status</span>
                 <select className={inputClass} value={filingStatus} onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}>
                   {Object.entries(FILING_STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                 </select>
               </label>
               <label className="block">
                 <span className="text-sm font-semibold text-green-900">Work State</span>
                 <select className={inputClass} value={stateCode} onChange={(e) => setStateCode(e.target.value)}>
                   {STATES.map((state) => <option key={state.code} value={state.code}>{state.name}</option>)}
                 </select>
               </label>
               <p className="sm:col-span-2 text-xs text-green-600">US amounts estimate federal income tax, employee Social Security, Medicare, and selected state income tax. Actual withholding may differ.</p>
             </div>
           )}
        </section>

        <div className="grid lg:grid-cols-2 gap-6 items-start [&>*]:min-w-0">
          <LineGroup
            title="Allowances / Earnings"
             hint={data.country === 'US' ? 'Bonus, overtime, commission, reimbursements…' : 'House rent, conveyance, medical, bonus, overtime…'}
            lines={data.allowances}
            total={totalAllowances}
             country={data.country} currency={currency}
            accent="text-green-900"
            onChange={(id, patch) => updateLine('allowances', id, patch)}
            onAdd={() => addLine('allowances')}
            onRemove={(id) => removeLine('allowances', id)}
          />
          <LineGroup
            title="Deductions"
             hint={data.country === 'US' ? 'Federal, FICA, state tax, 401(k), benefits…' : 'Income tax, provident fund, loan, EOBI, advance…'}
            lines={data.deductions}
            total={totalDeductions}
             country={data.country} currency={currency}
            accent="text-red-600"
            onChange={(id, patch) => updateLine('deductions', id, patch)}
            onAdd={() => addLine('deductions')}
            onRemove={(id) => removeLine('deductions', id)}
            extraAction={
              <button
                type="button"
                onClick={autoIncomeTax}
                 disabled={!automaticTax}
                className="text-xs font-semibold text-green-700 hover:underline"
              >
                 {data.country === 'US' ? 'Calculate US taxes' : 'Calculate Pakistan tax'}
              </button>
            }
          />
        </div>

        <section className="pop-panel bg-card p-6 grid sm:grid-cols-3 gap-4 text-center">
           <Stat label="Total Earnings" value={totalEarnings} country={data.country} currency={currency} />
           <Stat label="Total Deductions" value={totalDeductions} country={data.country} currency={currency} negative />
           <Stat label="Net Pay" value={netPay} country={data.country} currency={currency} bold />
        </section>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-red-800 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Generate Payslip
        </button>
      </form>

      <PageGuide guide={payslipGuide} />
    </div>
  );
}

function LineGroup({
  title,
  hint,
  lines,
  total,
  accent,
  onChange,
  onAdd,
  onRemove,
  extraAction,
  country,
  currency,
}: {
  title: string;
  hint: string;
  lines: PayslipLine[];
  total: number;
  accent: string;
  onChange: (id: string, patch: Partial<PayslipLine>) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  extraAction?: React.ReactNode;
  country: SupportedCountry;
  currency: CurrencyCode;
}) {
  return (
    <section className="pop-panel bg-card p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-green-900">{title}</h2>
          <p className="text-xs text-green-600 mt-0.5">{hint}</p>
        </div>
        {extraAction}
      </div>

      <div className="mt-4 space-y-2">
        {lines.map((l) => (
          <div key={l.id} className="flex items-center gap-2">
            <input
              className={smallInput}
              value={l.label}
              placeholder={country === 'US' ? 'Head name (e.g. 401(k))' : 'Head name (e.g. Provident Fund)'}
              onChange={(e) => onChange(l.id, { label: e.target.value })}
            />
            <input
              type="number"
              min="0"
              className={`${smallInput} max-w-28 text-right`}
              value={l.amount || ''}
              placeholder="0"
              onChange={(e) => onChange(l.id, { amount: Number(e.target.value) || 0 })}
            />
            <button
              type="button"
              aria-label={`Remove ${l.label || 'line'}`}
              onClick={() => onRemove(l.id)}
              className="text-red-600 hover:text-red-800 px-1 text-lg leading-none"
            >
              ×
            </button>
          </div>
        ))}
        {lines.length === 0 && (
          <p className="text-sm text-green-600">No items yet — add a custom head below.</p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-green-100 pt-3">
        <button type="button" onClick={onAdd} className="text-sm font-semibold text-green-700 hover:underline">
          + Add custom head
        </button>
        <span className={`text-sm font-bold ${accent}`}>
           {formatMoney(total, currency)}
        </span>
      </div>
    </section>
  );
}

function Stat({ label, value, country, currency, negative, bold }: { label: string; value: number; country: SupportedCountry; currency: CurrencyCode; negative?: boolean; bold?: boolean }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-green-600">{label}</p>
      <p className={`${bold ? 'text-2xl font-extrabold' : 'text-lg font-bold'} ${negative ? 'text-red-600' : 'text-green-900'}`}>
         {formatMoney(value, currency)}
      </p>
    </div>
  );
}

export default PayslipGeneratorPage;
