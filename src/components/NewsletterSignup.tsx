import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface NewsletterSignupProps {
  variant?: 'light' | 'dark';
}

function NewsletterSignup({ variant = 'dark' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setError('');
    setSubmitting(true);

    const { error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: email.trim().toLowerCase() });

    setSubmitting(false);

    if (insertError) {
      if (insertError.code === '23505') {
        // already subscribed — treat as success
        setSubmitted(true);
        setEmail('');
        return;
      }
      setError('Something went wrong. Please try again.');
      return;
    }

    setSubmitted(true);
    setEmail('');
  }

  const isDark = variant === 'dark';

  return (
    <div className={isDark ? 'text-green-100' : 'text-green-900'}>
      <p className={`font-semibold ${isDark ? 'text-white' : 'text-green-900'}`}>
        Subscribe to our newsletter
      </p>
      <p className={`text-sm mt-1 ${isDark ? 'text-green-300' : 'text-green-700'}`}>
        Get new tax tips, articles, and tool updates in your inbox.
      </p>
      {submitted ? (
        <p className="mt-3 text-sm font-medium text-green-400">Thanks! You're subscribed. 🎉</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-3 flex w-full max-w-sm flex-col gap-2 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full min-w-0 flex-1 rounded-md px-3 py-2 text-sm text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            disabled={submitting}
            className="shrink-0 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-red-800 disabled:opacity-60"
          >
            {submitting ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>
      )}
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}

export default NewsletterSignup;
