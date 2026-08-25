'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeading from '../ui/SectionHeading';
import { services } from '../../../data/services';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export default function ServicesPreview() {
  return (
    <section
      className="section-padding bg-cream relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Decorative background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle, #C6A962 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <SectionHeading
          eyebrow="What We Do"
          title="Services Crafted for Perfection"
          subtitle="Every event is unique. We offer a comprehensive suite of services tailored to bring your vision to life with unparalleled elegance and attention to detail."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="group relative bg-ivory overflow-hidden border border-gold/10 hover:border-gold/30 transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-56 md:h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Gold overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-ivory/10 backdrop-blur-sm border border-ivory/20 text-lg">
                  {service.icon}
                </div>

                {/* CTA overlay */}
                <div className="absolute inset-0 flex items-end p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-ivory text-sm font-semibold tracking-widest uppercase flex items-center gap-2">
                    Explore
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="font-display text-xl md:text-2xl font-bold text-charcoal mb-3 group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-charcoal-light/60 text-sm leading-relaxed">
                  {service.description}
                </p>
                {/* Gold line */}
                <div className="mt-5 w-8 h-[2px] bg-gold/40 group-hover:w-12 group-hover:bg-gold transition-all duration-500" />
              </div>

              {/* Link overlay */}
              <Link
                href="/services"
                className="absolute inset-0 z-10"
                aria-label={`Learn more about ${service.title}`}
              />
            </motion.div>
          ))}
        </div>

        {/* Section CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-12 md:mt-16"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-gold font-medium text-sm tracking-widest uppercase group"
          >
            <span className="relative">
              Explore All Services
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
            </span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
