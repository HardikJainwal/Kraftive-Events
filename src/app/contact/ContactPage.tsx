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
  eventDate: string;
  guestCount: string;
  budget: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const eventTypes = [
  'Corporate Events',
  'Venue Sourcing',
  'BTL Activations',
  'Stall & Fabrication',
  'Décor & Design',
  'Customised Gifting',
  'Other',
];

const budgetRanges = [
  '$5,000 – $15,000',
  '$15,000 – $30,000',
  '$30,000 – $50,000',
  '$50,000 – $100,000',
  '$100,000+',
  'Let\'s Discuss',
];

const guestRanges = [
  '1 – 50',
  '50 – 100',
  '100 – 200',
  '200 – 500',
  '500+',
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
    eventDate: '',
    guestCount: '',
    budget: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Please enter a valid email';
    if (!form.eventType) newErrors.eventType = 'Please select an event type';
    if (!form.message.trim()) newErrors.message = 'Please tell us about your event';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    const result = await submitForm(form);
    setSubmitResult(result);
    setIsSubmitting(false);
    if (result.success) {
      setForm({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        guestCount: '',
        budget: '',
        message: '',
      });
    }
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
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-2">
                Tell Us About Your Event
              </h2>
              <p className="text-charcoal-light/60 text-sm mb-8">
                Fill out the form below and we&apos;ll reach out within 24 hours to start bringing your vision to life.
              </p>

              {submitResult?.success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 border border-gold/30 bg-gold/5 text-center"
                >
                  <span className="text-4xl mb-4 block">✨</span>
                  <h3 className="font-display text-2xl font-bold text-charcoal mb-2">
                    Thank You!
                  </h3>
                  <p className="text-charcoal-light/70">
                    {submitResult.message}
                  </p>
                </motion.div>
              ) : (
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
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className={inputBaseClass}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-event-type"
                        className="block text-xs font-semibold tracking-widest uppercase text-charcoal-light/60 mb-2"
                      >
                        Event Type *
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
                          <option value="">Select event type</option>
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
                        value={form.eventDate}
                        onChange={(e) =>
                          updateField('eventDate', e.target.value)
                        }
                        className={inputBaseClass}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-guests"
                        className="block text-xs font-semibold tracking-widest uppercase text-charcoal-light/60 mb-2"
                      >
                        Guest Count
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

                  {/* Budget */}
                  <div>
                    <label
                      htmlFor="contact-budget"
                      className="block text-xs font-semibold tracking-widest uppercase text-charcoal-light/60 mb-2"
                    >
                      Budget Range
                    </label>
                    <div className="relative">
                      <select
                        id="contact-budget"
                        value={form.budget}
                        onChange={(e) =>
                          updateField('budget', e.target.value)
                        }
                        className={selectClass}
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range) => (
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

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold tracking-widest uppercase text-charcoal-light/60 mb-2"
                    >
                      Tell Us Your Vision *
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
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full md:w-auto bg-gold text-charcoal font-semibold text-sm tracking-widest uppercase px-12 py-4 border border-gold hover:bg-gold-dark hover:border-gold-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer inline-flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Let&apos;s Plan Something Extraordinary
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
                      </>
                    )}
                  </motion.button>
                </form>
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

              {/* Map placeholder */}
              <div className="relative aspect-[4/3] bg-cream border border-gold/10 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="w-8 h-8 text-gold/40 mx-auto mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1}
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
                    <p className="text-charcoal-light/40 text-xs tracking-widest uppercase">
                      Map Embed
                    </p>
                    <p className="text-charcoal-light/30 text-xs mt-1">
                      Replace with Google Maps
                    </p>
                  </div>
                </div>
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
