'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface BookingReceiptData {
  refCode: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventType: string;
  guestCount: string;
  budgetRange: string;
  eventDate: string;
  location: string;
  notes: string;
  submittedAt: string;
}

interface EventReceiptProps {
  data: BookingReceiptData;
  onClose: () => void;
}

export default function EventReceipt({ data, onClose }: EventReceiptProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(data.refCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`Kraftive Event Consultation - ${data.eventType}`);
    const details = encodeURIComponent(
      `Booking Ref: ${data.refCode}\nClient: ${data.clientName}\nEvent: ${data.eventType}\nGuest Count: ${data.guestCount}\nBudget: ${data.budgetRange}\nLocation: ${data.location}`
    );
    const dateFormatted = data.eventDate ? data.eventDate.replace(/-/g, '') : '';
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${dateFormatted}/${dateFormatted}`;
    window.open(googleCalUrl, '_blank');
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Kraftive Events! I just submitted an event inquiry.\n*Ref Code:* ${data.refCode}\n*Name:* ${data.clientName}\n*Event Type:* ${data.eventType}\n*Target Date:* ${data.eventDate || 'TBD'}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      className="w-full text-left font-body"
    >
      {/* Receipt Voucher Pass Card */}
      <div
        id="printable-receipt"
        className="relative overflow-hidden bg-gradient-to-b from-[#1C1C1C] via-[#242424] to-[#181818] rounded-xl border border-gold/40 shadow-2xl p-5 sm:p-6 text-ivory"
      >
        {/* Top Gold Foil Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-dark via-gold-light to-gold" />

        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gold/20 pb-4 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-[10px] font-bold uppercase tracking-wider mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Inquiry Confirmed
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-ivory">
              VIP Event Booking Pass
            </h3>
            <p className="text-[11px] text-ivory/60 mt-0.5">
              Issued: {data.submittedAt}
            </p>
          </div>

          <div className="bg-charcoal/90 border border-gold/30 rounded-lg px-3 py-2 text-left sm:text-right">
            <span className="block text-[9px] uppercase tracking-widest text-ivory/50 font-medium">
              Ref Code
            </span>
            <span className="font-mono text-xs sm:text-sm font-bold text-gold tracking-wide">
              {data.refCode}
            </span>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {/* Client Box */}
          <div className="bg-[#242424]/80 border border-ivory/10 rounded-lg p-3">
            <span className="block text-[10px] uppercase tracking-wider text-gold font-semibold mb-1">
              Client Contact
            </span>
            <p className="font-bold text-xs sm:text-sm text-ivory leading-tight">{data.clientName}</p>
            <p className="text-[11px] text-ivory/70 truncate mt-0.5">{data.clientEmail}</p>
            <p className="text-[11px] text-ivory/70 mt-0.5">{data.clientPhone}</p>
          </div>

          {/* Event Box */}
          <div className="bg-[#242424]/80 border border-ivory/10 rounded-lg p-3">
            <span className="block text-[10px] uppercase tracking-wider text-gold font-semibold mb-1">
              Event Details
            </span>
            <p className="font-bold text-xs sm:text-sm text-ivory leading-tight">{data.eventType}</p>
            <p className="text-[11px] text-ivory/70 mt-0.5">Date: {data.eventDate || 'To be scheduled'}</p>
            <p className="text-[11px] text-ivory/70 mt-0.5">Guests: {data.guestCount}</p>
          </div>
        </div>

        {/* Budget & Location Row */}
        <div className="bg-gradient-to-r from-gold/15 via-gold/5 to-transparent border-l-2 border-gold rounded-r-lg p-3 mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-ivory/60 uppercase tracking-wider text-[9px] block">
                Target Budget Range
              </span>
              <span className="font-bold text-gold text-xs sm:text-sm">
                {data.budgetRange}
              </span>
            </div>
            <div>
              <span className="text-ivory/60 uppercase tracking-wider text-[9px] block">
                Location / City
              </span>
              <span className="font-medium text-ivory text-xs sm:text-sm">
                {data.location || 'Pan-India / International'}
              </span>
            </div>
          </div>
        </div>

        {/* Notes (if provided) */}
        {data.notes && (
          <div className="mb-4 bg-[#202020] border border-ivory/5 rounded-lg p-2.5">
            <span className="block text-[9px] uppercase tracking-wider text-ivory/50 mb-0.5">
              Client Vision
            </span>
            <p className="text-[11px] text-ivory/80 italic line-clamp-2">
              &quot;{data.notes}&quot;
            </p>
          </div>
        )}

        {/* Support Note */}
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-gold/5 border border-gold/20 text-[11px] text-ivory/80 mb-4">
          <svg
            style={{ width: '16px', height: '16px', minWidth: '16px', minHeight: '16px' }}
            className="text-gold shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>Our Event Lead will contact you within 4 business hours.</span>
        </div>

        {/* Action Buttons Toolbar - Fixed explicit dimensions on SVGs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-ivory/10">
          <button
            type="button"
            onClick={handleCopyCode}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-[#2A2A2A] hover:bg-gold/20 text-ivory text-[11px] rounded-lg border border-gold/30 transition-all font-medium cursor-pointer"
          >
            <svg
              style={{ width: '14px', height: '14px', minWidth: '14px', minHeight: '14px' }}
              className="text-gold shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span className="whitespace-nowrap">{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-[#2A2A2A] hover:bg-gold/20 text-ivory text-[11px] rounded-lg border border-gold/30 transition-all font-medium cursor-pointer"
          >
            <svg
              style={{ width: '14px', height: '14px', minWidth: '14px', minHeight: '14px' }}
              className="text-gold shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span className="whitespace-nowrap">Print Pass</span>
          </button>

          <button
            type="button"
            onClick={handleAddToCalendar}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-[#2A2A2A] hover:bg-gold/20 text-ivory text-[11px] rounded-lg border border-gold/30 transition-all font-medium cursor-pointer"
          >
            <svg
              style={{ width: '14px', height: '14px', minWidth: '14px', minHeight: '14px' }}
              className="text-gold shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="whitespace-nowrap">Add to Cal</span>
          </button>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-emerald-900/30 hover:bg-emerald-900/50 text-emerald-300 text-[11px] rounded-lg border border-emerald-500/40 transition-all font-medium cursor-pointer"
          >
            <svg
              style={{ width: '14px', height: '14px', minWidth: '14px', minHeight: '14px' }}
              className="text-emerald-400 shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.002 3.66 3.745-.993z"/>
            </svg>
            <span className="whitespace-nowrap">WhatsApp</span>
          </button>
        </div>

        {/* Primary Done Button */}
        <div className="mt-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 bg-gold hover:bg-gold-light text-charcoal font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-300 shadow-md cursor-pointer"
          >
            Close & Done
          </button>
        </div>
      </div>
    </motion.div>
  );
}
