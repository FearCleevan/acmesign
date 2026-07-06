const services = [
  'LED Signs & Displays',
  'Vehicle Wraps',
  'Channel Letter Signs',
  'Dimensional Signs',
  'Illuminated Signs',
  'Window Graphics',
  'Banners',
  'Safety & Parking Signs',
  'Apparel',
  'Decals & Stickers',
  'Sign Service & Repair',
]

const item = services.join(' ◆ ')

export default function Ticker() {
  return (
    <div className="bg-brand overflow-hidden py-3 select-none" aria-hidden="true">
      <div className="flex animate-ticker whitespace-nowrap">
        {/* Duplicate for seamless loop */}
        {[0, 1].map((i) => (
          <span
            key={i}
            className="flex-none text-white/90 text-[11px] font-body font-medium uppercase tracking-[0.12em] pr-8"
          >
            {item} ◆&nbsp;
          </span>
        ))}
      </div>
    </div>
  )
}
