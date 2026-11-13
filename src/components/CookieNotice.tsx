import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';

const KEY = 'taxsaathi-cookie-consent';

function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const decide = (value: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* storage unavailable */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="print:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-green-700 bg-green-900 text-white"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
        <p className="flex-1 text-green-100">
          We use cookies for basic site functions, anonymous analytics and to show adverts that keep
          TaxSaathi free. Read our{' '}
          <Link to="/privacy-policy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => decide('declined')}
            className="rounded-md border border-green-500 px-4 py-2 text-xs font-semibold text-green-100"
          >
            Decline
          </button>
          <button
            onClick={() => decide('accepted')}
            className="rounded-md bg-green-600 hover:bg-red-800 px-4 py-2 text-xs font-semibold text-white transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieNotice;
