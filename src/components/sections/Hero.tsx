'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Button from '../ui/Button';
import { siteConfig } from '../../../data/siteConfig';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const hero = siteConfig.hero;

  // Split headline into words for staggered animation
  const words = hero.headline.split(' ');

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] max-h-[1200px] w-full overflow-hidden"
      aria-label="Hero"
    >
      {/* Background Video / Fallback */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        {/* Gradient fallback — sits behind the video */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-charcoal via-warm-brown to-charcoal"
          aria-hidden="true"
        />

        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-[1]"
          aria-hidden="true"
        >
          <source src={hero.media.src} type="video/mp4" />
        </video>

        {/* Animated gold particles overlay */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gold/30 rounded-full animate-float" />
          <div
            className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-gold/20 rounded-full animate-float"
            style={{ animationDelay: '1s' }}
          />
          <div
            className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-gold/25 rounded-full animate-float"
            style={{ animationDelay: '2s' }}
          />
          <div
            className="absolute top-2/3 right-1/4 w-0.5 h-0.5 bg-gold/30 rounded-full animate-float"
            style={{ animationDelay: '3s' }}
          />
          <div
            className="absolute top-1/2 left-1/6 w-1 h-1 bg-gold/20 rounded-full animate-float"
            style={{ animationDelay: '4s' }}
          />
        </div>

        {/* Dark overlay — base layer */}
        <div className="absolute inset-0 bg-black/82" aria-hidden="true" />

        {/* Left-side vignette — extra darkening behind text */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.15) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-ivory to-transparent"
          aria-hidden="true"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 h-full flex items-center"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 w-full">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-gold font-body text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-6"
            >
              {hero.eyebrow}
            </motion.p>

            {/* Headline — word-by-word reveal */}
            <h1
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ivory leading-[1.1] mb-6"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.6)' }}
            >
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.5 + i * 0.12,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Gold accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="w-20 h-[2px] bg-gradient-to-r from-gold to-gold-muted mb-6 origin-left"
            />

            {/* Supporting text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="text-ivory/90 text-base md:text-lg lg:text-xl leading-relaxed mb-10 max-w-xl"
              style={{ textShadow: '0 1px 12px rgba(0,0,0,0.85)' }}
            >
              {hero.subtext}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Button
                variant="cta"
                href={hero.primaryCTA.href}
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
                {hero.primaryCTA.label}
              </Button>
              <Button variant="secondary" href={hero.secondaryCTA.href}>
                {hero.secondaryCTA.label}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-ivory/40 text-xs tracking-widest uppercase font-body">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-8 bg-gradient-to-b from-gold/60 to-transparent"
        />
      </motion.div>

      {/* Decorative corner accents */}
      <div className="absolute top-24 right-8 md:right-16 z-10 opacity-30" aria-hidden="true">
        <div className="w-12 h-[1px] bg-gold" />
        <div className="w-[1px] h-12 bg-gold" />
      </div>
      <div className="absolute bottom-24 left-8 md:left-16 z-10 opacity-20" aria-hidden="true">
        <div className="w-8 h-[1px] bg-gold mb-2" />
        <div className="w-4 h-[1px] bg-gold" />
      </div>
    </section>
  );
}
