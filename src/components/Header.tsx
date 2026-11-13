import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import ThemeToggle from '@/components/ThemeToggle';

const linkClass =
  'block px-3 py-2 rounded-md text-sm font-semibold transition-colors whitespace-nowrap text-green-800 dark:text-green-100 hover:text-green-600 hover:bg-green-100 dark:hover:bg-slate-800';
const activeLinkClass =
  'block px-3 py-2 rounded-md text-sm font-semibold whitespace-nowrap bg-green-600 text-white';

const mainLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/tax-calculator', label: '🇵🇰 Pakistan Tax' },
  { to: '/us-tax-calculator', label: '🇺🇸 US Tax' },
  { to: '/india-tax-calculator', label: '🇮🇳 India Tax' },
  { to: '/invoice-generator', label: 'Invoice Generator' },
  { to: '/articles', label: 'Blog' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact Us' },
];

const moreLinks = [
  { to: '/salary-tax-table', label: 'Salary Tax Table' },
  { to: '/quotation-generator', label: 'Quotation Generator' },
  { to: '/pta-tax-calculator', label: 'PTA Mobile Tax Checker' },
  { to: '/payroll', label: 'Payroll (Multi-Employee)' },
  { to: '/payslip-generator', label: 'Payslip Generator' },
  { to: '/company-registration', label: 'Company Registration' },
  { to: '/tax-appeal', label: 'Tax Appeal & Litigation' },
  { to: '/legal-drafting', label: 'Legal Drafting' },
];

function Header() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-slate-900 border-b-2 border-green-600 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-600 text-white font-extrabold">
            TS
          </span>
          <span className="font-extrabold tracking-tight text-green-900 dark:text-white text-lg">
            Tax<span className="text-green-600">Saathi</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5">
          {mainLinks.map((link) => (
            <Link key={link.to} to={link.to} className={linkClass} activeProps={{ className: activeLinkClass }}>
              {link.label}
            </Link>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button
              type="button"
              className="px-3 py-2 rounded-md text-sm font-semibold text-green-800 dark:text-green-100 hover:text-green-600"
            >
              More ▾
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full pt-1 w-60 z-30">
                <div className="pop-panel bg-card py-1">
                  {moreLinks.map((link) => (
                    <Link key={link.to} to={link.to} className={linkClass} activeProps={{ className: activeLinkClass }}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="px-3 py-2 rounded-md text-green-800 dark:text-green-100 hover:bg-green-100 dark:hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-green-100 dark:border-slate-800 px-4 py-3 space-y-1">
          <Link
            to="/"
            className={linkClass}
            activeProps={{ className: activeLinkClass }}
            activeOptions={{ exact: true }}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          {mainLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={linkClass}
              activeProps={{ className: activeLinkClass }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <p className="text-xs uppercase tracking-widest text-green-500 px-3 pt-3">More Tools</p>
          {moreLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={linkClass}
              activeProps={{ className: activeLinkClass }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export default Header;
