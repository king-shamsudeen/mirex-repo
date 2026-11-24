import React from 'react';
import { ArrowUpRight, Sparkles, Clock, ShieldCheck, Droplets } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onExploreClick: () => void;
  onOpenConsultation: () => void;
  onQuickWhatsApp: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onOpenConsultation,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#DCCBB8]/70 dark:border-[#3D2F2A] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-Column Split matching the design layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Editorial Text Column with Staggered Entrance */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 lg:space-y-8">
            
            {/* Minimalist Sub-Header Kicker */}
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex items-center gap-3 text-xs tracking-[0.28em] uppercase text-[#B98F77] dark:text-[#D4A388] font-sans font-medium"
            >
              <span>Haute Parfumerie</span>
              <span aria-hidden="true" className="text-[#3E312D]/40 dark:text-[#F5EFEB]/30">·</span>
              <span>30% Pure Extrait</span>
              <span aria-hidden="true" className="text-[#3E312D]/40 dark:text-[#F5EFEB]/30">·</span>
              <span>Grasse Blended</span>
            </motion.div>

            {/* Display Headline with Cinematic Reveal */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] font-normal tracking-tight text-[#3E312D] dark:text-[#F5EFEB] text-balance"
            >
              Fragrance that reveals your <span className="italic font-light text-[#B98F77] dark:text-[#D4A388]">nature</span>
            </motion.h1>

            {/* Body Description */}
            <motion.p 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="font-sans text-base sm:text-lg text-[#3E312D]/75 dark:text-[#C2B5AC] leading-relaxed max-w-xl font-light"
            >
              Minimalist formulations of profound olfactory depth. Hand-blended using aged botanicals, rare Mysore sandalwood, and wild agarwood. Orders and direct payments arranged seamlessly via WhatsApp concierge.
            </motion.p>

            {/* Action Buttons with subtle spring */}
            <motion.div 
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#3E312D] dark:bg-[#F5EFEB] text-[#F7F3EF] dark:text-[#15100E] hover:bg-[#2A211E] dark:hover:bg-[#E2DDD8] transition-all rounded text-xs font-medium tracking-[0.16em] uppercase cursor-pointer group shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Discover Collection</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border border-[#3E312D]/30 dark:border-[#F5EFEB]/30 text-[#3E312D] dark:text-[#F5EFEB] hover:border-[#3E312D] dark:hover:border-[#F5EFEB] hover:bg-[#DCCBB8]/20 dark:hover:bg-[#271E1B] transition-all rounded text-xs font-medium tracking-[0.16em] uppercase cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B98F77] dark:text-[#D4A388]" />
                <span>Scent Matcher</span>
              </button>
            </motion.div>

            {/* Subtle note about WhatsApp concierge */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="pt-2 text-xs text-[#3E312D]/60 dark:text-[#C2B5AC]/70 flex items-center gap-2 font-sans"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#B98F77] dark:bg-[#D4A388] animate-pulse" />
              <span>Direct WhatsApp chat with our master nose for bespoke advice & orders</span>
            </motion.div>

          </div>

          {/* Right Visual Column with Gentle Ambient Float Motion */}
          <div className="lg:col-span-6 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto max-w-lg lg:max-w-none"
            >
              
              {/* Soft decorative background glow pulsating in sync */}
              <motion.div 
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.25, 0.4, 0.25]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                aria-hidden="true" 
                className="absolute inset-0 bg-[#DCCBB8]/40 dark:bg-[#B98F77]/15 blur-2xl transform rotate-2 rounded-3xl"
              />

              {/* Card Container with Subtle Ambient Breathing Motion */}
              <motion.div 
                animate={{
                  y: [0, -6, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="relative rounded-2xl overflow-hidden border border-[#DCCBB8]/80 dark:border-[#3D2F2A] bg-[#EFE9E1] dark:bg-[#1D1513] shadow-2xl group"
              >
                <img
                  src="/src/assets/images/hero_perfume_pedestal_1794472841165.jpg"
                  alt="Mirex Scent flacons displayed on natural stone travertine pedestal with warm botanical shadow"
                  className="w-full h-auto object-cover object-center transform transition-transform duration-700 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Subtle Label in bottom right corner */}
                <div className="absolute bottom-4 right-4 bg-[#F7F3EF]/90 dark:bg-[#15100E]/90 backdrop-blur-md px-3.5 py-1.5 rounded border border-[#DCCBB8]/70 dark:border-[#3D2F2A] text-[11px] font-sans tracking-widest uppercase text-[#3E312D] dark:text-[#F5EFEB] flex items-center gap-2 shadow-sm">
                  <span className="font-serif italic font-semibold">Mirex</span>
                  <span>· Batch No. 04</span>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>

        {/* 3-Part Highlight Strip from the reference layout */}
        <div className="mt-14 lg:mt-20 pt-8 border-t border-[#DCCBB8]/70 dark:border-[#3D2F2A]">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#DCCBB8]/70 dark:divide-[#3D2F2A]">
            
            {/* Highlight 1 */}
            <motion.div 
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="py-4 md:py-0 md:px-6 flex items-start gap-3.5 first:pl-0"
            >
              <Droplets className="w-5 h-5 text-[#B98F77] dark:text-[#D4A388] shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xs tracking-[0.2em] uppercase font-sans font-semibold text-[#3E312D] dark:text-[#F5EFEB]">
                  Clean Ingredients
                </h2>
                <p className="text-xs text-[#3E312D]/70 dark:text-[#C2B5AC] font-sans mt-0.5 leading-relaxed">
                  30%+ pure essential oils & rare resins. Zero harsh petrochemicals or synthetic phthalates.
                </p>
              </div>
            </motion.div>

            {/* Highlight 2 */}
            <motion.div 
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="py-4 md:py-0 md:px-6 flex items-start gap-3.5"
            >
              <Clock className="w-5 h-5 text-[#B98F77] dark:text-[#D4A388] shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xs tracking-[0.2em] uppercase font-sans font-semibold text-[#3E312D] dark:text-[#F5EFEB]">
                  24h+ Longevity & Sillage
                </h2>
                <p className="text-xs text-[#3E312D]/70 dark:text-[#C2B5AC] font-sans mt-0.5 leading-relaxed">
                  Aged for 90 days in French glass carboys for profound skin intimacy and long-lasting projection.
                </p>
              </div>
            </motion.div>

            {/* Highlight 3 */}
            <motion.div 
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="py-4 md:py-0 md:px-6 flex items-start gap-3.5 last:pr-0"
            >
              <ShieldCheck className="w-5 h-5 text-[#B98F77] dark:text-[#D4A388] shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xs tracking-[0.2em] uppercase font-sans font-semibold text-[#3E312D] dark:text-[#F5EFEB]">
                  WhatsApp Payment & Care
                </h2>
                <p className="text-xs text-[#3E312D]/70 dark:text-[#C2B5AC] font-sans mt-0.5 leading-relaxed">
                  Instant concierge response. Secure bank transfer or card links with insured delivery.
                </p>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};
