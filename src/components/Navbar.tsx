import React, { useState } from 'react';
import { ShoppingBag, Settings, Menu, X, Sparkles, Search, Sun, Moon } from 'lucide-react';
import { getSellerWhatsAppNumber } from '../utils/whatsapp';
import { Currency, CURRENCY_CONFIG } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenConsultation: () => void;
  onOpenSettings: () => void;
  onSearchClick: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenConsultation,
  onOpenSettings,
  onSearchClick,
  isDark,
  onToggleTheme,
  currency,
  onCurrencyChange,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sellerPhone = getSellerWhatsAppNumber();

  return (
    <header className="sticky top-0 z-40 bg-[#F7F3EF]/90 dark:bg-[#15100E]/90 backdrop-blur-md border-b border-[#DCCBB8]/60 dark:border-[#3D2F2A] transition-colors duration-200">
      {/* Top Bar Announcement */}
      <div className="bg-[#3E312D] dark:bg-[#1F1714] text-[#F7F3EF] dark:text-[#EFE8DF] px-4 py-1.5 text-center text-xs tracking-widest uppercase font-sans flex items-center justify-center gap-2 border-b dark:border-[#3D2F2A]">
        <span>Artisanal Extrait de Parfum</span>
        <span aria-hidden="true" className="opacity-50">·</span>
        <span>Orders & Payment via WhatsApp Concierge</span>
        <span aria-hidden="true" className="opacity-50">·</span>
        <span className="hidden sm:inline">Complimentary Worldwide Insured Dispatch</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Single element brand wordmark */}
          <a 
            href="#" 
            className="flex flex-col tracking-[0.28em] text-[#3E312D] dark:text-[#F5EFEB] group whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B98F77]"
          >
            <span className="font-serif text-2xl sm:text-3xl font-normal uppercase tracking-[0.24em] transition-opacity group-hover:opacity-80">
              MIREX SCENT
            </span>
            <span className="text-[9px] tracking-[0.38em] uppercase text-[#B98F77] dark:text-[#D4A388] font-sans -mt-1 font-medium">
              Haute Parfumerie
            </span>
          </a>

          {/* Zone 2: 4 concise single-line nav links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-medium tracking-[0.18em] uppercase text-[#3E312D]/80 dark:text-[#F5EFEB]/80">
            <a 
              href="#collection" 
              className="hover:text-[#3E312D] dark:hover:text-[#F5EFEB] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#B98F77]"
            >
              Collection
            </a>
            <a 
              href="#pyramid" 
              className="hover:text-[#3E312D] dark:hover:text-[#F5EFEB] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#B98F77]"
            >
              Notes & Essences
            </a>
            <a 
              href="#how-it-works" 
              className="hover:text-[#3E312D] dark:hover:text-[#F5EFEB] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#B98F77]"
            >
              WhatsApp Payment
            </a>
            <button 
              onClick={onOpenConsultation}
              className="hover:text-[#3E312D] dark:hover:text-[#F5EFEB] flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8 decoration-[#B98F77] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B98F77] dark:text-[#D4A388]" />
              Scent Matcher
            </button>
          </nav>

          {/* Zone 3: 1 primary action + helper utilities */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Currency Selector */}
            <div className="relative">
              <select
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                aria-label="Currency selector"
                className="bg-transparent border border-[#DCCBB8]/70 dark:border-[#3D2F2A] rounded px-2 py-1 text-xs text-[#3E312D] dark:text-[#F5EFEB] font-sans font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#B98F77] hover:bg-[#DCCBB8]/20 dark:hover:bg-[#271E1B]"
              >
                {(Object.keys(CURRENCY_CONFIG) as Currency[]).map((c) => (
                  <option key={c} value={c} className="bg-[#FAF7F3] dark:bg-[#1E1715] text-[#3E312D] dark:text-[#F5EFEB]">
                    {CURRENCY_CONFIG[c].label}
                  </option>
                ))}
              </select>
            </div>

            {/* Dark / Light Theme Toggle */}
            <button
              onClick={onToggleTheme}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              title={isDark ? "Switch to light theme" : "Switch to dark theme"}
              className="p-2 text-[#3E312D]/80 dark:text-[#F5EFEB]/80 hover:text-[#3E312D] dark:hover:text-[#F5EFEB] transition-colors rounded-full hover:bg-[#DCCBB8]/30 dark:hover:bg-[#271E1B] cursor-pointer"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-[#3E312D]" />
              )}
            </button>

            {/* Search Trigger */}
            <button
              onClick={onSearchClick}
              aria-label="Search fragrances"
              className="p-2 text-[#3E312D]/80 dark:text-[#F5EFEB]/80 hover:text-[#3E312D] dark:hover:text-[#F5EFEB] transition-colors rounded-full hover:bg-[#DCCBB8]/30 dark:hover:bg-[#271E1B] cursor-pointer"
              title="Search collection"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Seller Concierge Settings */}
            <button
              onClick={onOpenSettings}
              aria-label="Concierge WhatsApp Settings"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] tracking-wider uppercase text-[#3E312D]/70 dark:text-[#F5EFEB]/70 hover:text-[#3E312D] dark:hover:text-[#F5EFEB] rounded border border-[#DCCBB8]/80 dark:border-[#3D2F2A] hover:bg-[#DCCBB8]/20 dark:hover:bg-[#271E1B] transition-colors cursor-pointer"
              title="Configure recipient WhatsApp number"
            >
              <Settings className="w-3.5 h-3.5 text-[#B98F77] dark:text-[#D4A388]" />
              <span>+{sellerPhone}</span>
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={onOpenAdmin}
              aria-label="Admin Product Portal"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] tracking-wider uppercase text-[#3E312D] dark:text-[#F5EFEB] hover:bg-[#DCCBB8]/30 dark:hover:bg-[#271E1B] rounded border border-[#B98F77]/60 dark:border-[#D4A388]/60 transition-colors cursor-pointer"
              title="Manage and upload perfumes"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#B98F77] dark:bg-[#D4A388]" />
              <span className="font-medium">Admin</span>
            </button>

            {/* Primary Action Button: Inquiry Bag */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2.5 bg-[#3E312D] dark:bg-[#F5EFEB] text-[#F7F3EF] dark:text-[#15100E] hover:bg-[#2D2320] dark:hover:bg-[#E2DDD8] transition-all rounded shadow-sm text-xs font-medium tracking-[0.14em] uppercase cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B98F77]"
            >
              <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-105" />
              <span className="hidden xs:inline">Inquiry Bag</span>
              <span className="px-1.5 py-0.2 bg-[#B98F77] dark:bg-[#C8977D] text-white rounded-full text-[10px] font-sans font-semibold tabular-nums">
                {cartCount}
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#3E312D] dark:text-[#F5EFEB] hover:bg-[#DCCBB8]/30 dark:hover:bg-[#271E1B] rounded cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#DCCBB8]/50 dark:border-[#3D2F2A] space-y-3 font-sans text-xs tracking-widest uppercase">
            <a 
              href="#collection" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#3E312D] dark:text-[#F5EFEB] hover:text-[#B98F77]"
            >
              Full Fragrance Collection
            </a>
            <a 
              href="#pyramid" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#3E312D] dark:text-[#F5EFEB] hover:text-[#B98F77]"
            >
              Notes & Olfactory Pyramid
            </a>
            <a 
              href="#how-it-works" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#3E312D] dark:text-[#F5EFEB] hover:text-[#B98F77]"
            >
              How WhatsApp Payment Works
            </a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="flex items-center gap-2 py-2 text-[#B98F77] dark:text-[#D4A388] font-semibold w-full text-left cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Interactive Scent Finder Quiz
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSettings();
              }}
              className="flex items-center gap-2 py-2 text-[#3E312D]/80 dark:text-[#F5EFEB]/80 w-full text-left border-t border-[#DCCBB8]/40 dark:border-[#3D2F2A] pt-3 cursor-pointer"
            >
              <Settings className="w-4 h-4" />
              Configure Seller WhatsApp Line (+{sellerPhone})
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex items-center gap-2 py-2 text-[#B98F77] dark:text-[#D4A388] font-semibold w-full text-left cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#B98F77] dark:bg-[#D4A388]" />
              Admin Product Upload & Inventory Portal
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
