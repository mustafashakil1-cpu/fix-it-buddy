import { Link } from '@tanstack/react-router';
import type { PageGuide as PageGuideData } from '@/data/pageGuides';

interface PageGuideProps {
  guide: PageGuideData;
}

/**
 * Renders the long-form explanatory content that sits underneath a tool or service page:
 * sections, a worked example, an FAQ block (with FAQPage structured data) and the
 * editorial review line.
 */
function PageGuide({ guide }: PageGuideProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section className="mt-12 print:hidden">
      <div className="prose-taxsaathi max-w-none">
        {guide.sections.map((section) => (
          <div key={section.heading} className="mb-8">
            <h2 className="text-xl font-bold text-green-900 dark:text-green-100">
              {section.heading}
            </h2>
            {section.paragraphs?.map((p) => (
              <p key={p.slice(0, 40)} className="mt-3 text-green-800 dark:text-green-300 leading-relaxed">
                {p}
              </p>
            ))}
            {section.bullets && (
              <ul className="mt-3 space-y-2 text-green-800 dark:text-green-300">
                {section.bullets.map((b) => (
                  <li key={b.slice(0, 40)} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-600" />
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            )}
            {section.table && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm border border-green-200 dark:border-slate-700">
                  <thead className="bg-green-50 dark:bg-slate-800">
                    <tr>
                      {section.table.headers.map((h) => (
                        <th
                          key={h}
                          className="text-left px-3 py-2 font-semibold text-green-900 dark:text-green-100 border-b border-green-200 dark:border-slate-700"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row) => (
                      <tr key={row.join('|')} className="border-b border-green-100 dark:border-slate-700 last:border-0">
                        {row.map((cell, i) => (
                          <td key={i} className="px-3 py-2 text-green-800 dark:text-green-300">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}

        {guide.faqs.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-green-900 dark:text-green-100">
              Frequently asked questions
            </h2>
            <div className="mt-4 space-y-4">
              {guide.faqs.map((f) => (
                <div
                  key={f.q}
                  className="pop-panel bg-card p-5"
                >
                  <h3 className="font-semibold text-green-900 dark:text-white">{f.q}</h3>
                  <p className="mt-2 text-sm text-green-800 dark:text-green-300 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pop-panel bg-green-50 dark:bg-slate-800/60 p-5 text-sm">
        <p className="text-green-900 dark:text-green-100 font-semibold">
          Written and reviewed by the TaxSaathi editorial team
        </p>
        <p className="mt-1 text-green-700 dark:text-green-300">
          Last reviewed {guide.lastReviewed}. Pakistan guidance is checked against the Finance Act
          and FBR, PTA and SECP publications. US guidance is checked against IRS and US Treasury
          releases, Social Security Administration figures and the relevant state revenue agency.
          View our{' '}
          <Link to="/resources" className="underline font-medium">
            official source directory
          </Link>{' '}
          and read how we research and update our content in our{' '}
          <Link to="/editorial-standards" className="underline font-medium">
            editorial standards
          </Link>
          . This page is general information, not personalised tax or legal advice — see our{' '}
          <Link to="/disclaimer" className="underline font-medium">
            disclaimer
          </Link>
          .
        </p>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </section>
  );
}

export default PageGuide;
