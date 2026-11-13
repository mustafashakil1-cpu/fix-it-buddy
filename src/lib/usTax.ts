/**
 * United States federal, payroll (FICA) and state income tax estimation.
 *
 * Figures are for tax year 2026 (returns filed in 2027), per IRS Revenue
 * Procedure 2025-32 and the Social Security Administration's 2026 wage base.
 * State rules are simplified: flat-rate states use their statutory rate, and
 * bracketed states use their published single/joint schedules. Local city
 * taxes, credits and itemised state adjustments are not modelled.
 */

export const US_TAX_YEAR = 2026;

export type FilingStatus = 'single' | 'married_joint' | 'married_separate' | 'head_of_household';

export const FILING_STATUS_LABELS: Record<FilingStatus, string> = {
  single: 'Single',
  married_joint: 'Married filing jointly',
  married_separate: 'Married filing separately',
  head_of_household: 'Head of household',
};

export const STANDARD_DEDUCTION: Record<FilingStatus, number> = {
  single: 16100,
  married_joint: 32200,
  married_separate: 16100,
  head_of_household: 24150,
};

export interface Bracket {
  upTo: number; // inclusive upper bound of taxable income for this rate
  rate: number;
}

const INF = Number.POSITIVE_INFINITY;

export const FEDERAL_BRACKETS: Record<FilingStatus, Bracket[]> = {
  single: [
    { upTo: 12400, rate: 0.1 },
    { upTo: 50400, rate: 0.12 },
    { upTo: 105700, rate: 0.22 },
    { upTo: 201775, rate: 0.24 },
    { upTo: 256225, rate: 0.32 },
    { upTo: 640600, rate: 0.35 },
    { upTo: INF, rate: 0.37 },
  ],
  married_joint: [
    { upTo: 24800, rate: 0.1 },
    { upTo: 100800, rate: 0.12 },
    { upTo: 211400, rate: 0.22 },
    { upTo: 403550, rate: 0.24 },
    { upTo: 512450, rate: 0.32 },
    { upTo: 768700, rate: 0.35 },
    { upTo: INF, rate: 0.37 },
  ],
  married_separate: [
    { upTo: 12400, rate: 0.1 },
    { upTo: 50400, rate: 0.12 },
    { upTo: 105700, rate: 0.22 },
    { upTo: 201775, rate: 0.24 },
    { upTo: 256225, rate: 0.32 },
    { upTo: 384350, rate: 0.35 },
    { upTo: INF, rate: 0.37 },
  ],
  head_of_household: [
    { upTo: 17700, rate: 0.1 },
    { upTo: 67450, rate: 0.12 },
    { upTo: 105700, rate: 0.22 },
    { upTo: 201775, rate: 0.24 },
    { upTo: 256225, rate: 0.32 },
    { upTo: 640600, rate: 0.35 },
    { upTo: INF, rate: 0.37 },
  ],
};

/** Social Security / Medicare constants for 2026. */
export const SOCIAL_SECURITY_RATE = 0.062;
export const SOCIAL_SECURITY_WAGE_BASE = 184500;
export const MEDICARE_RATE = 0.0145;
export const ADDITIONAL_MEDICARE_RATE = 0.009;
export const ADDITIONAL_MEDICARE_THRESHOLD: Record<FilingStatus, number> = {
  single: 200000,
  married_joint: 250000,
  married_separate: 125000,
  head_of_household: 200000,
};
/** Self-employed pay both halves of FICA on 92.35% of net earnings. */
export const SE_NET_EARNINGS_FACTOR = 0.9235;

export interface StateRule {
  code: string;
  name: string;
  /** No state income tax on wages at all. */
  noTax?: boolean;
  /** Single flat rate applied to federal-style taxable income. */
  flatRate?: number;
  /** Progressive brackets, keyed by single vs joint schedule. */
  brackets?: { single: Bracket[]; joint: Bracket[] };
  /** State standard deduction / personal allowance, single and joint. */
  deduction?: { single: number; joint: number };
  note?: string;
}

