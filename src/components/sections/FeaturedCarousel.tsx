'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { portfolio } from '../../../data/portfolio';
import SectionHeading from '../ui/SectionHeading';

const featuredEvents = portfolio.filter((p) => p.featured).slice(0, 5);

export default function FeaturedCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      skipSnaps: false,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      className="section-padding bg-ivory relative overflow-hidden"
      aria-labelledby="carousel-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Featured Celebrations"
          title="Moments That Define Excellence"
          subtitle="A curated selection of our most extraordinary events — each one a testament to creativity, precision, and the art of celebration."
        />
      </div>

      {/* Carousel */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-8">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4 md:-ml-6">
            {featuredEvents.map((event, i) => (
              <div
                key={event.id}
                className="flex-[0_0_85%] md:flex-[0_0_70%] lg:flex-[0_0_60%] pl-4 md:pl-6 min-w-0"
              >
                <motion.div
                  initial={{ opacity: 0.5, scale: 0.95 }}
                  animate={{
                    opacity: selectedIndex === i ? 1 : 0.5,
                    scale: selectedIndex === i ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.5 }}
                  className="relative group cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 85vw, (max-width: 1024px) 70vw, 60vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <AnimatePresence mode="wait">
                        {selectedIndex === i && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                          >
                            <span className="text-gold text-xs font-semibold tracking-widest uppercase">
                              {event.category}
                            </span>
                            <h3 className="font-display text-2xl md:text-3xl font-bold text-ivory mt-2">
                              {event.title}
                            </h3>
                            <p className="text-ivory/60 text-sm mt-2 max-w-md">
                              {event.location} · {event.year}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Gold bottom accent */}
                  <div className="h-[2px] bg-gradient-to-r from-gold via-gold-muted to-transparent" />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center border border-gold/30 bg-ivory/80 backdrop-blur-sm text-gold hover:bg-gold hover:text-charcoal transition-all duration-300"
          aria-label="Previous slide"
        >
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center border border-gold/30 bg-ivory/80 backdrop-blur-sm text-gold hover:bg-gold hover:text-charcoal transition-all duration-300"
          aria-label="Next slide"
        >
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`transition-all duration-300 ${
                selectedIndex === i
                  ? 'w-8 h-2 bg-gold'
                  : 'w-2 h-2 bg-gold/30 hover:bg-gold/50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={selectedIndex === i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
