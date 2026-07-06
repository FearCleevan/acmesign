import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import GalleryMasonry, { type GalleryPhoto } from '@/components/gallery/GalleryMasonry'
import { getCategoryImages, type CategoryFolder } from '@/lib/categoryImages'

export const metadata: Metadata = {
  title: 'Project Gallery',
  description:
    'Browse real signage, vehicle wrap, LED display, and apparel projects completed by ACME Sign & Graphics for businesses across Atlantic Canada.',
}

const ALL_FOLDERS: CategoryFolder[] = [
  'channel',
  'wraps',
  'led',
  'window',
  'banners',
  'apparel',
  'gallery',
]

interface GalleryPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const { category } = await searchParams
  const initialFilter: CategoryFolder | 'all' = ALL_FOLDERS.includes(category as CategoryFolder)
    ? (category as CategoryFolder)
    : 'all'

  const photos: GalleryPhoto[] = ALL_FOLDERS.flatMap((folder) =>
    getCategoryImages(folder).map((src) => ({ src, folder }))
  )

  return (
    <section className="bg-cream section-padding px-6 pt-36">
      <div className="max-w-[1480px] mx-auto">
        <SectionLabel className="mb-3">◆ Our Work</SectionLabel>
        <h1 className="font-tight font-black text-dark text-4xl sm:text-5xl tracking-tight mb-4">
          Project Gallery
        </h1>
        <p className="font-body text-dark/60 max-w-2xl mb-12">
          {photos.length} real projects completed for businesses across Atlantic Canada — from
          storefront signage to full fleet wraps.
        </p>
        <GalleryMasonry photos={photos} initialFilter={initialFilter} />
      </div>
    </section>
  )
}
