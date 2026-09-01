'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InquiryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'form' | 'printing' | 'receipt'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Corporate Events',
    otherEventType: '',
    guestCount: '50 - 150 Guests',
    notes: '',
  });

  const [ticketDetails, setTicketDetails] = useState({
    ticketId: '',
    timestamp: '',
  });

  // 5-second initial delay pop-up logic with sessionStorage persistence
  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('luxe_inquiry_modal_dismissed');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('luxe_inquiry_modal_dismissed', 'true');
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Generate unique inquiry ticket details
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const formattedTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    setTicketDetails({
      ticketId: `KE-2026-${randomNum}`,
      timestamp: `${formattedDate} · ${formattedTime}`,
    });

    // Start machine printing effect transition
    setStep('printing');
    setTimeout(() => {
      setStep('receipt');
    }, 2200);
  };

  const selectedEvent =
    formData.eventType === 'Other' && formData.otherEventType.trim()
      ? formData.otherEventType.trim()
      : formData.eventType;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-charcoal/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-charcoal border border-gold/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] max-w-lg w-full relative overflow-hidden my-auto p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top decorative gold line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold/20 via-gold to-gold/20" />

            {/* Corner accents */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-gold/40 pointer-events-none" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-gold/40 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-gold/40 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-gold/40 pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 text-ivory/60 hover:text-gold transition-colors duration-300 w-8 h-8 flex items-center justify-center border border-gold/20 hover:border-gold/50 bg-charcoal-light/10"
              aria-label="Close modal"
            >
              ✕
            </button>

            {step === 'form' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="mb-6">
                  <span className="text-gold font-body text-xs font-semibold tracking-[0.25em] uppercase block mb-1">
                    Bespoke Event Consultation
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-ivory">
                    Plan Your Experience
                  </h2>
                  <p className="text-ivory/60 text-xs sm:text-sm mt-1">
                    Share your requirements and receive a personalized proposal from our event directors.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-gold/90 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-charcoal-light/30 border border-gold/20 focus:border-gold px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/30 outline-none transition-colors"
                    />
                  </div>

                  {/* Email & Phone grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-gold/90 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="rahul@example.com"
                        className="w-full bg-charcoal-light/30 border border-gold/20 focus:border-gold px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/30 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-gold/90 mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        className="w-full bg-charcoal-light/30 border border-gold/20 focus:border-gold px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/30 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Event Type Select */}
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-gold/90 mb-1.5">
                      Event Category *
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      className="w-full bg-charcoal border border-gold/20 focus:border-gold px-4 py-2.5 text-sm text-ivory outline-none transition-colors cursor-pointer"
                    >
                      <option value="Corporate Events">Corporate Events</option>
                      <option value="Venue Sourcing">Venue Sourcing</option>
                      <option value="BTL Activations">BTL Activations</option>
                      <option value="Exhibition & Fabrication">Exhibition & Fabrication</option>
                      <option value="Décor & Design">Décor & Design</option>
                      <option value="Customised Gifting">Customised Gifting</option>
                      <option value="Engagement Activities">Engagement Activities</option>
                      <option value="Weddings & Luxury Celebrations">Weddings & Luxury Celebrations</option>
                      <option value="Branding & Visual Solutions">Branding & Visual Solutions</option>
                      <option value="Other">Other (Please Specify)</option>
                    </select>
                  </div>

                  {/* Dynamic 'Other' Event Input */}
                  <AnimatePresence>
                    {formData.eventType === 'Other' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <label className="block text-xs font-medium uppercase tracking-wider text-gold/90 mb-1.5 mt-2">
                          Specify Event Details *
                        </label>
                        <input
                          type="text"
                          name="otherEventType"
                          required={formData.eventType === 'Other'}
                          value={formData.otherEventType}
                          onChange={handleInputChange}
                          placeholder="e.g. Private Yacht Party, Brand Launch"
                          className="w-full bg-charcoal-light/30 border border-gold/40 focus:border-gold px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/30 outline-none transition-colors"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Guest Count */}
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-gold/90 mb-1.5">
                      Estimated Attendees / Guests
                    </label>
                    <select
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleInputChange}
                      className="w-full bg-charcoal border border-gold/20 focus:border-gold px-4 py-2.5 text-sm text-ivory outline-none transition-colors cursor-pointer"
                    >
                      <option value="Under 50 Guests">Under 50 Guests</option>
                      <option value="50 - 150 Guests">50 - 150 Guests</option>
                      <option value="150 - 500 Guests">150 - 500 Guests</option>
                      <option value="500+ Guests">500+ Guests</option>
                    </select>
                  </div>

                  {/* Message / Special Notes */}
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-gold/90 mb-1.5">
                      Special Requirements / Message
                    </label>
                    <textarea
                      name="notes"
                      rows={2}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Share target date, location preference, or special requests..."
                      className="w-full bg-charcoal-light/30 border border-gold/20 focus:border-gold px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/30 outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    className="w-full mt-2 bg-gradient-to-r from-gold via-gold-light to-gold text-charcoal font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase py-3.5 px-6 border border-gold hover:opacity-95 transition-all duration-300 shadow-lg shadow-gold/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Submit & Generate Ticket
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </form>
              </motion.div>
            )}

            {/* Printing Machine Loading Animation State */}
            {step === 'printing' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center flex flex-col items-center justify-center min-h-[360px]"
              >
                {/* Simulated printer head slot */}
                <div className="w-48 h-2 bg-charcoal-light border border-gold/40 rounded-full relative overflow-hidden mb-8">
                  <motion.div
                    animate={{ x: [-80, 80, -80] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                    className="w-12 h-full bg-gold shadow-[0_0_12px_#C6A962]"
                  />
                </div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  className="w-16 h-16 border-2 border-gold/30 border-t-gold rounded-full animate-spin mb-6"
                />

                <span className="text-gold font-mono text-xs font-semibold tracking-[0.3em] uppercase block animate-pulse">
                  Printing Verification Ticket...
                </span>
                <p className="text-ivory/50 text-xs mt-2">
                  Encrypting inquiry details & registering with director desk
                </p>
              </motion.div>
            )}

            {/* Receipt / Machine Ticket Success View */}
            {step === 'receipt' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="py-2"
              >
                {/* Physical Ticket Simulation */}
                <div className="bg-[#FAF7F0] text-charcoal p-6 sm:p-7 relative shadow-2xl border-t-4 border-gold">
                  {/* Top serrated ticket edge */}
                  <div
                    className="absolute -top-3 left-0 right-0 h-3"
                    style={{
                      backgroundImage: `radial-gradient(circle at 10px 0, transparent 6px, #FAF7F0 7px)`,
                      backgroundSize: '20px 10px',
                    }}
                  />

                  {/* Header */}
                  <div className="flex items-start justify-between border-b border-charcoal/15 pb-4 mb-4">
                    <div>
                      <span className="font-display font-bold text-lg text-charcoal tracking-tight block">
                        KRAFTIVE EVENTS
                      </span>
                      <span className="text-[10px] font-mono tracking-widest text-charcoal/60 uppercase">
                        Official Inquiry Pass
                      </span>
                    </div>

                    <div className="bg-gold/15 border border-gold/60 text-charcoal font-mono text-[10px] font-bold px-2.5 py-1 tracking-wider uppercase flex items-center gap-1">
                      
                      VERIFIED
                    </div>
                  </div>

                  {/* Data Grid */}
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between border-b border-dashed border-charcoal/15 pb-2">
                      <span className="text-charcoal/50 uppercase">TICKET NO:</span>
                      <span className="font-bold text-charcoal">{ticketDetails.ticketId}</span>
                    </div>

                    <div className="flex justify-between border-b border-dashed border-charcoal/15 pb-2">
                      <span className="text-charcoal/50 uppercase">DATE / TIME:</span>
                      <span className="font-medium text-charcoal">{ticketDetails.timestamp}</span>
                    </div>

                    <div className="flex justify-between border-b border-dashed border-charcoal/15 pb-2">
                      <span className="text-charcoal/50 uppercase">CLIENT NAME:</span>
                      <span className="font-bold text-charcoal">{formData.name}</span>
                    </div>

                    <div className="flex justify-between border-b border-dashed border-charcoal/15 pb-2">
                      <span className="text-charcoal/50 uppercase">CONTACT:</span>
                      <span className="font-medium text-charcoal">{formData.phone}</span>
                    </div>

                    <div className="flex justify-between border-b border-dashed border-charcoal/15 pb-2">
                      <span className="text-charcoal/50 uppercase">EVENT CATEGORY:</span>
                      <span className="font-bold text-gold-dark">{selectedEvent}</span>
                    </div>

                    <div className="flex justify-between border-b border-dashed border-charcoal/15 pb-2">
                      <span className="text-charcoal/50 uppercase">GUEST COUNT:</span>
                      <span className="font-medium text-charcoal">{formData.guestCount}</span>
                    </div>

                    {formData.notes && (
                      <div className="pt-1">
                        <span className="text-charcoal/50 uppercase block text-[10px] mb-0.5">NOTES:</span>
                        <p className="text-[11px] font-sans text-charcoal/80 italic leading-snug">
                          "{formData.notes}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Barcode graphic */}
                  <div className="mt-6 pt-4 border-t border-charcoal/20 text-center">
                    <div className="flex justify-center items-center gap-1 h-10 opacity-80">
                      {[3, 1, 4, 2, 5, 1, 3, 2, 4, 1, 6, 2, 3, 1, 4, 2, 5, 1, 3, 2, 4, 2, 1, 4].map((w, i) => (
                        <div key={i} className="bg-charcoal h-full" style={{ width: `${w}px` }} />
                      ))}
                    </div>
                    <span className="text-[9px] font-mono tracking-[0.3em] text-charcoal/60 uppercase block mt-1">
                      *{ticketDetails.ticketId}*
                    </span>
                  </div>

                  {/* Bottom serrated ticket edge */}
                  <div
                    className="absolute -bottom-3 left-0 right-0 h-3 rotate-180"
                    style={{
                      backgroundImage: `radial-gradient(circle at 10px 0, transparent 6px, #FAF7F0 7px)`,
                      backgroundSize: '20px 10px',
                    }}
                  />
                </div>

                <p className="text-center text-ivory/60 text-xs mt-6 mb-4">
                  Thank you! Our event director will review your ticket and reach out via WhatsApp / Email shortly.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 bg-charcoal-light/30 border border-gold/30 hover:border-gold text-ivory text-xs font-semibold uppercase tracking-wider py-3 transition-colors cursor-pointer"
                  >
                    Print Ticket
                  </button>
                  <button
                    onClick={handleClose}
                    className="flex-1 bg-gold text-charcoal font-semibold text-xs uppercase tracking-wider py-3 hover:bg-gold-light transition-colors cursor-pointer"
                  >
                    Done & Close
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
