const referenceChecks: Record<string, { checkedOn: string; verified: boolean }> = {
  'https://incometaxindia.gov.in/': { checkedOn: '2026-10-08', verified: false },
  'https://www.incometaxindia.gov.in/income-tax-calculator': { checkedOn: '2026-10-08', verified: false },
  'https://www.incometax.gov.in/iec/foportal/': { checkedOn: '2026-10-08', verified: true },
};

/** Dates record an actual link check, not a review of the source's tax rules. */
export default function IndiaReferenceCheck({ url }: { url: string }) {
  const check = referenceChecks[url];
  if (!check) return null;

  const dateLabel = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${check.checkedOn}T00:00:00Z`));

  return (
    <span className="text-xs font-normal text-muted-foreground">
      {' '}— {check.verified ? 'Link last verified' : 'Last checked'}:{' '}
      <time dateTime={check.checkedOn}>{dateLabel}</time>
      {!check.verified && ' (automated access blocked; verification pending)'}
    </span>
  );
}