/**
 * States are grouped as: no income tax, flat rate, or bracketed. The bracketed
 * set covers the states most of our readers ask about; every other state with
 * a graduated tax is approximated with its top-of-middle effective rate and
 * clearly labelled as an estimate in the UI.
 */
export const STATES: StateRule[] = [
  { code: 'AK', name: 'Alaska', noTax: true },
  { code: 'FL', name: 'Florida', noTax: true },
  { code: 'NV', name: 'Nevada', noTax: true },
  { code: 'NH', name: 'New Hampshire', noTax: true, note: 'No tax on wages.' },
  { code: 'SD', name: 'South Dakota', noTax: true },
  { code: 'TN', name: 'Tennessee', noTax: true },
  { code: 'TX', name: 'Texas', noTax: true },
  { code: 'WA', name: 'Washington', noTax: true, note: 'No wage tax; capital gains tax applies separately.' },
  { code: 'WY', name: 'Wyoming', noTax: true },

  { code: 'AZ', name: 'Arizona', flatRate: 0.025, deduction: { single: 16100, joint: 32200 } },
  { code: 'CO', name: 'Colorado', flatRate: 0.044, deduction: { single: 16100, joint: 32200 } },
  { code: 'GA', name: 'Georgia', flatRate: 0.0519, deduction: { single: 12000, joint: 24000 } },
  { code: 'ID', name: 'Idaho', flatRate: 0.053, deduction: { single: 16100, joint: 32200 } },
  { code: 'IL', name: 'Illinois', flatRate: 0.0495, deduction: { single: 2850, joint: 5700 } },
  { code: 'IN', name: 'Indiana', flatRate: 0.029, deduction: { single: 1000, joint: 2000 } },
  { code: 'IA', name: 'Iowa', flatRate: 0.038, deduction: { single: 16100, joint: 32200 } },
  { code: 'KY', name: 'Kentucky', flatRate: 0.035, deduction: { single: 3270, joint: 6540 } },
  { code: 'LA', name: 'Louisiana', flatRate: 0.03, deduction: { single: 12500, joint: 25000 } },
  { code: 'MI', name: 'Michigan', flatRate: 0.0425, deduction: { single: 5800, joint: 11600 } },
  { code: 'MS', name: 'Mississippi', flatRate: 0.044, deduction: { single: 2300, joint: 4600 } },
  { code: 'NC', name: 'North Carolina', flatRate: 0.0399, deduction: { single: 12750, joint: 25500 } },
  { code: 'PA', name: 'Pennsylvania', flatRate: 0.0307, deduction: { single: 0, joint: 0 } },
  { code: 'UT', name: 'Utah', flatRate: 0.0455, deduction: { single: 0, joint: 0 } },

  {
    code: 'CA',
    name: 'California',
    deduction: { single: 5800, joint: 11600 },
    brackets: {
      single: [
        { upTo: 10800, rate: 0.01 },
        { upTo: 25600, rate: 0.02 },
        { upTo: 40400, rate: 0.04 },
        { upTo: 56100, rate: 0.06 },
        { upTo: 70800, rate: 0.08 },
        { upTo: 361700, rate: 0.093 },
        { upTo: 434100, rate: 0.103 },
        { upTo: 723500, rate: 0.113 },
        { upTo: INF, rate: 0.123 },
      ],
      joint: [
        { upTo: 21600, rate: 0.01 },
        { upTo: 51200, rate: 0.02 },
        { upTo: 80800, rate: 0.04 },
        { upTo: 112200, rate: 0.06 },
        { upTo: 141600, rate: 0.08 },
        { upTo: 723400, rate: 0.093 },
        { upTo: 868200, rate: 0.103 },
        { upTo: 1447000, rate: 0.113 },
        { upTo: INF, rate: 0.123 },
      ],
    },
  },
  {
    code: 'NY',
    name: 'New York',
    deduction: { single: 8000, joint: 16050 },
    note: 'New York City and Yonkers add a local income tax that is not included.',
    brackets: {
      single: [
        { upTo: 8500, rate: 0.04 },
        { upTo: 11700, rate: 0.045 },
        { upTo: 13900, rate: 0.0525 },
        { upTo: 80650, rate: 0.055 },
        { upTo: 215400, rate: 0.06 },
        { upTo: 1077550, rate: 0.0685 },
        { upTo: 5000000, rate: 0.0965 },
        { upTo: INF, rate: 0.103 },
      ],
      joint: [
        { upTo: 17150, rate: 0.04 },
        { upTo: 23600, rate: 0.045 },
        { upTo: 27900, rate: 0.0525 },
        { upTo: 161550, rate: 0.055 },
        { upTo: 323200, rate: 0.06 },
        { upTo: 2155350, rate: 0.0685 },
        { upTo: 5000000, rate: 0.0965 },
        { upTo: INF, rate: 0.103 },
      ],
    },
  },
  {
    code: 'NJ',
    name: 'New Jersey',
    deduction: { single: 1000, joint: 2000 },
    brackets: {
      single: [
        { upTo: 20000, rate: 0.014 },
        { upTo: 35000, rate: 0.0175 },
        { upTo: 40000, rate: 0.035 },
        { upTo: 75000, rate: 0.05525 },
        { upTo: 500000, rate: 0.0637 },
        { upTo: 1000000, rate: 0.0897 },
        { upTo: INF, rate: 0.1075 },
      ],
      joint: [
        { upTo: 20000, rate: 0.014 },
        { upTo: 50000, rate: 0.0175 },
        { upTo: 70000, rate: 0.0245 },
        { upTo: 80000, rate: 0.035 },
        { upTo: 150000, rate: 0.05525 },
        { upTo: 500000, rate: 0.0637 },
        { upTo: 1000000, rate: 0.0897 },
        { upTo: INF, rate: 0.1075 },
      ],
    },
  },
  {
    code: 'VA',
    name: 'Virginia',
    deduction: { single: 8500, joint: 17000 },
    brackets: {
      single: [
        { upTo: 3000, rate: 0.02 },
        { upTo: 5000, rate: 0.03 },
        { upTo: 17000, rate: 0.05 },
        { upTo: INF, rate: 0.0575 },
      ],
      joint: [
        { upTo: 3000, rate: 0.02 },
        { upTo: 5000, rate: 0.03 },
        { upTo: 17000, rate: 0.05 },
        { upTo: INF, rate: 0.0575 },
      ],
    },
  },
  {
    code: 'MD',
    name: 'Maryland',
    deduction: { single: 2700, joint: 5450 },
    note: 'Maryland counties add a local income tax of roughly 2.25%–3.20%, not included.',
    brackets: {
      single: [
        { upTo: 1000, rate: 0.02 },
        { upTo: 2000, rate: 0.03 },
        { upTo: 3000, rate: 0.04 },
        { upTo: 100000, rate: 0.0475 },
        { upTo: 125000, rate: 0.05 },
        { upTo: 150000, rate: 0.0525 },
        { upTo: 250000, rate: 0.055 },
        { upTo: INF, rate: 0.0575 },
      ],
      joint: [
        { upTo: 1000, rate: 0.02 },
        { upTo: 2000, rate: 0.03 },
        { upTo: 3000, rate: 0.04 },
        { upTo: 150000, rate: 0.0475 },
        { upTo: 175000, rate: 0.05 },
        { upTo: 225000, rate: 0.0525 },
        { upTo: 300000, rate: 0.055 },
        { upTo: INF, rate: 0.0575 },
      ],
    },
  },
  {
    code: 'MA',
    name: 'Massachusetts',
    deduction: { single: 0, joint: 0 },
    note: 'A 4% surtax applies to income above roughly $1 million.',
    brackets: {
      single: [
        { upTo: 1083150, rate: 0.05 },
        { upTo: INF, rate: 0.09 },
      ],
      joint: [
        { upTo: 1083150, rate: 0.05 },
        { upTo: INF, rate: 0.09 },
      ],
    },
  },
  {
    code: 'OH',
    name: 'Ohio',
    deduction: { single: 0, joint: 0 },
    brackets: {
      single: [
        { upTo: 26050, rate: 0 },
        { upTo: 100000, rate: 0.0275 },
        { upTo: INF, rate: 0.035 },
      ],
      joint: [
        { upTo: 26050, rate: 0 },
        { upTo: 100000, rate: 0.0275 },
        { upTo: INF, rate: 0.035 },
      ],
    },
  },
  {
    code: 'MN',
    name: 'Minnesota',
    deduction: { single: 14950, joint: 29900 },
    brackets: {
      single: [
        { upTo: 32570, rate: 0.0535 },
        { upTo: 106990, rate: 0.068 },
        { upTo: 198630, rate: 0.0785 },
        { upTo: INF, rate: 0.0985 },
      ],
      joint: [
        { upTo: 47620, rate: 0.0535 },
        { upTo: 189180, rate: 0.068 },
        { upTo: 330410, rate: 0.0785 },
        { upTo: INF, rate: 0.0985 },
      ],
    },
  },
  {
    code: 'OR',
    name: 'Oregon',
    deduction: { single: 2745, joint: 5495 },
    brackets: {
      single: [
        { upTo: 4400, rate: 0.0475 },
        { upTo: 11050, rate: 0.0675 },
        { upTo: 125000, rate: 0.0875 },
        { upTo: INF, rate: 0.099 },
      ],
      joint: [
        { upTo: 8800, rate: 0.0475 },
        { upTo: 22100, rate: 0.0675 },
        { upTo: 250000, rate: 0.0875 },
        { upTo: INF, rate: 0.099 },
      ],
    },
  },
  {
    code: 'OTHER',
    name: 'Other state (skip state tax)',
    noTax: true,
    note: 'State tax not estimated. Check your own state revenue department.',
  },
];

