import type { CurrencyCode } from '@/lib/currency';

export interface TaxSlab {
  lower: number; // annual income lower bound (inclusive)
  upper: number | null; // annual income upper bound (inclusive), null = no upper limit
  fixedAmount: number; // fixed tax amount at the lower bound
  rate: number; // marginal rate applied to amount above lower bound (as a fraction, e.g. 0.05)
}

export interface SalaryInput {
  amount: number; // entered salary amount
  period: 'monthly' | 'annual';
  allowances: number; // additional taxable allowances (annual or monthly, matches period)
  deductions: number; // non-taxable deductions e.g. provident fund (matches period)
}

export interface TaxResult {
  grossAnnual: number;
  grossMonthly: number;
  taxableAnnual: number;
  taxAnnual: number;
  taxMonthly: number;
  netAnnual: number;
  netMonthly: number;
  effectiveRate: number; // percentage
}

export interface Employee {
  id: string;
  name: string;
  designation: string;
  basicSalary: number; // monthly
  allowances: number; // monthly
  deductions: number; // monthly, non-taxable
  country?: 'PK' | 'US';
  currency?: CurrencyCode;
  manualTax?: number;
  filingStatus?: 'single' | 'married_joint' | 'married_separate' | 'head_of_household';
  stateCode?: string;
}

export interface Payslip {
  employee: Employee;
  grossMonthly: number;
  taxMonthly: number;
  federalTaxMonthly?: number;
  socialSecurityMonthly?: number;
  medicareMonthly?: number;
  stateTaxMonthly?: number;
  netMonthly: number;
}
