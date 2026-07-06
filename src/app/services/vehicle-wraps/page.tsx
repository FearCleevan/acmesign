import type { Metadata } from 'next'
import Image from 'next/image'
import { getServiceBySlug } from '@/data/services'
import { getCategoryImages } from '@/lib/categoryImages'
import SectionLabel from '@/components/ui/SectionLabel'
import PillButton from '@/components/ui/PillButton'
import RelatedWork from '@/components/services/RelatedWork'

const service = getServiceBySlug('vehicle-wraps')!

export const metadata: Metadata = {
  title: service.name,
  description: service.desc,
  openGraph: { images: [{ url: service.heroImg }] },
}

const STATS = [
  { value: '4-6 Yr', label: 'Wrap Lifespan' },
  { value: '1,000s', label: 'Seen Daily' },
  { value: '24/7', label: 'Advertising' },
  { value: '$0', label: 'Recurring Cost' },
]

const WRAP_TYPES = [
  {
    title: 'Vehicle Graphics — Doors',
    desc: 'A cost-effective marketing solution with a budget in mind. Digitally printed and laminated logos and lettering maximize your brand exposure on a budget.',
  },
  {
    title: 'Partial Wrap',
    desc: "A cost-effective way of getting your brand's identity on the road, focusing on the areas most visible to potential customers.",
  },
  {
    title: 'Full Wrap',
    desc: 'Make a huge impact with a full vehicle wrap — completely changing the look and feel of your car, truck, or trailer.',
  },
]

const PROCESS = [
  'Contact us',
  'Design approval',
  'Print + laminate',
  'Professional installation',
]

export default function VehicleWrapsPage() {
  const photos = getCategoryImages('wraps')

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
          <SectionLabel className="text-white/60 mb-3">Mobile Advertising</SectionLabel>
          <h1 className="font-tight font-black text-white leading-[0.95] tracking-[-0.02em] max-w-3xl mb-6">
            Put your message in motion with Custom Vehicle Wraps.
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
              <p className="font-tight font-black text-white text-3xl sm:text-4xl mb-1">
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
          <SectionLabel className="mb-4">◆ Wrap Types</SectionLabel>
          <h2 className="font-tight font-black text-dark text-3xl tracking-tight mb-10">
            Full, Partial, or Graphics-Only
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {WRAP_TYPES.map((w) => (
              <div key={w.title} className="bg-white rounded-card p-6 ring-1 ring-dark/8">
                <h3 className="font-tight font-bold text-dark text-lg mb-2">{w.title}</h3>
                <p className="font-body text-dark/60 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-2 section-padding px-6">
        <div className="max-w-[1480px] mx-auto">
          <SectionLabel className="mb-4">◆ How It Works</SectionLabel>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {PROCESS.map((step, i) => (
              <div key={step} className="text-center">
                <p className="font-tight font-black text-brand text-2xl mb-2">{i + 1}</p>
                <p className="font-body text-dark/70 text-sm">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedWork
        images={photos}
        categoryLabel="Vehicle Wraps"
        viewAllHref="/gallery?category=wraps"
      />
    </>
  )
}
