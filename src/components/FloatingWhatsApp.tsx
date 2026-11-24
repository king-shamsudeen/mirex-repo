import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getSellerWhatsAppNumber } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
  const sellerPhone = getSellerWhatsAppNumber();

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(
      "Hello MIREX SCENT Concierge! 🌿 I am on your website and would like to ask about available perfumes and placing an order."
    );
    window.open(`https://wa.me/${sellerPhone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end flex-col gap-2 pointer-events-auto">
      {/* Subtle popup bubble */}
      {!tooltipDismissed && (
        <div className="bg-[#FAF7F3] dark:bg-[#1D1513] border border-[#DCCBB8] dark:border-[#3D2F2A] shadow-xl rounded-xl p-3 max-w-[220px] text-xs font-sans text-[#3E312D] dark:text-[#F5EFEB] relative animate-fade-in transition-colors duration-200">
          <button
            onClick={() => setTooltipDismissed(true)}
            className="absolute top-1.5 right-1.5 p-0.5 text-[#3E312D]/50 dark:text-[#C2B5AC]/60 hover:text-[#3E312D] dark:hover:text-[#F5EFEB]"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="font-semibold text-[#B98F77] dark:text-[#D4A388] text-[11px] uppercase tracking-wider mb-0.5">
            Mirex Scent Concierge
          </div>
          <p className="text-[11px] text-[#3E312D]/80 dark:text-[#C2B5AC] leading-snug">
            Have questions about scents or payment? Chat directly on WhatsApp!
          </p>
        </div>
      )}

      {/* Floating CTA Button */}
      <button
        onClick={handleOpenWhatsApp}
        className="flex items-center gap-2.5 px-4 py-3 bg-[#3E312D] dark:bg-[#F5EFEB] hover:bg-[#281F1D] dark:hover:bg-[#E2DDD8] text-[#F7F3EF] dark:text-[#15100E] rounded-full shadow-2xl transition-all transform hover:scale-105 cursor-pointer border border-[#DCCBB8]/50 dark:border-[#3D2F2A] group"
        aria-label="Chat on WhatsApp"
      >
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <MessageCircle className="w-4 h-4 text-[#B98F77] dark:text-[#C8977D]" />
        <span className="text-xs uppercase tracking-wider font-sans font-medium whitespace-nowrap">
          WhatsApp Concierge
        </span>
      </button>
    </div>
  );
};
