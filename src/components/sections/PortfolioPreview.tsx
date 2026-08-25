'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from '../ui/SectionHeading';
import { portfolio } from '../../../data/portfolio';

const previewItems = portfolio.slice(0, 6);

export default function PortfolioPreview() {
  return (
    <section
      className="section-padding bg-ivory relative overflow-hidden"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Our Showcases"
          title="Recent Impactful Events Across India"
          subtitle="A showcase of our recent corporate launches, BTL activations, exhibition stalls, and brand experiences."
        />

        {/* 6 Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {previewItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group bg-white rounded-2xl border border-gold/20 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-charcoal">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Card Meta Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Date & Location */}
                  <div className="flex items-center gap-4 text-[11px] text-charcoal-light/70 font-medium mb-3">
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
                  <p className="text-xs text-charcoal-light/70 leading-relaxed line-clamp-2 mb-4">
                    {item.description}
                  </p>
                </div>

                {/* View Details Button */}
                <div className="pt-2 border-t border-charcoal/10">
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-charcoal hover:text-gold transition-colors"
                  >
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
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12 md:mt-16"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 bg-gold text-charcoal font-bold text-xs tracking-widest uppercase px-9 py-3.5 border border-gold hover:bg-gold-dark transition-all shadow-md"
          >
            Explore Full Portfolio
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
