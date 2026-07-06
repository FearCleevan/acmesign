'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import type { CategoryFolder } from '@/lib/categoryImages'

export interface GalleryPhoto {
  src: string
  folder: CategoryFolder
}

interface FilterTab {
  label: string
  value: CategoryFolder | 'all'
}

const FILTER_TABS: FilterTab[] = [
  { label: 'All', value: 'all' },
  { label: 'Channel & Dimensional & Illuminated Signs', value: 'channel' },
  { label: 'Vehicle Wraps', value: 'wraps' },
  { label: 'LED Signs', value: 'led' },
  { label: 'Window Graphics', value: 'window' },
  { label: 'Banners', value: 'banners' },
  { label: 'Apparel', value: 'apparel' },
  { label: 'Decals, Safety & Service', value: 'gallery' },
]

interface GalleryMasonryProps {
  photos: GalleryPhoto[]
  initialFilter?: CategoryFolder | 'all'
}

const PAGE_SIZE = 40

export default function GalleryMasonry({ photos, initialFilter = 'all' }: GalleryMasonryProps) {
  const [filter, setFilter] = useState<CategoryFolder | 'all'>(initialFilter)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const filtered = useMemo(
    () => (filter === 'all' ? photos : photos.filter((p) => p.folder === filter)),
    [photos, filter]
  )
  const visible = filtered.slice(0, visibleCount)

  function selectFilter(value: CategoryFolder | 'all') {
    setFilter(value)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => selectFilter(tab.value)}
            className={`px-4 py-2 rounded-pill text-sm font-tight font-semibold transition-colors ${
              filter === tab.value
                ? 'bg-brand text-white'
                : 'bg-cream-2 text-dark/70 hover:bg-dark/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:balance]">
        {visible.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setLightboxIndex(i)}
            className="group block w-full mb-4 break-inside-avoid relative overflow-hidden rounded-inner bg-cream-2"
          >
            <Image
              src={photo.src}
              alt={`${photo.folder} project photo`}
              width={600}
              height={450}
              loading="lazy"
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {visibleCount < filtered.length && (
        <div className="flex justify-center mt-10">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="px-6 py-3 rounded-pill bg-dark text-white font-tight font-semibold text-sm hover:bg-dark/80 transition-colors"
          >
            Load More ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={visible.map((p) => ({ src: p.src }))}
      />
    </div>
  )
}
