import type { TaxSlab } from '@/types/tax';

// Pakistan salaried-individual annual income tax slabs for Tax Year 2027
// (1 July 2026 – 30 June 2027), as enacted by the Finance Act, 2026.
export const TAX_YEAR_LABEL = 'Tax Year 2027 (Salaried Individuals)';
export const TAX_YEAR_PERIOD = '1 July 2026 to 30 June 2027';

export const SALARIED_TAX_SLABS: TaxSlab[] = [
  { lower: 0, upper: 600_000, fixedAmount: 0, rate: 0 },
  { lower: 600_000, upper: 1_200_000, fixedAmount: 0, rate: 0.01 },
  { lower: 1_200_000, upper: 2_200_000, fixedAmount: 6_000, rate: 0.11 },
  { lower: 2_200_000, upper: 3_200_000, fixedAmount: 116_000, rate: 0.20 },
  { lower: 3_200_000, upper: 4_100_000, fixedAmount: 316_000, rate: 0.25 },
  { lower: 4_100_000, upper: 5_600_000, fixedAmount: 541_000, rate: 0.29 },
  { lower: 5_600_000, upper: 7_000_000, fixedAmount: 976_000, rate: 0.32 },
  { lower: 7_000_000, upper: null, fixedAmount: 1_424_000, rate: 0.35 },
];

// The 9% surcharge under section 4AB was abolished for SALARIED individuals
// from 1 July 2026 by the Finance Act, 2026. It continues to apply to
// non-salaried individuals and AOPs above the threshold below.
export const SALARIED_SURCHARGE_APPLIES = false;
export const SURCHARGE_THRESHOLD = 10_000_000;
export const SURCHARGE_RATE = 0.09;
