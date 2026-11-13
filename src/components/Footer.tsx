import { Link } from '@tanstack/react-router';
import NewsletterSignup from '@/components/NewsletterSignup';

const toolLinks = [
  { to: '/tax-calculator', label: 'Pakistan Tax Calculator' },
  { to: '/us-tax-calculator', label: 'US Tax Calculator' },
  { to: '/india-tax-calculator', label: 'India Tax Calculator' },
  { to: '/pta-tax-calculator', label: 'PTA Mobile Tax' },
  { to: '/invoice-generator', label: 'Invoice Generator' },
  { to: '/quotation-generator', label: 'Quotation Generator' },
];

const companyLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/articles', label: 'Blog' },
  { to: '/faq', label: 'FAQ' },
  { to: '/resources', label: 'Tax Resources' },
  { to: '/editorial-standards', label: 'Editorial Standards' },
  { to: '/contact', label: 'Contact Us' },
  { to: '/disclaimer', label: 'Disclaimer' },
];

function Footer() {
  return (
    <footer className="bg-green-900 text-white mt-auto border-t-2 border-green-600">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <div className="space-y-3">
          <p className="font-extrabold text-white text-base">
            Tax<span className="text-green-600">Saathi</span>
          </p>
          <p className="text-green-300">
            Free tax calculators, payroll and document generators for people and small businesses
            in Pakistan, the United States and India.
          </p>
          <p className="text-green-500 text-xs">
            Estimates only. Verify Pakistan figures with FBR, PTA or SECP, and US figures with the
            IRS, SSA or your state revenue agency. Verify India figures with CBDT and the Income Tax Department.
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-white uppercase text-xs tracking-widest">Tools</p>
          <div className="flex flex-col gap-1.5 text-green-300">
            {toolLinks.map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-green-400">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-white uppercase text-xs tracking-widest">Company</p>
          <div className="flex flex-col gap-1.5 text-green-300">
            {companyLinks.map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-green-400">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="min-w-0 sm:col-span-2 lg:col-span-1">
          <NewsletterSignup variant="dark" />
        </div>
      </div>

      <div className="border-t border-green-700/60">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-green-300">
          <p>&copy; {new Date().getFullYear()} TaxSaathi. All calculator data stays in your browser.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-green-400">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-green-400">
              Terms of Service
            </Link>
            <Link to="/disclaimer" className="hover:text-green-400">
              Disclaimer
            </Link>
            <Link to="/contact" className="hover:text-green-400">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
