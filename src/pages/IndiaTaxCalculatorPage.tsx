import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import IndiaReferenceCheck from '@/components/IndiaReferenceCheck';
import {
  calculateNewRegime, calculateOldRegime, formatINR,
  type AgeGroup, type IndiaTaxInput, type RegimeResult,
} from '@/lib/indiaTax';

const field = 'w-full rounded-lg border border-green-200 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-green-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400';
const label = 'block text-sm font-semibold text-green-900 dark:text-white mb-1';

function NumField({ id, text, value, onChange }: { id: string; text: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label htmlFor={id} className={label}>{text}</label>
      <input id={id} type="number" min="0" value={value} onChange={(e) => onChange(e.target.value)} className={field} />
    </div>
  );
}

function ResultCard({ title, r, best }: { title: string; r: RegimeResult; best: boolean }) {
  const rows: [string, number][] = [
    ['Gross income', r.grossIncome],
    ['Standard deduction', r.standardDeduction],
    ['Other deductions', r.deductions],
    ['Taxable income', r.taxableIncome],
    ['Tax on slabs', r.taxBeforeRebate],
    ['Section 87A rebate', r.rebate],
    ['Health & education cess (4%)', r.cess],
  ];
  return (
    <div className={`rounded-2xl border-2 p-6 bg-white dark:bg-slate-800 ${best ? 'border-green-600' : 'border-green-200 dark:border-slate-700'}`}>
      <div className="flex items-center justify-between mb-4 gap-2">
        <h3 className="text-lg font-bold text-green-900 dark:text-white">{title}</h3>
        {best && <span className="rounded-full bg-green-600 text-white text-xs font-bold px-3 py-1">Lower tax</span>}
      </div>
      <dl className="space-y-2 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3">
            <dt className="text-green-700 dark:text-green-300">{k}</dt>
            <dd className="font-medium text-green-900 dark:text-white">{formatINR(v)}</dd>
          </div>
        ))}
        <div className="flex justify-between gap-3 border-t border-green-100 dark:border-slate-700 pt-3">
          <dt className="font-bold text-green-900 dark:text-white">Total tax payable</dt>
          <dd className="font-bold text-red-600">{formatINR(r.totalTax)}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-green-700 dark:text-green-300">Monthly take-home (approx.)</dt>
          <dd className="font-semibold text-green-900 dark:text-white">{formatINR((r.grossIncome - r.totalTax) / 12)}</dd>
        </div>
      </dl>
    </div>
  );
}

