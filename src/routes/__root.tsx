import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import type { ErrorComponentProps } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { initAnalytics, trackPageView } from "../lib/analytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieNotice from "@/components/CookieNotice";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 dark:bg-slate-950 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-green-900 dark:text-green-100">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-green-900 dark:text-green-100">Page not found</h2>
        <p className="mt-2 text-sm text-green-700 dark:text-green-300">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-800"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 dark:bg-slate-950 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-green-900 dark:text-green-100">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-green-700 dark:text-green-300">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-800"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-green-300 bg-white dark:bg-slate-800 dark:border-slate-600 px-4 py-2 text-sm font-medium text-green-900 dark:text-green-100"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TaxSaathi — Free Pakistan & US Tax and Payroll Tools" },
      { name: "description", content: "Free Pakistan and US tax calculators, payroll, payslips, invoices, quotations, and practical tax guides." },
      { name: "author", content: "TaxSaathi" },
      { name: "google-adsense-account", content: "ca-pub-7851393090887931" },
      { name: "google-site-verification", content: "qALewCFk4Ghsl7eOFbG-_uIUzsoyUZqlRpiGgKut2ek" },
      { property: "og:title", content: "TaxSaathi — Free Pakistan & US Tax and Payroll Tools" },
      { property: "og:description", content: "Free Pakistan and US tax calculators, payroll, payslips, and practical business tools." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "TaxSaathi",
          url: "https://taxsaathi.site",
          email: "taxsaaathi@gmail.com",
          description:
            "Free Pakistan and United States tax calculators, payroll, payslip, invoice and quotation generators plus tax guides.",
          areaServed: ["PK", "US"],
        }),
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        {/* AdSense loads shortly after the page finishes loading so ad
            insertion doesn't shift the layout during first render (CLS). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'addEventListener("load",function(){setTimeout(function(){var s=document.createElement("script");s.async=true;s.crossOrigin="anonymous";s.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7851393090887931";document.head.appendChild(s)},2500)});',
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    // gtag only auto-tracks the initial page load; send page views on
    // client-side route changes too.
    const unsubscribe = router.history.subscribe(() => {
      trackPageView(router.history.location.pathname);
    });
    return unsubscribe;
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-green-50 dark:bg-slate-950 transition-colors">
        <Header />
        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>
        <Footer />
        <CookieNotice />
      </div>

    </QueryClientProvider>
  );
}
