import React, { useState } from 'react';
import { MessageCircle, Plus, Eye, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { Product, Currency, formatPrice } from '../types';
import { buildSingleProductWhatsAppUrl } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  onOpenDetail: (product: Product) => void;
  onAddToCart: (product: Product, volume: string, price: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onOpenDetail,
  onAddToCart,
}) => {
  const [selectedVolume, setSelectedVolume] = useState<string>(product.defaultVolume);
  const [addedFeedback, setAddedFeedback] = useState(false);

  // Find active variant price
  const activeVariant = product.variants.find(v => v.volume === selectedVolume) || product.variants[0];
  const currentPrice = activeVariant ? activeVariant.price : product.variants[0]?.price || 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedVolume, currentPrice);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1400);
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = buildSingleProductWhatsAppUrl(product, selectedVolume, currentPrice, currency);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.article 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      onClick={() => onOpenDetail(product)}
      className="group flex flex-col bg-[#FAF7F3] dark:bg-[#1D1513] rounded-xl border border-[#DCCBB8]/70 dark:border-[#3D2F2A] overflow-hidden hover:border-[#B98F77]/80 dark:hover:border-[#D4A388]/80 hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] sm:aspect-square bg-[#EFE8DF] dark:bg-[#251D1A] overflow-hidden">
        <img
          src={product.image}
          alt={`${product.name} luxury flacon`}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-106"
        />

        {/* Top Floating Badge: Edition Number */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] tracking-wider uppercase font-sans font-medium px-2 py-1 bg-[#F7F3EF]/90 dark:bg-[#15100E]/90 backdrop-blur-sm rounded text-[#3E312D] dark:text-[#F5EFEB] border border-[#DCCBB8]/60 dark:border-[#3D2F2A]">
            {product.number}
          </span>
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-[#3E312D]/30 dark:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <motion.span 
            initial={{ scale: 0.9, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            className="px-3.5 py-1.5 bg-[#F7F3EF]/95 dark:bg-[#1D1513]/95 text-[#3E312D] dark:text-[#F5EFEB] text-xs tracking-wider uppercase font-sans rounded shadow-md flex items-center gap-1.5 border border-[#DCCBB8] dark:border-[#3D2F2A]"
          >
            <Eye className="w-3.5 h-3.5 text-[#B98F77] dark:text-[#D4A388]" />
            Inspect Olfactory Pyramid
          </motion.span>
        </div>

        {/* Concentration pill in bottom right */}
        <div className="absolute bottom-3 right-3">
          <span className="text-[10px] font-sans tracking-widest uppercase bg-[#3E312D]/80 dark:bg-[#15100E]/80 backdrop-blur-sm text-[#F7F3EF] dark:text-[#EFE8DF] px-2 py-0.5 rounded">
            Extrait 30%
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4">
        
        {/* Unboxed Metadata & Title */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-[#B98F77] dark:text-[#D4A388] font-sans tracking-[0.2em] uppercase font-medium">
            <span>{product.family}</span>
            <span aria-hidden="true" className="text-[#3E312D]/30 dark:text-[#F5EFEB]/30">·</span>
            <span>{product.concentration.split('(')[0].trim()}</span>
          </div>

          <h3 className="font-serif text-2xl font-normal text-[#3E312D] dark:text-[#F5EFEB] group-hover:text-[#B98F77] dark:group-hover:text-[#D4A388] transition-colors leading-tight">
            {product.name}
          </h3>

          <p className="text-xs text-[#3E312D]/70 dark:text-[#C2B5AC] font-sans line-clamp-1 italic">
            {product.subtitle}
          </p>
        </div>

        {/* Olfactory Notes Preview (Unboxed Text with Separators) */}
        <div className="pt-1 text-xs text-[#3E312D]/75 dark:text-[#C2B5AC] font-sans border-t border-[#DCCBB8]/40 dark:border-[#3D2F2A]/60">
          <span className="font-medium text-[#3E312D] dark:text-[#F5EFEB]">Notes: </span>
          <span>{product.pyramid.top[0]}</span>
          <span aria-hidden="true" className="mx-1 text-[#3E312D]/40 dark:text-[#F5EFEB]/30">/</span>
          <span>{product.pyramid.heart[0]}</span>
          <span aria-hidden="true" className="mx-1 text-[#3E312D]/40 dark:text-[#F5EFEB]/30">/</span>
          <span>{product.pyramid.base[0]}</span>
        </div>

        {/* Volume Selection Control */}
        <div className="pt-2">
          <div className="text-[11px] tracking-wider uppercase text-[#3E312D]/60 dark:text-[#C2B5AC]/70 font-sans mb-1.5 flex justify-between items-center">
            <span>Select Size</span>
            <span className="text-[#3E312D] dark:text-[#F5EFEB] font-medium">{selectedVolume}</span>
          </div>
          
          <div className="flex items-center gap-1.5 p-1 bg-[#EFE9E1] dark:bg-[#271E1B] rounded-lg">
            {product.variants.map((v) => (
              <button
                key={v.volume}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVolume(v.volume);
                }}
                className={`flex-1 py-1 px-2 text-xs font-sans tracking-wide rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedVolume === v.volume
                    ? 'bg-[#3E312D] dark:bg-[#F5EFEB] text-[#F7F3EF] dark:text-[#15100E] font-medium shadow-xs'
                    : 'text-[#3E312D]/80 dark:text-[#C2B5AC] hover:text-[#3E312D] dark:hover:text-[#F5EFEB] hover:bg-[#DCCBB8]/40 dark:hover:bg-[#3D2F2A]'
                }`}
              >
                {v.volume}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Primary WhatsApp Order Action */}
        <div className="pt-2 border-t border-[#DCCBB8]/50 dark:border-[#3D2F2A] flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] tracking-wider uppercase text-[#3E312D]/50 dark:text-[#C2B5AC]/60 block font-sans">
              Price
            </span>
            <span className="font-serif text-2xl font-normal text-[#3E312D] dark:text-[#F5EFEB] tabular-nums">
              {formatPrice(currentPrice, currency)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Add to Inquiry Bag */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={handleQuickAdd}
              aria-label="Add to Inquiry Bag"
              title="Add to Inquiry Bag"
              className="p-2.5 rounded border border-[#3E312D]/20 dark:border-[#F5EFEB]/20 text-[#3E312D] dark:text-[#F5EFEB] hover:border-[#3E312D] dark:hover:border-[#F5EFEB] hover:bg-[#DCCBB8]/30 dark:hover:bg-[#271E1B] transition-colors cursor-pointer"
            >
              {addedFeedback ? (
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </motion.button>

            {/* Direct WhatsApp Order CTA */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={handleWhatsAppOrder}
              className="flex items-center gap-1.5 px-3.5 py-2.5 bg-[#3E312D] dark:bg-[#F5EFEB] text-[#F7F3EF] dark:text-[#15100E] hover:bg-[#281F1D] dark:hover:bg-[#E2DDD8] rounded text-xs tracking-wider uppercase font-medium transition-colors cursor-pointer shadow-xs whitespace-nowrap shrink-0 group/btn"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#B98F77] dark:text-[#C8977D] transition-transform group-hover/btn:scale-110" />
              <span>Inquire & Pay</span>
            </motion.button>
          </div>
        </div>

        {/* Bottom subtle stock note */}
        {product.stockNote && (
          <div className="text-[11px] text-[#3E312D]/60 dark:text-[#C2B5AC]/70 font-sans tracking-wide pt-0.5">
            {product.stockNote}
          </div>
        )}

      </div>
    </motion.article>
  );
};
