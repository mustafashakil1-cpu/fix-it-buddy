// PTA (Pakistan Telecommunication Authority) mobile phone registration tax bands.
// Values are approximate, based on publicly published PTA tax tables, and are meant
// for general guidance only — actual tax is determined by PTA/customs at the time of
// registration and can change with government notifications.

export interface PtaTaxBand {
  id: string;
  label: string; // human readable value range, e.g. "$1 - $30"
  minValueUsd: number;
  maxValueUsd: number | null; // null = open-ended top band
  cnicTaxPkr: number; // tax when registering on CNIC (passport also mirrors this for most bands)
  passportTaxPkr: number; // tax when registering on Passport (usually same or slightly lower)
}

export const PTA_TAX_LAST_UPDATED = 'January 2024 (approximate — verify with PTA before paying)';

export const PTA_TAX_BANDS: PtaTaxBand[] = [
  { id: 'band-1', label: 'Up to $30', minValueUsd: 0, maxValueUsd: 30, cnicTaxPkr: 550, passportTaxPkr: 430 },
  { id: 'band-2', label: '$30 - $100', minValueUsd: 30, maxValueUsd: 100, cnicTaxPkr: 4323, passportTaxPkr: 3200 },
  { id: 'band-3', label: '$100 - $200', minValueUsd: 100, maxValueUsd: 200, cnicTaxPkr: 11561, passportTaxPkr: 9580 },
  { id: 'band-4', label: '$200 - $350', minValueUsd: 200, maxValueUsd: 350, cnicTaxPkr: 14661, passportTaxPkr: 12200 },
  { id: 'band-5', label: '$350 - $500', minValueUsd: 350, maxValueUsd: 500, cnicTaxPkr: 23420, passportTaxPkr: 17800 },
  { id: 'band-6', label: 'Above $500', minValueUsd: 500, maxValueUsd: null, cnicTaxPkr: 37007, passportTaxPkr: 27600 },
];

export interface CommonPhoneModel {
  id: string;
  name: string;
  approxValueUsd: number;
}

// A short list of common phone models with an approximate customs value, so users who
// don't know their phone's declared value can just pick a model.
export const COMMON_PHONE_MODELS: CommonPhoneModel[] = [
  { id: 'iphone-11', name: 'iPhone 11', approxValueUsd: 260 },
  { id: 'iphone-12', name: 'iPhone 12', approxValueUsd: 330 },
  { id: 'iphone-13', name: 'iPhone 13', approxValueUsd: 420 },
  { id: 'iphone-14', name: 'iPhone 14', approxValueUsd: 480 },
  { id: 'iphone-15', name: 'iPhone 15', approxValueUsd: 560 },
  { id: 'samsung-a15', name: 'Samsung Galaxy A15', approxValueUsd: 90 },
  { id: 'samsung-s23', name: 'Samsung Galaxy S23', approxValueUsd: 420 },
  { id: 'samsung-s24', name: 'Samsung Galaxy S24', approxValueUsd: 480 },
  { id: 'xiaomi-redmi-note', name: 'Xiaomi Redmi Note Series', approxValueUsd: 110 },
  { id: 'oppo-reno', name: 'Oppo Reno Series', approxValueUsd: 200 },
  { id: 'vivo-y-series', name: 'Vivo Y Series', approxValueUsd: 95 },
  { id: 'google-pixel', name: 'Google Pixel', approxValueUsd: 350 },
];
