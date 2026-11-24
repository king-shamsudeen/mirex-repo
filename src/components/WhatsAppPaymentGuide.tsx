import React from 'react';
import { MessageCircle, CreditCard, Truck, CheckCircle2, HelpCircle, Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    author: 'Camille Dupont',
    location: 'Paris, France',
    perfume: 'Santal Impérial (100ml)',
    rating: 5,
    quote: 'The sandalwood is remarkably creamy and deep. Lasts well past 18 hours on my skin. Placing the order on WhatsApp took literally two minutes, and bank transfer confirmation was instant.'
  },
  {
    author: 'Kofi Mensah',
    location: 'Accra, Ghana',
    perfume: 'Oud Nocturne (100ml)',
    rating: 5,
    quote: 'Arrived in bespoke wax-sealed packaging. The saffron and smoky agarwood blend is majestic—people ask me what I am wearing everywhere I go. The WhatsApp concierge is top tier.'
  },
  {
    author: 'Aria Montgomery',
    location: 'London, UK',
    perfume: 'Discovery Atelier Trio',
    rating: 5,
    quote: 'The perfect way to test Mirex before committing to full flacons. Rose Ancienne is so poetically fresh and lingering. Fast card payment link sent on WhatsApp with live tracking.'
  }
];

export const WhatsAppPaymentGuide: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-[#EFE8DF]/60 dark:bg-[#18110F] border-t border-b border-[#DCCBB8] dark:border-[#3D2F2A] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs tracking-[0.28em] uppercase text-[#B98F77] dark:text-[#D4A388] font-sans font-medium mb-2">
            The Bespoke Experience
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#3E312D] dark:text-[#F5EFEB]">
            How WhatsApp Ordering & Payment Works
          </h2>
          <p className="text-sm text-[#3E312D]/75 dark:text-[#C2B5AC] font-sans mt-3 leading-relaxed">
            We provide a dedicated private concierge service. No anonymous checkout lines or robotic bots—you converse directly with a Mirex fragrance specialist.
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Step 1 */}
          <div className="bg-[#FAF7F3] dark:bg-[#1D1513] p-7 rounded-xl border border-[#DCCBB8] dark:border-[#3D2F2A] shadow-xs relative">
            <span className="font-serif text-4xl text-[#B98F77]/30 dark:text-[#D4A388]/30 absolute top-4 right-4 font-light">
              01
            </span>
            <div className="w-10 h-10 rounded-lg bg-[#EFE8DF] dark:bg-[#251D1A] flex items-center justify-center text-[#3E312D] dark:text-[#F5EFEB] mb-5">
              <CheckCircle2 className="w-5 h-5 text-[#B98F77] dark:text-[#D4A388]" />
            </div>
            <h3 className="font-serif text-xl font-normal text-[#3E312D] dark:text-[#F5EFEB] mb-2">
              Select Your Scent
            </h3>
            <p className="text-xs text-[#3E312D]/70 dark:text-[#C2B5AC] font-sans leading-relaxed">
              Explore our catalogue of extrait flacons (50ml, 100ml, or the 3x10ml Discovery Atelier). Choose your preferred size and add to your bag.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#FAF7F3] dark:bg-[#1D1513] p-7 rounded-xl border border-[#DCCBB8] dark:border-[#3D2F2A] shadow-xs relative">
            <span className="font-serif text-4xl text-[#B98F77]/30 dark:text-[#D4A388]/30 absolute top-4 right-4 font-light">
              02
            </span>
            <div className="w-10 h-10 rounded-lg bg-[#EFE8DF] dark:bg-[#251D1A] flex items-center justify-center text-[#3E312D] dark:text-[#F5EFEB] mb-5">
              <MessageCircle className="w-5 h-5 text-[#B98F77] dark:text-[#D4A388]" />
            </div>
            <h3 className="font-serif text-xl font-normal text-[#3E312D] dark:text-[#F5EFEB] mb-2">
              Send WhatsApp Inquiry
            </h3>
            <p className="text-xs text-[#3E312D]/70 dark:text-[#C2B5AC] font-sans leading-relaxed">
              One tap automatically composes a neat message with your chosen perfumes, sizes, delivery city, and total investment to our official WhatsApp line.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#FAF7F3] dark:bg-[#1D1513] p-7 rounded-xl border border-[#DCCBB8] dark:border-[#3D2F2A] shadow-xs relative">
            <span className="font-serif text-4xl text-[#B98F77]/30 dark:text-[#D4A388]/30 absolute top-4 right-4 font-light">
              03
            </span>
            <div className="w-10 h-10 rounded-lg bg-[#EFE8DF] dark:bg-[#251D1A] flex items-center justify-center text-[#3E312D] dark:text-[#F5EFEB] mb-5">
              <CreditCard className="w-5 h-5 text-[#B98F77] dark:text-[#D4A388]" />
            </div>
            <h3 className="font-serif text-xl font-normal text-[#3E312D] dark:text-[#F5EFEB] mb-2">
              Direct Payment in Chat
            </h3>
            <p className="text-xs text-[#3E312D]/70 dark:text-[#C2B5AC] font-sans leading-relaxed">
              Our concierge confirms stock availability in minutes and provides verified bank transfer details or a secure one-click debit/credit payment link.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-[#FAF7F3] dark:bg-[#1D1513] p-7 rounded-xl border border-[#DCCBB8] dark:border-[#3D2F2A] shadow-xs relative">
            <span className="font-serif text-4xl text-[#B98F77]/30 dark:text-[#D4A388]/30 absolute top-4 right-4 font-light">
              04
            </span>
            <div className="w-10 h-10 rounded-lg bg-[#EFE8DF] dark:bg-[#251D1A] flex items-center justify-center text-[#3E312D] dark:text-[#F5EFEB] mb-5">
              <Truck className="w-5 h-5 text-[#B98F77] dark:text-[#D4A388]" />
            </div>
            <h3 className="font-serif text-xl font-normal text-[#3E312D] dark:text-[#F5EFEB] mb-2">
              Insured Doorstep Delivery
            </h3>
            <p className="text-xs text-[#3E312D]/70 dark:text-[#C2B5AC] font-sans leading-relaxed">
              Your bottle is inspected, cushioned in archival Mirex packaging, and dispatched with courier tracking updates sent directly to your WhatsApp.
            </p>
          </div>

        </div>

        {/* Client Reviews / Social Proof */}
        <div className="mt-16 pt-12 border-t border-[#DCCBB8]/70 dark:border-[#3D2F2A]">
          <div className="text-center mb-10">
            <span className="text-[10px] tracking-[0.28em] uppercase text-[#B98F77] dark:text-[#D4A388] font-sans font-semibold block mb-1">
              Collector Testimonials
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#3E312D] dark:text-[#F5EFEB]">
              Verified Scent Experiences
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev) => (
              <div 
                key={rev.author}
                className="p-6 bg-[#FAF7F3] dark:bg-[#1D1513] rounded-xl border border-[#DCCBB8] dark:border-[#3D2F2A] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs text-[#3E312D]/80 dark:text-[#C2B5AC] font-sans leading-relaxed italic">
                    "{rev.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#DCCBB8]/50 dark:border-[#3D2F2A] flex items-center justify-between text-xs font-sans">
                  <div>
                    <div className="font-medium text-[#3E312D] dark:text-[#F5EFEB]">{rev.author}</div>
                    <div className="text-[11px] text-[#3E312D]/50 dark:text-[#C2B5AC]/60">{rev.location}</div>
                  </div>
                  <span className="text-[10px] font-sans uppercase tracking-wider text-[#B98F77] dark:text-[#D4A388]">
                    {rev.perfume}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reassurance & FAQ Accordion */}
        <div className="mt-16 bg-[#FAF7F3] dark:bg-[#1D1513] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded-2xl p-6 sm:p-10 transition-colors duration-200">
          <div className="flex items-center gap-2.5 text-xs uppercase tracking-wider text-[#B98F77] dark:text-[#D4A388] font-sans font-semibold mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#3E312D] dark:text-[#F5EFEB] font-normal mb-8">
            Why We Handle Orders via WhatsApp Concierge
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-sans text-[#3E312D]/80 dark:text-[#C2B5AC]">
            <div className="space-y-2">
              <h4 className="font-medium text-[#3E312D] dark:text-[#F5EFEB] text-sm font-serif">
                Is paying through WhatsApp safe?
              </h4>
              <p className="leading-relaxed">
                Yes. You will only ever receive payment requests through our verified business WhatsApp line. We accept direct bank wire transfers with instant digital receipts or secure encrypted card links. No sensitive payment info is stored.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-[#3E312D] dark:text-[#F5EFEB] text-sm font-serif">
                How fast does the Mirex concierge reply?
              </h4>
              <p className="leading-relaxed">
                Our scent specialists are active daily between 8:00 AM and 10:00 PM (GMT+1). Typical response time is under 5 minutes. Inquiries placed overnight are prioritized first thing in the morning.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-[#3E312D] dark:text-[#F5EFEB] text-sm font-serif">
                Can I request custom gift packaging or engraved notes?
              </h4>
              <p className="leading-relaxed">
                Absolutely. Because you are chatting directly with us, you can request custom handwritten calligraphy notes, wax-sealed ribbon presentation, or discreet delivery arrangements at no extra charge.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-[#3E312D] dark:text-[#F5EFEB] text-sm font-serif">
                What if I am undecided between two perfumes?
              </h4>
              <p className="leading-relaxed">
                Our in-house perfumer will guide you in WhatsApp voice or text based on your current fragrance wardrobe, climate, and personal skin chemistry, or recommend our Discovery Atelier Trio (3x10ml).
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
