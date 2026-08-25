'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionHeading from '../ui/SectionHeading';
import { services } from '../../../data/services';

const ServiceVectorIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'corporate':
      return (
        <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0v-4a2 2 0 012-2h2a2 2 0 012 2v4m-6 0h6" />
        </svg>
      );
    case 'btl':
      return (
        <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      );
    case 'fabrication':
      return (
        <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      );
    case 'automotive':
      return (
        <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 17a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4zM3 9l2-4h14l2 4M3 9h18v6a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" />
        </svg>
      );
    case 'decor':
      return (
        <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
    case 'gifting':
      return (
        <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4v16m8-8H4" />
        </svg>
      );
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export default function ServicesPreview() {
  return (
    <section
      className="section-padding bg-charcoal relative overflow-hidden text-ivory"
      aria-labelledby="services-heading"
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle, #C6A962 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <SectionHeading
          eyebrow="What We Offer"
          title="Full-Service Event Solutions Under One Roof"
          subtitle="From venue sourcing and BTL activations to stall fabrication and customised gifting — we execute every detail with precision across India."
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="group relative bg-[#242424] p-8 border border-gold/20 hover:border-gold transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ServiceVectorIcon name={service.icon} />
                  </div>
                  <span className="text-xs font-mono font-bold text-gold/40 group-hover:text-gold transition-colors">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="font-display text-xl md:text-2xl font-bold text-ivory mb-3 group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-ivory/60 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div>
                <div className="space-y-2 pt-4 border-t border-ivory/10 mb-6">
                  {service.features.slice(0, 3).map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-ivory/50">
                      <span className="w-1 h-1 bg-gold rounded-full shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-widest group-hover:translate-x-1 transition-transform"
                >
                  Learn More
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12 md:mt-16"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-gold font-semibold text-xs tracking-widest uppercase group"
          >
            <span className="relative">
              Explore All Services & Specs
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
            </span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
