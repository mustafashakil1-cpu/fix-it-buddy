import { useState } from 'react';
import { COMMON_PHONE_MODELS, PTA_TAX_LAST_UPDATED } from '@/lib/pta/ptaTaxSlabs';
import { calculatePtaTax, PtaRegistrationType, PtaTaxResult } from '@/lib/pta/ptaTaxCalculator';
import AdSlot from '@/components/AdSlot';
import PageGuide from '@/components/PageGuide';
import { ptaTaxGuide } from '@/data/pageGuides';

function PtaTaxCalculatorPage() {
  const [mode, setMode] = useState<'model' | 'value'>('model');
  const [modelId, setModelId] = useState(COMMON_PHONE_MODELS[0].id);
  const [valueUsd, setValueUsd] = useState('');
  const [registrationType, setRegistrationType] = useState<PtaRegistrationType>('cnic');
  const [result, setResult] = useState<PtaTaxResult | null>(null);

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const value =
      mode === 'model'
        ? COMMON_PHONE_MODELS.find((m) => m.id === modelId)?.approxValueUsd ?? 0
        : Number(valueUsd) || 0;
    setResult(calculatePtaTax(value, registrationType));
  }

  return (
    <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-green-900">PTA Mobile Tax Checker</h1>
      <p className="text-green-700 mt-2">
        Check the estimated PTA tax to register your mobile phone on your CNIC or Passport — pick
        your phone model or enter its value yourself.
      </p>

      <form onSubmit={handleCalculate} className="mt-6 bg-white rounded-xl border border-green-100 p-6 space-y-5">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMode('model')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${mode === 'model' ? 'bg-green-600 text-white' : 'bg-green-50 text-green-800'}`}
          >
            Pick a Model
          </button>
          <button
            type="button"
            onClick={() => setMode('value')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${mode === 'value' ? 'bg-green-600 text-white' : 'bg-green-50 text-green-800'}`}
          >
            Enter Value (USD)
          </button>
        </div>

        {mode === 'model' ? (
          <label className="block">
            <span className="text-sm font-medium text-green-900">Phone Model</span>
            <select
              value={modelId}
              onChange={(e) => setModelId(e.target.value)}
              className="mt-1 w-full rounded-md border border-green-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {COMMON_PHONE_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} (~${m.approxValueUsd})
                </option>
              ))}
            </select>
          </label>
        ) : (
          <label className="block">
            <span className="text-sm font-medium text-green-900">Declared / Customs Value (USD)</span>
            <input
              type="number"
              min={0}
              value={valueUsd}
              onChange={(e) => setValueUsd(e.target.value)}
              placeholder="e.g. 350"
              className="mt-1 w-full rounded-md border border-green-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </label>
        )}

        <div>
          <span className="text-sm font-medium text-green-900">Registration Type</span>
          <div className="mt-1 flex gap-3">
            <label className="flex items-center gap-2 text-sm text-green-800">
              <input
                type="radio"
                checked={registrationType === 'cnic'}
                onChange={() => setRegistrationType('cnic')}
              />
              CNIC (Local)
            </label>
            <label className="flex items-center gap-2 text-sm text-green-800">
              <input
                type="radio"
                checked={registrationType === 'passport'}
                onChange={() => setRegistrationType('passport')}
              />
              Passport (Overseas)
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-red-800 text-white font-semibold py-2.5 rounded-md transition-colors"
        >
          Check PTA Tax
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-green-900 text-white rounded-xl p-6">
          <p className="text-green-200 text-sm">Estimated PTA Tax ({result.band.label})</p>
          <p className="text-3xl font-bold mt-1">PKR {result.taxPkr.toLocaleString()}</p>
          <p className="text-green-300 text-xs mt-3">
            Data last updated: {PTA_TAX_LAST_UPDATED}. Rates change with government notifications —
            always confirm the final amount on the official PTA DIRBS portal before paying.
          </p>
        </div>
      )}

      <PageGuide guide={ptaTaxGuide} />

      <div className="mt-8">
        <AdSlot />
      </div>
    </div>
  );
}

export default PtaTaxCalculatorPage;
