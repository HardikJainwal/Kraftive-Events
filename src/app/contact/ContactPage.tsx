'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { siteConfig } from '../../../data/siteConfig';

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  otherEventType: string;
  eventDate: string;
  guestCount: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const eventTypes = [
  'Corporate Events',
  'Venue Sourcing',
  'BTL Activations',
  'Exhibition & Fabrication',
  'Décor & Design',
  'Customised Gifting',
  'Engagement Activities',
  'Weddings & Luxury Celebrations',
  'Branding & Visual Solutions',
  'Other',
];

const guestRanges = [
  'Under 50 Guests',
  '50 - 150 Guests',
  '150 - 500 Guests',
  '500+ Guests',
];

// Isolated submission logic — connect to backend/email service here
async function submitForm(data: FormData): Promise<{ success: boolean; message: string }> {
  // TODO: Connect to your backend API or email service
  // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
  console.log('Form submission:', data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Thank you! We\'ll be in touch within 24 hours.' });
    }, 1500);
  });
}

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    otherEventType: '',
    eventDate: '',
    guestCount: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [step, setStep] = useState<'form' | 'printing' | 'receipt'>('form');
  const [ticketDetails, setTicketDetails] = useState({
    ticketId: '',
    timestamp: '',
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const todayDate = new Date().toISOString().split('T')[0];

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Please enter a valid email';
    if (!form.eventType) newErrors.eventType = 'Please select an event category';
    if (form.eventDate && form.eventDate < todayDate) {
      newErrors.eventDate = 'Please select a future date (past dates not allowed)';
    }
    if (!form.message.trim()) newErrors.message = 'Please tell us about your event';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Show printing animation state while API processes
    setStep('printing');

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

    const ticketId = `KE-2026-${randomNum}`;
    const timestamp = `${formattedDate} · ${formattedTime}`;

    setTicketDetails({
      ticketId,
      timestamp,
    });

    const startTime = Date.now();

    try {
      // Dispatch email notification to Ashoutosh@kraftiveevents.com
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          ticketId,
          timestamp,
          source: 'Contact Page Form',
        }),
      });

      const data = await res.json();

      // Ensure printing animation displays for at least 1.5s for smooth UX
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 1500) {
        await new Promise((resolve) => setTimeout(resolve, 1500 - elapsedTime));
      }

      if (res.ok && data.success) {
        // API hit successfully — display official receipt pass
        setStep('receipt');
      } else {
        alert(data.error || 'Failed to submit inquiry. Please check details and try again.');
        setStep('form');
      }
    } catch (err) {
      console.error('Failed to submit inquiry:', err);
      alert('Network error. Please check your connection and try again.');
      setStep('form');
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      otherEventType: '',
      eventDate: '',
      guestCount: '',
      message: '',
    });
    setErrors({});
    setStep('form');
  };

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const selectedEvent =
    form.eventType === 'Other' && form.otherEventType.trim()
      ? form.otherEventType.trim()
      : form.eventType;

  const inputBaseClass =
    'w-full bg-transparent border border-gold/20 px-4 py-3.5 text-charcoal text-sm font-body focus:border-gold focus:ring-0 focus:outline-none transition-colors duration-300 placeholder:text-charcoal-light/40';
  const errorClass = 'border-red-400 focus:border-red-500';
  const selectClass = `${inputBaseClass} appearance-none cursor-pointer`;

  return (
    <>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative h-[50vh] min-h-[350px] overflow-hidden flex items-end"
      >
        <motion.div
          style={{ y: heroImgY }}
          className="absolute inset-0 w-full h-[130%] -top-[15%]"
        >
          <Image
            src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1600&q=80"
            alt="Luxury event venue"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/20" />
        </motion.div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12 pb-12 md:pb-16 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gold font-body text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-4"
          >
            Get In Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ivory leading-tight"
          >
            Let&apos;s Plan Something{' '}
            <span className="italic gold-gradient-text">Extraordinary</span>
          </motion.h1>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding bg-ivory">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form & Ticket View Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              {step === 'form' && (
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-2">
                    Tell Us About Your Event
                  </h2>
                  <p className="text-charcoal-light/60 text-sm mb-8">
                    Fill out the form below and we&apos;ll generate your official inquiry pass right away.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-semibold tracking-widest uppercase text-charcoal-light/60 mb-2"
                        >
                          Full Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          value={form.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          placeholder="Your full name"
                          className={`${inputBaseClass} ${errors.name ? errorClass : ''}`}
                          required
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-semibold tracking-widest uppercase text-charcoal-light/60 mb-2"
                        >
                          Email Address *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={form.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          placeholder="your@email.com"
                          className={`${inputBaseClass} ${errors.email ? errorClass : ''}`}
                          required
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Phone & Event Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-xs font-semibold tracking-widest uppercase text-charcoal-light/60 mb-2"
                        >
                          Phone / WhatsApp *
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          placeholder="+91 98765 43210"
                          className={inputBaseClass}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-event-type"
                          className="block text-xs font-semibold tracking-widest uppercase text-charcoal-light/60 mb-2"
                        >
                          Event Category *
                        </label>
                        <div className="relative">
                          <select
                            id="contact-event-type"
                            value={form.eventType}
                            onChange={(e) =>
                              updateField('eventType', e.target.value)
                            }
                            className={`${selectClass} ${errors.eventType ? errorClass : ''}`}
                            required
                          >
                            <option value="">Select event category</option>
                            {eventTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                          <svg
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold pointer-events-none"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                        {errors.eventType && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.eventType}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Dynamic 'Other' Event Input */}
                    {form.eventType === 'Other' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden mb-6"
                      >
                        <label
                          htmlFor="contact-other-event-type"
                          className="block text-xs font-semibold tracking-widest uppercase text-charcoal-light/60 mb-2"
                        >
                          Specify Event Details *
                        </label>
                        <input
                          id="contact-other-event-type"
                          type="text"
                          value={form.otherEventType}
                          onChange={(e) =>
                            updateField('otherEventType', e.target.value)
                          }
                          placeholder="e.g. Private Yacht Party, Brand Launch"
                          className={inputBaseClass}
                          required={form.eventType === 'Other'}
                        />
                      </motion.div>
                    )}

                    {/* Date & Guest Count */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="contact-date"
                          className="block text-xs font-semibold tracking-widest uppercase text-charcoal-light/60 mb-2"
                        >
                        Event Date
                        </label>
                        <input
                          id="contact-date"
                          type="date"
                          min={todayDate}
                          value={form.eventDate}
                          onChange={(e) =>
                            updateField('eventDate', e.target.value)
                          }
                          className={`${inputBaseClass} ${errors.eventDate ? errorClass : ''}`}
                        />
                        {errors.eventDate && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.eventDate}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="contact-guests"
                          className="block text-xs font-semibold tracking-widest uppercase text-charcoal-light/60 mb-2"
                        >
                          Estimated Attendees / Guests
                        </label>
                        <div className="relative">
                          <select
                            id="contact-guests"
                            value={form.guestCount}
                            onChange={(e) =>
                              updateField('guestCount', e.target.value)
                            }
                            className={selectClass}
                          >
                            <option value="">Estimated guests</option>
                            {guestRanges.map((range) => (
                              <option key={range} value={range}>
                                {range}
                              </option>
                            ))}
                          </select>
                          <svg
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold pointer-events-none"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold tracking-widest uppercase text-charcoal-light/60 mb-2"
                      >
                        Special Requirements / Message *
                      </label>
                      <textarea
                        id="contact-message"
                        value={form.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        placeholder="Describe your dream event — theme, vibe, must-haves, anything that inspires you..."
                        rows={5}
                        className={`${inputBaseClass} resize-none ${
                          errors.message ? errorClass : ''
                        }`}
                        required
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-gold via-gold-light to-gold text-charcoal font-semibold text-sm tracking-widest uppercase px-8 py-4 border border-gold hover:opacity-95 transition-all duration-300 shadow-lg shadow-gold/10 cursor-pointer inline-flex items-center justify-center gap-2"
                    >
                      Submit & Generate Ticket
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </motion.button>
                  </form>
                </div>
              )}

              {/* Printing Machine Loading Animation State */}
              {step === 'printing' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-16 text-center flex flex-col items-center justify-center bg-charcoal p-8 border border-gold/30 shadow-xl"
                >
                  {/* Simulated printer head slot */}
                  <div className="w-56 h-2.5 bg-charcoal-light border border-gold/40 rounded-full relative overflow-hidden mb-8">
                    <motion.div
                      animate={{ x: [-100, 100, -100] }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                      className="w-14 h-full bg-gold shadow-[0_0_12px_#C6A962]"
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

              {/* Ticket Receipt View */}
              {step === 'receipt' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="py-2"
                >
                  <div className="bg-[#FAF7F0] text-charcoal p-6 sm:p-8 relative shadow-2xl border-t-4 border-gold">
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
                        <span className="font-display font-bold text-lg md:text-xl text-charcoal tracking-tight block">
                          KRAFTIVE EVENTS
                        </span>
                        <span className="text-[10px] font-mono tracking-widest text-charcoal/60 uppercase">
                          Official Inquiry Pass
                        </span>
                      </div>

                      <div className="bg-gold/15 border border-gold/60 text-charcoal font-mono text-[10px] font-bold px-3 py-1 tracking-wider uppercase flex items-center gap-1">
                        VERIFIED
                      </div>
                    </div>

                    {/* Data Grid */}
                    <div className="space-y-3 font-mono text-xs md:text-sm">
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
                        <span className="font-bold text-charcoal">{form.name}</span>
                      </div>

                      <div className="flex justify-between border-b border-dashed border-charcoal/15 pb-2">
                        <span className="text-charcoal/50 uppercase">EMAIL:</span>
                        <span className="font-medium text-charcoal">{form.email}</span>
                      </div>

                      {form.phone && (
                        <div className="flex justify-between border-b border-dashed border-charcoal/15 pb-2">
                          <span className="text-charcoal/50 uppercase">CONTACT:</span>
                          <span className="font-medium text-charcoal">{form.phone}</span>
                        </div>
                      )}

                      <div className="flex justify-between border-b border-dashed border-charcoal/15 pb-2">
                        <span className="text-charcoal/50 uppercase">EVENT CATEGORY:</span>
                        <span className="font-bold text-gold-dark">{selectedEvent}</span>
                      </div>

                      {form.eventDate && (
                        <div className="flex justify-between border-b border-dashed border-charcoal/15 pb-2">
                          <span className="text-charcoal/50 uppercase">EVENT DATE:</span>
                          <span className="font-bold text-charcoal">{form.eventDate}</span>
                        </div>
                      )}

                      {form.guestCount && (
                        <div className="flex justify-between border-b border-dashed border-charcoal/15 pb-2">
                          <span className="text-charcoal/50 uppercase">GUEST COUNT:</span>
                          <span className="font-medium text-charcoal">{form.guestCount}</span>
                        </div>
                      )}

                      {form.message && (
                        <div className="pt-1">
                          <span className="text-charcoal/50 uppercase block text-[10px] mb-0.5">NOTES:</span>
                          <p className="text-[11px] md:text-xs font-sans text-charcoal/80 italic leading-snug">
                            "{form.message}"
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

                  <p className="text-center text-charcoal-light/70 text-xs sm:text-sm mt-6 mb-4">
                    Thank you! Our event director will review your ticket and reach out via WhatsApp / Email shortly.
                  </p>

                  <div className="flex gap-4">
                    <button
                      onClick={() => window.print()}
                      className="flex-1 bg-charcoal text-ivory border border-charcoal hover:bg-transparent hover:text-charcoal text-xs font-semibold uppercase tracking-wider py-3.5 transition-colors cursor-pointer"
                    >
                      Print Ticket
                    </button>
                    <button
                      onClick={resetForm}
                      className="flex-1 bg-gold text-charcoal font-semibold text-xs uppercase tracking-wider py-3.5 hover:bg-gold-light transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-charcoal p-8 md:p-10 mb-8">
                <h3 className="font-display text-xl font-bold text-ivory mb-6">
                  Contact Information
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-gold shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    <div>
                      <span className="text-ivory/80 text-sm block">
                        {siteConfig.contact.address}
                      </span>
                      <span className="text-ivory/80 text-sm">
                        {siteConfig.contact.city}, {siteConfig.contact.state}{' '}
                        {siteConfig.contact.zip}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-gold shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="text-ivory/80 text-sm hover:text-gold transition-colors"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-gold shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                    <div className="flex flex-col gap-1">
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-ivory/80 text-sm hover:text-gold transition-colors block"
                      >
                        {siteConfig.contact.email}
                      </a>
                      <a
                        href={`mailto:${siteConfig.contact.emailAlt}`}
                        className="text-ivory/80 text-sm hover:text-gold transition-colors block"
                      >
                        {siteConfig.contact.emailAlt}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-gold shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-ivory/60 text-sm">
                      {siteConfig.contact.hours}
                    </span>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="relative aspect-[4/3] bg-cream border border-gold/20 overflow-hidden shadow-md">
                <iframe
                  src="https://maps.google.com/maps?q=Office+No.+129,+Master+Mind,+The+Royal+Palms,+Goregaon,+Mumbai,+Maharashtra+400065&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kraftive Events Office Location - Master Mind, Goregaon, Mumbai"
                  className="w-full h-full border-0"
                />
              </div>

              {/* Quick CTA */}
              <div className="mt-8 p-6 border border-gold/20 bg-gold/5 text-center">
                <p className="font-display text-lg font-bold text-charcoal mb-2">
                  Prefer a Quick Chat?
                </p>
                <p className="text-charcoal-light/60 text-sm mb-4">
                  Call us directly for a free consultation.
                </p>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-gold font-semibold text-sm tracking-widest uppercase hover:text-gold-dark transition-colors inline-flex items-center gap-2"
                >
                  {siteConfig.contact.phone}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
