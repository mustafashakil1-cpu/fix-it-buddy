import { Link } from '@tanstack/react-router';
import IndiaReferenceCheck from '@/components/IndiaReferenceCheck';

interface SourceLink {
  label: string;
  url: string;
}

interface Resource {
  /** Visible name of the organisation or publication. */
  name: string;
  /** Who owns / publishes it, shown so readers know whose work they are reading. */
  publisher: string;
  url: string;
  what: string;
  useFor: string;
  /** Direct links to the specific pages or documents worth opening. */
  links?: SourceLink[];
}

interface ResourceGroup {
  title: string;
  intro: string;
  /** Attribution note covering every item in the group. */
  attribution: string;
  items: Resource[];
}

function hostOf(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, '');
  } catch {
    return url;
  }
}

const GROUPS: ResourceGroup[] = [
  {
    title: 'Primary official sources — India',
    intro: 'For Indian income tax, verify the law for the relevant financial and assessment year against the Finance Act, CBDT circulars and Income Tax Department guidance. Our calculator and articles are independent estimates and explanations, not official assessments.',
    attribution: 'Published by the Government of India and its Income Tax Department. We link to official originals; rights remain with the issuing authority.',
    items: [
      {
        name: 'Central Board of Direct Taxes (CBDT)',
        publisher: 'Government of India — Department of Revenue, Ministry of Finance',
        url: 'https://incometaxindia.gov.in/',
        what: 'CBDT administers India’s direct taxes. The Income Tax Department website publishes tax legislation, CBDT circulars, notifications and taxpayer guidance.',
        useFor: 'Checking income-tax slabs, regime rules, deductions, rebate conditions and officially announced deadline changes for your assessment year.',
        links: [
          { label: 'CBDT / Income Tax Department official website', url: 'https://incometaxindia.gov.in/' },
          { label: 'Official Income Tax Department calculator', url: 'https://www.incometaxindia.gov.in/income-tax-calculator' },
        ],
      },
      {
        name: 'Income Tax Department e-Filing portal',
        publisher: 'Government of India — Income Tax Department',
        url: 'https://www.incometax.gov.in/iec/foportal/',
        what: 'The official portal for income-tax returns, taxpayer services, forms and filing guidance.',
        useFor: 'Filing and verifying an ITR, reviewing taxpayer guidance, and accessing your tax records through your own account.',
      },
    ],
  },
  {
    title: 'Primary official sources — Pakistan',
    intro:
      'These are the only sources that can settle a question of Pakistani tax law. Everything else, including this website, is commentary on what they say. Where our figures and theirs differ, theirs governs.',
    attribution:
      'All documents in this group are published by the Government of Pakistan and its regulators. Copyright and all rights remain with the issuing authority. We link to the originals and do not host copies.',
    items: [
      {
        name: 'Federal Board of Revenue (FBR)',
        publisher: 'Government of Pakistan — Revenue Division',
        url: 'https://www.fbr.gov.pk/',
        what:
          'The federal revenue authority. Publishes the Income Tax Ordinance 2001 and Sales Tax Act 1990 as amended, the annual Finance Act, circulars, SROs, income tax rate cards and the Active Taxpayer List.',
        useFor:
          'Confirming a current rate or threshold, reading the actual text of a section quoted in a notice, and checking whether a person or business is an active filer.',
        links: [
          { label: 'Income Tax Ordinance 2001 and other tax laws', url: 'https://www.fbr.gov.pk/categ/income-tax/51147/131160' },
          { label: 'Active Taxpayer List (ATL) status check', url: 'https://www.fbr.gov.pk/categ/active-taxpayer-list/151318' },
          { label: 'Circulars, SROs and notifications', url: 'https://www.fbr.gov.pk/categ/sros/51147/131161' },
        ],
      },
      {
        name: 'FBR IRIS portal',
        publisher: 'Federal Board of Revenue',
        url: 'https://iris.fbr.gov.pk/',
        what:
          'The live filing system where NTN registration, income tax returns, wealth statements, withholding statements and notices are handled.',
        useFor:
          'Registering, filing your return, downloading your own tax records and responding to a notice within the deadline.',
        links: [{ label: 'IRIS login and new registration', url: 'https://iris.fbr.gov.pk/' }],
      },
      {
        name: 'Securities and Exchange Commission of Pakistan (SECP)',
        publisher: 'Government of Pakistan — corporate regulator',
        url: 'https://www.secp.gov.pk/',
        what:
          'The corporate regulator. Publishes the Companies Act 2017, incorporation regulations, the current fee schedule and the company name search.',
        useFor:
          'Checking whether a company name is available, reading the incorporation requirements, and confirming the current filing fee before you pay.',
        links: [
          { label: 'Companies Act 2017 and regulations', url: 'https://www.secp.gov.pk/document-category/companies-act-2017/' },
          { label: 'Company name search', url: 'https://eservices.secp.gov.pk/eServices/NameSearch.jsp' },
        ],
      },
      {
        name: 'SECP eServices',
        publisher: 'Securities and Exchange Commission of Pakistan',
        url: 'https://eservices.secp.gov.pk/',
        what: 'The online portal for name reservation, incorporation and statutory filings.',
        useFor: 'Actually incorporating a company and filing annual returns.',
      },
      {
        name: 'PTA DIRBS device verification',
        publisher: 'Pakistan Telecommunication Authority',
        url: 'https://dirbs.pta.gov.pk/',
        what:
          'The Pakistan Telecommunication Authority system that registers handset IMEIs and generates the payment slip for duties and taxes.',
        useFor:
          'Checking an IMEI before buying a used phone, and getting the exact registration amount rather than an estimate.',
        links: [{ label: 'DIRBS device verification system', url: 'https://dirbs.pta.gov.pk/' }],
      },
      {
        name: 'Finance Division, Government of Pakistan',
        publisher: 'Ministry of Finance',
        url: 'https://www.finance.gov.pk/',
        what:
          'Publishes the federal budget documents, the Finance Bill and Act, the Economic Survey and monthly fiscal operations data.',
        useFor:
          'Reading what the budget actually said, rather than what a news summary said it said.',
        links: [
          { label: 'Federal budget documents', url: 'https://www.finance.gov.pk/budget_2026_27.html' },
          { label: 'Pakistan Economic Survey', url: 'https://www.finance.gov.pk/survey_2526.html' },
        ],
      },
      {
        name: 'State Bank of Pakistan',
        publisher: 'State Bank of Pakistan',
        url: 'https://www.sbp.org.pk/',
        what:
          'Foreign exchange regulations, remittance rules, banking circulars and official exchange rate data.',
        useFor:
          'Rules on receiving foreign payments, freelancer remittances and exporter accounts.',
        links: [
          { label: 'Foreign Exchange Manual', url: 'https://www.sbp.org.pk/publications/fe_manual/index.htm' },
          { label: 'Exchange rates', url: 'https://www.sbp.org.pk/ecodata/rates/m2m/M2M-Current.asp' },
        ],
      },
    ],
  },
  {
    title: 'Primary official sources — United States',
    intro:
      'For our US calculator and US articles these are the sources of record. Rates, thresholds and wage bases change every year, so we cite the release rather than a secondary summary — and so should you before filing.',
    attribution:
      'These are works of the United States federal government and its agencies, or of the named non-profit publisher. We link to the originals; figures quoted in our own pages are our summaries of them, and the original release governs.',
    items: [
      {
        name: 'Internal Revenue Service (IRS)',
        publisher: 'US Department of the Treasury',
        url: 'https://www.irs.gov/',
        what:
          'The federal tax authority. Publishes the annual inflation adjustments, every form and instruction, Publication 17 for individuals, and the filing and payment deadlines.',
        useFor:
          'Confirming a bracket, standard deduction or credit amount, downloading a form, and checking a deadline or penalty rate.',
        links: [
          {
            label: 'Tax year 2026 inflation adjustments (IR-2025-103)',
            url: 'https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill',
          },
          { label: 'Forms, instructions and publications', url: 'https://www.irs.gov/forms-instructions' },
          { label: 'Publication 17 — Your Federal Income Tax', url: 'https://www.irs.gov/publications/p17' },
          { label: 'Self-employment tax (Schedule SE)', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes' },
        ],
      },
      {
        name: 'Social Security Administration (SSA)',
        publisher: 'Social Security Administration',
        url: 'https://www.ssa.gov/',
        what:
          'Sets and publishes the annual Social Security wage base, the cost-of-living adjustment and the earnings test figures.',
        useFor:
          'Confirming the current wage base used in our payroll tax calculation — $184,500 for 2026.',
        links: [
          { label: 'Annual cost-of-living and wage base fact sheet', url: 'https://www.ssa.gov/news/press/factsheets/colafacts2026.pdf' },
        ],
      },
      {
        name: 'Tax Foundation',
        publisher: 'Tax Foundation (independent non-profit, Washington DC)',
        url: 'https://taxfoundation.org/',
        what:
          'A non-profit tax policy research organisation. Publishes an annual consolidated table of federal brackets and a state-by-state comparison of individual income tax rates.',
        useFor:
          'Cross-checking a federal bracket table at a glance, and comparing state income tax rates in one place.',
        links: [
          { label: '2026 federal tax brackets', url: 'https://taxfoundation.org/data/all/federal/2026-tax-brackets/' },
          { label: 'State individual income tax rates', url: 'https://taxfoundation.org/data/all/state/state-income-tax-rates/' },
        ],
      },
      {
        name: 'Federation of Tax Administrators',
        publisher: 'Federation of Tax Administrators',
        url: 'https://taxadmin.org/state-tax-agencies/',
        what:
          'Maintains a directory of every US state revenue department, which is the authoritative source for state-level rates, credits and local add-ons.',
        useFor:
          'Verifying the state figure our calculator estimates, and finding your own state\u2019s filing portal.',
        links: [{ label: 'Directory of state tax agencies', url: 'https://taxadmin.org/state-tax-agencies/' }],
      },
      {
        name: 'US Government Publishing Office — Internal Revenue Code',
        publisher: 'US Government Publishing Office',
        url: 'https://uscode.house.gov/browse/prelim@title26&edition=prelim',
        what: 'The statute itself, Title 26 of the United States Code.',
        useFor: 'Reading the text of a section when a summary is not enough — for example the self-employment tax or capital gains provisions.',
      },
    ],
  },
  {
    title: 'Provincial revenue authorities (sales tax on services)',
    intro:
      'Services are taxed provincially in Pakistan, not federally. If you invoice for services, the authority for the province where the service is provided sets your rate — which is why there is no single national services rate.',
    attribution:
      'Each authority publishes its own schedule of taxable services and rates. Those schedules are the property of the respective provincial government and are linked, not reproduced.',
    items: [
      {
        name: 'Sindh Revenue Board (SRB)',
        publisher: 'Government of Sindh',
        url: 'https://www.srb.gos.pk/',
        what: 'Sales tax on services in Sindh, with its own schedule of taxable services and rates.',
        useFor: 'Karachi and wider Sindh service businesses, and registration for Sindh services tax.',
        links: [{ label: 'SRB laws, rules and rate schedule', url: 'https://www.srb.gos.pk/laws/laws.jsp' }],
      },
      {
        name: 'Punjab Revenue Authority (PRA)',
        publisher: 'Government of the Punjab',
        url: 'https://pra.punjab.gov.pk/',
        what: 'Sales tax on services in Punjab, plus the Punjab professional tax regime.',
        useFor: 'Lahore and Punjab service providers checking their rate and filing obligation.',
        links: [{ label: 'PRA acts, rules and notifications', url: 'https://pra.punjab.gov.pk/acts_rules' }],
      },
      {
        name: 'Khyber Pakhtunkhwa Revenue Authority (KPRA)',
        publisher: 'Government of Khyber Pakhtunkhwa',
        url: 'https://kpra.kp.gov.pk/',
        what: 'Sales tax on services in Khyber Pakhtunkhwa.',
        useFor: 'Peshawar and KP businesses, which frequently get quoted Sindh or Punjab rates in error.',
      },
      {
        name: 'Balochistan Revenue Authority (BRA)',
        publisher: 'Government of Balochistan',
        url: 'https://bra.gob.pk/',
        what: 'Sales tax on services in Balochistan.',
        useFor: 'Quetta and Balochistan service providers.',
      },
    ],
  },
  {
    title: 'Professional firm commentaries',
    intro:
      'Every year after the budget, the large accounting firms publish detailed memoranda analysing each amendment section by section. They are written for practitioners, so they are dense — but they are the most reliable free analysis available in Pakistan, and they cite the sections they discuss.',
    attribution:
      'These memoranda are the copyrighted work of the named firms. We link to their own publication pages so you read their analysis in their words; we do not reproduce, summarise as our own, or host their documents.',
    items: [
      {
        name: 'A. F. Ferguson & Co. (PwC Pakistan)',
        publisher: 'A. F. Ferguson & Co., a member firm of PwC',
        url: 'https://www.pwc.com/pk/',
        what:
          'One of Pakistan\u2019s oldest practices. Its annual budget memorandum on the Finance Act is a standard reference for tax practitioners.',
        useFor:
          'Understanding precisely what changed in a section and how the firm reads the amendment.',
        links: [{ label: 'PwC Pakistan tax publications and budget memorandum', url: 'https://www.pwc.com/pk/en/tax.html' }],
      },
      {
        name: 'KPMG Taseer Hadi & Co.',
        publisher: 'KPMG Taseer Hadi & Co., member firm of KPMG International',
        url: 'https://kpmg.com/pk/',
        what: 'Publishes budget briefs, tax alerts and sector commentaries on Pakistani tax changes.',
        useFor: 'A second professional reading when an amendment is ambiguous.',
        links: [{ label: 'KPMG Pakistan insights and budget briefs', url: 'https://kpmg.com/pk/en/home/insights.html' }],
      },
      {
        name: 'EY Ford Rhodes',
        publisher: 'EY Ford Rhodes, member firm of Ernst & Young Global',
        url: 'https://www.ey.com/en_pk',
        what: 'Budget commentaries and tax alerts covering federal and provincial changes.',
        useFor: 'Corporate and cross-border tax questions, and withholding tax rate cards.',
        links: [{ label: 'EY Pakistan tax services and alerts', url: 'https://www.ey.com/en_pk/services/tax' }],
      },
      {
        name: 'Deloitte Yousuf Adil',
        publisher: 'Yousuf Adil, Chartered Accountants, member of Deloitte',
        url: 'https://www.deloitte.com/pk/en.html',
        what: 'Annual Finance Act analysis and periodic tax updates.',
        useFor: 'Comparing professional interpretations of the same amendment.',
        links: [{ label: 'Deloitte Pakistan insights', url: 'https://www.deloitte.com/pk/en/services/tax.html' }],
      },
      {
        name: 'Tola Associates',
        publisher: 'Tola Associates, Karachi',
        url: 'https://tolaassociates.com/',
        what:
          'A Karachi practice known for its detailed pre-budget proposals and tax memoranda, published free as PDFs each year.',
        useFor:
          'Budget-season reading, and understanding the policy reasoning behind a change rather than just its text.',
        links: [{ label: 'Tola Associates publications', url: 'https://tolaassociates.com/publications/' }],
      },
      {
        name: 'Institute of Chartered Accountants of Pakistan (ICAP)',
        publisher: 'ICAP',
        url: 'https://www.icap.org.pk/',
        what:
          'The professional body for chartered accountants. Publishes technical guidance, budget comments and its members\u2019 directory.',
        useFor: 'Verifying that a practitioner you are about to engage is actually qualified.',
        links: [{ label: 'ICAP publications and technical releases', url: 'https://www.icap.org.pk/publications/' }],
      },
      {
        name: 'Institute of Cost and Management Accountants of Pakistan (ICMA)',
        publisher: 'ICMA Pakistan',
        url: 'https://www.icmap.com.pk/',
        what: 'Professional body publishing budget commentaries and management accounting guidance.',
        useFor: 'Costing, payroll and management reporting perspectives on tax changes.',
      },
    ],
  },
  {
    title: 'Journalism and independent analysis',
    intro:
      'Useful for understanding context and direction of travel — why a measure was introduced, whether it is working, what is likely next. Not a substitute for the statute when you need a number.',
    attribution:
      'Articles and columns linked here are the copyrighted work of the named publications and their authors, including the individual columnists credited. Headlines and bylines belong to them; we link so you can read the original and see who wrote it.',
    items: [
      {
        name: 'Business Recorder',
        publisher: 'Business Recorder (Business Recorder Group, Karachi)',
        url: 'https://www.brecorder.com/',
        what:
          'Pakistan\u2019s main financial daily. Its tax coverage and opinion columns — including the long-running commentary by Huzaima Bukhari and Dr Ikramul Haq of Huzaima & Ikram — are the most consistent critical analysis of FBR policy available.',
        useFor:
          'Following what is actually happening in tax administration, and reading informed criticism of it.',
        links: [
          { label: 'Taxation coverage', url: 'https://www.brecorder.com/taxation' },
          { label: 'Opinion and columns', url: 'https://www.brecorder.com/opinion' },
        ],
      },
      {
        name: 'Dawn Business & Finance',
        publisher: 'Dawn (Pakistan Herald Publications)',
        url: 'https://www.dawn.com/business',
        what: 'Budget reporting and economic analysis in accessible English.',
        useFor: 'A readable first understanding of a budget before you read the memoranda.',
        links: [{ label: 'Dawn business section', url: 'https://www.dawn.com/business' }],
      },
      {
        name: 'Profit (Pakistan Today)',
        publisher: 'Profit magazine, Pakistan Today',
        url: 'https://profit.pakistantoday.com.pk/',
        what: 'Long-form business journalism on Pakistani companies, sectors and fiscal policy.',
        useFor: 'Understanding the commercial effect of a tax measure on a sector.',
      },
      {
        name: 'The News — Business',
        publisher: 'The News International (Jang Group)',
        url: 'https://www.thenews.com.pk/latest/category/business',
        what: 'Daily coverage of FBR announcements, budget measures and IMF programme conditions.',
        useFor: 'Keeping up with deadline extensions and new notifications.',
      },
    ],
  },
];

function ResourcesPage() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Pakistan, United States and India tax resources',
    itemListElement: GROUPS.flatMap((g) => g.items).map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-green-900 dark:text-green-100">
        Tax &amp; Business Resources — Pakistan, the USA &amp; India
      </h1>
      <p className="mt-3 text-green-700 dark:text-green-300 leading-relaxed">
        A curated directory of the sources we rely on when we write and update TaxSaathi — the
        official portals that carry legal authority, the provincial authorities that most people
        overlook, the US federal releases behind our American figures, India’s CBDT and Income Tax Department guidance, the professional firm
        memoranda that explain each year&rsquo;s amendments, and the journalism worth following.
        For each one we name the publisher, link directly to the documents worth opening, and say
        what it is actually good for, so you can verify anything we have written.
      </p>
      <p className="mt-3 text-sm text-green-700 dark:text-green-300">
        We link to these sources rather than reproducing their articles. Their work belongs to them,
        and a copy adds nothing you could not get from the original. If you want our own explanations
        of Pakistani, US and Indian tax, those are in our{' '}
        <Link to="/articles" search={{ page: 1 }} className="underline font-medium">
          articles
        </Link>
        .
      </p>

      {GROUPS.map((group) => (
        <section key={group.title} className="mt-10">
          <h2 className="text-xl font-bold text-green-900 dark:text-green-100">{group.title}</h2>
          <p className="mt-2 text-green-800 dark:text-green-300 leading-relaxed">{group.intro}</p>
          <p className="mt-2 rounded-lg bg-green-50 dark:bg-slate-800/60 px-3 py-2 text-xs text-green-700 dark:text-green-400 leading-relaxed">
            <span className="font-semibold">Attribution:</span> {group.attribution}
          </p>
          <div className="mt-5 space-y-4">
            {group.items.map((item) => (
              <div
                key={item.name}
                className="pop-panel bg-card p-5"
              >
                <h3 className="font-semibold text-green-900 dark:text-white">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-green-300 hover:decoration-green-600"
                  >
                    {item.name}
                  </a>
                  <IndiaReferenceCheck url={item.url} />
                </h3>
                <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                  Published by {item.publisher} · {hostOf(item.url)}
                </p>
                <p className="mt-2 text-sm text-green-800 dark:text-green-300 leading-relaxed">
                  {item.what}
                </p>
                <p className="mt-2 text-sm text-green-700 dark:text-green-400 leading-relaxed">
                  <span className="font-semibold">Use it for:</span> {item.useFor}
                </p>
                {item.links && (
                  <div className="mt-3 border-t border-green-100 dark:border-slate-700 pt-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-green-700 dark:text-green-300">
                      Open the original
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {item.links.map((l) => (
                        <li key={l.url} className="flex min-w-0 gap-2 text-sm">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                          <span className="min-w-0">
                          <a
                            href={l.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="min-w-0 break-words text-green-800 dark:text-green-300 underline decoration-green-300 hover:decoration-green-600"
                          >
                            {l.label} <span className="text-xs text-green-600 dark:text-green-500">({hostOf(l.url)})</span>
                          </a>
                          <IndiaReferenceCheck url={l.url} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="mt-10 pop-panel bg-green-50 dark:bg-slate-800/60 p-5 text-sm">
        <p className="text-green-900 dark:text-green-100 font-semibold">
          Compiled and reviewed by the TaxSaathi editorial team
        </p>
        <p className="mt-1 text-green-700 dark:text-green-300">
          Last reviewed September 2026. We are not affiliated with, endorsed by, or paid by any
          organisation listed here, and no listing was bought. Every name above is the publisher&rsquo;s
          own; trade marks and copyright remain with them. Links are provided for reference and
          verification only, we do not host or reproduce their material, and we are not responsible
          for third-party content. If you believe a link is wrong, out of date, or should be removed,{' '}
          <Link to="/contact" className="underline font-medium">
            tell us
          </Link>{' '}
          and we will correct it. See our{' '}
          <Link to="/editorial-standards" className="underline font-medium">
            editorial standards
          </Link>{' '}
          for how we choose and check sources.
        </p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </div>
  );
}

export default ResourcesPage;
