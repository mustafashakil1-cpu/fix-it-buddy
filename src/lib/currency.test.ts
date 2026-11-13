import { describe, expect, it } from 'vitest';
import { formatMoney, supportsAutomaticTax } from './currency';
import { calculatePayslip } from './payrollCalculator';
import { calculateDocumentTotals } from './invoiceCalculator';

describe('global document currencies', () => {
  it('formats the same amount in a selected denomination without conversion', () => {
    expect(formatMoney(1234.5, 'EUR')).toBe('EUR\u00a01,234.50');
    expect(formatMoney(1234.5, 'USD')).toBe('USD\u00a01,234.50');
  });
  it('keeps document arithmetic independent of denomination', () => {
    expect(calculateDocumentTotals([{ id: 'one', description: 'Services', quantity: 2, unitPrice: 100 }], 10)).toEqual({ subtotal: 200, taxAmount: 20, total: 220 });
  });
  it('only enables native-denomination automatic tax', () => {
    expect(supportsAutomaticTax('PK', 'PKR')).toBe(true);
    expect(supportsAutomaticTax('US', 'USD')).toBe(true);
    expect(supportsAutomaticTax('US', 'EUR')).toBe(false);
    expect(supportsAutomaticTax('PK', 'INR')).toBe(false);
  });
  it('uses entered manual tax for foreign-denomination payroll without changing salary', () => {
    const payslip = calculatePayslip({ id: 'one', name: 'Test', designation: 'Analyst', country: 'US', currency: 'EUR', basicSalary: 4000, allowances: 500, deductions: 100, manualTax: 600 });
    expect(payslip.grossMonthly).toBe(4500);
    expect(payslip.taxMonthly).toBe(600);
    expect(payslip.netMonthly).toBe(3800);
  });
});