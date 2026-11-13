import { useMemo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { calculateAnnualTax } from '@/lib/taxCalculator';
import { SALARIED_TAX_SLABS, TAX_YEAR_LABEL, TAX_YEAR_PERIOD } from '@/lib/taxSlabs';

const MONTHLY_SALARIES = [
  50_000, 75_000, 100_000, 125_000, 150_000, 175_000, 200_000, 250_000, 300_000,
  350_000, 400_000, 500_000, 600_000, 750_000, 1_000_000,
];

const pkr = (n: number) => 'Rs. ' + Math.round(n).toLocaleString('en-PK');

function row(monthly: number) {
  const annual = monthly * 12;
  const tax = calculateAnnualTax(annual);
  return {
    monthly,
    annual,
    taxMonthly: tax / 12,
    takeHome: monthly - tax / 12,
    effective: annual ? (tax / annual) * 100 : 0,
  };
}

export default function SalaryTaxTablePage() {
  const [current, setCurrent] = useState(150_000);
  const [raise, setRaise] = useState(10);
  const before = row(current);
  const after = row(current * (1 + raise / 100));
  const extraGross = after.monthly - before.monthly;
  const extraNet = after.takeHome - before.takeHome;
  const keptPct = extraGross > 0 ? (extraNet / extraGross) * 100 : 0;
  const rows = useMemo(() => MONTHLY_SALARIES.map(row), []);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground">
        Pakistan Salary Tax Table & Raise Calculator ({TAX_YEAR_LABEL})
      </h1>
      <p className="mt-3 text-muted-foreground">
        Monthly tax and take-home pay for common salaries in {TAX_YEAR_PERIOD}, calculated
        from the Finance Act 2026 salaried slabs. Use the raise checker to see how much of an
        increment you actually keep after tax.
      </p>

      <section className="mt-8 pop-panel bg-card p-5">
        <h2 className="text-xl font-semibold text-foreground">How much of my raise do I keep?</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="text-sm text-foreground">
            Current monthly salary (Rs.)
            <input type="number" min={0} value={current}
              onChange={(e) => setCurrent(Math.max(0, Number(e.target.value) || 0))}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2" />
          </label>
          <label className="text-sm text-foreground">
            Raise: {raise}%
            <input type="range" min={0} max={100} value={raise}
              onChange={(e) => setRaise(Number(e.target.value))} className="mt-3 w-full accent-primary" />
          </label>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3 text-sm">
          <div className="rounded-md bg-muted p-3"><div className="text-muted-foreground">Extra gross / month</div><div className="text-lg font-bold text-foreground">{pkr(extraGross)}</div></div>
          <div className="rounded-md bg-muted p-3"><div className="text-muted-foreground">Extra take-home / month</div><div className="text-lg font-bold text-primary">{pkr(extraNet)}</div></div>
          <div className="rounded-md bg-muted p-3"><div className="text-muted-foreground">Share of raise you keep</div><div className="text-lg font-bold text-foreground">{keptPct.toFixed(1)}%</div></div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Tax goes from {pkr(before.taxMonthly)} to {pkr(after.taxMonthly)} per month. Pakistan uses
          progressive slabs, so only the part of income inside a higher slab is taxed at the higher
          rate — a raise never lowers your take-home pay.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">Monthly salary tax table</h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left text-foreground">
              <tr><th className="p-3">Monthly salary</th><th className="p-3">Monthly tax</th><th className="p-3">Take-home</th><th className="p-3">Effective rate</th></tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.monthly} className="border-t border-border">
                  <td className="p-3 font-medium text-foreground">{pkr(r.monthly)}</td>
                  <td className="p-3 text-foreground">{pkr(r.taxMonthly)}</td>
                  <td className="p-3 text-foreground">{pkr(r.takeHome)}</td>
                  <td className="p-3 text-muted-foreground">{r.effective.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Assumes all pay is taxable salary with no exempt allowances or other income.
          For your exact figures use the <Link to="/tax-calculator" className="text-primary underline">salary tax calculator</Link>.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">The slabs behind these numbers</h2>
        <ul className="mt-3 space-y-1 text-sm text-foreground">
          {SALARIED_TAX_SLABS.map((s) => (
            <li key={s.lower}>
              {pkr(s.lower)} – {s.upper ? pkr(s.upper) : 'and above'}:{' '}
              {s.rate === 0 ? 'no tax' : `${pkr(s.fixedAmount)} + ${(s.rate * 100).toFixed(0)}% of the amount above ${pkr(s.lower)}`}
            </li>
          ))}
        </ul>
        <h2 className="mt-8 text-xl font-semibold text-foreground">Three things the table shows</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-foreground">
          <li>Up to Rs. 50,000 a month (Rs. 600,000 a year) no income tax is payable.</li>
          <li>The biggest jump is crossing Rs. 100,000 a month, where the marginal rate rises from 1% to 11%.</li>
          <li>Above Rs. 7 million a year, every extra rupee is taxed at 35%; the 9% salaried surcharge no longer applies from 1 July 2026.</li>
        </ul>
        <p className="mt-6 text-xs text-muted-foreground">
          Source: Finance Act 2026 and FBR. See our <Link to="/resources" className="text-primary underline">official resources</Link>. This is general information, not tax advice.
        </p>
      </section>
    </div>
  );
}
