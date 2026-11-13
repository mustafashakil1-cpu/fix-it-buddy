import { useState } from 'react';
import TaxCalculatorForm from '@/components/TaxCalculatorForm';
import TaxResultCard from '@/components/TaxResultCard';
import { calculateSalaryTax } from '@/lib/taxCalculator';
import { TAX_YEAR_LABEL } from '@/lib/taxSlabs';
import type { SalaryInput, TaxResult } from '@/types/tax';
import PageGuide from '@/components/PageGuide';
import { salaryTaxGuide } from '@/data/pageGuides';

function TaxCalculatorPage() {
  const [result, setResult] = useState<TaxResult | null>(null);

  function handleCalculate(input: SalaryInput) {
    setResult(calculateSalaryTax(input));
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 w-full">
      <div className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-green-900 mb-2">
          Salary Tax Calculator
        </h1>
        <p className="text-green-700">
          Free for everyone. Based on {TAX_YEAR_LABEL} slabs for salaried individuals in
          Pakistan. Enter your details below to see your estimated tax and take-home pay.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 items-start">
        <TaxCalculatorForm onCalculate={handleCalculate} />
        {result ? (
          <TaxResultCard result={result} />
        ) : (
          <div className="rounded-2xl border border-dashed border-green-200 bg-white/50 p-6 text-center text-green-500 text-sm">
            Enter your salary details and click "Calculate Tax" to see your breakdown here.
          </div>
        )}
      </div>

      <PageGuide guide={salaryTaxGuide} />
    </div>
  );
}

export default TaxCalculatorPage;
