import { useMemo, useState } from 'react';
import PageGuide from '@/components/PageGuide';
import { usTaxGuide } from '@/data/pageGuides';
import {
  FILING_STATUS_LABELS,
  STANDARD_DEDUCTION,
  STATES,
  US_TAX_YEAR,
  calculateUsTax,
  formatUsd,
  type FilingStatus,
  type UsTaxInput,
} from '@/lib/usTax';

const inputClass =
  'w-full min-w-0 rounded-md border border-green-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-green-900 dark:text-green-100 focus:border-green-600 focus:outline-none';
const labelClass = 'block text-xs font-semibold uppercase tracking-wide text-green-700 dark:text-green-300 mb-1';

const filingOrder: FilingStatus[] = ['single', 'married_joint', 'married_separate', 'head_of_household'];

function UsTaxCalculatorPage() {
  const [form, setForm] = useState<UsTaxInput>({
    wages: 85000,
    selfEmployment: 0,
    otherIncome: 0,
    filingStatus: 'single',
    useStandardDeduction: true,
    itemisedDeductions: 0,
    pretaxContributions: 0,
    credits: 0,
    stateCode: 'TX',
  });

  const result = useMemo(() => calculateUsTax(form), [form]);

  function num(value: string): number {
    const n = Number(value.replace(/[^0-9.]/g, ''));
    return Number.isFinite(n) ? n : 0;
  }

  const rows: { label: string; value: string; strong?: boolean; muted?: boolean }[] = [
    { label: 'Total income', value: formatUsd(result.grossIncome) },
    { label: 'Adjusted gross income (AGI)', value: formatUsd(result.adjustedGrossIncome) },
    { label: result.deductionType, value: `− ${formatUsd(result.deductionUsed)}`, muted: true },
    { label: 'Federal taxable income', value: formatUsd(result.federalTaxableIncome) },
    { label: 'Federal income tax', value: formatUsd(result.federalTax), strong: true },
    { label: 'Social Security (6.2%)', value: formatUsd(result.socialSecurity) },
    { label: 'Medicare (1.45%)', value: formatUsd(result.medicare) },
  ];
  if (result.additionalMedicare > 0) {
    rows.push({ label: 'Additional Medicare (0.9%)', value: formatUsd(result.additionalMedicare) });
  }
  if (result.selfEmploymentTax > 0) {
    rows.push({ label: 'Self-employment tax', value: formatUsd(result.selfEmploymentTax) });
  }
  rows.push({ label: `State tax — ${result.stateName}`, value: formatUsd(result.stateTax) });

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600">United States</p>
        <h1 className="mt-2 text-2xl font-extrabold text-green-900 dark:text-green-100 sm:text-3xl">
          US Income Tax Calculator {US_TAX_YEAR}
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-green-700 dark:text-green-300">
          Federal income tax, Social Security and Medicare, plus an estimate of your state income
          tax — for tax year {US_TAX_YEAR} (returns filed in {US_TAX_YEAR + 1}). Free, instant, and
          nothing is stored.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 [&>*]:min-w-0">
        <div className="pop-panel bg-card sm:p-6">
          <h2 className="mb-4 text-lg font-bold text-green-900 dark:text-green-100">Your details</h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="min-w-0">
              <label className={labelClass} htmlFor="filing">Filing status</label>
              <select
                id="filing"
                className={inputClass}
                value={form.filingStatus}
                onChange={(e) => setForm({ ...form, filingStatus: e.target.value as FilingStatus })}
              >
                {filingOrder.map((s) => (
                  <option key={s} value={s}>{FILING_STATUS_LABELS[s]}</option>
                ))}
              </select>
            </div>
            <div className="min-w-0">
              <label className={labelClass} htmlFor="state">State</label>
              <select
                id="state"
                className={inputClass}
                value={form.stateCode}
                onChange={(e) => setForm({ ...form, stateCode: e.target.value })}
              >
                {STATES.map((s) => (
                  <option key={s.code} value={s.code}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="min-w-0">
              <label className={labelClass} htmlFor="wages">Wages / salary (W-2)</label>
              <input
                id="wages"
                className={inputClass}
                inputMode="numeric"
                value={form.wages || ''}
                onChange={(e) => setForm({ ...form, wages: num(e.target.value) })}
              />
            </div>
            <div className="min-w-0">
              <label className={labelClass} htmlFor="se">Self-employment profit (1099)</label>
              <input
                id="se"
                className={inputClass}
                inputMode="numeric"
                value={form.selfEmployment || ''}
                onChange={(e) => setForm({ ...form, selfEmployment: num(e.target.value) })}
              />
            </div>
            <div className="min-w-0">
              <label className={labelClass} htmlFor="other">Other income</label>
              <input
                id="other"
                className={inputClass}
                inputMode="numeric"
                value={form.otherIncome || ''}
                onChange={(e) => setForm({ ...form, otherIncome: num(e.target.value) })}
              />
            </div>
            <div className="min-w-0">
              <label className={labelClass} htmlFor="pretax">401(k) / HSA contributions</label>
              <input
                id="pretax"
                className={inputClass}
                inputMode="numeric"
                value={form.pretaxContributions || ''}
                onChange={(e) => setForm({ ...form, pretaxContributions: num(e.target.value) })}
              />
            </div>
            <div className="min-w-0">
              <label className={labelClass} htmlFor="credits">Tax credits</label>
              <input
                id="credits"
                className={inputClass}
                inputMode="numeric"
                value={form.credits || ''}
                onChange={(e) => setForm({ ...form, credits: num(e.target.value) })}
              />
            </div>
            <div className="min-w-0">
              <label className={labelClass} htmlFor="deduction">Deduction</label>
              <select
                id="deduction"
                className={inputClass}
                value={form.useStandardDeduction ? 'standard' : 'itemised'}
                onChange={(e) =>
                  setForm({ ...form, useStandardDeduction: e.target.value === 'standard' })
                }
              >
                <option value="standard">
                  Standard — {formatUsd(STANDARD_DEDUCTION[form.filingStatus])}
                </option>
                <option value="itemised">Itemise instead</option>
              </select>
            </div>
            {!form.useStandardDeduction && (
              <div className="min-w-0 sm:col-span-2">
                <label className={labelClass} htmlFor="itemised">Total itemised deductions</label>
                <input
                  id="itemised"
                  className={inputClass}
                  inputMode="numeric"
                  value={form.itemisedDeductions || ''}
                  onChange={(e) => setForm({ ...form, itemisedDeductions: num(e.target.value) })}
                />
              </div>
            )}
          </div>

          <p className="mt-4 text-xs text-green-600 dark:text-green-400">
            Figures update as you type. State results are estimates and exclude city and county
            income taxes.
          </p>
        </div>

        <div className="pop-panel bg-card sm:p-6">
          <h2 className="mb-4 text-lg font-bold text-green-900 dark:text-green-100">Your estimate</h2>

          <div className="rounded-xl bg-green-950 p-4 text-white">
            <p className="text-xs uppercase tracking-widest text-green-300">Estimated take-home pay</p>
            <p className="mt-1 text-2xl font-extrabold sm:text-3xl">{formatUsd(result.takeHome)}</p>
            <p className="mt-1 text-sm text-green-200">
              {formatUsd(result.monthlyTakeHome)} per month · {result.effectiveRate.toFixed(1)}%
              effective rate · {result.marginalRate.toFixed(0)}% top federal bracket
            </p>
          </div>

          <dl className="mt-4 divide-y divide-green-100 dark:divide-slate-700">
            {rows.map((r) => (
              <div key={r.label} className="flex items-baseline justify-between gap-3 py-2">
                <dt
                  className={`min-w-0 text-sm ${
                    r.muted
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-green-800 dark:text-green-300'
                  }`}
                >
                  {r.label}
                </dt>
                <dd
                  className={`shrink-0 text-sm tabular-nums ${
                    r.strong
                      ? 'font-bold text-green-900 dark:text-green-100'
                      : 'text-green-900 dark:text-green-200'
                  }`}
                >
                  {r.value}
                </dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-3 py-3">
              <dt className="text-sm font-bold text-green-900 dark:text-green-100">Total tax</dt>
              <dd className="shrink-0 text-base font-extrabold tabular-nums text-green-600">
                {formatUsd(result.totalTax)}
              </dd>
            </div>
          </dl>

          {result.stateNote && (
            <p className="mt-2 text-xs text-green-600 dark:text-green-400">{result.stateNote}</p>
          )}

          {result.bracketBreakdown.length > 0 && (
            <div className="mt-5">
              <h3 className="text-sm font-bold text-green-900 dark:text-green-100">
                How the federal tax is built up
              </h3>
              <div className="mt-2 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                <table className="w-full min-w-[320px] text-left text-xs">
                  <thead>
                    <tr className="text-green-700 dark:text-green-300">
                      <th className="py-1 pr-2 font-semibold">Rate</th>
                      <th className="py-1 pr-2 font-semibold">Income in band</th>
                      <th className="py-1 font-semibold text-right">Tax</th>
                    </tr>
                  </thead>
                  <tbody className="text-green-800 dark:text-green-300">
                    {result.bracketBreakdown.map((b) => (
                      <tr key={b.rate} className="border-t border-green-100 dark:border-slate-700">
                        <td className="py-1.5 pr-2">{(b.rate * 100).toFixed(0)}%</td>
                        <td className="py-1.5 pr-2 tabular-nums">{formatUsd(b.taxable)}</td>
                        <td className="py-1.5 text-right tabular-nums">{formatUsd(b.tax)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <PageGuide guide={usTaxGuide} />
    </div>
  );
}

export default UsTaxCalculatorPage;
