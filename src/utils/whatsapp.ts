import { CartItem, CustomerDetails, Product, Currency, formatPrice } from '../types';

export const DEFAULT_WHATSAPP_NUMBER = '2348133851163'; // Official Mirex concierge WhatsApp line

export function getSellerWhatsAppNumber(): string {
  try {
    const saved = localStorage.getItem('mirex_concierge_whatsapp');
    if (saved && saved.trim() && saved.trim() !== '2348012345678') {
      return saved.trim();
    }
    // Automatically set and return the official seller number
    localStorage.setItem('mirex_concierge_whatsapp', DEFAULT_WHATSAPP_NUMBER);
    return DEFAULT_WHATSAPP_NUMBER;
  } catch {
    return DEFAULT_WHATSAPP_NUMBER;
  }
}

export function saveSellerWhatsAppNumber(phone: string): void {
  try {
    const cleaned = phone.replace(/[^0-9]/g, '');
    localStorage.setItem('mirex_concierge_whatsapp', cleaned || DEFAULT_WHATSAPP_NUMBER);
  } catch (e) {
    console.error('Failed to save whatsapp number', e);
  }
}

/**
 * Format a single product direct inquiry message
 */
export function buildSingleProductWhatsAppUrl(
  product: Product,
  volume: string,
  price: number,
  currency: Currency = 'USD',
  customNote?: string
): string {
  const sellerPhone = getSellerWhatsAppNumber();
  const formattedPrice = formatPrice(price, currency);
  
  const lines: string[] = [
    `✨ *MIREX SCENT — FRAGRANCE ENQUIRY* ✨`,
    ``,
    `Hello Mirex Concierge, I would like to purchase the following flacon:`,
    `• *Fragrance:* ${product.name} (${product.number})`,
    `• *Olfactory Profile:* ${product.subtitle}`,
    `• *Selected Size:* ${volume}`,
    `• *Price:* ${formattedPrice} (${currency})`,
    `• *Concentration:* ${product.concentration}`,
    ``,
    customNote ? `💬 *Note / Delivery City:* ${customNote}\n` : '',
    `Could you please confirm availability and provide your payment details (Direct Bank Wire / Online Card Link) and delivery timeline?`,
    ``,
    `Thank you!`
  ].filter(Boolean);

  const encodedText = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${sellerPhone}?text=${encodedText}`;
}

/**
 * Format full cart / multi-item WhatsApp checkout message
 */
export function buildCartCheckoutWhatsAppUrl(
  cartItems: CartItem[],
  products: Product[],
  customer: CustomerDetails,
  currency: Currency = 'USD'
): { url: string; rawText: string; totalAmount: number; formattedTotal: string } {
  const sellerPhone = getSellerWhatsAppNumber();
  
  const productMap = new Map(products.map(p => [p.id, p]));
  
  let totalAmount = 0;
  const itemsTextList: string[] = [];

  cartItems.forEach((item, index) => {
    const prod = productMap.get(item.productId);
    const itemSubtotal = item.unitPrice * item.quantity;
    totalAmount += itemSubtotal;
    const name = prod ? prod.name : 'Mirex Scent';
    const formattedItemTotal = formatPrice(itemSubtotal, currency);
    itemsTextList.push(
      `${index + 1}. *${name}* — ${item.volume} [Qty: ${item.quantity}] → ${formattedItemTotal}`
    );
  });

  const formattedTotal = formatPrice(totalAmount, currency);

  const lines = [
    `✨ *MIREX SCENT — NEW ORDER & PAYMENT ENQUIRY* ✨`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `*ORDERED SELECTIONS:*`,
    ...itemsTextList,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `💰 *TOTAL INVESTMENT:* ${formattedTotal} (${currency})`,
    ``,
    `*DELIVERY & CLIENT DETAILS:*`,
    `• *Full Name:* ${customer.fullName || 'Not specified'}`,
    `• *Contact Phone:* ${customer.phone || 'Not specified'}`,
    `• *Delivery City:* ${customer.city || 'Standard Delivery'}`,
    `• *Delivery Address:* ${customer.deliveryAddress || 'To be confirmed in chat'}`,
    `• *Preferred Payment:* ${customer.paymentMethod}`,
    customer.notes ? `• *Special Request:* ${customer.notes}` : '',
    ``,
    `Please confirm stock availability and send account/payment instructions to complete this order. Thank you!`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━`
  ].filter(Boolean);

  const rawText = lines.join('\n');
  const encodedText = encodeURIComponent(rawText);
  const url = `https://wa.me/${sellerPhone}?text=${encodedText}`;

  return { url, rawText, totalAmount, formattedTotal };
}

/**
 * Format a Scent Consultation WhatsApp message
 */
export function buildConsultationWhatsAppUrl(
  answers: { vibe: string; setting: string; strength: string; suggestedProduct?: Product },
  currency: Currency = 'USD'
): string {
  const sellerPhone = getSellerWhatsAppNumber();

  const lines = [
    `🌿 *MIREX SCENT — PERSONAL OLFACTORY CONSULTATION* 🌿`,
    ``,
    `Hello Mirex Concierge, I completed the Scent Matcher questionnaire on your website:`,
    `• *Desired Mood/Vibe:* ${answers.vibe}`,
    `• *Primary Occasion:* ${answers.setting}`,
    `• *Projection Strength:* ${answers.strength}`,
    answers.suggestedProduct 
      ? `• *Recommended Fragrance:* ${answers.suggestedProduct.name} (${formatPrice(answers.suggestedProduct.variants[0]?.price || 0, currency)}+)` 
      : '',
    ``,
    `I'd love your bespoke recommendation and sample/order details via WhatsApp! Thank you.`
  ].filter(Boolean);

  const encodedText = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${sellerPhone}?text=${encodedText}`;
}
