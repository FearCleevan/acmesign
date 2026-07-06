// src/app/services/led-signs/page.tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import { getServiceBySlug } from '@/data/services'
import { getCategoryImages } from '@/lib/categoryImages'
import SectionLabel from '@/components/ui/SectionLabel'
import PillButton from '@/components/ui/PillButton'
import RelatedWork from '@/components/services/RelatedWork'

const service = getServiceBySlug('led-signs')!

export const metadata: Metadata = {
  title: service.name,
  description: service.desc,
  openGraph: { images: [{ url: service.heroImg }] },
}

const STATS = [
  { value: '72%', label: 'More Noticed vs. Static Signs' },
  { value: '900%', label: 'Visibility Increase' },
  { value: '24/7', label: 'Advertising, No Extra Effort' },
  { value: 'WiFi', label: 'Built-In on Every Unit' },
]

const PRODUCTS = [
  {
    title: 'Indoor LED Signs & Displays',
    desc: 'Elevate your indoor spaces with vibrant and customizable LED displays for retail, corporate events, trade shows, and more.',
  },
  {
    title: 'Outdoor LED Signs & Displays',
    desc: 'Make a bold statement with weather-resistant outdoor LED displays suitable for advertising, stadiums, public spaces, and dynamic storefronts.',
  },
  {
    title: 'LED Video Walls',
    desc: 'Immerse your audience with seamless, high-resolution LED video walls ideal for conferences, control rooms, and entertainment venues.',
  },
  {
    title: 'Digital Signage',
    desc: 'Stay ahead of the curve with our versatile digital signage solutions, allowing you to deliver dynamic content and engage your audience in real-time.',
  },
]

const FEATURES = [
  'Easy to program and install',
  'Change messages whenever you choose',
  'Advertises for you 24 hours a day',
  'Free indoor installation included',
  'Purchase two or more and save',
  'Buy, Rent, or Lease — options for every budget',
]

export default function LedSignsPage() {
  const photos = getCategoryImages('led')

  return (
    <>
      <section className="relative min-h-[65vh] flex items-end pt-32 pb-16 px-6 overflow-hidden">
        <Image
          src={service.heroImg}
          alt={service.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        <div className="relative z-10 max-w-[1480px] mx-auto w-full">
          <SectionLabel className="text-amber mb-3">★ Featured Service</SectionLabel>
          <h1 className="font-tight font-black text-white leading-[0.95] tracking-[-0.02em] max-w-3xl mb-6">
            Stand out, and capture attention with full-colour high resolution LED displays.
          </h1>
          <PillButton href="/contact" arrow size="lg">
            Get a Quote
          </PillButton>
        </div>
      </section>

      <section className="bg-dark py-10 px-6">
        <div className="max-w-[1480px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-tight font-black text-amber text-3xl sm:text-4xl mb-1">
                {s.value}
              </p>
              <p className="font-body text-white/60 text-xs uppercase tracking-widest">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream section-padding px-6">
        <div className="max-w-[1480px] mx-auto">
          <SectionLabel className="mb-4">◆ What We Offer</SectionLabel>
          <h2 className="font-tight font-black text-dark text-3xl tracking-tight mb-10">
            LED Product Types
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PRODUCTS.map((p) => (
              <div key={p.title} className="bg-white rounded-card p-6 ring-1 ring-dark/8">
                <h3 className="font-tight font-bold text-dark text-lg mb-2">{p.title}</h3>
                <p className="font-body text-dark/60 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-2 section-padding px-6">
        <div className="max-w-2xl mx-auto">
          <SectionLabel className="mb-4">◆ Key Features</SectionLabel>
          <ul className="space-y-3">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-3 font-body text-dark/80">
                <span className="text-brand font-bold mt-0.5">✓</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RelatedWork images={photos} categoryLabel="LED Signs" viewAllHref="/gallery?category=led" />
    </>
  )
}
