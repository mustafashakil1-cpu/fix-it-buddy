import { LineItem } from '@/lib/invoiceCalculator';
import type { CurrencyCode } from '@/lib/currency';

export interface BusinessDocumentData {
  currency?: CurrencyCode;
  documentNumber: string;
  date: string;
  fromName: string;
  fromAddress: string;
  fromContact: string;
  toName: string;
  toAddress: string;
  toContact: string;
  items: LineItem[];
  taxRatePercent: number;
  notes: string;
  logoDataUrl?: string;
}

export interface InvoiceData extends BusinessDocumentData {
  dueDate: string;
}

export interface QuotationData extends BusinessDocumentData {
  validUntil: string;
  terms: string;
}
