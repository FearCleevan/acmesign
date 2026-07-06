export interface Service {
  slug: string
  name: string
  tagline: string
  desc: string
  body: string
  featured?: boolean
  img: string
  heroImg: string
  href: string
  accentColor?: string
}

export const services: Service[] = [
  {
    slug: 'led-signs',
    name: 'LED Signs & Displays',
    tagline: 'Get noticed 72% more than static signs',
    desc: 'Stand out and capture attention with full-colour high-resolution LED displays. Perfect for any business, church, school, or event. All signs come with built-in WiFi and a convenient app for your phone, tablet or PC.',
    body: 'Stand out and capture attention with full-colour high-resolution LED displays. All signs come with built-in WiFi and a convenient app for your phone, tablet or PC — easily upload or change your message any time. Buy, Rent, or Lease options available for every budget.',
    featured: true,
    img: '/images/led/LED-Displays-1-scaled.webp',
    heroImg: '/images/led/LED-top-photo-scaled.webp',
    href: '/services/led-signs',
    accentColor: '#FFB800',
  },
  {
    slug: 'vehicle-wraps',
    name: 'Vehicle Wraps',
    tagline: 'Put your message in motion',
    desc: 'Our high-quality, high-resolution vehicle wraps deliver excellent marketing exposure. Custom vehicle wraps can last from 4 to 6 years and advertise your business around the clock.',
    body: 'Put your message in motion. Our high-quality, high-resolution vehicle wraps deliver excellent marketing exposure — advertising your business around the clock without any additional effort. Custom vehicle wraps can last from 4 to 6 years.',
    img: '/images/wraps/Vehicle-Wraps-and-Graphics-scaled.webp',
    heroImg: '/images/wraps/Vehicle-Wraps-and-Graphics-1-scaled.webp',
    href: '/services/vehicle-wraps',
  },
  {
    slug: 'channel-letter-signs',
    name: 'Channel Letter Signs',
    tagline: '3D signs that stand out from your building',
    desc: "Channel letters catch the eye by standing out in three dimensions. Made with aluminum, stainless steel, or acrylic — illuminated or non-illuminated. Finishes that won't chip, crack, fade, or discolor.",
    body: "Channel letters catch the eye by standing out in three dimensions from your building facade. Made with aluminum, stainless steel, or acrylic — illuminated or non-illuminated. Our finishes won't chip, crack, fade, or discolor.",
    img: '/images/channel/Beautiful-Baths-Sign.webp',
    heroImg: '/images/channel/beavertails-service-1.webp',
    href: '/services/channel-letter-signs',
  },
  {
    slug: 'dimensional-signs',
    name: 'Dimensional Signs',
    tagline: 'Bold 3D visual sign presentation',
    desc: 'Whether for interior or exterior use, dimensional signs deliver a professional, eye-catching presentation. From cut and cast metals to plastic and acrylic — find exactly the right letters for your style and budget.',
    body: 'Whether for interior or exterior use, dimensional signs deliver a professional, eye-catching presentation. From cut and cast metals to plastic and acrylic — find exactly the right letters for your style and budget.',
    img: '/images/channel/haydens-sign-2000x1250-1.webp',
    heroImg: '/images/channel/haydens-sign-2000x1250-2.webp',
    href: '/services/dimensional-signs',
  },
  {
    slug: 'illuminated-signs',
    name: 'Illuminated Signs',
    tagline: 'Light boxes in any shape or size',
    desc: 'ACME SIGN can provide most any size of illuminated light boxes in any shape or size. We help you navigate bylaws and budget to find the right solution — saving you time and money.',
    body: 'ACME SIGN can provide most any size of illuminated light boxes in any shape or size. We help you navigate bylaws and budget to find the right solution — saving you time and money.',
    img: '/images/channel/Fairview-United-scaled.webp',
    heroImg: '/images/channel/LakeCityCider-scaled.webp',
    href: '/services/illuminated-signs',
  },
  {
    slug: 'window-graphics',
    name: 'Window Graphics',
    tagline: 'Turn any window into a beautiful display',
    desc: 'Opaque, perforated, frosted, and vinyl lettering. Window decals are cost-effective, quick to install, and long-lasting. Pre-masked with transfer tape for easy installation.',
    body: 'Opaque, perforated, frosted, and vinyl lettering — window decals are cost-effective, quick to install, and long-lasting. Pre-masked with transfer tape for easy application.',
    img: '/images/window/Window-Grapgics-scaled.webp',
    heroImg: '/images/window/cooperators-windows-1200x750-1.webp',
    href: '/services/window-graphics',
  },
  {
    slug: 'banners',
    name: 'Banners',
    tagline: 'Full-colour vinyl banners, printed fast',
    desc: 'Photo-quality digitally printed banners on premium 13 oz durable outdoor vinyl. Professionally seamed and grommeted in-house. Same-day banners available if required.',
    body: 'Photo-quality digitally printed banners on premium 13 oz durable outdoor vinyl. Professionally seamed and grommeted in-house. Same-day banners available if required.',
    img: '/images/banners/Banners.webp',
    heroImg: '/images/banners/great-race-banners-scaled.webp',
    href: '/services/banners',
  },
  {
    slug: 'safety-parking-signs',
    name: 'Safety & Parking Signs',
    tagline: 'Clear, informative signs for any business',
    desc: 'ACME SIGN manufactures all safety signs in-house using the most up-to-date digital technologies. Chemical hazard, construction, electrical, warehouse, and custom safety signs.',
    body: 'ACME SIGN manufactures all safety signs in-house using the most up-to-date digital technologies. Chemical hazard, construction, electrical, warehouse, and custom safety signs for any business.',
    img: '/images/gallery/Parking-and-Safety-Signs-scaled.webp',
    heroImg: '/images/gallery/safety-header-1-1086x723-1.webp',
    href: '/services/safety-parking-signs',
  },
  {
    slug: 'apparel',
    name: 'Apparel',
    tagline: 'Custom screen printing & embroidery',
    desc: 'With over 35 years of screen printing and embroidery experience, ACME SIGN offers custom T-shirts, sweatshirts, hats, and more. High-quality products, skillfully printed, when you need them every time.',
    body: 'With over 35 years of screen printing and embroidery experience, ACME SIGN offers custom T-shirts, sweatshirts, hats, and more. High-quality products, skillfully printed, when you need them every time.',
    img: '/images/apparel/Apparel-scaled.webp',
    heroImg: '/images/apparel/apperal-1-901x871-1.webp',
    href: '/services/apparel',
  },
  {
    slug: 'decals-stickers',
    name: 'Decals & Stickers',
    tagline: 'Custom-cut for any smooth surface',
    desc: 'Cut to shape and applied to any smooth surface. Great for advertising your company logo on vehicles, hard hats, laptops, toolboxes, water bottles, and more.',
    body: 'Cut to shape and applied to any smooth surface. Great for advertising your company logo on vehicles, hard hats, laptops, toolboxes, water bottles, and more.',
    img: '/images/gallery/Decals-and-Stickers-scaled.webp',
    heroImg: '/images/gallery/decals-website-1086x633-1.webp',
    href: '/services/decals-stickers',
  },
  {
    slug: 'sign-service-repair',
    name: 'Sign Service & Repair',
    tagline: 'Installation & repair across Nova Scotia',
    desc: 'We offer installation services for local and out-of-town clients. From simple decal installs to full-service electrical sign installation — let us be your trusted installer anywhere in Nova Scotia.',
    body: 'We offer installation services for local and out-of-town clients. From simple decal installs to full-service electrical sign installation — let us be your trusted installer anywhere in Nova Scotia.',
    img: '/images/gallery/Installation-and-Service-scaled.webp',
    heroImg: '/images/gallery/Installation-and-Service-scaled.webp',
    href: '/services/sign-service-repair',
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}
