import type { SalaryInput, TaxResult } from '@/types/tax';
import {
  SALARIED_TAX_SLABS,
  SALARIED_SURCHARGE_APPLIES,
  SURCHARGE_THRESHOLD,
  SURCHARGE_RATE,
} from '@/lib/taxSlabs';

export function calculateAnnualTax(taxableAnnual: number): number {
  if (taxableAnnual <= 0) return 0;
  const slab = SALARIED_TAX_SLABS.find(
    (s) => taxableAnnual > s.lower && (s.upper === null || taxableAnnual <= s.upper)
  );
  if (!slab) return 0;
  const baseTax = slab.fixedAmount + (taxableAnnual - slab.lower) * slab.rate;
  const surcharge =
    SALARIED_SURCHARGE_APPLIES && taxableAnnual > SURCHARGE_THRESHOLD
      ? baseTax * SURCHARGE_RATE
      : 0;
  return baseTax + surcharge;
}

export function calculateSalaryTax(input: SalaryInput): TaxResult {
  const multiplier = input.period === 'monthly' ? 12 : 1;

  const grossAnnual = (input.amount + input.allowances) * multiplier;
  const deductionsAnnual = input.deductions * multiplier;
  const taxableAnnual = Math.max(0, grossAnnual - deductionsAnnual);

  const taxAnnual = calculateAnnualTax(taxableAnnual);
  const taxMonthly = taxAnnual / 12;

  const netAnnual = grossAnnual - taxAnnual;
  const netMonthly = netAnnual / 12;

  const effectiveRate = grossAnnual > 0 ? (taxAnnual / grossAnnual) * 100 : 0;

  return {
    grossAnnual,
    grossMonthly: grossAnnual / 12,
    taxableAnnual,
    taxAnnual,
    taxMonthly,
    netAnnual,
    netMonthly,
    effectiveRate,
  };
}
