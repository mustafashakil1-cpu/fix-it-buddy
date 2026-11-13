import { PTA_TAX_BANDS, PtaTaxBand } from './ptaTaxSlabs';

export type PtaRegistrationType = 'cnic' | 'passport';

export interface PtaTaxResult {
  band: PtaTaxBand;
  registrationType: PtaRegistrationType;
  taxPkr: number;
  valueUsd: number;
}

export function findPtaBand(valueUsd: number): PtaTaxBand {
  const band = PTA_TAX_BANDS.find(
    (b) => valueUsd >= b.minValueUsd && (b.maxValueUsd === null || valueUsd <= b.maxValueUsd),
  );
  return band ?? PTA_TAX_BANDS[PTA_TAX_BANDS.length - 1];
}

export function calculatePtaTax(valueUsd: number, registrationType: PtaRegistrationType): PtaTaxResult {
  const band = findPtaBand(valueUsd);
  const taxPkr = registrationType === 'cnic' ? band.cnicTaxPkr : band.passportTaxPkr;
  return { band, registrationType, taxPkr, valueUsd };
}
