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
      className="section-padding bg-cream relative overflow-hidden"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Our Portfolio"
          title="Events That Speak for Themselves"
          subtitle="Browse our collection of meticulously crafted celebrations — each one a unique story of beauty, joy, and extraordinary attention to detail."
        />

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[280px]">
          {previewItems.map((item, i) => {
            // Determine grid span based on item.span
            let spanClass = '';
            if (item.span === 'tall') spanClass = 'row-span-2';
            else if (item.span === 'wide')
              spanClass = 'md:col-span-2';
            else if (item.span === 'large')
              spanClass = 'md:col-span-2 row-span-2';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className={`relative group overflow-hidden cursor-pointer ${spanClass}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-display text-lg md:text-xl font-bold text-ivory">
                    {item.title}
                  </h3>
                  <p className="text-ivory/50 text-xs mt-1">
                    {item.location} · {item.year}
                  </p>
                  <span className="mt-3 text-ivory/80 text-xs font-semibold tracking-widest uppercase flex items-center gap-1">
                    View Project
                    <svg
                      className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
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
            );
          })}
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
