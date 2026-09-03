'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function FloatingActions() {
  const pathname = usePathname();
  const [isHoveredWhatsApp, setIsHoveredWhatsApp] = useState(false);
  const [isHoveredPlan, setIsHoveredPlan] = useState(false);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const whatsappUrl =
    'https://wa.me/919082097808?text=Hi%20Kraftive%20Events%2C%20I%20would%20like%20to%20inquire%20about%20planning%20an%20event.';

  const handleOpenInquiry = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-inquiry-modal'));
    }
  };

  return (
    <>
      {/* 1. Middle-Right Vertical Edge Dock: Plan Your Event */}
      <aside
        aria-label="Plan Your Event Quick Action"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[90] pointer-events-auto select-none"
      >
        <div className="relative flex items-center">
          {/* Tooltip on hover */}
          <AnimatePresence>
            {isHoveredPlan && (
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.2 }}
                className="absolute right-full mr-3 hidden md:block pointer-events-none"
              >
                <div className="bg-charcoal text-ivory text-xs font-semibold px-3.5 py-2 shadow-2xl border border-gold/30 whitespace-nowrap rounded-sm">
                  <span>Instant Consultation & Ticket Pass</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bold Classic Gold Vertical Tab */}
          <motion.button
            onClick={handleOpenInquiry}
            onMouseEnter={() => setIsHoveredPlan(true)}
            onMouseLeave={() => setIsHoveredPlan(false)}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ x: -6 }}
            whileTap={{ scale: 0.97 }}
            className="group relative bg-gradient-to-b from-[#D4AF37] via-[#C6A962] to-[#A8893A] text-charcoal py-5 sm:py-6 px-3 sm:px-4 rounded-l-xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] border-t border-b border-l border-gold-light hover:shadow-[0_12px_35px_rgba(198,169,98,0.55)] transition-all duration-300 cursor-pointer flex flex-col items-center gap-3"
          >
            {/* Bold Calendar / Arrow Icon */}
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-charcoal shrink-0 transform group-hover:translate-y-0.5 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>

            {/* Bold High-Visibility Text */}
            <span
              className="font-body font-black text-xs sm:text-sm text-charcoal tracking-[0.2em] uppercase whitespace-nowrap"
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
              }}
            >
              Plan Your Event
            </span>
          </motion.button>
        </div>
      </aside>

      {/* 2. Bottom-Right Floating FAB: WhatsApp */}
      <div
        aria-label="WhatsApp Floating Action"
        className="fixed right-4 sm:right-6 bottom-6 z-[90] pointer-events-auto select-none flex flex-col items-end gap-2"
      >
        <div className="relative flex items-center">
          {/* Tooltip on hover */}
          <AnimatePresence>
            {isHoveredWhatsApp && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-full mr-3 hidden sm:block pointer-events-none"
              >
                <div className="bg-charcoal text-ivory text-xs font-semibold px-3.5 py-2 shadow-2xl border border-[#25D366]/40 whitespace-nowrap rounded-md">
                  <span>Chat on WhatsApp (+91 9082097808)</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp with Kraftive Events"
            onMouseEnter={() => setIsHoveredWhatsApp(true)}
            onMouseLeave={() => setIsHoveredWhatsApp(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.94 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_25px_rgba(37,211,102,0.45)] border-2 border-white/20 hover:shadow-[0_12px_32px_rgba(37,211,102,0.7)] transition-all duration-300 cursor-pointer"
          >
            {/* WhatsApp SVG Icon */}
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 fill-white transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </motion.a>
        </div>
      </div>
    </>
  );
}
