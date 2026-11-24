export type FragranceFamily = 
  | 'All' 
  | 'Woody & Amber' 
  | 'Smoky Oud' 
  | 'Floral Elegance' 
  | 'Fresh Citrus' 
  | 'Warm Gourmand' 
  | 'Discovery Sets';

export type Currency = 'USD' | 'GBP' | 'EUR' | 'NGN';

export const CURRENCY_CONFIG: Record<Currency, { symbol: string; rate: number; label: string }> = {
  USD: { symbol: '$', rate: 1, label: 'USD ($)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  NGN: { symbol: '₦', rate: 1550, label: 'NGN (₦)' }
};

export function formatPrice(usdAmount: number, currency: Currency): string {
  const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.USD;
  const converted = Math.round(usdAmount * config.rate);
  return `${config.symbol}${converted.toLocaleString()}`;
}

export interface OlfactoryPyramid {
  top: string[];
  heart: string[];
  base: string[];
}

export interface ProductVariant {
  volume: string;
  price: number;
}

export interface Product {
  id: string;
  number: string; // e.g. "No. 01"
  name: string;
  frenchTitle?: string;
  family: FragranceFamily;
  subtitle: string;
  description: string;
  story: string;
  variants: ProductVariant[];
  defaultVolume: string;
  image: string;
  pyramid: OlfactoryPyramid;
  longevity: string; // e.g. "14 - 18 Hours"
  sillage: string; // e.g. "Enveloping & Sophisticated"
  concentration: string; // e.g. "Extrait de Parfum (30% pure oil)"
  inStock: boolean;
  stockNote?: string;
  featured?: boolean;
}

export interface CartItem {
  productId: string;
  volume: string;
  unitPrice: number;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  deliveryAddress: string;
  city: string;
  paymentMethod: 'Bank Transfer' | 'Online Card Link' | 'Cash on Delivery' | 'Cryptocurrency';
  notes: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  perfume: string;
  rating: number;
  content: string;
  verified: boolean;
}
