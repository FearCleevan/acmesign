import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, FacebookLogo, InstagramLogo, MapPin, Phone, Envelope } from '@phosphor-icons/react/dist/ssr'

const servicesCol1 = [
  { label: 'LED Signs & Displays', href: '/services/led-signs' },
  { label: 'Vehicle Wraps', href: '/services/vehicle-wraps' },
  { label: 'Channel Letter Signs', href: '/services/channel-letter-signs' },
  { label: 'Dimensional Signs', href: '/services/dimensional-signs' },
  { label: 'Illuminated Signs', href: '/services/illuminated-signs' },
]

const servicesCol2 = [
  { label: 'Window Graphics', href: '/services/window-graphics' },
  { label: 'Banners', href: '/services/banners' },
  { label: 'Safety & Parking Signs', href: '/services/safety-parking-signs' },
  { label: 'Apparel', href: '/services/apparel' },
  { label: 'Decals & Stickers', href: '/services/decals-stickers' },
  { label: 'Sign Service & Repair', href: '/services/sign-service-repair' },
]

export default function Footer() {
  return (
    <footer className="bg-dark text-white relative overflow-hidden">
      {/* ── Main Grid ──────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-370 mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Col 1 — CTA + Hours */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/acme-logo.webp"
                alt="ACME Sign & Graphics Company"
                width={160}
                height={48}
                className="object-contain"
              />
            </Link>
            <h3 className="text-white font-tight text-xl font-bold leading-snug mb-4">
              Ready to make a great first impression?
            </h3>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-d text-white text-sm font-tight font-semibold rounded-pill px-5 py-2.5 transition-colors duration-150 mb-8 group"
            >
              Get Started
              <ArrowRight size={14} weight="bold" className="transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
            <div className="space-y-1">
              <p className="text-white/40 text-xs font-body uppercase tracking-widest mb-2">Hours</p>
              <p className="text-white/70 text-sm font-body">Mon – Fri</p>
              <p className="text-white/70 text-sm font-body">8:30 AM – 5:00 PM</p>
            </div>
          </div>

          {/* Col 2 — Services A */}
          <div>
            <p className="text-white/40 text-xs font-body uppercase tracking-widest mb-5">Services</p>
            <ul className="space-y-3">
              {servicesCol1.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/70 hover:text-white text-sm font-body transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services B */}
          <div>
            <p className="text-white/40 text-xs font-body uppercase tracking-widest mb-5">More Services</p>
            <ul className="space-y-3">
              {servicesCol2.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/70 hover:text-white text-sm font-body transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact Info */}
          <div>
            <p className="text-white/40 text-xs font-body uppercase tracking-widest mb-5">Contact</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} weight="fill" className="text-brand mt-0.5 shrink-0" />
                <address className="not-italic text-white/70 text-sm font-body leading-relaxed">
                  25 Raddall Avenue, Unit 4<br />
                  Dartmouth, Nova Scotia B3B 1L4
                </address>
              </li>
              <li>
                <a href="tel:+19024811007" className="flex items-center gap-3 text-white/70 hover:text-white text-sm font-body transition-colors duration-150">
                  <Phone size={16} weight="fill" className="text-brand shrink-0" />
                  +1 (902) 481-1007
                </a>
              </li>
              <li>
                <a href="mailto:acmesign01@gmail.com" className="flex items-center gap-3 text-white/70 hover:text-white text-sm font-body transition-colors duration-150">
                  <Envelope size={16} weight="fill" className="text-brand shrink-0" />
                  acmesign01@gmail.com
                </a>
              </li>
              <li className="pt-2 flex flex-col gap-2">
                <Link href="/gallery" className="text-white/70 hover:text-white text-sm font-body transition-colors duration-150">
                  Gallery
                </Link>
                <Link href="/artwork-guidelines" className="text-white/70 hover:text-white text-sm font-body transition-colors duration-150">
                  Artwork Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ─────────────────────────────────────────────── */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-body">
            © {new Date().getFullYear()} ACME Sign &amp; Graphics Co. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white transition-colors duration-150 p-1.5 rounded-full hover:bg-white/10"
              aria-label="Facebook"
            >
              <FacebookLogo size={18} weight="fill" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white transition-colors duration-150 p-1.5 rounded-full hover:bg-white/10"
              aria-label="Instagram"
            >
              <InstagramLogo size={18} weight="fill" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Watermark ──────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 flex items-end overflow-hidden pointer-events-none select-none"
        style={{ height: '16vw', fontSize: '22vw', lineHeight: 1 }}
      >
        <span
          className="font-tight font-black text-white whitespace-nowrap w-full text-center leading-none"
          style={{ opacity: 0.04, letterSpacing: '-0.02em' }}
        >
          ACME SIGN
        </span>
      </div>
    </footer>
  )
}
