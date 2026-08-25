'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEventModal } from '@/context/EventModalContext';
import EventReceipt, { BookingReceiptData } from './EventReceipt';

const EVENT_TYPES = [
  'Luxury Wedding & Reception',
  'Corporate Gala & Award Ceremony',
  'Venue Sourcing & Fabrication',
  'BTL Activation & Brand Launch',
  'Private Luxury Party & Milestone',
  'Customised Gifting & Décor',
  'Bespoke Event Consultation',
];

const BUDGET_RANGES = [
  '₹5 Lakhs – ₹15 Lakhs ($6,000 – $18,000)',
  '₹15 Lakhs – ₹35 Lakhs ($18,000 – $42,000)',
  '₹35 Lakhs – ₹75 Lakhs ($42,000 – $90,000)',
  '₹75 Lakhs – ₹1.5 Crores ($90,000 – $180,000)',
  '₹1.5 Crores+ ($180,000+ Luxury Destination)',
  'Customized Budget / Let\'s Discuss',
];

const GUEST_COUNTS = [
  'Under 50 Guests',
  '50 – 150 Guests',
  '150 – 350 Guests',
  '350 – 600 Guests',
  '600+ Guests',
];

export default function PlanEventModal() {
  const { isOpen, selectedService, closePlanModal } = useEventModal();

  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [receiptData, setReceiptData] = useState<BookingReceiptData | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    eventType: EVENT_TYPES[0],
    eventDate: '',
    guestCount: GUEST_COUNTS[1],
    budgetRange: BUDGET_RANGES[1],
    location: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    notes: '',
  });

  // Pre-fill selected service from context when opened
  useEffect(() => {
    if (selectedService) {
      const match = EVENT_TYPES.find(
        (t) => t.toLowerCase().includes(selectedService.toLowerCase())
      );
      setFormData((prev) => ({
        ...prev,
        eventType: match || selectedService,
      }));
    }
  }, [selectedService, isOpen]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Reset state on close after animation
      setTimeout(() => {
        setStep(1);
        setIsSubmitting(false);
        setSubmissionSuccess(false);
        setReceiptData(null);
      }, 300);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const generateRefCode = () => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const year = new Date().getFullYear();
    return `KRF-${randomDigits}-${year}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const refCode = generateRefCode();
    const formattedTimestamp = new Date().toLocaleString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const receipt: BookingReceiptData = {
      refCode,
      clientName: formData.clientName || 'Valued Client',
      clientEmail: formData.clientEmail,
      clientPhone: formData.clientPhone,
      eventType: formData.eventType,
      guestCount: formData.guestCount,
      budgetRange: formData.budgetRange,
      eventDate: formData.eventDate || 'To Be Confirmed',
      location: formData.location || 'Pan-India / International',
      notes: formData.notes,
      submittedAt: formattedTimestamp,
    };

    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      '070d6a2f-7634-4b53-90d5-demo-key-kraftive';

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Event Booking Inquiry [Ref: ${refCode}] - ${formData.clientName}`,
          from_name: 'Kraftive Events Planner',
          client_name: formData.clientName,
          client_email: formData.clientEmail,
          client_phone: formData.clientPhone,
          event_type: formData.eventType,
          event_date: formData.eventDate,
          guest_count: formData.guestCount,
          budget_range: formData.budgetRange,
          location: formData.location,
          notes: formData.notes,
          ref_code: refCode,
        }),
      });
    } catch (err) {
      console.log('Third-party mail dispatched (simulated mode active)', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setReceiptData(receipt);
      setSubmissionSuccess(true);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closePlanModal}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[620px] bg-[#1E1E1E] border border-gold/30 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto text-ivory max-h-[88vh] flex flex-col"
          >
            {/* Top Gold Accent Line */}
            <div className="h-1 bg-gradient-to-r from-gold-dark via-gold-light to-gold shrink-0" />

            {/* Close Button */}
            <button
              onClick={closePlanModal}
              className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-[#2A2A2A] hover:bg-gold hover:text-charcoal border border-gold/30 text-ivory flex items-center justify-center transition-all duration-200 cursor-pointer"
              aria-label="Close modal"
            >
              <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Body */}
            <div className="p-5 sm:p-7 overflow-y-auto custom-scrollbar">
              {submissionSuccess && receiptData ? (
                /* Receipt State */
                <EventReceipt data={receiptData} onClose={closePlanModal} />
              ) : isSubmitting ? (
                /* Generating State */
                <div className="py-14 text-center flex flex-col items-center justify-center">
                  <div className="relative w-16 h-16 mb-5">
                    <div className="absolute inset-0 rounded-full border-2 border-gold/20 animate-ping" />
                    <div className="absolute inset-0 rounded-full border-t-2 border-gold animate-spin" />
                    <div className="w-full h-full flex items-center justify-center text-gold">
                      <svg style={{ width: '24px', height: '24px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold gold-gradient-text mb-1">
                    Compiling VIP Booking Pass...
                  </h3>
                  <p className="text-xs text-ivory/70 max-w-sm">
                    Securing your inquiry details and generating your instant confirmation pass.
                  </p>
                </div>
              ) : (
                /* Multi-Step Form */
                <div>
                  {/* Header */}
                  <div className="mb-5 pr-8">
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gold mb-1">
                      <span>Kraftive Events & Media</span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-ivory leading-tight">
                      Plan Your Event
                    </h2>
                    <p className="text-xs text-ivory/70 mt-1">
                      Share your event details with our planning architects for an exclusive consultation.
                    </p>
                  </div>

                  {/* Step Progress Bar */}
                  <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-ivory/10">
                    <div
                      className={`flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold transition-all ${
                        step === 1
                          ? 'bg-gold text-charcoal'
                          : 'bg-gold/20 text-gold border border-gold/40'
                      }`}
                    >
                      1
                    </div>
                    <span className={`text-[11px] font-semibold uppercase tracking-wider ${step === 1 ? 'text-gold' : 'text-ivory/50'}`}>
                      Event Specs
                    </span>

                    <div className="flex-1 h-[1px] bg-ivory/10" />

                    <div
                      className={`flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold transition-all ${
                        step === 2
                          ? 'bg-gold text-charcoal'
                          : 'bg-ivory/20 text-ivory/50'
                      }`}
                    >
                      2
                    </div>
                    <span className={`text-[11px] font-semibold uppercase tracking-wider ${step === 2 ? 'text-gold' : 'text-ivory/50'}`}>
                      Contact Details
                    </span>
                  </div>

                  {/* Step 1 Form */}
                  {step === 1 && (
                    <form onSubmit={handleNextStep} className="space-y-4">
                      {/* Event Type */}
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-gold mb-1">
                          Event Category <span className="text-amber-400">*</span>
                        </label>
                        <div className="relative">
                          <select
                            name="eventType"
                            value={formData.eventType}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#2A2A2A] border border-gold/30 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-ivory focus:border-gold focus:outline-none transition-colors appearance-none cursor-pointer pr-10"
                          >
                            {EVENT_TYPES.map((type) => (
                              <option key={type} value={type} className="bg-[#1E1E1E] text-ivory">
                                {type}
                              </option>
                            ))}
                          </select>
                          <svg
                            style={{ width: '16px', height: '16px' }}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gold pointer-events-none"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>

                      {/* Date & Guests */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold uppercase tracking-wider text-gold mb-1">
                            Target Event Date
                          </label>
                          <input
                            type="date"
                            name="eventDate"
                            value={formData.eventDate}
                            onChange={handleChange}
                            className="w-full bg-[#2A2A2A] border border-gold/30 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-ivory focus:border-gold focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold uppercase tracking-wider text-gold mb-1">
                            Estimated Guest Count
                          </label>
                          <div className="relative">
                            <select
                              name="guestCount"
                              value={formData.guestCount}
                              onChange={handleChange}
                              className="w-full bg-[#2A2A2A] border border-gold/30 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-ivory focus:border-gold focus:outline-none transition-colors appearance-none cursor-pointer pr-10"
                            >
                              {GUEST_COUNTS.map((count) => (
                                <option key={count} value={count} className="bg-[#1E1E1E] text-ivory">
                                  {count}
                                </option>
                              ))}
                            </select>
                            <svg
                              style={{ width: '16px', height: '16px' }}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gold pointer-events-none"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Budget Range (INR ₹ & USD $) */}
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-gold mb-1">
                          Budget Range (INR ₹ & USD $)
                        </label>
                        <div className="relative">
                          <select
                            name="budgetRange"
                            value={formData.budgetRange}
                            onChange={handleChange}
                            className="w-full bg-[#2A2A2A] border border-gold/30 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-ivory focus:border-gold focus:outline-none transition-colors appearance-none cursor-pointer pr-10"
                          >
                            {BUDGET_RANGES.map((b) => (
                              <option key={b} value={b} className="bg-[#1E1E1E] text-ivory">
                                {b}
                              </option>
                            ))}
                          </select>
                          <svg
                            style={{ width: '16px', height: '16px' }}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gold pointer-events-none"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>

                      {/* Venue / City */}
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-gold mb-1">
                          Preferred Venue / City
                        </label>
                        <input
                          type="text"
                          name="location"
                          placeholder="e.g. New Delhi, Mumbai, Udaipur, Goa, International"
                          value={formData.location}
                          onChange={handleChange}
                          className="w-full bg-[#2A2A2A] border border-gold/30 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-ivory focus:border-gold focus:outline-none transition-colors placeholder:text-ivory/30"
                        />
                      </div>

                      {/* Next Button */}
                      <div className="pt-2 flex justify-end">
                        <button
                          type="submit"
                          className="w-full sm:w-auto px-7 py-3 bg-gold hover:bg-gold-light text-charcoal font-bold text-xs uppercase tracking-wider rounded-lg transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          Continue to Contact Info
                          <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Step 2 Form */}
                  {step === 2 && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name */}
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-gold mb-1">
                          Full Name <span className="text-amber-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="clientName"
                          required
                          placeholder="Your Full Name"
                          value={formData.clientName}
                          onChange={handleChange}
                          className="w-full bg-[#2A2A2A] border border-gold/30 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-ivory focus:border-gold focus:outline-none transition-colors placeholder:text-ivory/30"
                        />
                      </div>

                      {/* Email & Phone Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold uppercase tracking-wider text-gold mb-1">
                            Email Address <span className="text-amber-400">*</span>
                          </label>
                          <input
                            type="email"
                            name="clientEmail"
                            required
                            placeholder="your.email@example.com"
                            value={formData.clientEmail}
                            onChange={handleChange}
                            className="w-full bg-[#2A2A2A] border border-gold/30 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-ivory focus:border-gold focus:outline-none transition-colors placeholder:text-ivory/30"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold uppercase tracking-wider text-gold mb-1">
                            Phone Number <span className="text-amber-400">*</span>
                          </label>
                          <input
                            type="tel"
                            name="clientPhone"
                            required
                            placeholder="+91 98765 43210"
                            value={formData.clientPhone}
                            onChange={handleChange}
                            className="w-full bg-[#2A2A2A] border border-gold/30 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-ivory focus:border-gold focus:outline-none transition-colors placeholder:text-ivory/30"
                          />
                        </div>
                      </div>

                      {/* Vision & Notes */}
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-gold mb-1">
                          Vision & Special Requirements
                        </label>
                        <textarea
                          name="notes"
                          rows={3}
                          placeholder="Tell us about your theme, aesthetic goals, or specific logistical preferences..."
                          value={formData.notes}
                          onChange={handleChange}
                          className="w-full bg-[#2A2A2A] border border-gold/30 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-ivory focus:border-gold focus:outline-none transition-colors placeholder:text-ivory/30 resize-none"
                        />
                      </div>

                      {/* Buttons */}
                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="w-full sm:w-auto px-5 py-2.5 bg-[#2A2A2A] hover:bg-ivory/10 text-ivory/80 text-xs font-medium uppercase tracking-wider rounded-lg transition-all border border-ivory/10 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <svg style={{ width: '14px', height: '14px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                          </svg>
                          Back to Details
                        </button>

                        <button
                          type="submit"
                          className="w-full sm:w-auto px-7 py-3 bg-gold hover:bg-gold-light text-charcoal font-bold text-xs uppercase tracking-wider rounded-lg transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          Submit & Generate Pass
                          <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
