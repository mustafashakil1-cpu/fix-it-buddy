import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface LeadFormField {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'textarea';
  required?: boolean;
  placeholder?: string;
}

interface LeadCaptureFormProps {
  category: string;
  fields: LeadFormField[];
  submitLabel?: string;
  successMessage?: string;
}

function LeadCaptureForm({
  category,
  fields,
  submitLabel = 'Submit Request',
  successMessage = "Thanks! We've received your request and will get back to you soon.",
}: LeadCaptureFormProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function handleChange(name: string, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const name = values.name ?? '';
    const email = values.email ?? '';
    const phone = values.phone ?? '';
    const extraLines = fields
      .filter((f) => !['name', 'email', 'phone', 'message'].includes(f.name))
      .map((f) => `${f.label}: ${values[f.name] ?? ''}`)
      .filter((line) => !line.endsWith(': '));
    const message = [...extraLines, values.message ?? ''].filter(Boolean).join('\n');

    const { error: insertError } = await supabase.from('inquiries').insert({
      category,
      name,
      email,
      phone: phone || null,
      message: message || null,
    });

    setSubmitting(false);

    if (insertError) {
      setError('Something went wrong while sending your request. Please try again.');
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-green-50 dark:bg-slate-800 border border-green-200 dark:border-slate-700 rounded-xl p-6 text-center">
        <p className="text-green-800 dark:text-green-200 font-medium">{successMessage}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="pop-panel bg-card p-6 space-y-4"
    >
      {fields.map((field) => (
        <label key={field.name} className="block">
          <span className="text-sm font-medium text-green-900 dark:text-green-100">
            {field.label}
            {field.required && <span className="text-red-500"> *</span>}
          </span>
          {field.type === 'textarea' ? (
            <textarea
              required={field.required}
              placeholder={field.placeholder}
              value={values[field.name] ?? ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              rows={4}
              className="mt-1 w-full rounded-md border border-green-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          ) : (
            <input
              type={field.type ?? 'text'}
              required={field.required}
              placeholder={field.placeholder}
              value={values[field.name] ?? ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="mt-1 w-full rounded-md border border-green-200 dark:border-slate-600 dark:bg-slate-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          )}
        </label>
      ))}
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-green-600 hover:bg-red-800 text-white font-semibold py-2.5 rounded-md transition-colors disabled:opacity-60"
      >
        {submitting ? 'Sending…' : submitLabel}
      </button>
    </form>
  );
}

export default LeadCaptureForm;
