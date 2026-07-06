'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'

const testimonials = [
  {
    text: '"ACME Sign did an incredible job on our storefront channel letters. The quality is outstanding and they handled everything from design to installation. Couldn\'t be happier with the result."',
    author: 'James Mitchell',
    role: 'Mitchell Hardware — Halifax, NS',
    initials: 'JM',
  },
  {
    text: '"The vehicle wrap on our delivery van has generated more leads than any other marketing we\'ve done. It pays for itself every month. ACME\'s team was professional and fast."',
    author: 'Sandra Ross',
    role: 'Ross Plumbing & Heating — Dartmouth, NS',
    initials: 'SR',
  },
  {
    text: '"We ordered a programmable LED sign and the difference in foot traffic was noticeable within days. ACME guided us through the whole process. Highly recommend for any business."',
    author: 'David Kim',
    role: 'Kim\'s Restaurant — Bedford, NS',
    initials: 'DK',
  },
]

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  const current = testimonials[index]

  return (
    <section ref={ref} className="bg-cream section-padding px-6">
      <div className="max-w-[1480px] mx-auto">

        {/* ── Header ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16"
        >
          <SectionLabel className="mb-3">◆ What Clients Say</SectionLabel>
          <h2 className="font-tight font-black text-dark leading-[1.05] tracking-[-0.02em] max-w-lg mx-auto">
            Trusted by Businesses Across Atlantic Canada
          </h2>
        </motion.div>

        {/* ── Testimonial card ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-3xl mx-auto"
        >
          {/* Large quote mark */}
          <div
            aria-hidden="true"
            className="font-tight font-black text-brand/15 text-[8rem] leading-none text-center -mb-8 select-none"
          >
            &ldquo;
          </div>

          {/* Animated quote */}
          <div className="relative min-h-[140px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="text-center"
              >
                <p className="font-tight text-dark text-xl lg:text-2xl font-semibold leading-relaxed tracking-[-0.01em]">
                  {current.text}
                </p>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Author */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index + '-author'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="flex flex-col items-center gap-1 mt-8"
            >
              {/* Initials avatar */}
              <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center mb-2">
                <span className="font-tight font-black text-brand text-sm">
                  {current.initials}
                </span>
              </div>
              <p className="font-tight font-bold text-dark text-base">{current.author}</p>
              <p className="font-body text-muted text-sm">{current.role}</p>
            </motion.div>
          </AnimatePresence>

          {/* ── Dot indicators ──────────────────────────────────── */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-pill transition-all duration-300 ${
                  i === index
                    ? 'w-6 bg-brand'
                    : 'w-2 bg-dark/20 hover:bg-dark/40'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
