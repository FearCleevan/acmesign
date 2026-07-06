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
