'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const textColor = light ? 'text-ivory' : 'text-charcoal';
  const subtitleColor = light ? 'text-ivory/70' : 'text-charcoal-light/70';

  return (
    <div className={`max-w-3xl mb-16 md:mb-20 ${alignClass} ${className}`}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-gold font-body text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-4"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${textColor}`}
      >
        {title}
      </motion.h2>
      {/* Gold accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mt-6 mb-6 ${
          align === 'center' ? 'w-24 mx-auto' : 'w-24'
        }`}
        style={{ originX: align === 'center' ? 0.5 : 0 }}
      />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`text-base md:text-lg leading-relaxed ${subtitleColor} max-w-2xl ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
