import React, { useState } from 'react';
import { X, MessageCircle, ShoppingBag, Clock, Sparkles, Check, ShieldCheck } from 'lucide-react';
import { Product, Currency, formatPrice } from '../types';
import { buildSingleProductWhatsAppUrl } from '../utils/whatsapp';

interface ProductDetailModalProps {
  product: Product | null;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (product: Product, volume: string, price: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedVolume, setSelectedVolume] = useState<string>(product.defaultVolume);
  const [customNote, setCustomNote] = useState<string>('');
  const [addedFeedback, setAddedFeedback] = useState(false);

  const activeVariant = product.variants.find(v => v.volume === selectedVolume) || product.variants[0];
  const currentPrice = activeVariant ? activeVariant.price : product.variants[0]?.price || 0;

  const handleAddToCart = () => {
    onAddToCart(product, selectedVolume, currentPrice);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1400);
  };

  const handleDirectWhatsApp = () => {
    const url = buildSingleProductWhatsAppUrl(product, selectedVolume, currentPrice, currency, customNote);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-[#15100E]/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div 
        className="relative bg-[#FAF7F3] dark:bg-[#1D1513] rounded-2xl max-w-4xl w-full border border-[#DCCBB8] dark:border-[#3D2F2A] shadow-2xl overflow-hidden my-8 transition-colors duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#FAF7F3]/90 dark:bg-[#1D1513]/90 text-[#3E312D] dark:text-[#F5EFEB] hover:bg-[#DCCBB8]/50 dark:hover:bg-[#271E1B] transition-colors cursor-pointer border border-[#DCCBB8] dark:border-[#3D2F2A]"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Flacon Photography */}
          <div className="md:col-span-5 bg-[#EFE8DF] dark:bg-[#251D1A] relative flex items-center justify-center min-h-[300px] md:min-h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center max-h-[500px]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-[#F7F3EF]/95 dark:bg-[#15100E]/95 backdrop-blur-md p-3 rounded border border-[#DCCBB8] dark:border-[#3D2F2A] text-xs font-sans text-[#3E312D] dark:text-[#F5EFEB] flex items-center justify-between">
              <span className="tracking-wider uppercase font-medium">{product.number}</span>
              <span className="text-[#B98F77] dark:text-[#D4A388]">{product.concentration}</span>
            </div>
          </div>

          {/* Right Column: Scent Profile & WhatsApp Inquiry */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-xs text-[#B98F77] dark:text-[#D4A388] font-sans tracking-[0.24em] uppercase font-medium">
                <span>{product.family}</span>
                <span aria-hidden="true" className="text-[#3E312D]/30 dark:text-[#F5EFEB]/30">·</span>
                <span>{product.frenchTitle || 'Haute Parfumerie'}</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#3E312D] dark:text-[#F5EFEB] mt-1 font-normal">
                {product.name}
              </h2>

              <p className="text-sm text-[#3E312D]/80 dark:text-[#C2B5AC] font-sans mt-2 italic">
                {product.subtitle}
              </p>
            </div>

            {/* Perfumer Story */}
            <div className="text-xs text-[#3E312D]/80 dark:text-[#C2B5AC] font-sans leading-relaxed border-t border-b border-[#DCCBB8]/60 dark:border-[#3D2F2A] py-3.5 space-y-2">
              <span className="font-medium tracking-wider uppercase text-[#3E312D] dark:text-[#F5EFEB] block text-[11px]">
                The Scent Creation
              </span>
              <p>{product.story}</p>
            </div>

            {/* Olfactory Pyramid Breakdown */}
            <div id="pyramid" className="space-y-3">
              <span className="font-sans text-xs tracking-wider uppercase text-[#3E312D] dark:text-[#F5EFEB] font-medium block">
                Olfactory Pyramid
              </span>

              <div className="space-y-2 text-xs font-sans bg-[#F0EAE1] dark:bg-[#271E1B] p-3.5 rounded-lg border border-[#DCCBB8]/70 dark:border-[#3D2F2A]">
                <div className="flex items-start gap-2">
                  <span className="text-[10px] tracking-widest uppercase text-[#B98F77] dark:text-[#D4A388] font-semibold w-14 shrink-0 mt-0.5">
                    Top:
                  </span>
                  <span className="text-[#3E312D] dark:text-[#F5EFEB]">
                    {product.pyramid.top.join(' · ')}
                  </span>
                </div>
                <div className="flex items-start gap-2 border-t border-[#DCCBB8]/50 dark:border-[#3D2F2A] pt-2">
                  <span className="text-[10px] tracking-widest uppercase text-[#B98F77] dark:text-[#D4A388] font-semibold w-14 shrink-0 mt-0.5">
                    Heart:
                  </span>
                  <span className="text-[#3E312D] dark:text-[#F5EFEB]">
                    {product.pyramid.heart.join(' · ')}
                  </span>
                </div>
                <div className="flex items-start gap-2 border-t border-[#DCCBB8]/50 dark:border-[#3D2F2A] pt-2">
                  <span className="text-[10px] tracking-widest uppercase text-[#B98F77] dark:text-[#D4A388] font-semibold w-14 shrink-0 mt-0.5">
                    Base:
                  </span>
                  <span className="text-[#3E312D] dark:text-[#F5EFEB]">
                    {product.pyramid.base.join(' · ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Longevity & Sillage Badges */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-2.5 rounded bg-[#FAF7F3] dark:bg-[#221A17] border border-[#DCCBB8] dark:border-[#3D2F2A] text-xs font-sans">
                <div className="flex items-center gap-1.5 text-[#B98F77] dark:text-[#D4A388] font-medium text-[11px] uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Longevity</span>
                </div>
                <div className="text-[#3E312D] dark:text-[#F5EFEB] font-serif text-base mt-0.5">
                  {product.longevity}
                </div>
              </div>

              <div className="p-2.5 rounded bg-[#FAF7F3] dark:bg-[#221A17] border border-[#DCCBB8] dark:border-[#3D2F2A] text-xs font-sans">
                <div className="flex items-center gap-1.5 text-[#B98F77] dark:text-[#D4A388] font-medium text-[11px] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Sillage</span>
                </div>
                <div className="text-[#3E312D] dark:text-[#F5EFEB] font-serif text-base mt-0.5">
                  {product.sillage}
                </div>
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="text-xs uppercase tracking-wider text-[#3E312D]/70 dark:text-[#C2B5AC] font-sans mb-1.5 flex justify-between">
                <span>Select Volume</span>
                <span className="font-semibold text-[#3E312D] dark:text-[#F5EFEB]">{selectedVolume}</span>
              </div>
              <div className="flex items-center gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.volume}
                    type="button"
                    onClick={() => setSelectedVolume(v.volume)}
                    className={`flex-1 py-2 px-3 text-xs font-sans tracking-wide rounded-md transition-all cursor-pointer ${
                      selectedVolume === v.volume
                        ? 'bg-[#3E312D] dark:bg-[#F5EFEB] text-[#F7F3EF] dark:text-[#15100E] font-medium shadow-xs'
                        : 'bg-[#EFE8DF] dark:bg-[#271E1B] text-[#3E312D]/80 dark:text-[#C2B5AC] hover:bg-[#DCCBB8] dark:hover:bg-[#3D2F2A]'
                    }`}
                  >
                    <div>{v.volume}</div>
                    <div className="text-[11px] opacity-80">{formatPrice(v.price, currency)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Customer Note / Delivery City */}
            <div>
              <label htmlFor="custom-note" className="block text-[11px] uppercase tracking-wider text-[#3E312D]/60 dark:text-[#C2B5AC]/70 font-sans mb-1">
                Optional note to perfumer or delivery city:
              </label>
              <input
                id="custom-note"
                type="text"
                placeholder="e.g. Delivery to London, custom wax seal note..."
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-[#FAF7F3] dark:bg-[#15100E] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded font-sans text-[#3E312D] dark:text-[#F5EFEB] focus:outline-none focus:ring-1 focus:ring-[#B98F77]"
              />
            </div>

            {/* Price & Action Buttons */}
            <div className="pt-2 border-t border-[#DCCBB8] dark:border-[#3D2F2A] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#3E312D]/60 dark:text-[#C2B5AC]/60 block font-sans">
                  Total Investment
                </span>
                <span className="font-serif text-3xl font-normal text-[#3E312D] dark:text-[#F5EFEB] tabular-nums">
                  {formatPrice(currentPrice, currency)}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="px-4 py-3 border border-[#3E312D] dark:border-[#F5EFEB]/40 text-[#3E312D] dark:text-[#F5EFEB] hover:bg-[#DCCBB8]/30 dark:hover:bg-[#271E1B] rounded text-xs font-sans uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {addedFeedback ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDirectWhatsApp}
                  className="flex-1 sm:flex-none px-5 py-3 bg-[#3E312D] dark:bg-[#F5EFEB] text-[#F7F3EF] dark:text-[#15100E] hover:bg-[#281F1D] dark:hover:bg-[#E2DDD8] rounded text-xs font-sans uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-[#B98F77] dark:text-[#C8977D]" />
                  <span>Inquire & Pay on WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Reassurance text */}
            <div className="text-[11px] text-[#3E312D]/60 dark:text-[#C2B5AC]/70 font-sans flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B98F77] dark:text-[#D4A388]" />
              <span>Official Mirex Scent Concierge. Bank transfer & card payment instructions sent on chat.</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
