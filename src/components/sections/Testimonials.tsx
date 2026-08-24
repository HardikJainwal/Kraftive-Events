'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '../../../data/testimonials';

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > active ? 1 : -1);
      setActive(index);
    },
    [active]
  );

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const current = testimonials[active];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  return (
    <section
      className="section-padding bg-charcoal relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Subtle gold background accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/3 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12 text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-gold font-body text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-4"
        >
          Client Love
        </motion.p>
        <motion.h2
          id="testimonials-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-ivory leading-tight mb-12 md:mb-16"
        >
          Words From Those Who{' '}
          <span className="italic gold-gradient-text">Celebrated</span>
        </motion.h2>

        {/* Testimonial Card */}
        <div className="relative min-h-[280px] md:min-h-[220px]">
          {/* Large decorative quote mark */}
          <div
            className="absolute -top-4 left-1/2 -translate-x-1/2 font-display text-8xl md:text-9xl text-gold/10 leading-none select-none"
            aria-hidden="true"
          >
            &ldquo;
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <blockquote className="relative z-10">
                <p className="font-display text-lg md:text-xl lg:text-2xl text-ivory/90 italic leading-relaxed mb-8 max-w-3xl mx-auto">
                  &ldquo;{current.quote}&rdquo;
                </p>
                <footer>
                  <div className="w-8 h-[1px] bg-gold mx-auto mb-4" />
                  <cite className="not-italic">
                    <span className="text-ivory font-semibold text-base block">
                      {current.name}
                    </span>
                    <span className="text-ivory/50 text-sm">
                      {current.eventType} · {current.location}
                    </span>
                  </cite>
                </footer>
              </blockquote>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 ${
                active === i
                  ? 'w-8 h-2 bg-gold'
                  : 'w-2 h-2 bg-ivory/20 hover:bg-ivory/40'
              }`}
              aria-label={`View testimonial ${i + 1}`}
              aria-current={active === i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
