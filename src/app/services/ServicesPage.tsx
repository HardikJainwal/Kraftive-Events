'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import { services } from '../../../data/services';

import { useEventModal } from '@/context/EventModalContext';

const process = [
  { step: '01', title: 'Discovery', description: 'We start with an in-depth consultation to understand your vision, style, and expectations for the celebration.' },
  { step: '02', title: 'Concept & Design', description: 'Our creative team develops a bespoke concept — from mood boards and color palettes to detailed floor plans.' },
  { step: '03', title: 'Planning & Coordination', description: 'We handle every vendor, timeline, and logistic with meticulous precision so nothing is left to chance.' },
  { step: '04', title: 'The Big Day', description: 'Our team orchestrates a flawless execution, ensuring every moment unfolds exactly as planned — and beyond.' },
];

export default function ServicesPage() {
  const { openPlanModal } = useEventModal();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[400px] overflow-hidden flex items-end">
        <motion.div style={{ y: heroImgY }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
          <Image
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80"
            alt="Luxury party setup"
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
            What We Offer
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ivory leading-tight"
          >
            Services Crafted for{' '}
            <span className="italic gold-gradient-text">Perfection</span>
          </motion.h1>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-ivory">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 md:mb-28 last:mb-0 ${
                i % 2 !== 0 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3] group">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
                {/* Gold frame */}
                <div className="absolute inset-4 border border-gold/20 pointer-events-none" />
              </div>

              {/* Content */}
              <div>
                <div className="w-12 h-12 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center mb-4">
                  {service.icon === 'corporate' && (
                    <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0v-4a2 2 0 012-2h2a2 2 0 012 2v4m-6 0h6" />
                    </svg>
                  )}
                  {service.icon === 'btl' && (
                    <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  )}
                  {service.icon === 'fabrication' && (
                    <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  )}
                  {service.icon === 'automotive' && (
                    <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 17a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4zM3 9l2-4h14l2 4M3 9h18v6a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" />
                    </svg>
                  )}
                  {service.icon === 'decor' && (
                    <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  )}
                  {service.icon === 'gifting' && (
                    <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  )}
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">
                  {service.title}
                </h2>
                <div className="w-12 h-[2px] bg-gradient-to-r from-gold to-gold-muted mb-6" />
                <p className="text-charcoal-light/70 text-base md:text-lg leading-relaxed mb-8">
                  {service.longDescription}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-charcoal-light/70">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <Button variant="secondary" onClick={() => openPlanModal(service.title)}>
                  Plan This Event
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-charcoal">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <SectionHeading
            eyebrow="Our Process"
            title="How We Bring Your Vision to Life"
            subtitle="A seamless, four-step journey from your initial idea to an unforgettable celebration."
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative text-center p-6 border border-ivory/10 hover:border-gold/30 transition-all duration-500 group"
              >
                <span className="font-display text-5xl font-bold text-gold/15 group-hover:text-gold/30 transition-colors duration-500">
                  {item.step}
                </span>
                <h3 className="font-display text-xl font-bold text-ivory mt-2 mb-3">
                  {item.title}
                </h3>
                <p className="text-ivory/50 text-sm leading-relaxed">{item.description}</p>
                {/* Connector line */}
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[1px] bg-gold/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-cream text-center">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-6"
          >
            Ready to Begin Your{' '}
            <span className="italic text-gold">Event Journey</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-charcoal-light/60 text-base md:text-lg mb-10"
          >
            Tell us about your vision and let our team craft an extraordinary experience tailored just for you.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button variant="cta" onClick={() => openPlanModal()}>
              Plan Your Event
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
