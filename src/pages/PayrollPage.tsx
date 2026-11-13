import { useEffect, useState } from 'react';
import { useEmployees } from '@/hooks/useEmployees';
import EmployeeForm from '@/components/EmployeeForm';
import EmployeeList from '@/components/EmployeeList';
import PayrollSummary from '@/components/PayrollSummary';
import PayslipView from '@/components/PayslipView';
import { calculatePayslip, calculatePayrollSummary } from '@/lib/payrollCalculator';
import type { Employee } from '@/types/tax';
import PageGuide from '@/components/PageGuide';
import { payrollGuide } from '@/data/pageGuides';
import LogoUpload from '@/components/LogoUpload';
import { defaultCurrency, isCurrencyCode, type CurrencyCode, type SupportedCountry } from '@/lib/currency';
import CurrencySelect from '@/components/CurrencySelect';

function PayrollPage() {
  const { employees, addEmployee, updateEmployee, removeEmployee, isFullFor } = useEmployees();
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [viewingPayslipId, setViewingPayslipId] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyLogo, setCompanyLogo] = useState<string | undefined>();
  const [currency, setCurrency] = useState<CurrencyCode>('PKR');
  const [country, setCountry] = useState<SupportedCountry>('PK');

  useEffect(() => {
    setCompanyName(localStorage.getItem('payroll_company_name') ?? '');
    setCompanyAddress(localStorage.getItem('payroll_company_address') ?? '');
    setCompanyLogo(localStorage.getItem('payroll_company_logo') ?? undefined);
    const storedCountry = localStorage.getItem('payroll_country') === 'US' ? 'US' : 'PK';
    const storedCurrency = localStorage.getItem('payroll_currency');
    setCurrency(isCurrencyCode(storedCurrency) ? storedCurrency : defaultCurrency(storedCountry));
    setCountry(localStorage.getItem('payroll_country') === 'US' ? 'US' : 'PK');
  }, []);

  function saveCompanyName(value: string) {
    setCompanyName(value);
    localStorage.setItem('payroll_company_name', value);
  }

  function saveCompanyAddress(value: string) {
    setCompanyAddress(value);
    localStorage.setItem('payroll_company_address', value);
  }

  function saveCompanyLogo(value: string | undefined) {
    setCompanyLogo(value);
    if (value) localStorage.setItem('payroll_company_logo', value);
    else localStorage.removeItem('payroll_company_logo');
  }

  function saveCountry(value: SupportedCountry) {
    setCountry(value);
    saveCurrency(defaultCurrency(value));
    localStorage.setItem('payroll_country', value);
    setEditingEmployee(null);
    setViewingPayslipId(null);
  }

  function saveCurrency(value: CurrencyCode) {
    setCurrency(value);
    localStorage.setItem('payroll_currency', value);
    setEditingEmployee(null);
    setViewingPayslipId(null);
  }

  const visibleEmployees = employees.filter((employee) => (employee.country ?? 'PK') === country && (employee.currency ?? defaultCurrency(employee.country ?? 'PK')) === currency);
  const payslips = visibleEmployees.map(calculatePayslip);
  const summary = calculatePayrollSummary(payslips);
  const viewingPayslip = payslips.find((p) => p.employee.id === viewingPayslipId) || null;

  function handleSave(data: Omit<Employee, 'id'>) {
    if (editingEmployee) {
      updateEmployee(editingEmployee.id, data);
      setEditingEmployee(null);
    } else {
      addEmployee(data);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 w-full">
      <div className="mb-8 text-center print:hidden">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-green-900 mb-2">
          Free Employee Payroll Generator
        </h1>
        <p className="text-green-700">
          Add your employees for free, calculate their tax and net salary, and print or
          download individual payslips. Your data stays only in this browser.
        </p>
      </div>

      {viewingPayslip ? (
        <PayslipView
          payslip={viewingPayslip}
          companyName={companyName}
          companyAddress={companyAddress}
          logoDataUrl={companyLogo}
          country={country} currency={currency}
          onClose={() => setViewingPayslipId(null)}
        />
      ) : (
        <div className="grid lg:grid-cols-2 gap-6 items-start [&>*]:min-w-0">
          <div className="lg:col-span-2 pop-panel bg-card p-6">
            <h2 className="text-lg font-bold text-green-900">Company Details</h2>
            <p className="text-xs text-green-600 mt-0.5">
              Shown at the top of every payslip you print or download.
            </p>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <label className="block sm:col-span-2">
                <span className="text-sm font-semibold text-green-900">Payroll Country</span>
                <select value={country} onChange={(e) => saveCountry(e.target.value as SupportedCountry)} className="mt-1 w-full rounded-lg border border-green-200 bg-white px-3 py-2 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400">
                  <option value="PK">Pakistan — Tax Year 2027 salary tax</option>
                  <option value="US">United States — 2026 federal, FICA and state estimates</option>
                </select>
              </label>
              <div className="sm:col-span-2"><CurrencySelect value={currency} onChange={saveCurrency} /></div>
              <div className="sm:col-span-2">
                <LogoUpload value={companyLogo} onChange={saveCompanyLogo} />
              </div>
              <label className="block">
                <span className="text-sm font-semibold text-green-900">Company Name</span>
                <input
                  value={companyName}
                  onChange={(e) => saveCompanyName(e.target.value)}
                  placeholder={country === 'US' ? 'e.g. Acme LLC' : 'e.g. TaxSaathi (Pvt) Ltd'}
                  className="mt-1 w-full rounded-lg border border-green-200 bg-white px-3 py-2 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-green-900">Company Address (optional)</span>
                <input
                  value={companyAddress}
                  onChange={(e) => saveCompanyAddress(e.target.value)}
                  placeholder={country === 'US' ? 'e.g. Austin, Texas' : 'e.g. Karachi, Pakistan'}
                  className="mt-1 w-full rounded-lg border border-green-200 bg-white px-3 py-2 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </label>
            </div>
          </div>
          <EmployeeForm
            onSave={handleSave}
            isFull={isFullFor(country)}
            editingEmployee={editingEmployee}
            onCancelEdit={() => setEditingEmployee(null)}
            country={country} currency={currency}
          />
          <div className="space-y-6">
            <PayrollSummary summary={summary} country={country} currency={currency} />
            <EmployeeList
              payslips={payslips}
              onEdit={(emp) => setEditingEmployee(emp)}
              onRemove={removeEmployee}
              onViewPayslip={(id) => setViewingPayslipId(id)}
              country={country} currency={currency}
            />
            {country === 'US' && (
              <p className="text-xs leading-relaxed text-green-600">
                US payroll figures are planning estimates based on annualised wages, the standard deduction,
                employee FICA, and the selected state. Form W-4 adjustments, local taxes, year-to-date wage caps,
                benefits, and employer payroll taxes are not fully modelled.
              </p>
            )}
          </div>
        </div>
      )}

      {!viewingPayslip && <PageGuide guide={payrollGuide} />}
    </div>
  );
}

export default PayrollPage;
