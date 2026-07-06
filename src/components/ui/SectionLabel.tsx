interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-brand text-[11px] font-body font-semibold uppercase tracking-[0.15em] ${className}`}
    >
      {children}
    </span>
  )
}
