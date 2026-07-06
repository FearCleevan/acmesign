'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import SectionLabel from '@/components/ui/SectionLabel'
import PillButton from '@/components/ui/PillButton'

interface RelatedWorkProps {
  images: string[]
  categoryLabel: string
  viewAllHref: string
}

const PREVIEW_COUNT = 24

export default function RelatedWork({ images, categoryLabel, viewAllHref }: RelatedWorkProps) {
  const [index, setIndex] = useState(-1)
  const preview = images.slice(0, PREVIEW_COUNT)

  if (preview.length === 0) return null

  return (
    <section className="bg-cream section-padding px-6">
      <div className="max-w-[1480px] mx-auto">
        <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
          <div>
            <SectionLabel className="mb-3">◆ Real Work</SectionLabel>
            <h2 className="font-tight font-black text-dark text-2xl tracking-tight">
              More {categoryLabel} Projects
            </h2>
          </div>
          {images.length > PREVIEW_COUNT && (
            <PillButton href={viewAllHref} variant="ghost" arrow>
              View All {images.length} Photos
            </PillButton>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {preview.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              className="group relative aspect-square overflow-hidden rounded-inner bg-cream-2"
            >
              <Image
                src={src}
                alt={`${categoryLabel} project photo ${i + 1}`}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={preview.map((src) => ({ src }))}
      />
    </section>
  )
}
