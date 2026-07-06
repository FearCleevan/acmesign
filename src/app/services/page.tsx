import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import ServiceGrid from '@/components/services/ServiceGrid'
import PillButton from '@/components/ui/PillButton'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'ACME Sign & Graphics offers 11 professional signage services — LED signs, vehicle wraps, channel letters, window graphics, banners, apparel, and more. Designed, fabricated, and installed in-house in Dartmouth, NS.',
}

export default function ServicesPage() {
  return (
    <>
      {/* ── Page Hero ─────────────────────────────────────────── */}
      <section className="bg-cream pt-44 pb-16 px-6">
        <div className="max-w-[1480px] mx-auto">
          <div className="max-w-3xl">
            <SectionLabel className="mb-4">◆ What We Offer</SectionLabel>
            <h1 className="font-tight font-black text-dark leading-[0.95] tracking-[-0.02em] mb-6">
              Signage Solutions
              <br />
              for Every Business
            </h1>
            <p className="font-body text-muted text-base leading-relaxed max-w-xl mb-8">
              From illuminated storefronts to full fleet wraps and programmable LED displays —
              we design, fabricate, and install everything in-house at our Dartmouth, NS shop.
            </p>
            <PillButton href="/contact" arrow size="lg">
              Get a Free Quote
            </PillButton>
          </div>
        </div>
      </section>

      {/* ── Services Grid ─────────────────────────────────────── */}
      <section className="bg-cream pb-24 px-6">
        <div className="max-w-[1480px] mx-auto">
          {/* Divider */}
          <div className="border-t border-dark/10 mb-12" />
          <ServiceGrid />
        </div>
      </section>

      {/* ── CTA Strip ─────────────────────────────────────────── */}
      <section className="bg-brand px-6 py-16">
        <div className="max-w-[1480px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-tight font-black text-white text-2xl lg:text-3xl tracking-tight">
              Not sure what you need?
            </h2>
            <p className="font-body text-white/70 text-sm mt-1">
              Call us — we&apos;ll help you find the right signage solution for your budget.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="tel:+19024811007"
              className="inline-flex items-center gap-2 bg-white text-brand font-tight font-semibold text-sm rounded-pill px-6 py-3 hover:bg-cream transition-colors duration-150"
            >
              (902) 481-1007
            </a>
            <PillButton href="/contact" variant="ghost" arrow>
              Contact Us
            </PillButton>
          </div>
        </div>
      </section>
    </>
  )
}
