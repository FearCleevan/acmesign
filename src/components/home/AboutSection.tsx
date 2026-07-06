'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check } from '@phosphor-icons/react'
import SectionLabel from '@/components/ui/SectionLabel'
import PillButton from '@/components/ui/PillButton'

const stats = [
  { value: '35+', label: 'Years in Business' },
  { value: '11', label: 'Services Offered' },
]

const checkmarks = [
  'In-house fabrication — no outsourcing, no middlemen',
  'Full service from design to installation',
  'Solutions for every budget — small business to large fleet',
  'Serving Nova Scotia and all of Atlantic Canada',
]

const thumbs = [
  { src: '/images/wraps/Vehicle-Wraps-and-Graphics-scaled.webp', alt: 'Vehicle wrap' },
  { src: '/images/led/LED-index-scaled.webp', alt: 'LED display' },
  { src: '/images/apparel/Apparel-scaled.webp', alt: 'Custom apparel' },
]

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} id="about" className="bg-cream-2 section-padding px-6">
      <div className="max-w-[1480px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Left — Copy ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="order-2 lg:order-1 flex flex-col gap-6"
          >
            <SectionLabel>✶ Established 1989</SectionLabel>

            <h2 className="font-tight font-black text-dark leading-[1.05] tracking-[-0.02em]">
              Expert Signage.
              <br />
              Built to Perform.
            </h2>

            <p className="font-body text-muted text-base leading-relaxed">
              ACME Sign &amp; Graphics has been helping Atlantic Canadian businesses stand out
              for over 35 years. From a single decal to a full LED display system — we design,
              fabricate, and install everything in-house.
            </p>

            {/* Stats */}
            <div className="flex gap-10 py-2">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <p className="font-tight font-black text-dark text-4xl leading-none">{value}</p>
                  <p className="font-body text-muted text-sm mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Checkmarks */}
            <ul className="flex flex-col gap-3">
              {checkmarks.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: 'easeOut' }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center">
                    <Check size={11} weight="bold" className="text-brand" />
                  </span>
                  <span className="font-body text-sm text-dark/70 leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="pt-2">
              <PillButton href="/contact" arrow size="lg">
                Get a Free Quote
              </PillButton>
            </div>
          </motion.div>

          {/* ── Right — Photos ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="order-1 lg:order-2 flex flex-col gap-4"
          >
            {/* Main photo */}
            <div className="relative rounded-card overflow-hidden aspect-[4/3] shadow-xl group">
              <Image
                src="/images/channel/Channel-and-Illuminated-Signs-scaled.webp"
                alt="ACME Sign channel letter installation"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-103"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Floating badges */}
              <div className="absolute top-4 left-4 bg-dark/80 backdrop-blur-sm text-white text-[11px] font-body font-medium uppercase tracking-widest rounded-pill px-3 py-1.5">
                In-House Fabrication
              </div>
              <div className="absolute bottom-4 right-4 bg-brand text-white text-[11px] font-body font-medium uppercase tracking-widest rounded-pill px-3 py-1.5">
                Atlantic Canada
              </div>
            </div>

            {/* 3 thumbnails */}
            <div className="grid grid-cols-3 gap-4">
              {thumbs.map(({ src, alt }) => (
                <div
                  key={alt}
                  className="relative rounded-inner overflow-hidden aspect-square shadow-md group"
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="20vw"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
