/** Inventory — dummy stock (no backend). */

export type StockCategory = "perlengkapan" | "dokumen" | "medis" | "konsumsi" | "operasional";

export interface StockItem {
  id: string;
  sku: string;
  name: string;
  category: StockCategory;
  quantity: number;
  /** Minimum stok sebelum peringatan rendah. */
  minQuantity: number;
  unit: string;
  location: string;
  lastRestocked: string;
}

export const stockItems: StockItem[] = [
  {
    id: "inv-01",
    sku: "ZK-001",
    name: "Zam-zam botol 500ml (koper jamaah)",
    category: "konsumsi",
    quantity: 240,
    minQuantity: 120,
    unit: "botol",
    location: "Gudang Jakarta",
    lastRestocked: "3 hari lalu",
  },
  {
    id: "inv-02",
    sku: "IH-104",
    name: "Ihram set dewasa (L)",
    category: "perlengkapan",
    quantity: 18,
    minQuantity: 40,
    unit: "set",
    location: "Gudang Jakarta",
    lastRestocked: "12 hari lalu",
  },
  {
    id: "inv-03",
    sku: "IH-105",
    name: "Ihram set dewasa (XL)",
    category: "perlengkapan",
    quantity: 42,
    minQuantity: 40,
    unit: "set",
    location: "Gudang Jakarta",
    lastRestocked: "12 hari lalu",
  },
  {
    id: "inv-04",
    sku: "BK-visa-folder",
    name: "Map dokumen visa A4",
    category: "dokumen",
    quantity: 800,
    minQuantity: 200,
    unit: "pcs",
    location: "Front office",
    lastRestocked: "1 hari lalu",
  },
  {
    id: "inv-05",
    sku: "MD-paracetamol",
    name: "Paracetamol 500mg (strip)",
    category: "medis",
    quantity: 45,
    minQuantity: 60,
    unit: "strip",
    location: "Kit medis",
    lastRestocked: "6 hari lalu",
  },
  {
    id: "inv-06",
    sku: "MD-ORS",
    name: "Oralit / ORS sachet",
    category: "medis",
    quantity: 120,
    minQuantity: 80,
    unit: "sachet",
    location: "Kit medis",
    lastRestocked: "4 hari lalu",
  },
  {
    id: "inv-07",
    sku: "OP-lanyard",
    name: "Lanyard ID card SA'YA",
    category: "operasional",
    quantity: 8,
    minQuantity: 50,
    unit: "pcs",
    location: "Marketing",
    lastRestocked: "30 hari lalu",
  },
  {
    id: "inv-08",
    sku: "OP-bag-tag",
    name: "Bag tag koper plastik",
    category: "operasional",
    quantity: 220,
    minQuantity: 100,
    unit: "pcs",
    location: "Gudang Bandung",
    lastRestocked: "8 hari lalu",
  },
  {
    id: "inv-09",
    sku: "PL-sajadah",
    name: "Sajadah travel lipat",
    category: "perlengkapan",
    quantity: 15,
    minQuantity: 35,
    unit: "pcs",
    location: "Gudang Surabaya",
    lastRestocked: "20 hari lalu",
  },
  {
    id: "inv-10",
    sku: "KN-air-mineral",
    name: "Air mineral 600ml (logistik bus)",
    category: "konsumsi",
    quantity: 9,
    minQuantity: 48,
    unit: "dus",
    location: "Gudang Jakarta",
    lastRestocked: "2 hari lalu",
  },
];

const categoryLabels: Record<StockCategory, string> = {
  perlengkapan: "Perlengkapan",
  dokumen: "Dokumen",
  medis: "Medis",
  konsumsi: "Konsumsi",
  operasional: "Operasional",
};

export function categoryLabel(c: StockCategory): string {
  return categoryLabels[c];
}

/** Stok di atau di bawah minimum = perlu reorder segera. */
export function isLowStock(item: StockItem): boolean {
  return item.quantity <= item.minQuantity;
}

/** Mendekati minimum (antara min+1 dan 125% min) — peringatan lunak. */
export function isNearLow(item: StockItem): boolean {
  if (isLowStock(item)) return false;
  const softCap = Math.max(item.minQuantity + 1, Math.ceil(item.minQuantity * 1.25));
  return item.quantity <= softCap;
}

export function lowStockCount(items: StockItem[]): number {
  return items.filter(isLowStock).length;
}

export function nearLowCount(items: StockItem[]): number {
  return items.filter(isNearLow).length;
}
