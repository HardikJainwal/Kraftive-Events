'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const values = [
  {
    number: '01',
    title: 'Vision',
    description: 'We listen to your dreams and craft a creative vision that exceeds expectations.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Every detail is meticulously designed to create a cohesive, stunning experience.',
  },
  {
    number: '03',
    title: 'Execute',
    description: 'Flawless coordination ensures your event unfolds seamlessly from start to finish.',
  },
  {
    number: '04',
    title: 'Celebrate',
    description: 'The magic moment arrives — and you get to simply enjoy every second of it.',
  },
];

export default function GlassParallaxSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] flex items-center overflow-hidden"
      aria-labelledby="approach-heading"
    >
      {/* Parallax Background Image */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1600&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-charcoal/40" />
      </motion.div>

      {/* Glass Panel Content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-12 py-20 md:py-28 w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9 }}
          className="glass-panel-solid rounded-sm p-8 md:p-12 lg:p-16"
        >
          {/* Section header */}
          <div className="text-center mb-12 md:mb-16">
            <p className="text-gold font-body text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-4">
              Our Approach
            </p>
            <h2
              id="approach-heading"
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight"
            >
              Four Steps to Your{' '}
              <span className="italic text-gold">Perfect</span> Event
            </h2>
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {values.map((item, i) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                className="text-center group"
              >
                <span className="font-display text-4xl md:text-5xl font-bold text-gold/20 group-hover:text-gold/40 transition-colors duration-500">
                  {item.number}
                </span>
                <h3 className="font-display text-xl font-bold text-charcoal mt-2 mb-3">
                  {item.title}
                </h3>
                <p className="text-charcoal-light/60 text-sm leading-relaxed">
                  {item.description}
                </p>
                {/* Gold line */}
                <div className="mt-4 w-8 h-[1px] bg-gold/40 mx-auto group-hover:w-12 transition-all duration-500" />
              </motion.div>
            ))}
          </div>

          {/* Decorative corners */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/30" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-gold/30" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-gold/30" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
