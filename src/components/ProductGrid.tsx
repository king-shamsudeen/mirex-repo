import React, { useState, useMemo } from 'react';
import { Search, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, FragranceFamily, Currency } from '../types';
import { SCENT_FAMILIES } from '../data/products';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  currency: Currency;
  onOpenDetail: (product: Product) => void;
  onAddToCart: (product: Product, volume: string, price: number) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  currency,
  onOpenDetail,
  onAddToCart,
  searchQuery,
  onSearchChange,
}) => {
  const [selectedFamily, setSelectedFamily] = useState<FragranceFamily>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Family filter
      if (selectedFamily !== 'All' && p.family !== selectedFamily) {
        return false;
      }
      // Search query filter (search name, subtitle, description, top/heart/base notes)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesSubtitle = p.subtitle.toLowerCase().includes(query);
        const matchesFamily = p.family.toLowerCase().includes(query);
        const matchesNotes = [
          ...p.pyramid.top,
          ...p.pyramid.heart,
          ...p.pyramid.base
        ].some(n => n.toLowerCase().includes(query));

        if (!matchesName && !matchesSubtitle && !matchesFamily && !matchesNotes) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        return (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0);
      }
      if (sortBy === 'price-desc') {
        return (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0);
      }
      return 0; // featured default
    });
  }, [products, selectedFamily, searchQuery, sortBy]);

  return (
    <section id="collection" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#DCCBB8]/70 dark:border-[#3D2F2A]">
        <div>
          <div className="text-xs tracking-[0.26em] uppercase text-[#B98F77] dark:text-[#D4A388] font-sans font-medium mb-2">
            Haute Parfumerie Flacons
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#3E312D] dark:text-[#F5EFEB]">
            Available Extrait Editions
          </h2>
          <p className="text-sm text-[#3E312D]/70 dark:text-[#C2B5AC] font-sans mt-2 max-w-lg">
            Each formula is crafted in limited numbered batches. Select your flacon and inquire directly via WhatsApp concierge for prompt verification and payment details.
          </p>
        </div>

        {/* Sort & Quick Filter Options */}
        <div className="flex items-center gap-3">
          <label htmlFor="sort-select" className="text-xs uppercase tracking-wider text-[#3E312D]/60 dark:text-[#C2B5AC]/70 font-sans whitespace-nowrap">
            Sort By
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#FAF7F3] dark:bg-[#1D1513] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded px-3 py-1.5 text-xs text-[#3E312D] dark:text-[#F5EFEB] font-sans cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#B98F77]"
          >
            <option value="featured" className="bg-[#FAF7F3] dark:bg-[#1D1513]">Featured Curations</option>
            <option value="price-asc" className="bg-[#FAF7F3] dark:bg-[#1D1513]">Price: Low to High</option>
            <option value="price-desc" className="bg-[#FAF7F3] dark:bg-[#1D1513]">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Interactive Segmented Filter Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {SCENT_FAMILIES.map((family) => {
            const count = family === 'All' 
              ? products.length 
              : products.filter(p => p.family === family).length;

            return (
              <motion.button
                key={family}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => setSelectedFamily(family as FragranceFamily)}
                className={`px-3.5 py-1.5 text-xs font-sans tracking-wider uppercase rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedFamily === family
                    ? 'bg-[#3E312D] dark:bg-[#F5EFEB] text-[#F7F3EF] dark:text-[#15100E] shadow-xs font-medium'
                    : 'bg-[#EFE8DF] dark:bg-[#271E1B] text-[#3E312D]/80 dark:text-[#C2B5AC] hover:bg-[#DCCBB8]/50 dark:hover:bg-[#3D2F2A] hover:text-[#3E312D] dark:hover:text-[#F5EFEB]'
                }`}
              >
                <span>{family}</span>
                <span className="ml-1.5 text-[10px] opacity-60 tabular-nums">({count})</span>
              </motion.button>
            );
          })}
        </div>

        {/* Search Bar Input */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-[#3E312D]/50 dark:text-[#C2B5AC]/50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search notes, oud, sandalwood..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-[#FAF7F3] dark:bg-[#1D1513] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded text-xs text-[#3E312D] dark:text-[#F5EFEB] placeholder-[#3E312D]/40 dark:placeholder-[#C2B5AC]/40 font-sans focus:outline-none focus:ring-1 focus:ring-[#B98F77]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#3E312D]/40 dark:text-[#C2B5AC]/50 hover:text-[#3E312D] dark:hover:text-[#F5EFEB] cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {/* Active Search & Filter Indicators */}
      {(selectedFamily !== 'All' || searchQuery) && (
        <div className="pb-6 flex items-center gap-2 text-xs text-[#3E312D]/70 dark:text-[#C2B5AC] font-sans">
          <span>Showing results for:</span>
          {selectedFamily !== 'All' && (
            <span className="font-medium text-[#3E312D] dark:text-[#F5EFEB]">{selectedFamily}</span>
          )}
          {selectedFamily !== 'All' && searchQuery && <span>·</span>}
          {searchQuery && (
            <span className="font-medium text-[#3E312D] dark:text-[#F5EFEB]">"{searchQuery}"</span>
          )}
          <button
            onClick={() => {
              setSelectedFamily('All');
              onSearchChange('');
            }}
            className="ml-2 text-[11px] underline text-[#B98F77] dark:text-[#D4A388] hover:text-[#3E312D] dark:hover:text-[#F5EFEB] cursor-pointer"
          >
            Reset all filters
          </button>
        </div>
      )}

      {/* Grid of Products with Motion AnimatePresence */}
      {filteredProducts.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                onOpenDetail={onOpenDetail}
                onAddToCart={onAddToCart}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty State */
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-20 text-center bg-[#FAF7F3] dark:bg-[#1D1513] rounded-2xl border border-dashed border-[#DCCBB8] dark:border-[#3D2F2A] p-8"
        >
          <Sparkles className="w-8 h-8 text-[#B98F77] dark:text-[#D4A388] mx-auto mb-3" />
          <h3 className="font-serif text-2xl font-normal text-[#3E312D] dark:text-[#F5EFEB]">
            No matching scents found
          </h3>
          <p className="text-sm text-[#3E312D]/70 dark:text-[#C2B5AC] font-sans mt-2 max-w-md mx-auto">
            We couldn't find any fragrances matching your criteria. Try adjusting your query or message our WhatsApp concierge for a custom blend consultation.
          </p>
          <button
            onClick={() => {
              setSelectedFamily('All');
              onSearchChange('');
            }}
            className="mt-5 px-5 py-2.5 bg-[#3E312D] dark:bg-[#F5EFEB] text-[#F7F3EF] dark:text-[#15100E] rounded text-xs uppercase tracking-wider font-sans hover:bg-[#281F1D] dark:hover:bg-[#E2DDD8] cursor-pointer"
          >
            View All Scents
          </button>
        </motion.div>
      )}

    </section>
  );
};
