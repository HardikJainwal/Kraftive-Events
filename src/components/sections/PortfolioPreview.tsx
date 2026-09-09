'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from '../ui/SectionHeading';
import { portfolio } from '../../../data/portfolio';

const previewItems = portfolio.slice(0, 12);

export default function PortfolioPreview() {
  return (
    <section
      className="section-padding bg-cream relative overflow-hidden"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Our Portfolio"
          title="Events That Speak for Themselves"
          subtitle="Browse our collection of meticulously crafted celebrations — each one a unique story of beauty, joy, and extraordinary attention to detail."
        />

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="relative group overflow-hidden cursor-pointer bg-charcoal rounded-lg border border-gold/15 hover:border-gold/50 transition-all duration-300 flex flex-col"
            >
              <div className="relative w-full aspect-[4/3] bg-charcoal/90 overflow-hidden flex items-center justify-center p-2">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-5 bg-charcoal border-t border-gold/10 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-gold text-[10px] font-semibold tracking-widest uppercase">
                    {item.category}
                  </span>
                  <h3 className="font-display text-base md:text-lg font-bold text-ivory mt-1 group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-ivory/60 text-xs mt-1">
                    {item.location} · {item.year}
                  </p>
                </div>
                <span className="mt-4 text-gold text-xs font-semibold tracking-widest uppercase flex items-center gap-1">
                  View Project
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
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
                </span>
              </div>

              {/* Gold bottom accent on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <Link
                href="/portfolio"
                className="absolute inset-0 z-10"
                aria-label={`View ${item.title}`}
              />
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 md:mt-16"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-3 bg-charcoal text-ivory font-semibold text-sm tracking-widest uppercase px-10 py-4 border border-charcoal hover:bg-transparent hover:text-charcoal transition-all duration-500"
          >
            View All Projects
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
      </div>
    </section>
  );
}
