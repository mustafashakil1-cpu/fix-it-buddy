import type { Employee, Payslip } from '@/types/tax';
import { calculateAnnualTax } from '@/lib/taxCalculator';
import { calculateUsTax } from '@/lib/usTax';
import { defaultCurrency, supportsAutomaticTax } from '@/lib/currency';

export function calculatePayslip(employee: Employee): Payslip {
  const grossMonthly = employee.basicSalary + employee.allowances;
  const country = employee.country ?? 'PK';
  if (!supportsAutomaticTax(country, employee.currency ?? defaultCurrency(country))) {
    const taxMonthly = Math.max(0, employee.manualTax ?? 0);
    return { employee, grossMonthly, taxMonthly, netMonthly: grossMonthly - taxMonthly - employee.deductions };
  }
  if (employee.country === 'US') {
    const result = calculateUsTax({
      wages: grossMonthly * 12,
      selfEmployment: 0,
      otherIncome: 0,
      filingStatus: employee.filingStatus ?? 'single',
      useStandardDeduction: true,
      itemisedDeductions: 0,
      pretaxContributions: employee.deductions * 12,
      credits: 0,
      stateCode: employee.stateCode ?? 'OTHER',
    });
    const federalTaxMonthly = result.federalTax / 12;
    const socialSecurityMonthly = result.socialSecurity / 12;
    const medicareMonthly = (result.medicare + result.additionalMedicare) / 12;
    const stateTaxMonthly = result.stateTax / 12;
    const taxMonthly = federalTaxMonthly + socialSecurityMonthly + medicareMonthly + stateTaxMonthly;
    return {
      employee,
      grossMonthly,
      taxMonthly,
      federalTaxMonthly,
      socialSecurityMonthly,
      medicareMonthly,
      stateTaxMonthly,
      netMonthly: grossMonthly - taxMonthly - employee.deductions,
    };
  }
  const grossAnnual = grossMonthly * 12;
  const taxableAnnual = Math.max(0, grossAnnual - employee.deductions * 12);
  const taxAnnual = calculateAnnualTax(taxableAnnual);
  const taxMonthly = taxAnnual / 12;
  const netMonthly = grossMonthly - taxMonthly - employee.deductions;

  return {
    employee,
    grossMonthly,
    taxMonthly,
    netMonthly,
  };
}

export interface PayrollSummaryTotals {
  totalGross: number;
  totalTax: number;
  totalNet: number;
  employeeCount: number;
}

export function calculatePayrollSummary(payslips: Payslip[]): PayrollSummaryTotals {
  return payslips.reduce(
    (acc, p) => ({
      totalGross: acc.totalGross + p.grossMonthly,
      totalTax: acc.totalTax + p.taxMonthly,
      totalNet: acc.totalNet + p.netMonthly,
      employeeCount: acc.employeeCount + 1,
    }),
    { totalGross: 0, totalTax: 0, totalNet: 0, employeeCount: 0 }
  );
}