export default function IndiaTaxCalculatorPage() {
  const [salary, setSalary] = useState('');
  const [other, setOther] = useState('');
  const [age, setAge] = useState<AgeGroup>('below60');
  const [salaried, setSalaried] = useState(true);
  const [c80, setC80] = useState('');
  const [d80, setD80] = useState('');
  const [hra, setHra] = useState('');
  const [otherDed, setOtherDed] = useState('');
  const [res, setRes] = useState<{ n: RegimeResult; o: RegimeResult } | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const input: IndiaTaxInput = {
      salary: Number(salary) || 0, otherIncome: Number(other) || 0, ageGroup: age, isSalaried: salaried,
      sec80C: Number(c80) || 0, sec80D: Number(d80) || 0, hraExemption: Number(hra) || 0, otherDeductions: Number(otherDed) || 0,
    };
    setRes({ n: calculateNewRegime(input), o: calculateOldRegime(input) });
  }

  const saving = res ? Math.abs(res.n.totalTax - res.o.totalTax) : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 w-full">
      <div className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-green-900 dark:text-white mb-2">India Income Tax Calculator FY 2025-26</h1>
        <p className="text-green-700 dark:text-green-300 max-w-2xl mx-auto">
          Compare your tax under the New and Old Regime for FY 2025-26 (AY 2026-27). Includes the ₹75,000 standard
          deduction, Section 87A rebate and 4% cess.
        </p>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,380px)_1fr] gap-6 items-start">
        <form onSubmit={submit} className="rounded-2xl border border-green-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 space-y-4">
          <NumField id="in-salary" text="Annual gross salary (₹)" value={salary} onChange={setSalary} />
          <NumField id="in-other" text="Other income — interest, rent etc. (₹)" value={other} onChange={setOther} />
          <div>
            <label htmlFor="in-age" className={label}>Age group</label>
            <select id="in-age" value={age} onChange={(e) => setAge(e.target.value as AgeGroup)} className={field}>
              <option value="below60">Below 60</option>
              <option value="60to80">60 to 80 (senior citizen)</option>
              <option value="above80">Above 80 (super senior)</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm text-green-900 dark:text-white">
            <input type="checkbox" checked={salaried} onChange={(e) => setSalaried(e.target.checked)} />
            I am salaried / a pensioner (standard deduction)
          </label>
          <p className="text-xs font-semibold uppercase tracking-wide text-green-600 dark:text-green-400 pt-2">Old Regime deductions only</p>
          <NumField id="in-80c" text="Section 80C — PPF, ELSS, LIC, EPF (max ₹1.5 lakh)" value={c80} onChange={setC80} />
          <NumField id="in-80d" text="Section 80D — health insurance (₹)" value={d80} onChange={setD80} />
          <NumField id="in-hra" text="HRA exemption (₹)" value={hra} onChange={setHra} />
          <NumField id="in-oth" text="Other deductions — 80CCD(1B), 24(b) etc. (₹)" value={otherDed} onChange={setOtherDed} />
          <button type="submit" className="w-full bg-green-600 hover:bg-red-800 text-white font-semibold py-3 rounded-lg transition-colors">Compare Regimes</button>
        </form>

        <div className="space-y-4">
          {res ? (
            <>
              <div className="rounded-xl bg-green-900 text-white p-4 text-sm">
                {saving < 1
                  ? 'Both regimes give the same tax for your inputs.'
                  : `The ${res.n.totalTax < res.o.totalTax ? 'New' : 'Old'} Regime saves you ${formatINR(saving)} this year.`}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <ResultCard title="New Regime" r={res.n} best={res.n.totalTax < res.o.totalTax} />
                <ResultCard title="Old Regime" r={res.o} best={res.o.totalTax < res.n.totalTax} />
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-green-200 dark:border-slate-600 p-6 text-center text-green-500 text-sm">
              Enter your income and click "Compare Regimes" to see both results side by side.
            </div>
          )}
        </div>
      </div>

      <section className="mt-12 grid md:grid-cols-2 gap-6 text-sm">
        <div className="rounded-2xl border border-green-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
          <h2 className="font-bold text-green-900 dark:text-white mb-3">New Regime slabs (FY 2025-26)</h2>
          <ul className="space-y-1 text-green-700 dark:text-green-300">
            <li>Up to ₹4,00,000 — Nil</li><li>₹4,00,001 – ₹8,00,000 — 5%</li><li>₹8,00,001 – ₹12,00,000 — 10%</li>
            <li>₹12,00,001 – ₹16,00,000 — 15%</li><li>₹16,00,001 – ₹20,00,000 — 20%</li><li>₹20,00,001 – ₹24,00,000 — 25%</li><li>Above ₹24,00,000 — 30%</li>
          </ul>
          <p className="mt-3 text-green-700 dark:text-green-300">Rebate under Section 87A makes taxable income up to ₹12 lakh tax-free (₹12.75 lakh salary after the standard deduction).</p>
        </div>
        <div className="rounded-2xl border border-green-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
          <h2 className="font-bold text-green-900 dark:text-white mb-3">Old Regime slabs (below 60)</h2>
          <ul className="space-y-1 text-green-700 dark:text-green-300">
            <li>Up to ₹2,50,000 — Nil</li><li>₹2,50,001 – ₹5,00,000 — 5%</li><li>₹5,00,001 – ₹10,00,000 — 20%</li><li>Above ₹10,00,000 — 30%</li>
          </ul>
          <p className="mt-3 text-green-700 dark:text-green-300">Exemption is ₹3 lakh for ages 60–80 and ₹5 lakh above 80. Rebate up to ₹12,500 if taxable income is ₹5 lakh or less.</p>
        </div>
      </section>

      <section className="mt-8 text-sm text-green-700 dark:text-green-300" aria-label="Official India tax sources">
        <h2 className="font-bold text-green-900 dark:text-white mb-2">Official India tax sources — CBDT</h2>
        <p>
          The Central Board of Direct Taxes (CBDT), under the Department of Revenue, Ministry of Finance,
          administers India’s direct taxes. Check the applicable Finance Act and Income Tax Department
          circulars and notifications for your assessment year before filing.
        </p>
        <ul className="mt-3 space-y-2">
          <li><a href="https://incometaxindia.gov.in/" target="_blank" rel="noopener noreferrer" className="underline">CBDT / Income Tax Department — laws, circulars and notifications</a><IndiaReferenceCheck url="https://incometaxindia.gov.in/" /></li>
          <li><a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" className="underline">Income Tax e-Filing portal — returns, forms and taxpayer guidance</a><IndiaReferenceCheck url="https://www.incometax.gov.in/iec/foportal/" /></li>
          <li><Link to="/resources" className="underline">All official tax resources for India, Pakistan and the USA</Link></li>
        </ul>
      </section>

      <p className="mt-8 text-xs text-green-600 dark:text-green-400">
        Estimate only. Surcharge on income above ₹50 lakh and special-rate income (capital gains) are not included. Verify with the official{' '}
        <a href="https://www.incometaxindia.gov.in/income-tax-calculator" target="_blank" rel="noopener noreferrer" className="underline">Income Tax Department calculator</a><IndiaReferenceCheck url="https://www.incometaxindia.gov.in/income-tax-calculator" />.
        {' '}Read our <Link to="/articles" search={{ page: 1 }} className="underline">India tax guides</Link>.
      </p>
    </div>
  );
}
