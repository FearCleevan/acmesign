# Gallery-Heavy Content Buildout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make acmesign.ca showcase the real breadth of ACME's work (271 real photos currently almost entirely unused per-service), fix the duplicate-photo bug, add the missing Gallery/Contact/LED-Signs/Vehicle-Wraps pages, and apply baseline performance + SEO/GEO improvements — all achievable now with existing images, no backend/Supabase required.

**Architecture:** Add a small server-only helper that reads real photo files directly from `public/images/{category}/` at build time via `fs.readdirSync`, instead of hand-maintaining image lists. Every service slug maps to a folder; some folders are shared by multiple slugs (documented below) since the source photos were never pre-sorted that granularly. New pages/components consume this helper. No new dependencies needed — `yet-another-react-lightbox` is already installed and unused.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, `yet-another-react-lightbox` (already a dependency).

## Global Constraints

- No test framework exists in this project (`package.json` has only `dev`/`build`/`start`/`lint` — no jest/vitest/playwright). Verification steps in this plan use `npx tsc --noEmit`, `npm run build`, and manual visual checks (curl + headless Chrome screenshot) instead of unit tests. Do not add a test framework as part of this plan — out of scope.
- Real image folders and counts (verified July 2026): `channel/` 94 files, `wraps/` 52, `led/` 40, `gallery/` (misc) 24, `apparel/` 10, `banners/` 10, `window/` 6.
- `channel/` is shared by 3 service slugs (`channel-letter-signs`, `dimensional-signs`, `illuminated-signs`) — there is no sub-folder split, so all 3 will show the same underlying photo pool. This is a known, accepted limitation (documented in the code) until Scott provides better-categorized photos.
- `gallery/` (misc) is shared by 3 service slugs (`decals-stickers`, `safety-parking-signs`, `sign-service-repair`) for the same reason.
- Brand colors already defined in Tailwind: `brand` (#CC0000), `brand-d`, `cream`, `cream-2`, `dark`, `muted`, `amber` (#FFB800, LED-only accent per existing project convention — do not use amber outside LED contexts).
- Contact phone: `+1 (902) 481-1007`. Address: `25 Raddall Avenue, Unit 4, Dartmouth, Nova Scotia B3B 1L4`. Hours: `Mon – Fri · 8:30 AM – 5:00 PM`.
- Site domain for metadata: `https://acmesign.ca` (already set as `metadataBase` in `src/app/layout.tsx`).

---

### Task 1: Category images helper

**Files:**
- Create: `src/lib/categoryImages.ts`

**Interfaces:**
- Produces: `getCategoryImages(folder: CategoryFolder): string[]` — returns web paths like `/images/channel/Beautiful-Baths-Sign.webp`, sorted alphabetically, every call re-reads the directory (fine at build time for SSG).
- Produces: `CATEGORY_FOLDER_MAP: Record<string, CategoryFolder>` — maps every service slug to its folder name.
- Produces: `type CategoryFolder = 'channel' | 'wraps' | 'led' | 'window' | 'banners' | 'apparel' | 'gallery'`

- [ ] **Step 1: Write the helper**

```ts
// src/lib/categoryImages.ts
import fs from 'node:fs'
import path from 'node:path'

export type CategoryFolder =
  | 'channel'
  | 'wraps'
  | 'led'
  | 'window'
  | 'banners'
  | 'apparel'
  | 'gallery'

// Some folders are shared by multiple service slugs because the source
// photos were never pre-sorted at that level of granularity. Documented
// in FRONTEND_IMPLEMENTATION.md Phase 13 — revisit if Scott provides
// better-categorized photos later.
export const CATEGORY_FOLDER_MAP: Record<string, CategoryFolder> = {
  'led-signs': 'led',
  'vehicle-wraps': 'wraps',
  'channel-letter-signs': 'channel',
  'dimensional-signs': 'channel',
  'illuminated-signs': 'channel',
  'window-graphics': 'window',
  banners: 'banners',
  'safety-parking-signs': 'gallery',
  apparel: 'apparel',
  'decals-stickers': 'gallery',
  'sign-service-repair': 'gallery',
}

const IMAGE_EXTENSIONS = new Set(['.webp', '.jpg', '.jpeg', '.png'])

/** Reads real photo filenames from public/images/{folder} at build/request time. */
export function getCategoryImages(folder: CategoryFolder): string[] {
  const dir = path.join(process.cwd(), 'public', 'images', folder)
  let files: string[]
  try {
    files = fs.readdirSync(dir)
  } catch {
    return []
  }
  return files
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort()
    .map((f) => `/images/${folder}/${f}`)
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors related to `categoryImages.ts`

- [ ] **Step 3: Manual verification**

Create a temporary test file `src/app/api/_debug-images/route.ts`:
```ts
import { getCategoryImages } from '@/lib/categoryImages'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    channel: getCategoryImages('channel').length,
    wraps: getCategoryImages('wraps').length,
    led: getCategoryImages('led').length,
  })
}
```
Run: `npm run dev`, then `curl http://localhost:3000/api/_debug-images`
Expected: `{"channel":94,"wraps":52,"led":40}` (counts may shift slightly if files changed since this plan was written — confirm they're non-zero and roughly match).

Delete `src/app/api/_debug-images/route.ts` after confirming — it was only for verification, not part of the shipped site.

- [ ] **Step 4: Commit**

```bash
git add src/lib/categoryImages.ts
git commit -m "feat: add category images helper reading real photos from public/images"
```

---

### Task 2: Fix duplicate hero photos + add gallery images to services data

**Files:**
- Modify: `src/data/services.ts`

**Interfaces:**
- Consumes: nothing new
- Produces: `Service.img` and `Service.heroImg` are now visually distinct across all 11 services (no two services share the same file)

- [ ] **Step 1: Update the 3 channel-based services to use distinct photos**

In `src/data/services.ts`, replace the `img`/`heroImg` values for these three entries:

```ts
// channel-letter-signs entry — change img/heroImg to:
    img: '/images/channel/Beautiful-Baths-Sign.webp',
    heroImg: '/images/channel/beavertails-service-1.webp',
```

```ts
// dimensional-signs entry — change img/heroImg to:
    img: '/images/channel/haydens-sign-2000x1250-1.webp',
    heroImg: '/images/channel/haydens-sign-2000x1250-2.webp',
```

```ts
// illuminated-signs entry — change img/heroImg to:
    img: '/images/channel/Fairview-United-scaled.webp',
    heroImg: '/images/channel/LakeCityCider-scaled.webp',
```

- [ ] **Step 2: Verify no two services share an image**

Run:
```bash
node -e "
const { services } = require('./src/data/services.ts');
" 2>/dev/null || node --experimental-strip-types -e "
const { services } = require('./src/data/services.ts');
const imgs = services.flatMap(s => [s.img, s.heroImg]);
const dupes = imgs.filter((v, i) => imgs.indexOf(v) !== i);
console.log('duplicates:', dupes.length ? dupes : 'none');
"
```
Expected: `duplicates: none`

(If the Node one-liner has trouble with TS import syntax, just visually diff the file instead — confirm each of the 11 `img` values and 11 `heroImg` values are all unique strings.)

- [ ] **Step 3: Build check**

Run: `npx tsc --noEmit && npm run build`
Expected: builds successfully, no type errors.

- [ ] **Step 4: Commit**

```bash
git add src/data/services.ts
git commit -m "fix: use distinct real photos for channel/dimensional/illuminated sign cards"
```

---

### Task 3: RelatedWork gallery component

**Files:**
- Create: `src/components/services/RelatedWork.tsx`

**Interfaces:**
- Consumes: `images: string[]` (from `getCategoryImages`), `categoryLabel: string`, `viewAllHref: string`
- Produces: default export `RelatedWork` component, used by Task 4

- [ ] **Step 1: Write the component**

```tsx
// src/components/services/RelatedWork.tsx
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
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add src/components/services/RelatedWork.tsx
git commit -m "feat: add RelatedWork gallery grid with lightbox for service pages"
```

---

### Task 4: Wire RelatedWork into service detail pages

**Files:**
- Modify: `src/app/services/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getCategoryImages`, `CATEGORY_FOLDER_MAP` (Task 1), `RelatedWork` (Task 3)

- [ ] **Step 1: Update the page**

Replace the full contents of `src/app/services/[slug]/page.tsx`:

```tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { services, getServiceBySlug } from '@/data/services'
import { getCategoryImages, CATEGORY_FOLDER_MAP } from '@/lib/categoryImages'
import SectionLabel from '@/components/ui/SectionLabel'
import PillButton from '@/components/ui/PillButton'
import ServiceCard from '@/components/services/ServiceCard'
import RelatedWork from '@/components/services/RelatedWork'

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
    openGraph: {
      images: [{ url: service.heroImg }],
    },
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const related = services.filter((s) => s.slug !== slug).slice(0, 3)
  const folder = CATEGORY_FOLDER_MAP[slug]
  const categoryPhotos = folder ? getCategoryImages(folder) : []

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

      {/* ── Real Work Gallery ─────────────────────────────────── */}
      <RelatedWork
        images={categoryPhotos}
        categoryLabel={service.name}
        viewAllHref={`/gallery?category=${folder ?? ''}`}
      />

      {/* ── Related Services ──────────────────────────────────── */}
      <section className="bg-cream-2 section-padding px-6">
        <div className="max-w-[1480px] mx-auto">
          <SectionLabel className="mb-4">◆ Other Services</SectionLabel>
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
```

- [ ] **Step 2: Build and visually verify**

Run: `npm run build && npm run start`
Then in another terminal: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/services/channel-letter-signs`
Expected: `200`

Take a screenshot to confirm the gallery grid renders with real photos (use headless Chrome: `chrome --headless --screenshot=check.png --window-size=1440,3000 http://localhost:3000/services/channel-letter-signs`), then view the file. Expected: hero photo, description, a grid of distinct channel-signs photos (not the same 3 photos repeated), then "Explore More" cards below.

- [ ] **Step 3: Commit**

```bash
git add src/app/services/[slug]/page.tsx
git commit -m "feat: show real category photo gallery on every service detail page"
```

---

### Task 5: Full Gallery page

**Files:**
- Create: `src/components/gallery/GalleryMasonry.tsx`
- Create: `src/app/gallery/page.tsx`

**Interfaces:**
- Consumes: `getCategoryImages`, `CATEGORY_FOLDER_MAP` (Task 1)
- Produces: `/gallery` route, optionally filtered via `?category=` query param matching a `CategoryFolder` value

- [ ] **Step 1: Write the masonry component**

```tsx
// src/components/gallery/GalleryMasonry.tsx
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
```

- [ ] **Step 2: Write the page**

```tsx
// src/app/gallery/page.tsx
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

export default function GalleryPage() {
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
        <GalleryMasonry photos={photos} />
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: builds successfully, `/gallery` listed in the route output.

Run: `npm run start` then `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/gallery`
Expected: `200`

Screenshot check (headless Chrome, `--window-size=1440,2000`) to confirm the masonry grid renders with real photos and filter pills are visible.

- [ ] **Step 4: Commit**

```bash
git add src/components/gallery/GalleryMasonry.tsx src/app/gallery/page.tsx
git commit -m "feat: add full gallery page with all real photos, category filters, and lightbox"
```

---

### Task 6: Standalone Contact page

**Files:**
- Create: `src/app/contact/page.tsx`

**Interfaces:**
- Consumes: existing `ContactSection` component (already built, used on homepage) — verify its export signature first (no props expected based on current homepage usage)

- [ ] **Step 1: Write the page**

```tsx
// src/app/contact/page.tsx
import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import ContactSection from '@/components/home/ContactSection'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with ACME Sign & Graphics — 25 Raddall Avenue, Unit 4, Dartmouth, Nova Scotia. Call +1 (902) 481-1007 or request a free quote online.',
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-brand text-white pt-36 pb-16 px-6">
        <div className="max-w-[1480px] mx-auto">
          <SectionLabel className="text-white/70 mb-3">◆ Get In Touch</SectionLabel>
          <h1 className="font-tight font-black text-4xl sm:text-5xl tracking-tight mb-4">
            Let&apos;s Talk About Your Project.
          </h1>
          <a href="tel:+19024811007" className="text-2xl font-tight font-bold hover:underline">
            +1 (902) 481-1007
          </a>
        </div>
      </section>

      <ContactSection />

      <section className="bg-cream px-6 pb-16">
        <div className="max-w-[1480px] mx-auto rounded-card overflow-hidden">
          <iframe
            title="ACME Sign & Graphics location"
            src="https://www.google.com/maps?q=25+Raddall+Avenue+Unit+4,+Dartmouth,+Nova+Scotia+B3B+1L4&output=embed"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Verify ContactSection has no required props**

Run: `grep -n "interface\|export default function ContactSection" src/components/home/ContactSection.tsx`
Expected: confirms it takes no required props (or note any required props and pass them). If it requires props, adjust the import call accordingly before proceeding.

- [ ] **Step 3: Build and verify**

Run: `npm run build && npm run start`
Then: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/contact`
Expected: `200`

- [ ] **Step 4: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "feat: add standalone contact page with map embed"
```

---

### Task 7: Dedicated LED Signs page

**Files:**
- Create: `src/app/services/led-signs/page.tsx`

**Interfaces:**
- Consumes: `getCategoryImages('led')` (Task 1), `getServiceBySlug('led-signs')` (existing `services.ts`)
- Note: this static route takes precedence over `services/[slug]/page.tsx` for the exact path `/services/led-signs` — Next.js resolves static segments before dynamic ones, so no conflict.

- [ ] **Step 1: Write the page**

```tsx
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
        <div className="max-w-[1480px] mx-auto max-w-2xl">
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
```

- [ ] **Step 2: Verify service lookup won't crash at build time**

Run: `grep -n "slug: 'led-signs'" src/data/services.ts`
Expected: confirms the entry exists (it does — verified in Task 2 review). The `getServiceBySlug('led-signs')!` non-null assertion is safe because this is a hardcoded, known-to-exist slug, not user input.

- [ ] **Step 3: Build and verify**

Run: `npm run build && npm run start`
Then: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/services/led-signs`
Expected: `200`. Confirm via screenshot that this dedicated page renders (not the generic `[slug]` template) — check for the stats strip and product grid, which only exist on this dedicated page.

- [ ] **Step 4: Commit**

```bash
git add src/app/services/led-signs/page.tsx
git commit -m "feat: add dedicated LED Signs page with stats, product grid, and photo gallery"
```

---

### Task 8: Dedicated Vehicle Wraps page

**Files:**
- Create: `src/app/services/vehicle-wraps/page.tsx`

**Interfaces:**
- Consumes: `getCategoryImages('wraps')` (Task 1), `getServiceBySlug('vehicle-wraps')`

- [ ] **Step 1: Write the page**

```tsx
// src/app/services/vehicle-wraps/page.tsx
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
```

- [ ] **Step 2: Build and verify**

Run: `npm run build && npm run start`
Then: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/services/vehicle-wraps`
Expected: `200`. Screenshot check to confirm stats strip, wrap-type cards, and process steps render.

- [ ] **Step 3: Commit**

```bash
git add src/app/services/vehicle-wraps/page.tsx
git commit -m "feat: add dedicated Vehicle Wraps page with stats, wrap types, and photo gallery"
```

---

### Task 9: Performance audit pass

**Files:**
- Modify: `src/components/home/HeroSection.tsx`
- Modify: `src/components/home/ProjectsScroll.tsx`
- Modify: `src/components/services/ServiceCard.tsx` (verify only, likely already correct)

**Interfaces:** none new — this task only adjusts existing `<Image>` props.

- [ ] **Step 1: Audit every `<Image>` usage for missing `sizes`/`priority` issues**

Run:
```bash
grep -rn "next/image\|<Image" src/components src/app --include="*.tsx" -A 3 | grep -B 3 "src=" | grep -L "sizes=" 2>/dev/null
grep -rln "<Image" src/components src/app --include="*.tsx"
```

Manually open each matched file and confirm:
- Every `<Image fill>` usage has a `sizes` prop (missing `sizes` on a `fill` image makes Next.js default to `100vw`, which over-fetches on grid layouts).
- `priority` is present ONLY on: the 3 hero photos in `HeroSection.tsx`, and the single hero image in each service page (`[slug]/page.tsx`, `led-signs/page.tsx`, `vehicle-wraps/page.tsx` — already added correctly in Tasks 4, 7, 8).
- No `priority` on `ServiceCard.tsx`, `RelatedWork.tsx`, or `GalleryMasonry.tsx` images — these should lazy-load (already written that way in Tasks 3 and 5).

- [ ] **Step 2: Fix `HeroSection.tsx` if the 3 staggered photos are missing `sizes`**

Open `src/components/home/HeroSection.tsx`, find the 3 `<Image>` elements for the staggered hero photos. Ensure each has:
```tsx
sizes="(max-width: 1024px) 40vw, 300px"
```
(Adjust the exact px value to match the actual rendered width in that component if different — check the surrounding container's width classes first.)

- [ ] **Step 3: Fix `ProjectsScroll.tsx` if project card images are missing `sizes`**

Open `src/components/home/ProjectsScroll.tsx`, confirm each project card `<Image>` has:
```tsx
sizes="340px"
```
(or the actual fixed card width used in that component's className — check before assuming 340px).

- [ ] **Step 4: Verify with Lighthouse**

Run: `npm run build && npm run start`, then in Chrome DevTools (or `npx lighthouse http://localhost:3000 --view` if installed) run a Lighthouse pass on `/` and `/gallery`.
Expected: LCP < 2.5s, CLS < 0.1 on both pages. If not met, check for images missing explicit dimensions or `sizes` — the most common cause of both regressions.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/HeroSection.tsx src/components/home/ProjectsScroll.tsx
git commit -m "perf: audit and fix sizes/priority attributes across image-heavy pages"
```

---

### Task 10: SEO & GEO — sitemap, robots, LocalBusiness schema

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `src/lib/seo/localBusinessSchema.ts`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: `getLocalBusinessSchema(): object` — JSON-LD object, consumed by root layout

- [ ] **Step 1: Write the LocalBusiness schema builder**

```ts
// src/lib/seo/localBusinessSchema.ts
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'ACME Sign & Graphics Co.',
    description:
      'Signage, LED displays, vehicle wraps, and custom apparel fabricated in-house for businesses across Atlantic Canada.',
    url: 'https://acmesign.ca',
    telephone: '+1-902-481-1007',
    email: 'acmesign01@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '25 Raddall Avenue, Unit 4',
      addressLocality: 'Dartmouth',
      addressRegion: 'Nova Scotia',
      postalCode: 'B3B 1L4',
      addressCountry: 'CA',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:30',
      closes: '17:00',
    },
    areaServed: [
      'Halifax',
      'Dartmouth',
      'Bedford',
      'Sackville',
      'Truro',
      'Wolfville',
      'Kentville',
      'Digby',
      'Yarmouth',
      'Pictou',
      'Antigonish',
      'New Glasgow',
      'Sydney',
      'Cape Breton',
      'Moncton',
      'Amherst',
      'New Brunswick',
      'Prince Edward Island',
    ],
  }
}
```

- [ ] **Step 2: Write sitemap.ts**

```ts
// src/app/sitemap.ts
import type { MetadataRoute } from 'next'
import { services } from '@/data/services'

