import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star } from '@phosphor-icons/react/dist/ssr'
import type { Service } from '@/data/services'

interface ServiceCardProps {
  service: Service
  index?: number
}

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const isLED = service.slug === 'led-signs'

  return (
    <Link
      href={service.href}
      className={`group flex flex-col rounded-card overflow-hidden bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        isLED ? 'ring-2 ring-brand' : 'ring-1 ring-dark/8'
      }`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* ── Photo ─────────────────────────────────────────────── */}
      <div className="relative h-[220px] overflow-hidden bg-cream-2">
        <Image
          src={service.img}
          alt={service.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* ── Body ──────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 gap-2.5 p-6">
        {/* Featured badge */}
        {service.featured && (
          <span className="inline-flex items-center gap-1.5 self-start text-[10px] font-body font-semibold uppercase tracking-widest text-amber bg-amber/10 rounded-pill px-2.5 py-1">
            <Star size={10} weight="fill" />
            Featured Service
          </span>
        )}

        {/* Tagline */}
        <p className="font-body text-[11px] uppercase tracking-widest text-muted">
          {service.tagline}
        </p>

        {/* Name */}
        <h3 className="font-tight font-bold text-dark text-lg leading-snug group-hover:text-brand transition-colors duration-150">
          {service.name}
        </h3>

        {/* One-line desc */}
        <p className="font-body text-sm text-muted leading-relaxed line-clamp-2 flex-1">
          {service.desc}
        </p>

        {/* Learn more */}
        <div className="flex items-center gap-1.5 text-brand text-sm font-tight font-semibold mt-2 group/link">
          Learn More
          <ArrowRight
            size={13}
            weight="bold"
            className="transition-transform duration-150 group-hover/link:translate-x-0.5"
          />
        </div>
      </div>
    </Link>
  )
}
