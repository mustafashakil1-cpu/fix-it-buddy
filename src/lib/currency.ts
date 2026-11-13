export type SupportedCountry = 'PK' | 'US';

export const COUNTRY_LABELS: Record<SupportedCountry, string> = {
  PK: 'Pakistan',
  US: 'United States',
};

export const CURRENCIES = {
  PKR: 'Pakistani rupee', USD: 'US dollar', INR: 'Indian rupee', EUR: 'Euro',
  GBP: 'British pound', AED: 'UAE dirham', SAR: 'Saudi riyal', CAD: 'Canadian dollar',
  AUD: 'Australian dollar', NZD: 'New Zealand dollar', SGD: 'Singapore dollar',
  HKD: 'Hong Kong dollar', JPY: 'Japanese yen', CNY: 'Chinese yuan', CHF: 'Swiss franc',
  BDT: 'Bangladeshi taka', LKR: 'Sri Lankan rupee', NPR: 'Nepalese rupee',
  QAR: 'Qatari riyal', KWD: 'Kuwaiti dinar', BHD: 'Bahraini dinar', OMR: 'Omani rial',
  MYR: 'Malaysian ringgit', IDR: 'Indonesian rupiah', THB: 'Thai baht',
  PHP: 'Philippine peso', KRW: 'South Korean won', ZAR: 'South African rand',
  NGN: 'Nigerian naira', EGP: 'Egyptian pound', TRY: 'Turkish lira',
  BRL: 'Brazilian real', MXN: 'Mexican peso', SEK: 'Swedish krona',
  NOK: 'Norwegian krone', DKK: 'Danish krone', PLN: 'Polish zloty',
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;
export function isCurrencyCode(value: unknown): value is CurrencyCode {
  return typeof value === 'string' && Object.hasOwn(CURRENCIES, value);
}
export function defaultCurrency(country: SupportedCountry): CurrencyCode {
  return country === 'US' ? 'USD' : 'PKR';
}
export function supportsAutomaticTax(country: SupportedCountry, currency: CurrencyCode): boolean {
  return currency === defaultCurrency(country);
}

export function formatMoney(value: number, currency: CurrencyCode): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency', currency, currencyDisplay: 'code',
  }).format(value);
}

export function formatCurrency(value: number, country: SupportedCountry): string {
  if (country === 'US') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(Math.round(value));
  }
  return `Rs ${Math.round(value).toLocaleString('en-PK')}`;
}