const BASE_URL = 'https://acmesign.ca'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/services', '/gallery', '/contact'].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }))

  const serviceRoutes = services.map((s) => ({
    url: `${BASE_URL}${s.href}`,
    lastModified: new Date(),
  }))

  return [...staticRoutes, ...serviceRoutes]
}
```

- [ ] **Step 3: Write robots.ts**

```ts
// src/app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://acmesign.ca/sitemap.xml',
  }
}
```

- [ ] **Step 4: Inject LocalBusiness schema in root layout**

Modify `src/app/layout.tsx` — add the import and the `<script>` tag inside `<body>`, before `<Header />`:

```tsx
import { getLocalBusinessSchema } from '@/lib/seo/localBusinessSchema'
```

And inside the `return`, as the first child of `<body>`:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(getLocalBusinessSchema()) }}
/>
```

- [ ] **Step 5: Build and verify**

Run: `npm run build && npm run start`
Then:
```bash
curl -s http://localhost:3000/sitemap.xml | head -20
curl -s http://localhost:3000/robots.txt
curl -s http://localhost:3000/ | grep -o '"@type":"LocalBusiness"'
```
Expected: sitemap XML with all routes listed, robots.txt with the sitemap reference, and `"@type":"LocalBusiness"` found in the homepage HTML.

