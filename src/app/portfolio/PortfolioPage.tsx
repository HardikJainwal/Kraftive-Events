'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { portfolio, categories } from '../../../data/portfolio';
import { useEventModal } from '@/context/EventModalContext';

export default function PortfolioPage() {
  const { openPlanModal } = useEventModal();
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
      <section ref={heroRef} className="relative h-[55vh] min-h-[380px] overflow-hidden flex items-end">
        <motion.div style={{ y: heroImgY }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
          <Image
            src="/images/asset4.jpeg"
            alt="Kraftive Showcase Header"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-charcoal/30" />
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
                className={`px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 border cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gold text-charcoal border-gold shadow-md'
                    : 'bg-transparent text-charcoal-light border-gold/30 hover:border-gold hover:text-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Clean Card Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="group bg-white rounded-2xl border border-gold/20 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
                  onClick={() => setSelectedProject(item)}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-charcoal">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Meta Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Date & Location */}
                      <div className="flex items-center gap-4 text-[11px] text-charcoal-light/70 font-medium mb-2.5">
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {item.year}
                        </span>
                        <span className="flex items-center gap-1 truncate">
                          <svg className="w-3.5 h-3.5 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="truncate">{item.location}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-2xl font-bold text-gold italic mb-2 group-hover:text-gold-dark transition-colors">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-charcoal-light/70 leading-relaxed line-clamp-3 mb-4">
                        {item.description}
                      </p>
                    </div>

                    {/* View Details CTA */}
                    <div className="pt-3 border-t border-charcoal/10 flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-charcoal group-hover:text-gold transition-colors inline-flex items-center gap-1.5">
                        View Details
                        <svg
                          className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
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
              className="bg-ivory max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
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
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-charcoal/80 text-ivory flex items-center justify-center hover:bg-gold hover:text-charcoal transition-colors cursor-pointer"
                  aria-label="Close project details"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 md:p-8 overflow-y-auto">
                <span className="text-gold text-xs font-semibold tracking-widest uppercase">
                  {selectedProject.category}
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-charcoal mt-1 mb-2">
                  {selectedProject.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-charcoal-light/60 mb-4">
                  <span>📅 {selectedProject.year}</span>
                  <span>·</span>
                  <span>📍 {selectedProject.location}</span>
                </div>
                <div className="w-12 h-[2px] bg-gradient-to-r from-gold to-gold-muted mb-4" />
                <p className="text-charcoal-light/80 text-sm md:text-base leading-relaxed mb-6">
                  {selectedProject.description}
                </p>
                <Button
                  variant="primary"
                  onClick={() => {
                    const category = selectedProject.category;
                    setSelectedProject(null);
                    openPlanModal(category);
                  }}
                >
                  Plan a Similar Event
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom CTA */}
      <section className="py-16 md:py-24 bg-charcoal text-center">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-ivory mb-4"
          >
            Your Event Could Be{' '}
            <span className="italic gold-gradient-text">Next</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-ivory/60 text-sm md:text-base mb-8"
          >
            Let us add your celebration to our collection of extraordinary moments.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button variant="cta" onClick={() => openPlanModal()}>
              Start Planning
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
