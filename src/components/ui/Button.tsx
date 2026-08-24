'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'cta';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: React.ReactNode;
  ariaLabel?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'relative overflow-hidden bg-gold text-charcoal font-semibold px-8 py-3.5 rounded-none border border-gold hover:bg-gold-dark hover:border-gold-dark transition-colors duration-300',
  secondary:
    'relative overflow-hidden bg-transparent text-gold font-semibold px-8 py-3.5 rounded-none border border-gold hover:bg-gold hover:text-charcoal transition-colors duration-300',
  ghost:
    'relative text-gold font-medium px-0 py-2 border-none bg-transparent group',
  cta:
    'relative overflow-hidden bg-gold text-charcoal font-semibold px-10 py-4 rounded-none border border-gold hover:bg-gold-dark hover:border-gold-dark transition-colors duration-300 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  icon,
  ariaLabel,
}: ButtonProps) {
  const baseClass = `${variantStyles[variant]} inline-flex items-center justify-center gap-2 tracking-wide uppercase text-sm font-body cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2 ${className}`;

  const content = (
    <>
      {variant === 'ghost' ? (
        <>
          <span className="relative">
            {children}
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
          </span>
          {icon && (
            <motion.span
              className="inline-block"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              {icon}
            </motion.span>
          )}
        </>
      ) : (
        <>
          <span className="relative z-10">{children}</span>
          {icon && (
            <motion.span
              className="relative z-10 inline-block"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              {icon}
            </motion.span>
          )}
          {/* Shimmer overlay for primary/cta */}
          {(variant === 'primary' || variant === 'cta') && (
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 ease-in-out" />
          )}
        </>
      )}
    </>
  );

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: variant === 'ghost' ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-block"
      >
        <Link href={href} className={baseClass} aria-label={ariaLabel}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: variant === 'ghost' ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClass}
      aria-label={ariaLabel}
    >
      {content}
    </motion.button>
  );
}
