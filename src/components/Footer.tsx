import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { getSellerWhatsAppNumber } from '../utils/whatsapp';

interface FooterProps {
  onOpenConsultation: () => void;
  onOpenSettings: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenConsultation,
  onOpenSettings,
  onOpenAdmin,
}) => {
  const sellerPhone = getSellerWhatsAppNumber();

  const handleGeneralWhatsApp = () => {
    const text = encodeURIComponent(
      "Hello MIREX SCENT Concierge! 🌿 I am visiting your website and would like to ask a question about your fragrance collections and ordering."
    );
    window.open(`https://wa.me/${sellerPhone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-[#3E312D] dark:bg-[#120C0A] text-[#F7F3EF] dark:text-[#EFE8DF] pt-16 pb-12 border-t border-[#DCCBB8]/30 dark:border-[#3D2F2A] font-sans transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#F7F3EF]/10 dark:border-[#3D2F2A]">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="inline-block group">
              <span className="font-serif text-3xl font-normal tracking-[0.22em] uppercase text-[#F7F3EF] dark:text-[#F5EFEB] block">
                MIREX SCENT
              </span>
              <span className="text-[10px] tracking-[0.38em] uppercase text-[#B98F77] dark:text-[#D4A388] font-medium block">
                Haute Parfumerie & Extrait
              </span>
            </a>

            <p className="text-xs text-[#F7F3EF]/70 dark:text-[#C2B5AC] max-w-sm leading-relaxed font-light">
              Artisanal extrait de parfum formulations handcrafted in limited small batches. Every flacon contains over 30% pure perfume oil for an unforgettable 24-hour olfactory signature.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#B98F77] dark:text-[#D4A388]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Grasse Botanical Extractions & Mysore Sandalwood</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B98F77] dark:text-[#D4A388] font-semibold block">
              Curations
            </span>
            <ul className="space-y-2 text-xs text-[#F7F3EF]/75 dark:text-[#C2B5AC]">
              <li>
                <a href="#collection" className="hover:text-[#F7F3EF] dark:hover:text-white transition-colors">
                  Santal Impérial (No. 01)
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#F7F3EF] dark:hover:text-white transition-colors">
                  Oud Nocturne (No. 02)
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#F7F3EF] dark:hover:text-white transition-colors">
                  Rose Ancienne & Pivoine (No. 03)
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#F7F3EF] dark:hover:text-white transition-colors">
                  Discovery Atelier Trio (3x10ml)
                </a>
              </li>
            </ul>
          </div>

          {/* WhatsApp Concierge Column */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs uppercase tracking-[0.2em] text-[#B98F77] dark:text-[#D4A388] font-semibold block">
              Direct WhatsApp Concierge
            </span>
            <p className="text-xs text-[#F7F3EF]/70 dark:text-[#C2B5AC] leading-relaxed font-light">
              Chat directly with our master nose for fragrance consultations, personalized scent recommendations, and secure direct payments via bank transfer or card links.
            </p>

            <button
              onClick={handleGeneralWhatsApp}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B98F77] dark:bg-[#C8977D] text-white hover:bg-[#a57a62] transition-colors rounded text-xs uppercase tracking-wider font-semibold cursor-pointer shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Message Concierge (+{sellerPhone})</span>
            </button>

            <div className="text-[11px] text-[#F7F3EF]/50 dark:text-[#C2B5AC]/50 pt-1">
              Active Hours: 08:00 — 22:00 (GMT+1) · Fast response
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7F3EF]/50 dark:text-[#C2B5AC]/50">
          <div>
            © {new Date().getFullYear()} MIREX SCENT. All Rights Reserved. Artisanal Haute Parfumerie.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenConsultation}
              className="hover:text-[#F7F3EF] dark:hover:text-white transition-colors cursor-pointer"
            >
              Fragrance Quiz
            </button>
            <a href="#how-it-works" className="hover:text-[#F7F3EF] dark:hover:text-white transition-colors">
              Payment Terms
            </a>
            <button
              onClick={onOpenSettings}
              className="hover:text-[#F7F3EF] dark:hover:text-white transition-colors cursor-pointer"
            >
              Concierge Settings
            </button>
            <button
              onClick={onOpenAdmin}
              className="text-[#B98F77] dark:text-[#D4A388] hover:underline transition-colors cursor-pointer flex items-center gap-1 font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#B98F77] dark:bg-[#D4A388]" />
              Admin Portal
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
