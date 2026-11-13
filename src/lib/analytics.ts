// Google Analytics 4 (GA4) — frontend-only initialization.
// Measurement ID comes from the Google Analytics connector via .env.
const measurementId = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY;

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: GtagFn;
  }
}

let initialized = false;

export function initAnalytics() {
  if (initialized || typeof window === 'undefined') return;
  if (!measurementId) {
    console.warn('[analytics] No measurement ID configured; skipping GA4 init');
    return;
  }
  initialized = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  const gtag: GtagFn = function gtag(..._args) {
    // eslint-disable-next-line prefer-rest-params -- gtag.js needs the Arguments object
    window.dataLayer.push(arguments);
  };
  window.gtag = gtag;
  gtag('set', 'developer_id.dZjgwMW', true);
  gtag('js', new Date());
  gtag('config', measurementId);
}

// Send a page view on client-side route changes (gtag only auto-tracks the
// initial page load).
export function trackPageView(path: string) {
  if (!initialized || typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'page_view', { page_path: path });
}
