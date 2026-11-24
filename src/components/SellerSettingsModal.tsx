import React, { useState } from 'react';
import { X, Check, Phone } from 'lucide-react';
import { getSellerWhatsAppNumber, saveSellerWhatsAppNumber, DEFAULT_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface SellerSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export const SellerSettingsModal: React.FC<SellerSettingsModalProps> = ({
  isOpen,
  onClose,
  onSaved,
}) => {
  const currentPhone = getSellerWhatsAppNumber();
  const [phoneNumber, setPhoneNumber] = useState(currentPhone);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    if (cleanNumber.length >= 7) {
      saveSellerWhatsAppNumber(cleanNumber);
      setSavedSuccess(true);
      onSaved();
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 1000);
    }
  };

  const handleResetDefault = () => {
    setPhoneNumber(DEFAULT_WHATSAPP_NUMBER);
    saveSellerWhatsAppNumber(DEFAULT_WHATSAPP_NUMBER);
    onSaved();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-[#15100E]/70 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative bg-[#FAF7F3] dark:bg-[#1D1513] rounded-2xl max-w-md w-full border border-[#DCCBB8] dark:border-[#3D2F2A] shadow-2xl p-6 overflow-hidden transition-colors duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#3E312D]/70 dark:text-[#C2B5AC] hover:text-[#3E312D] dark:hover:text-[#F5EFEB] hover:bg-[#DCCBB8]/40 dark:hover:bg-[#271E1B] rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <span className="text-[10px] tracking-[0.24em] uppercase text-[#B98F77] dark:text-[#D4A388] font-sans font-semibold block">
            Merchant Configuration
          </span>
          <h3 className="font-serif text-2xl text-[#3E312D] dark:text-[#F5EFEB] font-normal mt-1">
            Mirex WhatsApp Recipient
          </h3>
          <p className="text-xs text-[#3E312D]/70 dark:text-[#C2B5AC] font-sans mt-1">
            All customer inquiries and orders sent through this website are directed to this WhatsApp phone number.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#3E312D] dark:text-[#F5EFEB] font-sans font-medium mb-1.5">
              WhatsApp Number (with International Country Code)
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#3E312D]/50 dark:text-[#C2B5AC]/50 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g. 2348133851163"
                className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-[#15100E] border border-[#DCCBB8] dark:border-[#3D2F2A] rounded text-sm text-[#3E312D] dark:text-[#F5EFEB] font-mono focus:outline-none focus:ring-1 focus:ring-[#B98F77]"
              />
            </div>
            <p className="text-[11px] text-[#3E312D]/60 dark:text-[#C2B5AC]/70 font-sans mt-1">
              Do not include '+' or dashes. Current default: 2348133851163.
            </p>
          </div>

          {/* Quick Preset Buttons */}
          <div className="text-[11px] font-sans text-[#3E312D]/70 dark:text-[#C2B5AC]">
            <span className="block mb-1.5 font-medium">Quick country code format:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setPhoneNumber('2348133851163')}
                className="px-2 py-1 bg-[#EFE8DF] dark:bg-[#271E1B] text-[#3E312D] dark:text-[#F5EFEB] rounded text-[10px] font-mono hover:bg-[#DCCBB8] dark:hover:bg-[#3D2F2A] cursor-pointer"
              >
                +2348133851163 (Mirex Line)
              </button>
              <button
                type="button"
                onClick={() => setPhoneNumber('12125550199')}
                className="px-2 py-1 bg-[#EFE8DF] dark:bg-[#271E1B] text-[#3E312D] dark:text-[#F5EFEB] rounded text-[10px] font-mono hover:bg-[#DCCBB8] dark:hover:bg-[#3D2F2A] cursor-pointer"
              >
                +1 (US)
              </button>
              <button
                type="button"
                onClick={() => setPhoneNumber('447700900123')}
                className="px-2 py-1 bg-[#EFE8DF] dark:bg-[#271E1B] text-[#3E312D] dark:text-[#F5EFEB] rounded text-[10px] font-mono hover:bg-[#DCCBB8] dark:hover:bg-[#3D2F2A] cursor-pointer"
              >
                +44 (UK)
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center gap-2">
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 bg-[#3E312D] dark:bg-[#F5EFEB] text-[#F7F3EF] dark:text-[#15100E] hover:bg-[#281F1D] dark:hover:bg-[#E2DDD8] rounded text-xs font-sans uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Number</span>
              )}
            </button>

            <button
              type="button"
              onClick={handleResetDefault}
              className="px-3 py-2.5 border border-[#DCCBB8] dark:border-[#3D2F2A] text-xs font-sans uppercase tracking-wider text-[#3E312D]/70 dark:text-[#C2B5AC] hover:text-[#3E312D] dark:hover:text-[#F5EFEB] rounded hover:bg-[#DCCBB8]/30 dark:hover:bg-[#271E1B] cursor-pointer"
            >
              Reset
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
