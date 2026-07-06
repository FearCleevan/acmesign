'use client'

import { useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import { useInView, motion } from 'framer-motion'
import { ArrowRight, ArrowLeft } from '@phosphor-icons/react'
import SectionLabel from '@/components/ui/SectionLabel'

const projects = [
  {
    num: '01',
    category: 'Storefront Signage',
    title: 'Channel Letter Sign — Commercial Plaza',
    img: '/images/channel/chatime-store-front-1152x751-1.webp',
  },
  {
    num: '02',
    category: 'Vehicle Wraps',
    title: 'Full Wrap — Commercial Van Fleet',
    img: '/images/wraps/Commercial-Wrap-Home.webp',
  },
  {
    num: '03',
    category: 'LED Signs',
    title: 'Programmable LED Display — Retail Store',
    img: '/images/led/LED-index-scaled.webp',
  },
  {
    num: '04',
    category: 'Window Graphics',
    title: 'Frosted Vinyl — Office Building',
    img: '/images/window/cooperators-windows-1200x750-1.webp',
  },
  {
    num: '05',
    category: 'Dimensional Signs',
    title: 'Illuminated Letters — Restaurant Facade',
    img: '/images/channel/Channel-andIlluminated-Signs-2-scaled.webp',
  },
  {
    num: '06',
    category: 'Banners',
    title: 'Outdoor Event Banner — Trade Show',
    img: '/images/banners/great-race-banners-scaled.webp',
  },
]

export default function ProjectsScroll() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    dragFree: true,
    slidesToScroll: 1,
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section ref={sectionRef} className="bg-cream-2 section-padding overflow-hidden">
      <div className="max-w-[1480px] mx-auto">

        {/* ── Header row ────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex-1"
          >
            <SectionLabel className="mb-3">◆ Our Work</SectionLabel>
            <h2 className="font-tight font-black text-dark leading-[1.05] tracking-[-0.02em]">
              Recent Projects
            </h2>
            <p className="font-body text-muted text-sm leading-relaxed mt-4 max-w-sm">
              A selection of signage and branding work completed for Atlantic Canadian
              businesses — from storefronts to full fleet wraps.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center gap-3 shrink-0"
          >
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 border border-dark/20 hover:border-dark/60 text-dark text-sm font-tight font-semibold rounded-pill px-6 py-2.5 transition-all duration-150 group"
            >
              View Full Gallery
              <ArrowRight size={14} weight="bold" className="transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>

            {/* Arrow nav */}
            <div className="flex gap-2">
              <button
                onClick={scrollPrev}
                className="w-10 h-10 rounded-full border border-dark/20 hover:border-dark/60 hover:bg-dark hover:text-white text-dark flex items-center justify-center transition-all duration-150"
                aria-label="Previous projects"
              >
                <ArrowLeft size={16} weight="bold" />
              </button>
              <button
                onClick={scrollNext}
                className="w-10 h-10 rounded-full border border-dark/20 hover:border-dark/60 hover:bg-dark hover:text-white text-dark flex items-center justify-center transition-all duration-150"
                aria-label="Next projects"
              >
                <ArrowRight size={16} weight="bold" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* ── Carousel ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="overflow-hidden pl-6"
          ref={emblaRef}
        >
          <div className="flex gap-5 select-none">
            {projects.map((project) => (
              <Link
                key={project.num}
                href="/gallery"
                className="relative shrink-0 w-[300px] sm:w-[340px] h-[420px] sm:h-[440px] rounded-[28px] overflow-hidden group cursor-pointer block"
              >
                {/* Photo */}
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="340px"
                  draggable={false}
                />

                {/* Dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Ghost number */}
                <span
                  aria-hidden="true"
                  className="absolute top-4 left-5 font-tight font-black text-white/10 text-7xl leading-none select-none"
                >
                  {project.num}
                </span>

                {/* Red arrow on hover */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-brand flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                  <ArrowRight size={15} weight="bold" className="text-white" />
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block text-[10px] font-body font-semibold uppercase tracking-widest text-white/60 bg-white/10 rounded-pill px-3 py-1 mb-3">
                    {project.category}
                  </span>
                  <p className="font-tight font-bold text-white text-base leading-snug">
                    {project.title}
                  </p>
                </div>
              </Link>
            ))}

            {/* End spacer */}
            <div className="shrink-0 w-2" aria-hidden="true" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
