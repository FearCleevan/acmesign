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
