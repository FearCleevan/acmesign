'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowDown } from '@phosphor-icons/react'
import SectionLabel from '@/components/ui/SectionLabel'

const heroPhotos = [
  {
    src: '/images/channel/Channel-andIlluminated-Signs-1-scaled.webp',
    label: 'Channel Letter Signs',
    translateY: '0px',
    delay: 0.1,
  },
  {
    src: '/images/wraps/Commercial-Wrap-Home.webp',
    label: 'Vehicle Wraps',
    translateY: '48px',
    delay: 0.2,
  },
  {
    src: '/images/led/LED-Displays-1-scaled.webp',
    label: 'LED Displays',
    translateY: '24px',
    delay: 0.3,
  },
]

export default function HeroSection() {
  return (
    <section className="relative bg-cream min-h-screen pt-36 pb-20 px-6 overflow-hidden">
      {/* Subtle grain texture overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: '200px',
        }}
      />

      <div className="max-w-[1480px] mx-auto">
        {/* ── Headline ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-16"
        >
          <h1 className="font-tight font-black text-dark uppercase leading-[0.95] tracking-[-0.02em]">
            Signs That Make Your
            <br />
            Business{' '}
            <em className="text-brand not-italic">IMPOSSIBLE</em>
            <br />
            to Miss.
          </h1>
        </motion.div>

        {/* ── Bottom Grid ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left — Copy + CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-4 flex flex-col gap-6 lg:pt-6"
          >
            <SectionLabel>◆ Dartmouth, NS · Est. 1989</SectionLabel>

            <p className="font-body text-muted text-base leading-relaxed max-w-sm">
              ACME Sign &amp; Graphics specializes in creating highly effective signs, programmable
              LED signs and displays, vehicle wrap designs, custom apparel and branding assets
              for businesses of any size — that fits your budget.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-d text-white text-sm font-tight font-semibold rounded-pill px-6 py-3 transition-all duration-150 active:scale-[0.97] group"
              >
                View Our Services
                <ArrowRight
                  size={14}
                  weight="bold"
                  className="transition-transform duration-150 group-hover:translate-x-0.5"
                />
              </Link>
              <a
                href="tel:+19024811007"
                className="inline-flex items-center justify-center gap-2 border border-dark/20 hover:border-dark/60 text-dark text-sm font-tight font-semibold rounded-pill px-6 py-3 transition-all duration-150 active:scale-[0.97]"
              >
                (902) 481-1007
              </a>
            </div>

            {/* Scroll indicator */}
            <div className="hidden lg:flex items-center gap-3 pt-16 text-muted">
              <div className="w-px h-12 bg-dark/15" />
              <div className="flex items-center gap-2">
                <ArrowDown size={12} weight="bold" className="animate-bounce" />
                <span className="text-[11px] font-body uppercase tracking-widest">Scroll</span>
              </div>
            </div>
          </motion.div>

          {/* Right — 3 Staggered Photo Cards */}
          <div className="lg:col-span-8 grid grid-cols-3 gap-4 lg:gap-5 items-start">
            {heroPhotos.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: photo.delay,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="relative rounded-custom overflow-hidden shadow-2xl aspect-[2/3] group"
                style={{ marginTop: photo.translateY }}
              >
                <Image
                  src={photo.src}
                  alt={photo.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 33vw, 25vw"
                  priority={i === 0}
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Label */}
                <span className="absolute bottom-3 left-3 bg-white/15 backdrop-blur-sm text-white text-[10px] font-body font-medium uppercase tracking-widest rounded-pill px-3 py-1">
                  {photo.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
