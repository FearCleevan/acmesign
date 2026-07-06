'use client'

import { useState, useRef, FormEvent } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Phone, ArrowRight, MapPin, Clock, CheckCircle, WarningCircle } from '@phosphor-icons/react'
import SectionLabel from '@/components/ui/SectionLabel'

const services = [
  { value: '', label: 'Select a service…' },
  { value: 'led-signs', label: 'LED Signs & Displays' },
  { value: 'vehicle-wraps', label: 'Vehicle Wraps' },
  { value: 'channel-letter-signs', label: 'Channel Letter Signs' },
  { value: 'dimensional-signs', label: 'Dimensional Signs' },
  { value: 'illuminated-signs', label: 'Illuminated Signs' },
  { value: 'window-graphics', label: 'Window Graphics' },
  { value: 'banners', label: 'Banners' },
  { value: 'safety-parking-signs', label: 'Safety & Parking Signs' },
  { value: 'apparel', label: 'Apparel' },
  { value: 'decals-stickers', label: 'Decals & Stickers' },
  { value: 'sign-service-repair', label: 'Sign Service & Repair' },
]

const serviceAreas = [
  'Halifax', 'Dartmouth', 'Bedford', 'Sackville', 'Truro', 'Wolfville',
  'Kentville', 'Digby', 'Yarmouth', 'Pictou', 'Antigonish', 'New Glasgow',
  'Sydney', 'Cape Breton', 'Moncton', 'Amherst', 'New Brunswick', 'PEI',
]

type Status = 'idle' | 'loading' | 'success' | 'error'

const inputBase =
  'w-full bg-transparent border-b border-dark/15 pb-3 pt-1 text-dark font-body text-sm placeholder:text-dark/35 outline-none transition-colors duration-150 focus:border-brand'

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  })

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      // Will connect to POST /api/contact in Backend Phase 2
      await new Promise((res) => setTimeout(res, 900))
      setStatus('success')
      setForm({ full_name: '', phone: '', email: '', service: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section ref={ref} className="bg-dark section-padding px-6">
      <div className="max-w-[1480px] mx-auto">

        {/* ── Cream-2 card ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="bg-cream-2 rounded-[2rem] p-8 lg:p-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* ── Left — Info ─────────────────────────────────── */}
            <div className="flex flex-col gap-6">
              <SectionLabel>◆ Get in Touch</SectionLabel>

              <h2 className="font-tight font-black text-dark leading-[1.05] tracking-[-0.02em]">
                Request a Free Quote.
              </h2>

              <p className="font-body text-muted text-sm leading-relaxed max-w-sm">
                Our team is ready to help you find the right signage solution — from a single
                banner to a full LED display system or fleet wrap.
              </p>

              {/* Big phone */}
              <a
                href="tel:+19024811007"
                className="inline-flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
                  <Phone size={18} weight="fill" className="text-brand" />
                </div>
                <span className="font-tight font-black text-brand text-2xl tracking-tight group-hover:text-brand-d transition-colors duration-150">
                  +1 (902) 481-1007
                </span>
              </a>

              {/* Details */}
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <MapPin size={16} weight="fill" className="text-muted mt-0.5 shrink-0" />
                  <address className="not-italic font-body text-sm text-dark/60 leading-relaxed">
                    25 Raddall Avenue, Unit 4<br />
                    Dartmouth, Nova Scotia B3B 1L4
                  </address>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} weight="fill" className="text-muted shrink-0" />
                  <span className="font-body text-sm text-dark/60">
                    Mon – Fri · 8:30 AM – 5:00 PM
                  </span>
                </div>
              </div>

              {/* Service area tags */}
              <div>
                <p className="font-body text-[11px] uppercase tracking-widest text-muted mb-3">
                  Areas We Serve
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {serviceAreas.map((city) => (
                    <span
                      key={city}
                      className="text-[11px] font-body text-dark/60 bg-dark/6 rounded-pill px-3 py-1"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right — Form card ───────────────────────────── */}
            <div className="bg-white rounded-[1.5rem] p-8 lg:p-10 shadow-sm">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center gap-4 py-12"
                  >
                    <div className="w-14 h-14 rounded-full bg-brand/10 flex items-center justify-center">
                      <CheckCircle size={28} weight="fill" className="text-brand" />
                    </div>
                    <h3 className="font-tight font-bold text-dark text-xl">Message Sent!</h3>
                    <p className="font-body text-muted text-sm max-w-xs">
                      We&apos;ll be in touch shortly. In the meantime, feel free to call us
                      at <a href="tel:+19024811007" className="text-brand font-semibold">+1 (902) 481-1007</a>.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="text-sm font-body text-muted underline underline-offset-2 mt-2 hover:text-dark transition-colors duration-150"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-7"
                    noValidate
                  >
                    <h3 className="font-tight font-bold text-dark text-lg">Send Us a Message</h3>

                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-body text-[11px] uppercase tracking-widest text-muted">
                        Full Name <span className="text-brand">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Jane Smith"
                        value={form.full_name}
                        onChange={set('full_name')}
                        className={inputBase}
                      />
                    </div>

                    {/* Phone + Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-body text-[11px] uppercase tracking-widest text-muted">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="(902) 555-0100"
                          value={form.phone}
                          onChange={set('phone')}
                          className={inputBase}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-body text-[11px] uppercase tracking-widest text-muted">
                          Email Address <span className="text-brand">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="jane@business.ca"
                          value={form.email}
                          onChange={set('email')}
                          className={inputBase}
                        />
                      </div>
                    </div>

                    {/* Service */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-body text-[11px] uppercase tracking-widest text-muted">
                        Service Required
                      </label>
                      <select
                        value={form.service}
                        onChange={set('service')}
                        className={`${inputBase} appearance-none cursor-pointer`}
                      >
                        {services.map(({ value, label }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-body text-[11px] uppercase tracking-widest text-muted">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your project…"
                        value={form.message}
                        onChange={set('message')}
                        className={`${inputBase} resize-none`}
                      />
                    </div>

                    {/* Error toast */}
                    <AnimatePresence>
                      {status === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-inner p-3"
                        >
                          <WarningCircle size={16} weight="fill" className="text-brand shrink-0 mt-0.5" />
                          <p className="font-body text-xs text-dark/70 leading-relaxed">
                            Something went wrong. Please call us directly at{' '}
                            <a href="tel:+19024811007" className="text-brand font-semibold">
                              +1 (902) 481-1007
                            </a>
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="flex items-center justify-center gap-2 bg-brand hover:bg-brand-d disabled:opacity-60 disabled:cursor-not-allowed text-white font-tight font-semibold rounded-pill py-3.5 w-full transition-all duration-150 active:scale-[0.98] group"
                    >
                      {status === 'loading' ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight
                            size={15}
                            weight="bold"
                            className="transition-transform duration-150 group-hover:translate-x-0.5"
                          />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
