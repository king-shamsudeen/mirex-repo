import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, MessageCircle, RotateCcw } from 'lucide-react';
import { Product, Currency, formatPrice } from '../types';
import { buildConsultationWhatsAppUrl } from '../utils/whatsapp';

interface ScentFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currency: Currency;
  onSelectProduct: (product: Product) => void;
}

export const ScentFinderModal: React.FC<ScentFinderModalProps> = ({
  isOpen,
  onClose,
  products,
  currency,
  onSelectProduct,
}) => {
  const [step, setStep] = useState<number>(1);
  const [vibe, setVibe] = useState<string>('');
  const [setting, setSetting] = useState<string>('');
  const [strength, setStrength] = useState<string>('');

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setVibe('');
    setSetting('');
    setStrength('');
  };

  // Determine recommendation based on choices
  let recommendedProduct: Product = products[0]; // fallback
  if (vibe.includes('Smoky') || setting.includes('Formal Galas')) {
    recommendedProduct = products.find(p => p.id === 'oud-nocturne') || products[0];
  } else if (vibe.includes('Floral') || vibe.includes('Romance')) {
    recommendedProduct = products.find(p => p.id === 'rose-ancienne') || products[0];
  } else if (vibe.includes('Sunlit') || setting.includes('Summer')) {
    recommendedProduct = products.find(p => p.id === 'citrus-bergamote') || products.find(p => p.id === 'solstice-blanc') || products[0];
  } else if (vibe.includes('Explorer')) {
    recommendedProduct = products.find(p => p.id === 'discovery-atelier') || products[0];
  } else {
    recommendedProduct = products.find(p => p.id === 'santal-imperial') || products[0];
  }

  const handleConsultationWhatsApp = () => {
    const url = buildConsultationWhatsAppUrl({
      vibe,
      setting,
      strength,
      suggestedProduct: recommendedProduct,
    }, currency);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-[#15100E]/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative bg-[#FAF7F3] dark:bg-[#1D1513] rounded-2xl max-w-xl w-full border border-[#DCCBB8] dark:border-[#3D2F2A] shadow-2xl p-6 sm:p-8 overflow-hidden transition-colors duration-200"
      >
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#3E312D]/70 dark:text-[#C2B5AC] hover:text-[#3E312D] dark:hover:text-[#F5EFEB] hover:bg-[#DCCBB8]/40 dark:hover:bg-[#271E1B] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs tracking-[0.24em] uppercase text-[#B98F77] dark:text-[#D4A388] font-sans font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Artisanal Scent Matcher</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#3E312D] dark:text-[#F5EFEB] mt-1 font-normal">
            Find Your Signature Mirex Scent
          </h2>
          <p className="text-xs text-[#3E312D]/70 dark:text-[#C2B5AC] font-sans mt-1">
            Answer 3 short questions to discover the exact extrait de parfum tailored to your skin and presence.
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-[#EFE8DF] dark:bg-[#271E1B] h-1.5 rounded-full overflow-hidden mb-6">
          <div 
            className="bg-[#3E312D] dark:bg-[#F5EFEB] h-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Step 1: Vibe */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-wider text-[#3E312D] dark:text-[#F5EFEB] font-sans font-semibold">
              Question 1 of 3: What mood or atmosphere speaks to you?
            </div>
            <div className="space-y-2.5">
              {[
                { title: 'Warm, Royal & Architectural', desc: 'Aged Mysore Sandalwood, Spiced Cardamom, Amber', val: 'Warm Sandalwood & Amber' },
                { title: 'Dark, Smoky & Seductive', desc: 'Wild Cambodian Oud, Saffron, Black Amber, Incense', val: 'Smoky Oud & Saffron' },
                { title: 'Velvety, Romantic & Dewy', desc: 'Centifolia Grasse Rose, Pink Pepper, White Peony', val: 'Velvety Floral & Rose' },
                { title: 'Luminous, Fresh & Sunlit', desc: 'Calabrian Bergamot, Neroli Blossom, Mineral Driftwood', val: 'Sunlit Citrus & Driftwood' },
                { title: 'Curious Connoisseur', desc: 'I want to sample multiple facets and wear varied scents', val: 'Curious Explorer' }
              ].map((opt) => (
                <button
                  key={opt.title}
                  type="button"
                  onClick={() => {
                    setVibe(opt.val);
                    setStep(2);
                  }}
                  className={`w-full p-3.5 text-left rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                    vibe === opt.val
                      ? 'border-[#3E312D] dark:border-[#F5EFEB] bg-[#EFE8DF] dark:bg-[#251D1A]'
                      : 'border-[#DCCBB8] dark:border-[#3D2F2A] bg-white dark:bg-[#201815] hover:border-[#B98F77] hover:bg-[#FAF7F3] dark:hover:bg-[#271E1B]'
                  }`}
                >
                  <div>
                    <div className="font-serif text-base text-[#3E312D] dark:text-[#F5EFEB] group-hover:text-[#B98F77] dark:group-hover:text-[#D4A388] transition-colors">
                      {opt.title}
                    </div>
                    <div className="text-[11px] text-[#3E312D]/60 dark:text-[#C2B5AC]/70 font-sans mt-0.5">
                      {opt.desc}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#3E312D]/40 dark:text-[#C2B5AC]/40 group-hover:text-[#3E312D] dark:group-hover:text-[#F5EFEB] transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Occasion */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-wider text-[#3E312D] dark:text-[#F5EFEB] font-sans font-semibold">
              Question 2 of 3: Where do you intend to wear this?
            </div>
            <div className="space-y-2.5">
              {[
                { title: 'Formal Galas & Intimate Dinners', desc: 'Unforgettable, hypnotic evening allure', val: 'Formal Galas & Evenings' },
                { title: 'Executive Daytime Signature', desc: 'Sophisticated, calm boardroom authority', val: 'Executive Daytime' },
                { title: 'Weekend Leisure & Travel', desc: 'Effortless, fresh, and soothing elegance', val: 'Weekend Leisure' },
                { title: 'All Occasions & Versatility', desc: 'A signature scent that adapts to morning and night', val: 'Versatile Day & Night' }
              ].map((opt) => (
                <button
                  key={opt.title}
                  type="button"
                  onClick={() => {
                    setSetting(opt.val);
                    setStep(3);
                  }}
                  className={`w-full p-3.5 text-left rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                    setting === opt.val
                      ? 'border-[#3E312D] dark:border-[#F5EFEB] bg-[#EFE8DF] dark:bg-[#251D1A]'
                      : 'border-[#DCCBB8] dark:border-[#3D2F2A] bg-white dark:bg-[#201815] hover:border-[#B98F77] hover:bg-[#FAF7F3] dark:hover:bg-[#271E1B]'
                  }`}
                >
                  <div>
                    <div className="font-serif text-base text-[#3E312D] dark:text-[#F5EFEB] group-hover:text-[#B98F77] dark:group-hover:text-[#D4A388] transition-colors">
                      {opt.title}
                    </div>
                    <div className="text-[11px] text-[#3E312D]/60 dark:text-[#C2B5AC]/70 font-sans mt-0.5">
                      {opt.desc}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#3E312D]/40 dark:text-[#C2B5AC]/40 group-hover:text-[#3E312D] dark:group-hover:text-[#F5EFEB] transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-xs text-[#3E312D]/60 dark:text-[#C2B5AC]/70 underline hover:text-[#3E312D] dark:hover:text-[#F5EFEB] font-sans cursor-pointer pt-2"
            >
              ← Back to question 1
            </button>
          </div>
        )}

        {/* Step 3: Strength & Longevity */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-wider text-[#3E312D] dark:text-[#F5EFEB] font-sans font-semibold">
              Question 3 of 3: Desired projection aura?
            </div>
            <div className="space-y-2.5">
              {[
                { title: 'Commanding & Bold (24h Extrait)', desc: 'Leaves an unforgettable sillage trail in any room', val: '24h Commanding Sillage' },
                { title: 'Moderate & Elegant', desc: 'Noticeable at conversational arm’s length distance', val: 'Enveloping Moderate Aura' },
                { title: 'Intimate & Sensual', desc: 'A skin scent discovered only when close', val: 'Intimate Skin Scent' }
              ].map((opt) => (
                <button
                  key={opt.title}
                  type="button"
                  onClick={() => {
                    setStrength(opt.val);
                    setStep(4);
                  }}
                  className={`w-full p-3.5 text-left rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                    strength === opt.val
                      ? 'border-[#3E312D] dark:border-[#F5EFEB] bg-[#EFE8DF] dark:bg-[#251D1A]'
                      : 'border-[#DCCBB8] dark:border-[#3D2F2A] bg-white dark:bg-[#201815] hover:border-[#B98F77] hover:bg-[#FAF7F3] dark:hover:bg-[#271E1B]'
                  }`}
                >
                  <div>
                    <div className="font-serif text-base text-[#3E312D] dark:text-[#F5EFEB] group-hover:text-[#B98F77] dark:group-hover:text-[#D4A388] transition-colors">
                      {opt.title}
                    </div>
                    <div className="text-[11px] text-[#3E312D]/60 dark:text-[#C2B5AC]/70 font-sans mt-0.5">
                      {opt.desc}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#3E312D]/40 dark:text-[#C2B5AC]/40 group-hover:text-[#3E312D] dark:group-hover:text-[#F5EFEB] transition-transform group-hover:translate-x-1 shrink-0 ml-2" />
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="text-xs text-[#3E312D]/60 dark:text-[#C2B5AC]/70 underline hover:text-[#3E312D] dark:hover:text-[#F5EFEB] font-sans cursor-pointer pt-2"
            >
              ← Back to question 2
            </button>
          </div>
        )}

        {/* Step 4: Matched Result */}
        {step === 4 && (
          <div className="space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#DCCBB8]/50 dark:bg-[#3D2F2A] text-[#3E312D] dark:text-[#F5EFEB] text-xs uppercase tracking-widest font-sans rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-[#B98F77] dark:text-[#D4A388]" />
              <span>Your Olfactory Match</span>
            </div>

            {/* Product Card Showcase */}
            <div className="p-4 bg-white dark:bg-[#251D1A] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded-xl flex items-center gap-4 text-left">
              <img
                src={recommendedProduct.image}
                alt={recommendedProduct.name}
                className="w-24 h-24 object-cover rounded-lg bg-[#EFE8DF] dark:bg-[#1D1513] shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] tracking-widest uppercase text-[#B98F77] dark:text-[#D4A388] font-sans font-semibold block">
                  {recommendedProduct.family} · {recommendedProduct.number}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#3E312D] dark:text-[#F5EFEB] font-normal truncate">
                  {recommendedProduct.name}
                </h3>
                <p className="text-xs text-[#3E312D]/75 dark:text-[#C2B5AC] font-sans mt-0.5 line-clamp-2">
                  {recommendedProduct.subtitle}
                </p>
                <div className="text-xs font-serif text-[#3E312D] dark:text-[#F5EFEB] font-medium mt-1">
                  Starting at {formatPrice(recommendedProduct.variants[0]?.price || 0, currency)}
                </div>
              </div>
            </div>

            <div className="text-xs text-[#3E312D]/75 dark:text-[#C2B5AC] font-sans leading-relaxed text-left bg-[#F0EAE1] dark:bg-[#221A17] p-3.5 rounded-lg border border-[#DCCBB8] dark:border-[#3D2F2A]">
              <span className="font-semibold text-[#3E312D] dark:text-[#F5EFEB] block mb-1">
                Why this matches your answers:
              </span>
              Matches your preference for <em>{vibe}</em> during <em>{setting}</em> with <em>{strength}</em>. Formulated at 30%+ pure extrait concentration for exceptional skin tenacity.
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleConsultationWhatsApp}
                className="w-full sm:flex-1 py-3 px-4 bg-[#3E312D] dark:bg-[#F5EFEB] text-[#F7F3EF] dark:text-[#15100E] hover:bg-[#281F1D] dark:hover:bg-[#E2DDD8] rounded text-xs uppercase tracking-wider font-semibold font-sans transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-[#B98F77] dark:text-[#C8977D]" />
                <span>Inquire Match on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSelectProduct(recommendedProduct);
                }}
                className="w-full sm:w-auto py-3 px-4 border border-[#3E312D] dark:border-[#F5EFEB]/40 text-[#3E312D] dark:text-[#F5EFEB] hover:bg-[#DCCBB8]/30 dark:hover:bg-[#271E1B] rounded text-xs uppercase tracking-wider font-sans transition-colors cursor-pointer"
              >
                View Full Notes
              </button>
            </div>

            <button
              onClick={handleReset}
              className="text-xs text-[#3E312D]/60 dark:text-[#C2B5AC]/70 hover:text-[#3E312D] dark:hover:text-[#F5EFEB] inline-flex items-center gap-1.5 font-sans pt-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Fragrance Matcher</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
