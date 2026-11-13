import type { Article } from '@/types/article';

const RULES: [RegExp, string][] = [
  [/\bus\b|irs|federal|1040|w-4|w-2|1099|401\(k\)|ira\b|state income/i, 'United States'],
  [/india|₹|80c|itr|regime/i, 'India'],
  [/pakistan|fbr|iris|ntn|pkr|rs\.|secp/i, 'Pakistan'],
  [/salar|payslip|payroll|employ/i, 'Salary & Payroll'],
  [/freelanc|gig|self-employ|contractor/i, 'Freelancers'],
  [/pta|phone|mobile/i, 'PTA'],
  [/property|rental|house|plot|real estate/i, 'Property'],
  [/business|company|llc|shop|trader|corporation|sales tax/i, 'Small Business'],
  [/invest|capital gain|dividend|stock|crypto|savings|bank profit/i, 'Investments'],
  [/deadline|penalt|surcharge|due date/i, 'Deadlines & Penalties'],
  [/deduction|credit|allowance|refund/i, 'Deductions & Credits'],
  [/filing|return|filer|active taxpayer|wealth statement/i, 'Tax Filing'],
  [/record|bookkeeping|invoice|document/i, 'Record Keeping'],
  [/expat|overseas|immigra|non-resident|visa/i, 'Expats'],
];

export function getArticleTags(a: Article): string[] {
  const text = `${a.title} ${a.summary} ${a.content.slice(0, 3).join(' ')}`;
  const tags = RULES.filter(([re]) => re.test(text)).map(([, t]) => t);
  return tags.slice(0, 5);
}
