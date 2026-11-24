import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, Copy, Check, ShieldCheck, ArrowRight, QrCode } from 'lucide-react';
import { CartItem, CustomerDetails, Product, Currency, formatPrice } from '../types';
import { buildCartCheckoutWhatsAppUrl } from '../utils/whatsapp';

interface WhatsAppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  products: Product[];
  currency: Currency;
  onUpdateQuantity: (productId: string, volume: string, delta: number) => void;
  onRemoveItem: (productId: string, volume: string) => void;
  onClearCart: () => void;
}

export const WhatsAppDrawer: React.FC<WhatsAppDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  products,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    deliveryAddress: '',
    city: '',
    paymentMethod: 'Bank Transfer',
    notes: '',
  });

  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  if (!isOpen) return null;

  const productMap = new Map(products.map(p => [p.id, p]));

  const { url, rawText, totalAmount, formattedTotal } = buildCartCheckoutWhatsAppUrl(
    cartItems,
    products,
    customer,
    currency
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLaunchWhatsApp = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-[#15100E]/70 backdrop-blur-sm flex justify-end"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-xl bg-[#FAF7F3] dark:bg-[#1D1513] h-full shadow-2xl flex flex-col border-l border-[#DCCBB8] dark:border-[#3D2F2A] overflow-hidden transition-colors duration-200"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#DCCBB8] dark:border-[#3D2F2A] flex items-center justify-between bg-[#F7F3EF] dark:bg-[#15100E]">
          <div>
            <span className="text-[10px] tracking-[0.24em] uppercase text-[#B98F77] dark:text-[#D4A388] font-sans font-semibold block">
              Mirex Concierge
            </span>
            <h2 className="font-serif text-2xl font-normal text-[#3E312D] dark:text-[#F5EFEB]">
              WhatsApp Inquiry Bag
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-xs text-[#3E312D]/60 dark:text-[#C2B5AC]/70 hover:text-red-600 dark:hover:text-red-400 underline font-sans mr-2 cursor-pointer"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close bag"
              className="p-2 rounded-full hover:bg-[#DCCBB8]/50 dark:hover:bg-[#271E1B] text-[#3E312D] dark:text-[#F5EFEB] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Empty State */}
          {cartItems.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#EFE8DF] dark:bg-[#271E1B] flex items-center justify-center text-[#B98F77] dark:text-[#D4A388]">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-normal text-[#3E312D] dark:text-[#F5EFEB]">
                Your inquiry bag is empty
              </h3>
              <p className="text-xs text-[#3E312D]/70 dark:text-[#C2B5AC] font-sans max-w-xs mx-auto">
                Explore our collection of artisanal perfumes. Add your desired scents and size variants here to inquire directly on WhatsApp.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-[#3E312D] dark:bg-[#F5EFEB] text-[#F7F3EF] dark:text-[#15100E] rounded text-xs uppercase tracking-wider font-sans hover:bg-[#281F1D] dark:hover:bg-[#E2DDD8] cursor-pointer"
              >
                Browse Fragrances
              </button>
            </div>
          ) : (
            <>
              {/* Selected Items List */}
              <div className="space-y-3">
                <span className="text-xs font-sans tracking-wider uppercase text-[#3E312D] dark:text-[#F5EFEB] font-semibold block">
                  Selected Flacons ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
                </span>

                <div className="divide-y divide-[#DCCBB8]/60 dark:divide-[#3D2F2A] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded-xl overflow-hidden bg-[#FFFDFB] dark:bg-[#251D1A]">
                  {cartItems.map((item) => {
                    const prod = productMap.get(item.productId);
                    if (!prod) return null;
                    const itemTotal = item.unitPrice * item.quantity;

                    return (
                      <div key={`${item.productId}-${item.volume}`} className="p-4 flex items-center gap-4">
                        {/* Thumbnail */}
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-16 h-16 object-cover rounded-md bg-[#EFE8DF] dark:bg-[#1D1513] border border-[#DCCBB8]/50 dark:border-[#3D2F2A]"
                          referrerPolicy="no-referrer"
                        />

                        {/* Title & Volume */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-lg text-[#3E312D] dark:text-[#F5EFEB] truncate">
                            {prod.name}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-[#3E312D]/70 dark:text-[#C2B5AC] font-sans mt-0.5">
                            <span className="font-medium text-[#B98F77] dark:text-[#D4A388]">{item.volume}</span>
                            <span>·</span>
                            <span className="tabular-nums">{formatPrice(item.unitPrice, currency)} each</span>
                          </div>
                        </div>

                        {/* Stepper */}
                        <div className="flex items-center border border-[#DCCBB8] dark:border-[#3D2F2A] rounded bg-[#FAF7F3] dark:bg-[#1D1513]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.productId, item.volume, -1)}
                            className="p-1.5 text-[#3E312D]/70 dark:text-[#C2B5AC] hover:text-[#3E312D] dark:hover:text-[#F5EFEB] hover:bg-[#DCCBB8]/30 dark:hover:bg-[#271E1B] cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold tabular-nums text-[#3E312D] dark:text-[#F5EFEB]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.productId, item.volume, 1)}
                            className="p-1.5 text-[#3E312D]/70 dark:text-[#C2B5AC] hover:text-[#3E312D] dark:hover:text-[#F5EFEB] hover:bg-[#DCCBB8]/30 dark:hover:bg-[#271E1B] cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div className="text-right">
                          <div className="font-serif text-base text-[#3E312D] dark:text-[#F5EFEB] font-medium tabular-nums">
                            {formatPrice(itemTotal, currency)}
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.productId, item.volume)}
                            className="text-[11px] text-red-600 dark:text-red-400 hover:text-red-800 font-sans mt-1 cursor-pointer flex items-center gap-1 justify-end"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Customer Details Form */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans tracking-wider uppercase text-[#3E312D] dark:text-[#F5EFEB] font-semibold">
                    Customer & Delivery Info (Pre-Fills WhatsApp)
                  </span>
                  <span className="text-[10px] text-[#B98F77] dark:text-[#D4A388] font-sans">
                    Optional for fast checkout
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#3E312D]/70 dark:text-[#C2B5AC] mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Eleanor Vance"
                      value={customer.fullName}
                      onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-[#15100E] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded text-xs text-[#3E312D] dark:text-[#F5EFEB] focus:outline-none focus:ring-1 focus:ring-[#B98F77]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#3E312D]/70 dark:text-[#C2B5AC] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +1 555 0192"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-[#15100E] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded text-xs text-[#3E312D] dark:text-[#F5EFEB] focus:outline-none focus:ring-1 focus:ring-[#B98F77]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#3E312D]/70 dark:text-[#C2B5AC] mb-1">
                      Delivery City / State
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. London / Lagos / New York"
                      value={customer.city}
                      onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-[#15100E] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded text-xs text-[#3E312D] dark:text-[#F5EFEB] focus:outline-none focus:ring-1 focus:ring-[#B98F77]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#3E312D]/70 dark:text-[#C2B5AC] mb-1">
                      Preferred Payment Option
                    </label>
                    <select
                      value={customer.paymentMethod}
                      onChange={(e) => setCustomer({ ...customer, paymentMethod: e.target.value as any })}
                      className="w-full px-3 py-2 bg-white dark:bg-[#15100E] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded text-xs text-[#3E312D] dark:text-[#F5EFEB] focus:outline-none focus:ring-1 focus:ring-[#B98F77]"
                    >
                      <option value="Bank Transfer">Direct Bank Transfer</option>
                      <option value="Online Card Link">Online Card Payment Link</option>
                      <option value="Cash on Delivery">Cash on Delivery (Eligible Cities)</option>
                      <option value="Cryptocurrency">USDT / Crypto</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] uppercase tracking-wider text-[#3E312D]/70 dark:text-[#C2B5AC] mb-1">
                      Delivery Address / Notes
                    </label>
                    <input
                      type="text"
                      placeholder="Street address or custom packaging instructions"
                      value={customer.deliveryAddress}
                      onChange={(e) => setCustomer({ ...customer, deliveryAddress: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-[#15100E] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded text-xs text-[#3E312D] dark:text-[#F5EFEB] focus:outline-none focus:ring-1 focus:ring-[#B98F77]"
                    />
                  </div>
                </div>
              </div>

              {/* Toggle WhatsApp Text Preview */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-xs text-[#B98F77] dark:text-[#D4A388] hover:underline font-sans cursor-pointer"
                >
                  {showPreview ? 'Hide Message Preview' : '👁 Preview WhatsApp Message Text'}
                </button>

                {showPreview && (
                  <div className="mt-2 p-3 bg-[#EFE8DF] dark:bg-[#15100E] rounded-lg border border-[#DCCBB8] dark:border-[#3D2F2A] text-xs font-mono whitespace-pre-wrap text-[#3E312D]/90 dark:text-[#C2B5AC] max-h-48 overflow-y-auto">
                    {rawText}
                  </div>
                )}
              </div>

              {/* Payment explanation reminder */}
              <div className="p-3.5 bg-[#F0EAE1] dark:bg-[#221A17] rounded-lg border border-[#DCCBB8] dark:border-[#3D2F2A] text-xs font-sans space-y-1.5">
                <div className="flex items-center gap-1.5 text-[#3E312D] dark:text-[#F5EFEB] font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#B98F77] dark:text-[#D4A388]" />
                  <span>How WhatsApp Payment Works:</span>
                </div>
                <p className="text-[#3E312D]/75 dark:text-[#C2B5AC] text-[11px] leading-relaxed">
                  Clicking the button below opens WhatsApp with your pre-filled order. The Mirex concierge will immediately reply with payment details ({customer.paymentMethod}) and package your scent securely.
                </p>
              </div>
            </>
          )}

        </div>

        {/* Drawer Footer with Total & Direct WhatsApp CTA */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-[#DCCBB8] dark:border-[#3D2F2A] bg-[#F7F3EF] dark:bg-[#15100E] space-y-4">
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] tracking-widest uppercase text-[#3E312D]/60 dark:text-[#C2B5AC]/70 block font-sans">
                  Total Investment
                </span>
                <span className="text-xs text-[#B98F77] dark:text-[#D4A388] font-sans">
                  Free Insured Shipping Included
                </span>
              </div>
              <div className="font-serif text-3xl font-normal text-[#3E312D] dark:text-[#F5EFEB] tabular-nums">
                {formattedTotal}
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCopy}
                title="Copy formatted text to clipboard"
                className="px-3.5 py-3 border border-[#DCCBB8] dark:border-[#3D2F2A] text-[#3E312D] dark:text-[#F5EFEB] hover:bg-[#DCCBB8]/30 dark:hover:bg-[#271E1B] rounded text-xs font-sans uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                type="button"
                onClick={handleLaunchWhatsApp}
                className="flex-1 py-3.5 px-6 bg-[#3E312D] dark:bg-[#F5EFEB] text-[#F7F3EF] dark:text-[#15100E] hover:bg-[#281F1D] dark:hover:bg-[#E2DDD8] rounded text-xs font-sans uppercase tracking-[0.16em] font-semibold transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-md hover:shadow-lg group"
              >
                <MessageCircle className="w-4 h-4 text-[#B98F77] dark:text-[#C8977D] transition-transform group-hover:scale-110" />
                <span>Complete Order on WhatsApp</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
