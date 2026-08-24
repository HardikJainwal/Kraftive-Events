'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { portfolio, categories } from '../../../data/portfolio';

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof portfolio[0] | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const filteredItems =
    activeCategory === 'All'
      ? portfolio
      : portfolio.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[400px] overflow-hidden flex items-end">
        <motion.div style={{ y: heroImgY }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
          <Image
            src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1600&q=80"
            alt="Celebration event"
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
            Our Work
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ivory leading-tight"
          >
            Events That Speak for{' '}
            <span className="italic gold-gradient-text">Themselves</span>
          </motion.h1>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="section-padding bg-ivory">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-sm font-medium tracking-wide uppercase transition-all duration-300 border cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gold text-charcoal border-gold'
                    : 'bg-transparent text-charcoal-light border-gold/20 hover:border-gold/50 hover:text-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Masonry Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[280px]">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => {
                let spanClass = '';
                if (item.span === 'tall') spanClass = 'row-span-2';
                else if (item.span === 'wide') spanClass = 'md:col-span-2';
                else if (item.span === 'large') spanClass = 'md:col-span-2 row-span-2';

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className={`relative group overflow-hidden cursor-pointer ${spanClass}`}
                    onClick={() => setSelectedProject(item)}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Hover content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-1">
                        {item.category}
                      </span>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-ivory">
                        {item.title}
                      </h3>
                      <p className="text-ivory/50 text-sm mt-1">
                        {item.location} · {item.year}
                      </p>
                      <span className="mt-3 text-ivory/80 text-xs font-semibold tracking-widest uppercase flex items-center gap-1">
                        View Details
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4 }}
              className="bg-ivory max-w-4xl w-full max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-charcoal/80 text-ivory flex items-center justify-center hover:bg-charcoal transition-colors cursor-pointer"
                  aria-label="Close project details"
                >
                  ✕
                </button>
              </div>
              <div className="p-8 md:p-12">
                <span className="text-gold text-xs font-semibold tracking-widest uppercase">
                  {selectedProject.category}
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mt-2 mb-4">
                  {selectedProject.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-charcoal-light/60 mb-6">
                  <span>{selectedProject.location}</span>
                  <span>·</span>
                  <span>{selectedProject.year}</span>
                </div>
                <div className="w-12 h-[2px] bg-gradient-to-r from-gold to-gold-muted mb-6" />
                <p className="text-charcoal-light/70 text-base md:text-lg leading-relaxed mb-8">
                  {selectedProject.description}
                </p>
                <Button variant="primary" href="/contact">
                  Plan a Similar Event
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-charcoal text-center">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-ivory mb-6"
          >
            Your Event Could Be{' '}
            <span className="italic gold-gradient-text">Next</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-ivory/60 text-base md:text-lg mb-10"
          >
            Let us add your celebration to our collection of extraordinary moments.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button variant="cta" href="/contact">
              Start Planning
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
