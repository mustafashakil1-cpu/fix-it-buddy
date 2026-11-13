// India income tax for individuals, FY 2025-26 (AY 2026-27).
// Surcharge (income above Rs 50 lakh) is not modelled; a 4% health & education cess is.
export type AgeGroup = 'below60' | '60to80' | 'above80';

export interface IndiaTaxInput {
  salary: number; // annual gross salary
  otherIncome: number; // annual
  ageGroup: AgeGroup;
  isSalaried: boolean;
  sec80C: number;
  sec80D: number;
  hraExemption: number;
  otherDeductions: number;
}

export interface RegimeResult {
  grossIncome: number;
  standardDeduction: number;
  deductions: number;
  taxableIncome: number;
  taxBeforeRebate: number;
  rebate: number;
  cess: number;
  totalTax: number;
}

type Slab = [upper: number, rate: number];

export const NEW_REGIME_SLABS: Slab[] = [
  [400_000, 0], [800_000, 0.05], [1_200_000, 0.1], [1_600_000, 0.15],
  [2_000_000, 0.2], [2_400_000, 0.25], [Infinity, 0.3],
];

function oldSlabs(age: AgeGroup): Slab[] {
  const exempt = age === 'above80' ? 500_000 : age === '60to80' ? 300_000 : 250_000;
  const s: Slab[] = [[exempt, 0]];
  if (exempt < 500_000) s.push([500_000, 0.05]);
  s.push([1_000_000, 0.2], [Infinity, 0.3]);
  return s;
}

export function slabTax(income: number, slabs: Slab[]): number {
  let tax = 0, lower = 0;
  for (const [upper, rate] of slabs) {
    if (income <= lower) break;
    tax += (Math.min(income, upper) - lower) * rate;
    lower = upper;
  }
  return tax;
}

function finish(gross: number, std: number, ded: number, taxable: number, before: number, rebate: number): RegimeResult {
  const afterRebate = Math.max(0, before - rebate);
  const cess = afterRebate * 0.04;
  return { grossIncome: gross, standardDeduction: std, deductions: ded, taxableIncome: taxable, taxBeforeRebate: before, rebate, cess, totalTax: afterRebate + cess };
}

export function calculateNewRegime(i: IndiaTaxInput): RegimeResult {
  const gross = i.salary + i.otherIncome;
  const std = i.isSalaried ? Math.min(75_000, i.salary) : 0;
  const taxable = Math.max(0, gross - std);
  const before = slabTax(taxable, NEW_REGIME_SLABS);
  let rebate = 0;
  if (taxable <= 1_200_000) rebate = Math.min(before, 60_000);
  else rebate = Math.max(0, before - (taxable - 1_200_000)); // marginal relief
  return finish(gross, std, 0, taxable, before, rebate);
}

export function calculateOldRegime(i: IndiaTaxInput): RegimeResult {
  const gross = i.salary + i.otherIncome;
  const std = i.isSalaried ? Math.min(50_000, i.salary) : 0;
  const ded = Math.min(150_000, i.sec80C) + i.sec80D + i.hraExemption + i.otherDeductions;
  const taxable = Math.max(0, gross - std - ded);
  const before = slabTax(taxable, oldSlabs(i.ageGroup));
  const rebate = taxable <= 500_000 ? Math.min(before, 12_500) : 0;
  return finish(gross, std, ded, taxable, before, rebate);
}

export function formatINR(v: number): string {
  return `₹${Math.round(v).toLocaleString('en-IN')}`;
}
