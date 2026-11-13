import { useState } from 'react';
import type { SalaryInput } from '@/types/tax';

interface Props {
  onCalculate: (input: SalaryInput) => void;
}

function TaxCalculatorForm({ onCalculate }: Props) {
  const [period, setPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [amount, setAmount] = useState('');
  const [allowances, setAllowances] = useState('');
  const [deductions, setDeductions] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsedAmount = Number(amount) || 0;
    if (parsedAmount <= 0) return;
    onCalculate({
      amount: parsedAmount,
      period,
      allowances: Number(allowances) || 0,
      deductions: Number(deductions) || 0,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="pop-panel bg-card p-6 space-y-5"
    >
      <div>
        <label className="block text-sm font-semibold text-green-900 mb-2">Salary Period</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPeriod('monthly')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
              period === 'monthly'
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-green-800 border-green-200'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setPeriod('annual')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
              period === 'annual'
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-green-800 border-green-200'
            }`}
          >
            Annual
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-green-900 mb-1" htmlFor="amount">
          {period === 'monthly' ? 'Monthly' : 'Annual'} Basic Salary (Rs)
        </label>
        <input
          id="amount"
          type="number"
          min="0"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 150000"
          className="w-full rounded-lg border border-green-200 px-3 py-2 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-green-900 mb-1" htmlFor="allowances">
          Taxable Allowances ({period}) (Rs) — optional
        </label>
        <input
          id="allowances"
          type="number"
          min="0"
          value={allowances}
          onChange={(e) => setAllowances(e.target.value)}
          placeholder="e.g. 20000"
          className="w-full rounded-lg border border-green-200 px-3 py-2 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-green-900 mb-1" htmlFor="deductions">
          Non-Taxable Deductions ({period}) (Rs) — optional
        </label>
        <input
          id="deductions"
          type="number"
          min="0"
          value={deductions}
          onChange={(e) => setDeductions(e.target.value)}
          placeholder="e.g. Provident Fund"
          className="w-full rounded-lg border border-green-200 px-3 py-2 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-red-800 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        Calculate Tax
      </button>
    </form>
  );
}

export default TaxCalculatorForm;
