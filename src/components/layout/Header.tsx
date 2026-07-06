'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Car,
  Lightning,
  Images,
  Envelope,
  List,
  X,
  ArrowRight,
  CaretDown,
  GridFour,
} from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'

// ── Services dropdown items ──────────────────────────────────────────────
const serviceLinks = [
  { label: 'Channel Letter Signs',  href: '/services/channel-letter-signs' },
  { label: 'Dimensional Signs',     href: '/services/dimensional-signs' },
  { label: 'Illuminated Signs',     href: '/services/illuminated-signs' },
  { label: 'Safety & Parking Signs',href: '/services/safety-parking-signs' },
  { label: 'Window Graphics',       href: '/services/window-graphics' },
  { label: 'Banners',               href: '/services/banners' },
  { label: 'Decals & Stickers',     href: '/services/decals-stickers' },
  { label: 'Apparel',               href: '/services/apparel' },
  { label: 'Sign Service & Repair', href: '/services/sign-service-repair' },
]

const pageLinks = [
  { label: 'Gallery',            href: '/gallery' },
  { label: 'Artwork Guidelines', href: '/artwork-guidelines' },
]

// ── Main nav pills (non-dropdown) ────────────────────────────────────────
const navLinks = [
  { href: '/services/vehicle-wraps', label: 'Vehicle Wraps', icon: Car },
  { href: '/services/led-signs',     label: 'LED Signs',     icon: Lightning },
  { href: '/gallery',                label: 'Gallery',       icon: Images },
  { href: '/contact',                label: 'Contact',       icon: Envelope },
]