export interface UsTaxInput {
  /** Annual wage / salary income (W-2). */
  wages: number;
  /** Net self-employment income (1099 / Schedule C profit). */
  selfEmployment: number;
  /** Other ordinary income: interest, rents, taxable pensions. */
  otherIncome: number;
  filingStatus: FilingStatus;
  /** Use the standard deduction, or supply itemised deductions. */
  useStandardDeduction: boolean;
  itemisedDeductions: number;
  /** Pre-tax retirement / HSA contributions that reduce taxable income. */
  pretaxContributions: number;
  /** Non-refundable credits, e.g. Child Tax Credit. */
  credits: number;
  stateCode: string;
}

export interface BracketDetail {
  rate: number;
  from: number;
  to: number;
  taxable: number;
  tax: number;
}

export interface UsTaxResult {
  grossIncome: number;
  adjustedGrossIncome: number;
  deductionUsed: number;
  deductionType: 'Standard deduction' | 'Itemised deductions';
  federalTaxableIncome: number;
  federalTaxBeforeCredits: number;
  credits: number;
  federalTax: number;
  bracketBreakdown: BracketDetail[];
  socialSecurity: number;
  medicare: number;
  additionalMedicare: number;
  selfEmploymentTax: number;
  totalPayrollTax: number;
  stateName: string;
  stateNote?: string;
  stateTaxableIncome: number;
  stateTax: number;
  totalTax: number;
  takeHome: number;
  effectiveRate: number;
  marginalRate: number;
  monthlyTakeHome: number;
}