- [ ] **Step 6: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts src/lib/seo/localBusinessSchema.ts src/app/layout.tsx
git commit -m "feat: add sitemap, robots.txt, and LocalBusiness JSON-LD for local + AI search"
```

---

## Self-Review Notes

- **Spec coverage:** Task 1-2 cover the duplicate-photo bug and category image infrastructure (Phase 13). Tasks 3-5 cover gallery-heavy showcase on service pages and the full `/gallery` page (Phase 13). Task 6 covers standalone Contact (Frontend Phase 11). Tasks 7-8 cover dedicated LED Signs and Vehicle Wraps pages (Frontend Phases 8-9). Task 9 covers performance (Phase 14). Task 10 covers SEO/GEO (Phase 15). Backend security hardening (Backend Phase 8) is explicitly out of scope for this plan — no backend exists yet to harden.
- **Type consistency:** `CategoryFolder` type defined once in Task 1, reused identically in Tasks 5, 7, 8, 10 without renaming. `getCategoryImages`/`CATEGORY_FOLDER_MAP` names are consistent across every consuming task.
- **Known limitation documented in code comments (Task 1):** `channel` and `gallery` folders are each shared by 3 service slugs since source photos aren't pre-sorted at that granularity — acceptable for now, revisit if Scott provides better-categorized photos.
