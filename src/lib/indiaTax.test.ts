import { describe, it, expect } from 'vitest';
import { calculateNewRegime, calculateOldRegime, type IndiaTaxInput } from './indiaTax';

const base: IndiaTaxInput = { salary: 0, otherIncome: 0, ageGroup: 'below60', isSalaried: true, sec80C: 0, sec80D: 0, hraExemption: 0, otherDeductions: 0 };

describe('India tax FY 2025-26', () => {
  it('salary of 12.75 lakh is tax-free under the new regime', () => {
    expect(calculateNewRegime({ ...base, salary: 1_275_000 }).totalTax).toBe(0);
  });
  it('new regime taxable 16 lakh pays 1,20,000 + 4% cess', () => {
    expect(calculateNewRegime({ ...base, salary: 1_675_000 }).totalTax).toBeCloseTo(124_800);
  });
  it('old regime caps 80C at 1.5 lakh', () => {
    const r = calculateOldRegime({ ...base, salary: 1_000_000, sec80C: 300_000 });
    expect(r.taxableIncome).toBe(800_000);
  });
});
