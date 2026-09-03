'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { navItems, ctaNav } from '../../../data/navigation';
import { siteConfig } from '../../../data/siteConfig';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-panel-solid py-3 shadow-lg'
            : 'py-5'
        }`}
        style={
          !isScrolled
            ? {
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)',
              }
            : undefined
        }
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group relative z-10"
            aria-label="Kraftive Events & Media Home"
          >
            <Image
              src={siteConfig.brand.logo}
              alt="Kraftive Events & Media Logo"
              width={44}
              height={44}
              className="w-10 h-10 md:w-11 md:h-11 object-contain"
              priority
            />
            <span className="font-display text-xl md:text-2xl font-bold tracking-wide">
              <span
                className={`transition-colors duration-300 ${
                  isScrolled ? 'text-charcoal' : 'text-ivory'
                }`}
              >
                Kraftive{' '}
              </span>
              <span className="gold-gradient-text">Events & Media</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative font-body text-sm font-medium tracking-wide uppercase transition-colors duration-300 group py-1 ${
                  pathname === item.href
                    ? 'text-gold'
                    : isScrolled
                    ? 'text-charcoal hover:text-gold'
                    : 'text-ivory/90 hover:text-gold'
                }`}
              >
                {item.label}
                {/* Active / hover indicator */}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-gold transition-all duration-300 ${
                    pathname === item.href
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}

            {/* CTA Button */}
            <Link
              href={ctaNav.href}
              className="ml-4 relative overflow-hidden bg-gold text-charcoal font-semibold text-sm tracking-wide uppercase px-6 py-3 border border-gold hover:bg-gold-dark hover:border-gold-dark transition-all duration-300 inline-flex items-center gap-2"
            >
              <span className="relative z-10">{ctaNav.label}</span>
              <svg
                className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
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
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden relative z-[60] w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
          >
            <motion.span
              animate={{
                rotate: isMobileOpen ? 45 : 0,
                y: isMobileOpen ? 8 : 0,
              }}
              transition={{ duration: 0.3 }}
              className={`block w-6 h-[2px] transition-colors duration-300 ${
                isMobileOpen
                  ? 'bg-ivory'
                  : isScrolled
                  ? 'bg-charcoal'
                  : 'bg-ivory'
              }`}
            />
            <motion.span
              animate={{
                opacity: isMobileOpen ? 0 : 1,
                scaleX: isMobileOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
              className={`block w-6 h-[2px] transition-colors duration-300 ${
                isMobileOpen
                  ? 'bg-ivory'
                  : isScrolled
                  ? 'bg-charcoal'
                  : 'bg-ivory'
              }`}
            />
            <motion.span
              animate={{
                rotate: isMobileOpen ? -45 : 0,
                y: isMobileOpen ? -8 : 0,
              }}
              transition={{ duration: 0.3 }}
              className={`block w-6 h-[2px] transition-colors duration-300 ${
                isMobileOpen
                  ? 'bg-ivory'
                  : isScrolled
                  ? 'bg-charcoal'
                  : 'bg-ivory'
              }`}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[55] bg-charcoal/95 backdrop-blur-xl lg:hidden"
          >
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center justify-center h-full gap-8"
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    className={`font-display text-3xl md:text-4xl font-medium tracking-wide transition-colors duration-300 ${
                      pathname === item.href
                        ? 'text-gold'
                        : 'text-ivory/80 hover:text-gold'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-4"
              >
                <Link
                  href={ctaNav.href}
                  className="bg-gold text-charcoal font-semibold text-sm tracking-widest uppercase px-10 py-4 border border-gold hover:bg-gold-dark transition-all duration-300 inline-flex items-center gap-3"
                >
                  {ctaNav.label}
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
                </Link>
              </motion.div>

              {/* Decorative Gold Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="absolute bottom-24 left-1/2 -translate-x-1/2 w-16 h-[1px] bg-gold/50"
              />
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