function taxFromBrackets(taxable: number, brackets: Bracket[]): { tax: number; detail: BracketDetail[]; marginal: number } {
  let tax = 0;
  let lower = 0;
  let marginal = 0;
  const detail: BracketDetail[] = [];
  for (const b of brackets) {
    if (taxable <= lower) break;
    const slice = Math.min(taxable, b.upTo) - lower;
    if (slice > 0) {
      const amount = slice * b.rate;
      tax += amount;
      marginal = b.rate;
      detail.push({ rate: b.rate, from: lower, to: b.upTo, taxable: slice, tax: amount });
    }
    lower = b.upTo;
  }
  return { tax, detail, marginal };
}

function positive(n: number): number {
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function findState(code: string): StateRule {
  return STATES.find((s) => s.code === code) ?? STATES[STATES.length - 1];
}

export function calculateUsTax(input: UsTaxInput): UsTaxResult {
  const wages = positive(input.wages);
  const se = positive(input.selfEmployment);
  const other = positive(input.otherIncome);
  const pretax = positive(input.pretaxContributions);
  const grossIncome = wages + se + other;

  // Payroll taxes on employment income.
  const socialSecurity = Math.min(wages, SOCIAL_SECURITY_WAGE_BASE) * SOCIAL_SECURITY_RATE;
  const medicare = wages * MEDICARE_RATE;

  // Self-employment tax: both halves on 92.35% of net earnings.
  const seBase = se * SE_NET_EARNINGS_FACTOR;
  const ssRoomLeft = Math.max(0, SOCIAL_SECURITY_WAGE_BASE - wages);
  const seSocialSecurity = Math.min(seBase, ssRoomLeft) * SOCIAL_SECURITY_RATE * 2;
  const seMedicare = seBase * MEDICARE_RATE * 2;
  const selfEmploymentTax = seSocialSecurity + seMedicare;

  const medicareWageBase = wages + seBase;
  const addlThreshold = ADDITIONAL_MEDICARE_THRESHOLD[input.filingStatus];
  const additionalMedicare = Math.max(0, medicareWageBase - addlThreshold) * ADDITIONAL_MEDICARE_RATE;

  // Half of self-employment tax is deductible above the line.
  const halfSeDeduction = selfEmploymentTax / 2;
  const adjustedGrossIncome = Math.max(0, grossIncome - pretax - halfSeDeduction);

  const standard = STANDARD_DEDUCTION[input.filingStatus];
  const deductionUsed = input.useStandardDeduction
    ? standard
    : Math.max(0, positive(input.itemisedDeductions));
  const federalTaxableIncome = Math.max(0, adjustedGrossIncome - deductionUsed);

  const fed = taxFromBrackets(federalTaxableIncome, FEDERAL_BRACKETS[input.filingStatus]);
  const credits = positive(input.credits);
  const federalTax = Math.max(0, fed.tax - credits);

  // State tax.
  const state = findState(input.stateCode);
  const joint = input.filingStatus === 'married_joint';
  let stateTaxableIncome = 0;
  let stateTax = 0;
  if (!state.noTax) {
    const stateDeduction = state.deduction ? (joint ? state.deduction.joint : state.deduction.single) : 0;
    stateTaxableIncome = Math.max(0, adjustedGrossIncome - stateDeduction);
    if (state.flatRate) {
      stateTax = stateTaxableIncome * state.flatRate;
    } else if (state.brackets) {
      stateTax = taxFromBrackets(stateTaxableIncome, joint ? state.brackets.joint : state.brackets.single).tax;
    }
  }

  const totalPayrollTax = socialSecurity + medicare + additionalMedicare + selfEmploymentTax;
  const totalTax = federalTax + totalPayrollTax + stateTax;
  const takeHome = Math.max(0, grossIncome - totalTax);

  return {
    grossIncome,
    adjustedGrossIncome,
    deductionUsed,
    deductionType: input.useStandardDeduction ? 'Standard deduction' : 'Itemised deductions',
    federalTaxableIncome,
    federalTaxBeforeCredits: fed.tax,
    credits,
    federalTax,
    bracketBreakdown: fed.detail,
    socialSecurity,
    medicare,
    additionalMedicare,
    selfEmploymentTax,
    totalPayrollTax,
    stateName: state.name,
    stateNote: state.note,
    stateTaxableIncome,
    stateTax,
    totalTax,
    takeHome,
    effectiveRate: grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0,
    marginalRate: fed.marginal * 100,
    monthlyTakeHome: takeHome / 12,
  };
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}
