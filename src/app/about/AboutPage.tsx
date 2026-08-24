'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';

const timeline = [
  { year: '2015', title: 'The Beginning', description: 'Kraftive Events & Media was established in Mumbai with a vision to deliver end-to-end event production and BTL activations.' },
  { year: '2018', title: 'Expanding Operations', description: 'Added venue sourcing, stall fabrication, and in-house décor capabilities to handle large-scale corporate events under one roof.' },
  { year: '2020', title: 'Pan-India Reach', description: 'Expanded on-ground manpower network and executed campaigns across 15+ major Indian cities.' },
  { year: '2023', title: 'Full-Service Agency', description: 'Launched Kraftive Engage manpower division and customised gifting services to offer complete 360-degree event solutions.' },
];

const values = [
  { icon: '✦', title: 'Excellence', description: 'Every detail, every moment is held to the highest standard of quality and beauty.' },
  { icon: '♡', title: 'Passion', description: 'We pour our hearts into every event because your celebrations are our life\'s work.' },
  { icon: '◇', title: 'Creativity', description: 'No two events are the same. We bring fresh, innovative ideas to every project.' },
  { icon: '⚘', title: 'Integrity', description: 'Transparent communication, honest pricing, and unwavering commitment to your vision.' },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <>
      {/* Hero Banner */}
      <section ref={heroRef} className="relative h-[60vh] min-h-[400px] overflow-hidden flex items-end">
        <motion.div style={{ y: heroImgY }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
          <Image
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&q=80"
            alt="Elegant event venue"
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
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ivory leading-tight"
          >
            The Art of{' '}
            <span className="italic gold-gradient-text">Celebration</span>
          </motion.h1>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-padding bg-ivory">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-6">
                More Than Planners — We Are{' '}
                <span className="italic text-gold">Storytellers</span>
              </h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-gold to-gold-muted mb-8" />
              <p className="text-charcoal-light/70 text-base md:text-lg leading-relaxed mb-6">
                Kraftive Events & Media is a full-service event management agency based in Mumbai,
                delivering impactful events and brand experiences across India. From corporate events
                and venue solutions to BTL activations, décor, fabrication, manpower, and customised
                gifting, we handle every detail under one roof.
              </p>
              <p className="text-charcoal-light/70 text-base md:text-lg leading-relaxed mb-6">
                Our team of experienced event directors, fabricators, designers, and on-ground managers
                work seamlessly to execute flawless brand experiences, whether it is a high-profile corporate
                gala in Mumbai or a multi-city promotional activation.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80"
                  alt="Kraftive Events & Media team setup"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-full h-full border border-gold/20 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-20 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 text-center">
            {[
              { number: '500+', label: 'Events Planned' },
              { number: '50+', label: 'Expert Team' },
              { number: '12+', label: 'Years of Excellence' },
              { number: '3', label: 'Continents Served' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <span className="font-display text-4xl md:text-5xl font-bold gold-gradient-text">
                  {stat.number}
                </span>
                <span className="block text-ivory/50 text-sm tracking-widest uppercase mt-2">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-cream">
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
          <SectionHeading
            eyebrow="Our Journey"
            title="A Timeline of Excellence"
            subtitle="From humble beginnings to becoming one of the most trusted names in luxury event planning."
          />

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gold/20 md:-translate-x-1/2" />

            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-12 mb-12 last:mb-0 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-gold rounded-full -translate-x-1/2 mt-1.5 z-10 ring-4 ring-cream" />

                {/* Content */}
                <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                  <span className="font-display text-2xl font-bold text-gold">{item.year}</span>
                  <h3 className="font-display text-xl font-bold text-charcoal mt-1 mb-2">{item.title}</h3>
                  <p className="text-charcoal-light/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-ivory">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <SectionHeading
            eyebrow="What Drives Us"
            title="Our Core Values"
            subtitle="The principles that guide every event we create and every relationship we build."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center p-8 border border-gold/10 hover:border-gold/30 transition-all duration-500 group bg-cream/50"
              >
                <span className="text-3xl mb-4 block text-gold">{value.icon}</span>
                <h3 className="font-display text-xl font-bold text-charcoal mb-3 group-hover:text-gold transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-charcoal-light/60 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-charcoal text-center">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-ivory mb-6"
          >
            Let&apos;s Create Something{' '}
            <span className="italic gold-gradient-text">Beautiful</span> Together
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-ivory/60 text-base md:text-lg mb-10"
          >
            Ready to start planning your extraordinary event? We&apos;d love to hear your vision.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button variant="cta" href="/contact">
              Get In Touch
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
