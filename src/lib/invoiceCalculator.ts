export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface DocumentTotals {
  subtotal: number;
  taxAmount: number;
  total: number;
}

export function calculateLineTotal(item: LineItem): number {
  return item.quantity * item.unitPrice;
}

export function calculateDocumentTotals(items: LineItem[], taxRatePercent: number): DocumentTotals {
  const subtotal = items.reduce((sum, item) => sum + calculateLineTotal(item), 0);
  const taxAmount = (subtotal * taxRatePercent) / 100;
  return { subtotal, taxAmount, total: subtotal + taxAmount };
}

export function createEmptyLineItem(): LineItem {
  return { id: crypto.randomUUID(), description: '', quantity: 1, unitPrice: 0 };
}
