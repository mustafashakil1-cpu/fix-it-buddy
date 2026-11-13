import { useEffect, useState } from 'react';
import type { Employee } from '@/types/tax';
import { FILING_STATUS_LABELS, STATES, type FilingStatus } from '@/lib/usTax';
import { supportsAutomaticTax, type CurrencyCode, type SupportedCountry } from '@/lib/currency';

interface Props {
  onSave: (data: Omit<Employee, 'id'>) => void;
  isFull: boolean;
  editingEmployee: Employee | null;
  onCancelEdit: () => void;
  country: SupportedCountry;
  currency: CurrencyCode;
}

function EmployeeForm({ onSave, isFull, editingEmployee, onCancelEdit, country, currency }: Props) {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const [allowances, setAllowances] = useState('');
  const [deductions, setDeductions] = useState('');
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [manualTax, setManualTax] = useState('');
  const automaticTax = supportsAutomaticTax(country, currency);
  const [stateCode, setStateCode] = useState('OTHER');

  useEffect(() => {
    if (editingEmployee) {
      setManualTax(String(editingEmployee.manualTax ?? 0));
      setName(editingEmployee.name);
      setDesignation(editingEmployee.designation);
      setBasicSalary(String(editingEmployee.basicSalary));
      setAllowances(String(editingEmployee.allowances));
      setDeductions(String(editingEmployee.deductions));
      setFilingStatus(editingEmployee.filingStatus ?? 'single');
      setStateCode(editingEmployee.stateCode ?? 'OTHER');
    } else {
      setManualTax('');
      setName('');
      setDesignation('');
      setBasicSalary('');
      setAllowances('');
      setDeductions('');
      setFilingStatus('single');
      setStateCode('OTHER');
    }
  }, [editingEmployee]);

  const disabled = isFull && !editingEmployee;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (disabled) return;
    if (!name.trim() || Number(basicSalary) <= 0) return;
    onSave({
      name: name.trim(),
      designation: designation.trim() || 'Employee',
      basicSalary: Number(basicSalary) || 0,
      allowances: Number(allowances) || 0,
      deductions: Number(deductions) || 0,
      country,
      currency,
      manualTax: automaticTax ? undefined : Number(manualTax) || 0,
      filingStatus: country === 'US' ? filingStatus : undefined,
      stateCode: country === 'US' ? stateCode : undefined,
    });
    if (!editingEmployee) {
      setManualTax('');
      setName('');
      setDesignation('');
      setBasicSalary('');
      setAllowances('');
      setDeductions('');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="pop-panel bg-card p-6 space-y-4"
    >
      <h3 className="text-lg font-bold text-green-900">
        {editingEmployee ? 'Edit Employee' : 'Add Employee'}
      </h3>

      {disabled && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm px-3 py-2">
          You've reached the maximum number of employees. Remove one to add another.
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-green-900 mb-1">Full Name</label>
        <input
          type="text"
          value={name}
          disabled={disabled}
          onChange={(e) => setName(e.target.value)}
          placeholder={country === 'US' ? 'e.g. Taylor Smith' : 'e.g. Ali Khan'}
          className="w-full rounded-lg border border-green-200 px-3 py-2 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-green-900 mb-1">Designation</label>
        <input
          type="text"
          value={designation}
          disabled={disabled}
          onChange={(e) => setDesignation(e.target.value)}
          placeholder="e.g. Accountant"
          className="w-full rounded-lg border border-green-200 px-3 py-2 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-green-900 mb-1">
          Monthly Basic Salary ({currency})
        </label>
        <input
          type="number"
          min="0"
          value={basicSalary}
          disabled={disabled}
          onChange={(e) => setBasicSalary(e.target.value)}
          placeholder="e.g. 80000"
          className="w-full rounded-lg border border-green-200 px-3 py-2 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-green-900 mb-1">
          Monthly Allowances ({currency}) — optional
        </label>
        <input
          type="number"
          min="0"
          value={allowances}
          disabled={disabled}
          onChange={(e) => setAllowances(e.target.value)}
          placeholder="e.g. 10000"
          className="w-full rounded-lg border border-green-200 px-3 py-2 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-green-900 mb-1">
          Monthly Pre-Tax / Other Deductions ({currency}) — optional
        </label>
        <input
          type="number"
          min="0"
          value={deductions}
          disabled={disabled}
          onChange={(e) => setDeductions(e.target.value)}
          placeholder={country === 'US' ? 'e.g. 401(k) contribution' : 'e.g. Provident Fund'}
          className="w-full rounded-lg border border-green-200 px-3 py-2 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-gray-100"
        />
      </div>

      {!automaticTax && <label className="block text-sm font-semibold text-foreground">
        Monthly tax deduction ({currency}) — enter manually
        <input aria-label="Monthly manual tax" type="number" min="0" step="any" disabled={disabled} value={manualTax} onChange={(e) => setManualTax(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground" />
        <span className="mt-1 block text-xs font-normal text-muted-foreground">Automatic {country === 'US' ? 'US' : 'Pakistan'} tax requires {country === 'US' ? 'USD' : 'PKR'}; foreign-currency tax is entered manually.</span>
      </label>}
      {country === 'US' && automaticTax && (
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-sm font-semibold text-green-900 mb-1">Federal Filing Status</span>
            <select
              value={filingStatus}
              disabled={disabled}
              onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
              className="w-full rounded-lg border border-green-200 px-3 py-2 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-gray-100"
            >
              {Object.entries(FILING_STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="block text-sm font-semibold text-green-900 mb-1">Work State</span>
            <select
              value={stateCode}
              disabled={disabled}
              onChange={(e) => setStateCode(e.target.value)}
              className="w-full rounded-lg border border-green-200 px-3 py-2 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-gray-100"
            >
              {STATES.map((state) => <option key={state.code} value={state.code}>{state.name}</option>)}
            </select>
          </label>
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={disabled}
          className="flex-1 bg-green-600 hover:bg-red-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {editingEmployee ? 'Save Changes' : 'Add Employee'}
        </button>
        {editingEmployee && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-4 py-3 rounded-lg border border-green-200 text-green-800 font-medium hover:bg-green-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default EmployeeForm;
