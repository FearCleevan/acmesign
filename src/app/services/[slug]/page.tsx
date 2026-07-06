import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { services, getServiceBySlug } from '@/data/services'
import SectionLabel from '@/components/ui/SectionLabel'
import PillButton from '@/components/ui/PillButton'
import ServiceCard from '@/components/services/ServiceCard'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  return {
    title: service.name,
    description: service.desc,
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const related = services.filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <>
      {/* ── Full-bleed Hero ───────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-end pt-32 pb-16 px-6 overflow-hidden">
        <Image
          src={service.heroImg}
          alt={service.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="relative z-10 max-w-[1480px] mx-auto w-full">
          <SectionLabel className="text-white/60 mb-3">{service.tagline}</SectionLabel>
          <h1 className="font-tight font-black text-white leading-[0.95] tracking-[-0.02em] max-w-2xl mb-6">
            {service.name}
          </h1>
          <PillButton href="/contact" arrow size="lg">
            Get a Quote
          </PillButton>
        </div>
      </section>

      {/* ── Description ───────────────────────────────────────── */}
      <section className="bg-cream section-padding px-6">
        <div className="max-w-[1480px] mx-auto max-w-3xl">
          <p className="font-body text-dark/70 text-lg leading-relaxed">
            {service.body}
          </p>
        </div>
      </section>

      {/* ── Related Services ──────────────────────────────────── */}
      <section className="bg-cream-2 section-padding px-6">
        <div className="max-w-[1480px] mx-auto">
          <SectionLabel className="mb-4">◆ Related Services</SectionLabel>
          <h2 className="font-tight font-black text-dark text-2xl tracking-tight mb-10">
            Explore More
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