export default function Header() {
  const [scrolled, setScrolled]           = useState(false)
  const [mobileOpen, setMobileOpen]       = useState(false)
  const [servicesOpen, setServicesOpen]   = useState(false)   // desktop dropdown
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false) // mobile sub-list
  const pathname  = usePathname()
  const dropRef   = useRef<HTMLLIElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setServicesOpen(false) }, [pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const openServices  = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setServicesOpen(true) }
  const closeServices = () => { closeTimer.current = setTimeout(() => setServicesOpen(false), 120) }

  const isServicesActive = pathname.startsWith('/services')

  return (
    <>
      {/* ── Floating Navbar ─────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 ${
          scrolled ? 'pt-3' : 'pt-5'
        }`}
      >
        <nav
          className={`w-full max-w-[1480px] rounded-pill flex items-center justify-between transition-all duration-300 backdrop-blur-md ${
            scrolled
              ? 'h-[68px] px-5 shadow-2xl'
              : 'h-[76px] px-6 shadow-xl'
          }`}
          style={{ backgroundColor: 'rgba(17,17,17,0.96)' }}
        >
          {/* Left — Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
              <Image
                src="/images/acme-AS.webp"
                alt="ACME Sign monogram"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div className="hidden sm:block leading-none">
              <p className="text-white font-tight font-bold text-sm tracking-wide uppercase">ACME Sign</p>
              <p className="text-white/50 text-[10px] font-body tracking-widest uppercase">&amp; Graphics Co.</p>
            </div>
          </Link>

          {/* Center — Nav links */}
          <ul className="hidden lg:flex items-center gap-1">

            {/* ── Services dropdown trigger ───────────────────────────── */}
            <li ref={dropRef} className="relative" onMouseEnter={openServices} onMouseLeave={closeServices}>
              <button
                onClick={() => setServicesOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={servicesOpen}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-pill text-sm font-body transition-all duration-150 ${
                  isServicesActive || servicesOpen
                    ? 'text-white bg-white/10'
                    : 'text-white/70 hover:text-white hover:bg-white/8'
                }`}
              >
                <GridFour size={14} weight="bold" />
                Services
                <CaretDown
                  size={11}
                  weight="bold"
                  className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                />
                {isServicesActive && !servicesOpen && (
                  <span className="block w-1 h-1 rounded-full bg-brand ml-0.5" />
                )}
              </button>

              {/* ── Dropdown panel ─────────────────────────────────────── */}
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0,  scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    onMouseEnter={openServices}
                    onMouseLeave={closeServices}
                    className="absolute top-[calc(100%+12px)] left-0 w-72 rounded-[20px] overflow-hidden shadow-2xl border border-white/8"
                    style={{ backgroundColor: 'rgba(17,17,17,0.98)', backdropFilter: 'blur(24px)' }}
                  >
                    {/* View All header */}
                    <div className="px-4 pt-4 pb-2 border-b border-white/8">
                      <Link
                        href="/services"
                        className="flex items-center justify-between text-white font-tight font-bold text-sm hover:text-brand transition-colors duration-150 group"
                      >
                        All Services
                        <ArrowRight size={13} weight="bold" className="text-brand transition-transform duration-150 group-hover:translate-x-0.5" />
                      </Link>
                    </div>

                    {/* Service links */}
                    <ul className="px-2 py-2">
                      {serviceLinks.map(({ label, href }) => (
                        <li key={href}>
                          <Link
                            href={href}
                            className={`flex items-center gap-2 px-3 py-2 rounded-[10px] text-sm font-body transition-all duration-100 ${
                              pathname === href
                                ? 'text-white bg-white/10'
                                : 'text-white/65 hover:text-white hover:bg-white/8'
                            }`}
                          >
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {/* Page links — Gallery + Artwork Guidelines */}
                    <div className="px-2 pb-2 pt-1 border-t border-white/8">
                      {pageLinks.map(({ label, href }) => (
                        <Link
                          key={href}
                          href={href}
                          className={`flex items-center gap-2 px-3 py-2 rounded-[10px] text-sm font-body transition-all duration-100 ${
                            pathname === href
                              ? 'text-white bg-white/10'
                              : 'text-white/50 hover:text-white hover:bg-white/8'
                          }`}
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* ── Regular nav links ───────────────────────────────────── */}
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-pill text-sm font-body transition-all duration-150 ${
                      isActive
                        ? 'text-white bg-white/10'
                        : 'text-white/70 hover:text-white hover:bg-white/8'
                    }`}
                  >
                    <Icon size={14} weight="bold" className="shrink-0" />
                    {label}
                    {isActive && <span className="block w-1 h-1 rounded-full bg-brand ml-0.5" />}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Right — Phone + CTA + Hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+19024811007"
              className="hidden xl:block text-white/60 hover:text-white text-sm font-body transition-colors duration-150"
            >
              (902) 481-1007
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-2 bg-brand hover:bg-brand-d text-white text-sm font-tight font-semibold rounded-pill px-5 py-2.5 transition-all duration-150 active:scale-[0.97] group"
            >
              Get a Quote
              <ArrowRight size={14} weight="bold" className="transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors duration-150"
              aria-label="Open navigation"
            >
              <List size={22} weight="bold" />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile Full-Screen Overlay ──────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[60] bg-dark overflow-y-auto transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col min-h-full px-6 pt-6 pb-10">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                <Image src="/images/acme-AS.webp" alt="ACME Sign monogram" width={32} height={32} className="object-contain" />
              </div>
              <div className="leading-none">
                <p className="text-white font-tight font-bold text-sm tracking-wide uppercase">ACME Sign</p>
                <p className="text-white/50 text-[10px] font-body tracking-widest uppercase">&amp; Graphics Co.</p>
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors duration-150"
              aria-label="Close navigation"
            >
              <X size={24} weight="bold" />
            </button>
          </div>

          {/* Mobile nav */}
          <ul className="flex flex-col flex-1">

            {/* Services — expandable */}
            <li className="border-b border-white/8">
              <button
                onClick={() => setMobileServicesOpen((v) => !v)}
                className="flex items-center justify-between w-full py-4 text-white text-xl font-tight font-bold group"
              >
                <span className="flex items-center gap-4">
                  <GridFour size={20} weight="bold" className="text-white/40 group-hover:text-brand transition-colors duration-150" />
                  Services
                </span>
                <CaretDown
                  size={16}
                  weight="bold"
                  className={`text-white/40 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {mobileServicesOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="overflow-hidden pl-9 pb-3 flex flex-col gap-0.5"
                  >
                    <li>
                      <Link
                        href="/services"
                        onClick={() => setMobileOpen(false)}
                        className="block py-2 text-brand text-sm font-tight font-bold"
                      >
                        View All Services →
                      </Link>
                    </li>
                    {serviceLinks.map(({ label, href }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-white/65 hover:text-white text-sm font-body transition-colors duration-150"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                    <li className="mt-1 pt-1 border-t border-white/8">
                      {pageLinks.map(({ label, href }) => (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-white/45 hover:text-white text-sm font-body transition-colors duration-150"
                        >
                          {label}
                        </Link>
                      ))}
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            {/* Regular nav links */}
            {navLinks.map(({ href, label, icon: Icon }, i) => (
              <li
                key={href}
                className={`transition-all duration-300 ${
                  mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
                style={{ transitionDelay: mobileOpen ? `${(i + 1) * 60}ms` : '0ms' }}
              >
                <Link
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-4 py-4 border-b border-white/8 group"
                >
                  <Icon size={20} weight="bold" className="text-white/40 group-hover:text-brand transition-colors duration-150" />
                  <span className="text-white text-xl font-tight font-bold group-hover:text-brand transition-colors duration-150">
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Bottom CTA */}
          <div className="mt-8 space-y-3">
            <a href="tel:+19024811007" className="block text-center text-white/60 text-sm font-body">
              (902) 481-1007
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 bg-brand hover:bg-brand-d text-white font-tight font-semibold rounded-pill py-4 w-full transition-colors duration-150"
            >
              Get a Free Quote
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
