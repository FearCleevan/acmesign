import type { Metadata } from 'next'
import { Inter, Inter_Tight } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getLocalBusinessSchema } from '@/lib/seo/localBusinessSchema'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'ACME Sign & Graphics Co. — Dartmouth, Nova Scotia',
    template: '%s | ACME Sign & Graphics',
  },
  description:
    'ACME Sign & Graphics has been helping Atlantic Canadian businesses stand out for over 35 years. LED signs, vehicle wraps, channel letters, banners, apparel, and more — designed, fabricated, and installed in-house.',
  metadataBase: new URL('https://acmesign.ca'),
  openGraph: {
    siteName: 'ACME Sign & Graphics Co.',
    locale: 'en_CA',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-cream antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getLocalBusinessSchema()) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
