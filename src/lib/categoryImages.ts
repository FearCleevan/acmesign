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
