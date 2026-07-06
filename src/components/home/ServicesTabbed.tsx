'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'framer-motion'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Lightbulb,
  Car,
  Storefront,
  AppWindow,
  Check,
  ArrowRight,
} from '@phosphor-icons/react'
import SectionLabel from '@/components/ui/SectionLabel'

const tabs = [
  {
    key: 'led',
    label: 'LED Signs',
    icon: Lightbulb,
    tag: '★ Featured Service',
    tagColor: 'bg-amber text-dark',
    title: 'Programmable LED Signs & Displays',
    desc: 'Stand out and capture attention with full-colour high-resolution LED displays. All signs come with built-in WiFi and a convenient app for your phone, tablet or PC — easily upload or change your message any time.',
    check1: 'Buy, Rent, or Lease — options for every budget',
    check2: 'Free indoor installation included on all units',
    img: '/images/led/LED-Displays-1-scaled.webp',
    href: '/services/led-signs',
  },
  {
    key: 'wraps',
    label: 'Vehicle Wraps',
    icon: Car,
    tag: 'Mobile Advertising',
    tagColor: 'bg-white/15 text-white',
    title: 'Vehicle Wraps & Fleet Graphics',
    desc: 'Put your message in motion. Our high-quality, high-resolution vehicle wraps deliver excellent marketing exposure — advertising your business around the clock without any additional effort. Custom vehicle wraps can last from 4 to 6 years.',
    check1: 'Full wraps, partial wraps, and fleet graphics',
    check2: 'Custom design by our in-house team',
    img: '/images/wraps/Vehicle-Wraps-and-Graphics-1-scaled.webp',
    href: '/services/vehicle-wraps',
  },
  {
    key: 'channel',
    label: 'Channel Letter Signs',
    icon: Storefront,
    tag: 'Storefront Signage',
    tagColor: 'bg-white/15 text-white',
    title: 'Channel Letter & Dimensional Signs',
    desc: '3D dimensional letters that stand out from your building. Made with aluminum, stainless steel, or acrylic — illuminated or non-illuminated. Finishes that won\'t chip, crack, fade, or discolor.',
    check1: 'Illuminated & non-illuminated options',
    check2: 'Aluminum, stainless steel, or acrylic materials',
    img: '/images/channel/Channel-andIlluminated-Signs-1-scaled.webp',
    href: '/services/channel-letter-signs',
  },
  {
    key: 'more',
    label: 'More Services',
    icon: AppWindow,
    tag: 'Full Service Shop',
    tagColor: 'bg-white/15 text-white',
    title: 'Banners, Safety Signs, Apparel & More',
    desc: 'Window graphics, vinyl banners, safety & parking signs, custom apparel with 35+ years of screen printing experience, decals, and stickers. Whatever your business needs to stand out, we fabricate it in-house.',
    check1: 'Same-day banner turnaround available',
    check2: '35+ years of screen printing & embroidery',
    img: '/images/apparel/Apparel-scaled.webp',
    href: '/services',
  },
]

export default function ServicesTabbed() {
  const [activeKey, setActiveKey] = useState('led')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const active = tabs.find((t) => t.key === activeKey)!

  const handleTabChange = (key: string) => {
    if (key === activeKey || isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveKey(key)
      setIsTransitioning(false)
    }, 180)
  }

  return (
    <section
      ref={ref}
      id="services"
      className="bg-cream section-padding px-6 overflow-hidden"
    >
      <div className="max-w-[1480px] mx-auto">

        {/* ── Section Header ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col lg:flex-row lg:items-end gap-6 mb-12"
        >
          <div className="flex-1">
            <SectionLabel className="mb-3">◆ What We Do</SectionLabel>
            <h2 className="font-tight font-black text-dark leading-[1.05] tracking-[-0.02em] max-w-xl">
              Signage Solutions for Every Business
            </h2>
          </div>
          <p className="lg:max-w-sm font-body text-muted text-sm leading-relaxed">
            From illuminated storefronts to full fleet wraps and programmable LED displays,
            we design and fabricate everything in-house.
          </p>
        </motion.div>

        {/* ── Tab Pills ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {tabs.map(({ key, label, icon: Icon }) => {
            const isActive = key === activeKey
            return (
              <button
                key={key}
                onClick={() => handleTabChange(key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-pill text-sm font-tight font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-dark text-white opacity-100 shadow-md'
                    : 'bg-dark/8 text-dark opacity-50 hover:opacity-80'
                }`}
              >
                <Icon size={15} weight={isActive ? 'fill' : 'regular'} />
                {label}
              </button>
            )
          })}
        </motion.div>

        {/* ── Feature Card ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div
            className={`rounded-card overflow-hidden bg-dark grid grid-cols-1 lg:grid-cols-2 min-h-[480px] transition-opacity duration-[180ms] ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {/* Left — Photo */}
            <div className="relative min-h-[300px] lg:min-h-0 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.key + '-img'}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={active.img}
                    alt={active.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right — Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.key + '-content'}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex flex-col justify-center gap-6 p-10 lg:p-14"
              >
                {/* Tag */}
                <span
                  className={`self-start text-[11px] font-body font-semibold uppercase tracking-widest rounded-pill px-3 py-1.5 ${active.tagColor}`}
                >
                  {active.tag}
                </span>

                <h3 className="font-tight font-black text-white text-2xl lg:text-3xl leading-tight tracking-[-0.01em]">
                  {active.title}
                </h3>

                <p className="font-body text-white/65 text-sm leading-relaxed">
                  {active.desc}
                </p>

                {/* Checkmarks */}
                <ul className="flex flex-col gap-3">
                  {[active.check1, active.check2].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center">
                        <Check size={11} weight="bold" className="text-brand" />
                      </span>
                      <span className="font-body text-sm text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="pt-2">
                  <Link
                    href={active.href}
                    className="inline-flex items-center gap-2 bg-brand hover:bg-brand-d text-white text-sm font-tight font-semibold rounded-pill px-6 py-3 transition-all duration-150 active:scale-[0.97] group"
                  >
                    Learn More
                    <ArrowRight
                      size={14}
                      weight="bold"
                      className="transition-transform duration-150 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
