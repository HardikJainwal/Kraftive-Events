'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Button from '../ui/Button';

export default function AboutPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-ivory relative overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Decorative gold dot pattern */}
      <div className="absolute top-16 right-16 opacity-10" aria-hidden="true">
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-gold rounded-full" />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative overflow-hidden aspect-[4/5] max-h-[600px]">
              <motion.div
                style={{ scale: imageScale, y: imageY }}
                className="w-full h-full"
              >
                <Image
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80"
                  alt="Elegant luxury event venue with golden lighting and floral arrangements"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </div>
            {/* Floating gold frame accent */}
            <div
              className="absolute -bottom-4 -right-4 w-full h-full border border-gold/20 -z-10"
              aria-hidden="true"
            />
            {/* Stats badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-charcoal text-ivory px-6 py-4 shadow-xl"
            >
              <span className="font-display text-3xl font-bold gold-gradient-text">
                100%
              </span>
              <span className="block text-xs text-ivory/60 tracking-widest uppercase mt-1">
               RETENTION RATE
              </span>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <p className="text-gold font-body text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-4">
              Our Story
            </p>
            <h2
              id="about-heading"
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight mb-6"
            >
              Crafting{' '}
              <span className="italic text-gold">Extraordinary</span>{' '}
              Moments Since 2020
            </h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-gold to-gold-muted mb-8" />
            <p className="text-charcoal-light/70 text-base md:text-lg leading-relaxed mb-6">
              At Kraftive Events & Media, we believe every event tells a story.
              We are a full-service event management agency based in Mumbai, delivering
              impactful events and brand experiences across India.
            </p>
            <p className="text-charcoal-light/70 text-base md:text-lg leading-relaxed mb-8">
              Our team of visionary planners, designers, and coordinators work
              together to transform your dreams into meticulously crafted
              experiences — where every petal, every note, and every moment is
              curated with intention.
            </p>

            {/* Key highlights */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              {[
                { number: '100+', label: 'Corporate Clients' },
                { number: '700+', label: 'EVENTS AND GIFTING' },
                { number: '100+', label: 'EXHIBITIONS' },
                { number: '700+', label: 'activation & branding' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <span className="font-display text-2xl font-bold text-gold">
                    {stat.number}
                  </span>
                  <span className="block text-xs text-charcoal-light/60 tracking-wide uppercase mt-1">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <Button
              variant="ghost"
              href="/about"
              icon={
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
              }
            >
              Discover Our Story
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
