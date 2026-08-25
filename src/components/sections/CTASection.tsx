'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Button from '../ui/Button';
import { useEventModal } from '@/context/EventModalContext';

export default function CTASection() {
  const { openPlanModal } = useEventModal();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const words = 'Your Moment Deserves to Be Extraordinary.'.split(' ');

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[60vh] flex items-center overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Parallax Background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/85 to-warm-brown/95" />
      </motion.div>

      {/* Gold shimmer particles */}
      <div className="absolute inset-0 z-[1]" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-gold/40 rounded-full animate-float"
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${5 + Math.random() * 90}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 lg:px-12 py-20 md:py-28 text-center">
        {/* Headline with word reveal */}
        <h2
          id="cta-heading"
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-ivory leading-tight mb-6"
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.08,
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="inline-block mr-[0.25em]"
            >
              {word === 'Extraordinary.' ? (
                <span className="italic gold-shimmer-text">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-16 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-ivory/80 text-base md:text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          Tell us your vision. We&apos;ll turn it into an unforgettable experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Button
            variant="cta"
            onClick={() => openPlanModal()}
            icon={
              <svg
                className="w-5 h-5"
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
            Start Planning
          </Button>
        </motion.div>
      </div>

      {/* Decorative lines */}
      <div className="absolute top-8 left-8 md:left-16 z-10 opacity-20" aria-hidden="true">
        <div className="w-16 h-[1px] bg-gold" />
        <div className="w-[1px] h-16 bg-gold" />
      </div>
      <div className="absolute bottom-8 right-8 md:right-16 z-10 opacity-20" aria-hidden="true">
        <div className="w-16 h-[1px] bg-gold ml-auto" />
        <div className="w-[1px] h-16 bg-gold ml-auto" />
      </div>
    </section>
  );
}
