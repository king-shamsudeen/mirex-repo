import React, { useState } from 'react';
import { 
  X, Plus, Trash2, Edit3, Image as ImageIcon, Upload, Check, 
  RotateCcw, Sparkles, AlertCircle, Shield, Eye, ArrowUpRight, Search 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, FragranceFamily, Currency, formatPrice } from '../types';
import { SCENT_FAMILIES } from '../data/products';
import { getSellerWhatsAppNumber } from '../utils/whatsapp';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currency: Currency;
  onSaveProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onResetToDefaults: () => void;
}

const PRESET_IMAGES = [
  { label: 'Santal Impérial (Gold Glass)', path: '/src/assets/images/perfume_santal_imperial_1794472843058.jpg' },
  { label: 'Oud Nocturne (Smoky Amber)', path: '/src/assets/images/perfume_oud_nocturne_1794472842498.jpg' },
  { label: 'Rose Ancienne (Fluted Crystal)', path: '/src/assets/images/perfume_velvet_rose_1794472844184.jpg' },
  { label: 'Discovery Atelier (Trio Box)', path: '/src/assets/images/perfume_discovery_set_1794472844487.jpg' },
  { label: 'Solstice Blanc (Travertine Pedestal)', path: '/src/assets/images/hero_perfume_pedestal_1794472841165.jpg' },
];

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  products,
  currency,
  onSaveProduct,
  onDeleteProduct,
  onResetToDefaults,
}) => {
  // Authentication gate
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('mirex_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Search in admin
  const [adminSearch, setAdminSearch] = useState('');

  // Form modal state for Create / Edit
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form state
  const [formName, setFormName] = useState('');
  const [formNumber, setFormNumber] = useState('No. 06');
  const [formFrenchTitle, setFormFrenchTitle] = useState('');
  const [formFamily, setFormFamily] = useState<FragranceFamily>('Woody & Amber');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formStory, setFormStory] = useState('');
  const [formImage, setFormImage] = useState(PRESET_IMAGES[0].path);
  const [formTopNotes, setFormTopNotes] = useState('Cardamom, Calabrian Bergamot');
  const [formHeartNotes, setFormHeartNotes] = useState('Tuscan Iris, Papyrus');
  const [formBaseNotes, setFormBaseNotes] = useState('Mysore Sandalwood, Amber');
  const [formPrice50, setFormPrice50] = useState<number>(135);
  const [formPrice100, setFormPrice100] = useState<number>(195);
  const [formPrice10, setFormPrice10] = useState<number>(40);
  const [formLongevity, setFormLongevity] = useState('14 - 18 Hours');
  const [formSillage, setFormSillage] = useState('Enveloping & Sophisticated');
  const [formConcentration, setFormConcentration] = useState('Extrait de Parfum (32% Oil)');
  const [formInStock, setFormInStock] = useState(true);
  const [formStockNote, setFormStockNote] = useState('In Stock · Ready to Dispatch');

  // Deletion confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [resetConfirm, setResetConfirm] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '1234' || pinInput.trim() === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('mirex_admin_auth', 'true');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('mirex_admin_auth');
  };

  // Open creation modal
  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormName('');
    setFormNumber(`No. 0${products.length + 1}`);
    setFormFrenchTitle('');
    setFormFamily('Woody & Amber');
    setFormSubtitle('');
    setFormDescription('');
    setFormStory('');
    setFormImage(PRESET_IMAGES[0].path);
    setFormTopNotes('Cardamom, Bergamot');
    setFormHeartNotes('Orris Root, Damascus Rose');
    setFormBaseNotes('Mysore Sandalwood, Warm Amber');
    setFormPrice50(135);
    setFormPrice100(195);
    setFormPrice10(42);
    setFormLongevity('14 - 18 Hours');
    setFormSillage('Enveloping & Sophisticated');
    setFormConcentration('Extrait de Parfum (30% Oil)');
    setFormInStock(true);
    setFormStockNote('Ready to Dispatch · Batch No. 01');
    setIsFormOpen(true);
  };

  // Open edit modal
  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormNumber(p.number);
    setFormFrenchTitle(p.frenchTitle || '');
    setFormFamily(p.family);
    setFormSubtitle(p.subtitle);
    setFormDescription(p.description);
    setFormStory(p.story);
    setFormImage(p.image);
    setFormTopNotes(p.pyramid.top.join(', '));
    setFormHeartNotes(p.pyramid.heart.join(', '));
    setFormBaseNotes(p.pyramid.base.join(', '));
    
    const v50 = p.variants.find(v => v.volume.includes('50ml'))?.price || 135;
    const v100 = p.variants.find(v => v.volume.includes('100ml'))?.price || 195;
    const v10 = p.variants.find(v => v.volume.includes('10ml'))?.price || 40;
    setFormPrice50(v50);
    setFormPrice100(v100);
    setFormPrice10(v10);

    setFormLongevity(p.longevity);
    setFormSillage(p.sillage);
    setFormConcentration(p.concentration);
    setFormInStock(p.inStock);
    setFormStockNote(p.stockNote || '');
    setIsFormOpen(true);
  };

  // Handle image file upload via FileReader
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          setFormImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Save submission
  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const id = editingProduct 
      ? editingProduct.id 
      : formName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);

    const parseNotes = (str: string) => str.split(',').map(s => s.trim()).filter(Boolean);

    const variants = [
      { volume: '50ml', price: Number(formPrice50) || 120 },
      { volume: '100ml', price: Number(formPrice100) || 180 },
    ];
    if (formPrice10 > 0) {
      variants.push({ volume: '10ml Travel', price: Number(formPrice10) });
    }

    const newOrUpdatedProduct: Product = {
      id,
      name: formName.trim(),
      number: formNumber.trim(),
      frenchTitle: formFrenchTitle.trim() || undefined,
      family: formFamily,
      subtitle: formSubtitle.trim() || 'Artisanal Extrait de Parfum',
      description: formDescription.trim() || formSubtitle.trim(),
      story: formStory.trim() || formDescription.trim() || 'A masterpiece of French-blended botanical essences.',
      variants,
      defaultVolume: '100ml',
      image: formImage,
      pyramid: {
        top: parseNotes(formTopNotes).length ? parseNotes(formTopNotes) : ['Rare Botanicals'],
        heart: parseNotes(formHeartNotes).length ? parseNotes(formHeartNotes) : ['Precious Woods'],
        base: parseNotes(formBaseNotes).length ? parseNotes(formBaseNotes) : ['Ambergris Accord']
      },
      longevity: formLongevity,
      sillage: formSillage,
      concentration: formConcentration,
      inStock: formInStock,
      stockNote: formStockNote.trim() || undefined,
      featured: editingProduct ? editingProduct.featured : false
    };

    onSaveProduct(newOrUpdatedProduct);
    setIsFormOpen(false);
  };

  const sellerPhone = getSellerWhatsAppNumber();

  const filteredProducts = products.filter(p => {
    if (!adminSearch.trim()) return true;
    const q = adminSearch.toLowerCase();
    return p.name.toLowerCase().includes(q) || 
           p.family.toLowerCase().includes(q) || 
           p.number.toLowerCase().includes(q);
  });

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-[#15100E]/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative bg-[#FAF7F3] dark:bg-[#1C1513] rounded-2xl max-w-5xl w-full border border-[#DCCBB8] dark:border-[#3D2F2A] shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col transition-colors duration-200"
      >
        {/* Top Bar */}
        <div className="p-5 sm:p-6 border-b border-[#DCCBB8] dark:border-[#3D2F2A] bg-[#F7F3EF] dark:bg-[#15100E] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#3E312D] dark:bg-[#F5EFEB] text-[#F7F3EF] dark:text-[#15100E] flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#B98F77] dark:text-[#C8977D]" />
            </div>
            <div>
              <span className="text-[10px] tracking-[0.24em] uppercase text-[#B98F77] dark:text-[#D4A388] font-sans font-semibold block">
                Mirex Scent Atelier
              </span>
              <h2 className="font-serif text-2xl font-normal text-[#3E312D] dark:text-[#F5EFEB]">
                Admin Product Portal
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-xs text-[#3E312D]/60 dark:text-[#C2B5AC] hover:text-[#3E312D] dark:hover:text-white underline font-sans cursor-pointer"
              >
                Sign Out
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close portal"
              className="p-2 rounded-full hover:bg-[#DCCBB8]/50 dark:hover:bg-[#271E1B] text-[#3E312D] dark:text-[#F5EFEB] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#EFE8DF] dark:bg-[#271E1B] flex items-center justify-center text-[#B98F77] dark:text-[#D4A388]">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-[#3E312D] dark:text-[#F5EFEB]">
                Atelier Staff Access
              </h3>
              <p className="text-xs text-[#3E312D]/70 dark:text-[#C2B5AC] font-sans mt-1">
                Enter your security PIN to manage live flacons, upload new fragrances, or edit prices.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter PIN (Default: 1234)"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  className="w-full text-center px-4 py-2.5 bg-white dark:bg-[#15100E] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded-lg text-sm text-[#3E312D] dark:text-[#F5EFEB] font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-[#B98F77]"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-red-600 dark:text-red-400 font-sans mt-1.5 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Incorrect PIN. Try 1234.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#3E312D] dark:bg-[#F5EFEB] text-[#F7F3EF] dark:text-[#15100E] rounded-lg text-xs uppercase tracking-wider font-semibold font-sans hover:bg-[#281F1D] dark:hover:bg-[#E2DDD8] transition-colors cursor-pointer shadow-sm"
              >
                Access Product Dashboard
              </button>

              <div className="text-[11px] text-[#3E312D]/50 dark:text-[#C2B5AC]/60 font-sans">
                Quick Hint: PIN is <strong>1234</strong>
              </div>
            </form>
          </div>
        ) : (
          /* Logged In Dashboard */
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            
            {/* Top Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-white dark:bg-[#221A17] rounded-xl border border-[#DCCBB8] dark:border-[#3D2F2A]">
                <span className="text-[10px] tracking-wider uppercase text-[#B98F77] dark:text-[#D4A388] font-sans font-semibold block">
                  Active Flacons
                </span>
                <span className="font-serif text-3xl text-[#3E312D] dark:text-[#F5EFEB] font-normal tabular-nums">
                  {products.length}
                </span>
              </div>

              <div className="p-4 bg-white dark:bg-[#221A17] rounded-xl border border-[#DCCBB8] dark:border-[#3D2F2A]">
                <span className="text-[10px] tracking-wider uppercase text-emerald-600 dark:text-emerald-400 font-sans font-semibold block">
                  In Stock
                </span>
                <span className="font-serif text-3xl text-[#3E312D] dark:text-[#F5EFEB] font-normal tabular-nums">
                  {products.filter(p => p.inStock).length}
                </span>
              </div>

              <div className="p-4 bg-white dark:bg-[#221A17] rounded-xl border border-[#DCCBB8] dark:border-[#3D2F2A]">
                <span className="text-[10px] tracking-wider uppercase text-amber-600 dark:text-amber-400 font-sans font-semibold block">
                  Fragrance Families
                </span>
                <span className="font-serif text-3xl text-[#3E312D] dark:text-[#F5EFEB] font-normal tabular-nums">
                  {new Set(products.map(p => p.family)).size}
                </span>
              </div>

              <div className="p-4 bg-white dark:bg-[#221A17] rounded-xl border border-[#DCCBB8] dark:border-[#3D2F2A]">
                <span className="text-[10px] tracking-wider uppercase text-[#B98F77] dark:text-[#D4A388] font-sans font-semibold block">
                  WhatsApp Concierge
                </span>
                <span className="font-mono text-xs text-[#3E312D] dark:text-[#F5EFEB] block truncate mt-1.5 font-medium">
                  +{sellerPhone}
                </span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-[#3E312D]/40 dark:text-[#C2B5AC]/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Filter flacons by name or number..."
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white dark:bg-[#15100E] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded-lg text-xs text-[#3E312D] dark:text-[#F5EFEB] font-sans focus:outline-none focus:ring-1 focus:ring-[#B98F77]"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setResetConfirm(true)}
                  className="px-3 py-2 border border-[#DCCBB8] dark:border-[#3D2F2A] text-xs font-sans uppercase tracking-wider text-[#3E312D]/70 dark:text-[#C2B5AC] hover:text-[#3E312D] dark:hover:text-white rounded-lg hover:bg-[#DCCBB8]/20 dark:hover:bg-[#271E1B] transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Reset to initial 6 curated perfumes"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset Defaults</span>
                </button>

                <button
                  onClick={handleOpenCreate}
                  className="px-4 py-2 bg-[#3E312D] dark:bg-[#F5EFEB] text-[#F7F3EF] dark:text-[#15100E] hover:bg-[#281F1D] dark:hover:bg-[#E2DDD8] rounded-lg text-xs font-sans uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload New Flacon</span>
                </button>
              </div>
            </div>

            {/* Reset confirmation banner */}
            {resetConfirm && (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-xl flex items-center justify-between text-xs font-sans text-amber-900 dark:text-amber-200">
                <span>Are you sure you want to restore the factory catalog? Any custom uploaded perfumes will be reset.</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onResetToDefaults();
                      setResetConfirm(false);
                    }}
                    className="px-3 py-1 bg-amber-600 text-white rounded font-medium hover:bg-amber-700 cursor-pointer"
                  >
                    Confirm Reset
                  </button>
                  <button
                    onClick={() => setResetConfirm(false)}
                    className="px-2 py-1 underline cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Products Table */}
            <div className="border border-[#DCCBB8] dark:border-[#3D2F2A] rounded-xl overflow-hidden bg-white dark:bg-[#221A17] shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-[#EFE8DF] dark:bg-[#1A1311] text-[#3E312D] dark:text-[#F5EFEB] uppercase tracking-wider text-[11px] border-b border-[#DCCBB8] dark:border-[#3D2F2A]">
                    <tr>
                      <th className="py-3 px-4">Flacon</th>
                      <th className="py-3 px-4">Category & Notes</th>
                      <th className="py-3 px-4">Sizes & Prices</th>
                      <th className="py-3 px-4">Stock Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCCBB8]/50 dark:divide-[#3D2F2A] text-[#3E312D] dark:text-[#C2B5AC]">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-[#FAF7F3] dark:hover:bg-[#271E1B] transition-colors">
                        
                        {/* Flacon Image & Title */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-12 h-12 object-cover rounded bg-[#EFE8DF] dark:bg-[#15100E] border border-[#DCCBB8] dark:border-[#3D2F2A] shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <span className="text-[10px] tracking-widest uppercase text-[#B98F77] dark:text-[#D4A388] font-semibold block">
                                {p.number}
                              </span>
                              <div className="font-serif text-base text-[#3E312D] dark:text-[#F5EFEB] font-normal leading-snug">
                                {p.name}
                              </div>
                              {p.frenchTitle && (
                                <div className="text-[11px] italic text-[#3E312D]/60 dark:text-[#C2B5AC]/70">
                                  {p.frenchTitle}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Family & Notes */}
                        <td className="py-3 px-4 max-w-xs">
                          <span className="inline-block px-2 py-0.5 rounded bg-[#FAF7F3] dark:bg-[#15100E] text-[10px] font-medium text-[#B98F77] dark:text-[#D4A388] border border-[#DCCBB8]/60 dark:border-[#3D2F2A] mb-1">
                            {p.family}
                          </span>
                          <div className="text-[11px] truncate text-[#3E312D]/70 dark:text-[#C2B5AC]/70">
                            {p.pyramid.top[0]} · {p.pyramid.heart[0]} · {p.pyramid.base[0]}
                          </div>
                        </td>

                        {/* Sizes & Prices */}
                        <td className="py-3 px-4">
                          <div className="space-y-0.5 tabular-nums">
                            {p.variants.map((v) => (
                              <div key={v.volume} className="flex items-center gap-2">
                                <span className="text-[#3E312D]/70 dark:text-[#C2B5AC] text-[11px]">{v.volume}:</span>
                                <span className="font-medium text-[#3E312D] dark:text-[#F5EFEB]">{formatPrice(v.price, currency)}</span>
                              </div>
                            ))}
                          </div>
                        </td>

                        {/* Stock Status */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${p.inStock ? 'bg-emerald-500' : 'bg-red-500'}`} />
                            <span className="text-xs">
                              {p.inStock ? 'In Stock' : 'Sold Out'}
                            </span>
                          </div>
                          {p.stockNote && (
                            <div className="text-[10px] text-[#3E312D]/50 dark:text-[#C2B5AC]/60 truncate max-w-[140px]">
                              {p.stockNote}
                            </div>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="p-1.5 rounded hover:bg-[#DCCBB8]/40 dark:hover:bg-[#3D2F2A] text-[#3E312D] dark:text-[#F5EFEB] transition-colors cursor-pointer"
                              title="Edit flacon"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(p.id)}
                              className="p-1.5 rounded hover:bg-red-100 dark:hover:bg-red-950/60 text-red-600 dark:text-red-400 transition-colors cursor-pointer"
                              title="Remove flacon"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Deletion Confirmation Modal */}
            {deleteConfirmId && (
              <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
                <div className="bg-[#FAF7F3] dark:bg-[#1D1513] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded-xl p-6 max-w-sm w-full space-y-4 shadow-xl">
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <AlertCircle className="w-5 h-5" />
                    <h4 className="font-serif text-lg font-normal">Remove Flacon</h4>
                  </div>
                  <p className="text-xs text-[#3E312D]/80 dark:text-[#C2B5AC] font-sans">
                    Are you sure you want to remove this perfume from the live storefront? Customers will no longer be able to view or inquire about it.
                  </p>
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="px-3 py-1.5 border border-[#DCCBB8] dark:border-[#3D2F2A] rounded text-xs font-sans text-[#3E312D] dark:text-[#F5EFEB] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        onDeleteProduct(deleteConfirmId);
                        setDeleteConfirmId(null);
                      }}
                      className="px-4 py-1.5 bg-red-600 text-white rounded text-xs font-sans font-semibold hover:bg-red-700 cursor-pointer"
                    >
                      Delete Flacon
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Upload / Edit Product Modal */}
      {isFormOpen && (
        <div 
          className="fixed inset-0 z-60 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="relative bg-[#FAF7F3] dark:bg-[#1D1513] rounded-2xl max-w-2xl w-full border border-[#DCCBB8] dark:border-[#3D2F2A] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto transition-colors duration-200"
          >
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#3E312D]/70 dark:text-[#C2B5AC] hover:text-[#3E312D] dark:hover:text-[#F5EFEB] rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] tracking-[0.24em] uppercase text-[#B98F77] dark:text-[#D4A388] font-sans font-semibold block">
                Atelier Form
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#3E312D] dark:text-[#F5EFEB] font-normal mt-1">
                {editingProduct ? 'Edit Fragrance Flacon' : 'Upload New Fragrance Flacon'}
              </h3>
            </div>

            <form onSubmit={handleSubmitProduct} className="space-y-5 text-xs font-sans">
              
              {/* Row 1: Name, Number, French Title */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider text-[#3E312D]/70 dark:text-[#C2B5AC] mb-1">
                    Perfume Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Santal Impérial"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-[#15100E] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded text-xs text-[#3E312D] dark:text-[#F5EFEB] focus:outline-none focus:ring-1 focus:ring-[#B98F77]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#3E312D]/70 dark:text-[#C2B5AC] mb-1">
                    Edition Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. No. 06"
                    value={formNumber}
                    onChange={(e) => setFormNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-[#15100E] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded text-xs text-[#3E312D] dark:text-[#F5EFEB] focus:outline-none focus:ring-1 focus:ring-[#B98F77]"
                  />
                </div>
              </div>

              {/* Row 2: Family & French Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#3E312D]/70 dark:text-[#C2B5AC] mb-1">
                    Fragrance Family
                  </label>
                  <select
                    value={formFamily}
                    onChange={(e) => setFormFamily(e.target.value as FragranceFamily)}
                    className="w-full px-3 py-2 bg-white dark:bg-[#15100E] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded text-xs text-[#3E312D] dark:text-[#F5EFEB] focus:outline-none focus:ring-1 focus:ring-[#B98F77]"
                  >
                    {SCENT_FAMILIES.filter(f => f !== 'All').map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#3E312D]/70 dark:text-[#C2B5AC] mb-1">
                    French Flacon Subtitle
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sable d’Or or Ambre Précieux"
                    value={formFrenchTitle}
                    onChange={(e) => setFormFrenchTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-[#15100E] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded text-xs text-[#3E312D] dark:text-[#F5EFEB] focus:outline-none focus:ring-1 focus:ring-[#B98F77]"
                  />
                </div>
              </div>

              {/* Fragrance Highlight Subtitle */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#3E312D]/70 dark:text-[#C2B5AC] mb-1">
                  Olfactory Highlight (One-Line Summary)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Creamy Mysore Sandalwood & Golden Sunlit Amber"
                  value={formSubtitle}
                  onChange={(e) => setFormSubtitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-[#15100E] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded text-xs text-[#3E312D] dark:text-[#F5EFEB] focus:outline-none focus:ring-1 focus:ring-[#B98F77]"
                />
              </div>

              {/* Perfume Image Upload & Selector */}
              <div className="p-4 bg-[#EFE8DF] dark:bg-[#251D1A] rounded-xl border border-[#DCCBB8] dark:border-[#3D2F2A] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#3E312D] dark:text-[#F5EFEB] font-semibold">
                    Flacon Product Image
                  </span>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#3E312D] dark:bg-[#F5EFEB] text-[#F7F3EF] dark:text-[#15100E] rounded text-[11px] uppercase tracking-wider font-semibold cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={formImage}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg border border-[#DCCBB8] dark:border-[#3D2F2A] bg-white dark:bg-[#15100E] shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="flex-1 space-y-1.5">
                    <span className="text-[11px] text-[#3E312D]/70 dark:text-[#C2B5AC] block font-medium">
                      Or select from Mirex Studio presets:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {PRESET_IMAGES.map((img) => (
                        <button
                          key={img.label}
                          type="button"
                          onClick={() => setFormImage(img.path)}
                          className={`px-2 py-1 text-left rounded text-[10px] truncate border cursor-pointer ${
                            formImage === img.path
                              ? 'border-[#3E312D] dark:border-[#F5EFEB] bg-white dark:bg-[#15100E] font-medium text-[#3E312D] dark:text-[#F5EFEB]'
                              : 'border-[#DCCBB8]/60 dark:border-[#3D2F2A] text-[#3E312D]/70 dark:text-[#C2B5AC] hover:bg-white dark:hover:bg-[#15100E]'
                          }`}
                        >
                          {img.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Olfactory Pyramid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#3E312D]/70 dark:text-[#C2B5AC] mb-1">
                    Top Notes (Opening)
                  </label>
                  <input
                    type="text"
                    placeholder="Cardamom, Bergamot"
                    value={formTopNotes}
                    onChange={(e) => setFormTopNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-[#15100E] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded text-xs text-[#3E312D] dark:text-[#F5EFEB] focus:outline-none focus:ring-1 focus:ring-[#B98F77]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#3E312D]/70 dark:text-[#C2B5AC] mb-1">
                    Heart Notes (Soul)
                  </label>
                  <input
                    type="text"
                    placeholder="Tuscan Iris, Papyrus"
                    value={formHeartNotes}
                    onChange={(e) => setFormHeartNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-[#15100E] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded text-xs text-[#3E312D] dark:text-[#F5EFEB] focus:outline-none focus:ring-1 focus:ring-[#B98F77]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#3E312D]/70 dark:text-[#C2B5AC] mb-1">
                    Base Notes (Sillage)
                  </label>
                  <input
                    type="text"
                    placeholder="Sandalwood, Amber"
                    value={formBaseNotes}
                    onChange={(e) => setFormBaseNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-[#15100E] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded text-xs text-[#3E312D] dark:text-[#F5EFEB] focus:outline-none focus:ring-1 focus:ring-[#B98F77]"
                  />
                </div>
              </div>

              {/* Pricing by Volume (USD baseline) */}
              <div className="grid grid-cols-3 gap-3 p-3 bg-white dark:bg-[#15100E] rounded-xl border border-[#DCCBB8] dark:border-[#3D2F2A]">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#3E312D]/70 dark:text-[#C2B5AC] mb-1">
                    50ml Price ($)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formPrice50}
                    onChange={(e) => setFormPrice50(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-[#FAF7F3] dark:bg-[#1D1513] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded text-xs font-mono text-[#3E312D] dark:text-[#F5EFEB]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#3E312D]/70 dark:text-[#C2B5AC] mb-1">
                    100ml Price ($)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formPrice100}
                    onChange={(e) => setFormPrice100(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-[#FAF7F3] dark:bg-[#1D1513] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded text-xs font-mono text-[#3E312D] dark:text-[#F5EFEB]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#3E312D]/70 dark:text-[#C2B5AC] mb-1">
                    10ml Travel ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formPrice10}
                    onChange={(e) => setFormPrice10(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-[#FAF7F3] dark:bg-[#1D1513] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded text-xs font-mono text-[#3E312D] dark:text-[#F5EFEB]"
                  />
                </div>
              </div>

              {/* Longevity, Sillage, Concentration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#3E312D]/70 dark:text-[#C2B5AC] mb-1">
                    Longevity Rating
                  </label>
                  <input
                    type="text"
                    value={formLongevity}
                    onChange={(e) => setFormLongevity(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white dark:bg-[#15100E] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded text-xs text-[#3E312D] dark:text-[#F5EFEB]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#3E312D]/70 dark:text-[#C2B5AC] mb-1">
                    Sillage Aura
                  </label>
                  <input
                    type="text"
                    value={formSillage}
                    onChange={(e) => setFormSillage(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white dark:bg-[#15100E] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded text-xs text-[#3E312D] dark:text-[#F5EFEB]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#3E312D]/70 dark:text-[#C2B5AC] mb-1">
                    Concentration
                  </label>
                  <input
                    type="text"
                    value={formConcentration}
                    onChange={(e) => setFormConcentration(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white dark:bg-[#15100E] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded text-xs text-[#3E312D] dark:text-[#F5EFEB]"
                  />
                </div>
              </div>

              {/* Stock Status & Note */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center pt-1">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="stock-toggle"
                    checked={formInStock}
                    onChange={(e) => setFormInStock(e.target.checked)}
                    className="w-4 h-4 text-[#B98F77] rounded focus:ring-[#B98F77] cursor-pointer"
                  />
                  <label htmlFor="stock-toggle" className="text-xs font-medium text-[#3E312D] dark:text-[#F5EFEB] cursor-pointer">
                    Available in Stock
                  </label>
                </div>

                <div className="sm:col-span-2">
                  <input
                    type="text"
                    placeholder="Stock Note (e.g. Ready to Dispatch · Batch No. 04)"
                    value={formStockNote}
                    onChange={(e) => setFormStockNote(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white dark:bg-[#15100E] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded text-xs text-[#3E312D] dark:text-[#F5EFEB]"
                  />
                </div>
              </div>

              {/* Story / Description */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#3E312D]/70 dark:text-[#C2B5AC] mb-1">
                  Perfumer’s Story / Inspiration
                </label>
                <textarea
                  rows={2}
                  placeholder="The evocative inspiration behind this fragrance..."
                  value={formStory}
                  onChange={(e) => setFormStory(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-[#15100E] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded text-xs text-[#3E312D] dark:text-[#F5EFEB] focus:outline-none focus:ring-1 focus:ring-[#B98F77]"
                />
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-[#DCCBB8] dark:border-[#3D2F2A] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2.5 border border-[#DCCBB8] dark:border-[#3D2F2A] rounded text-xs uppercase tracking-wider text-[#3E312D] dark:text-[#F5EFEB] hover:bg-[#DCCBB8]/30 dark:hover:bg-[#271E1B] cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#3E312D] dark:bg-[#F5EFEB] text-[#F7F3EF] dark:text-[#15100E] hover:bg-[#281F1D] dark:hover:bg-[#E2DDD8] rounded text-xs uppercase tracking-wider font-semibold shadow-sm cursor-pointer"
                >
                  {editingProduct ? 'Update Flacon' : 'Publish to Storefront'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
