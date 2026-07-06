'use client'

import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'

interface PillButtonProps {
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  arrow?: boolean
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

export default function PillButton({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  arrow = false,
  children,
  className = '',
  type = 'button',
  disabled = false,
}: PillButtonProps) {
  const base =
    'inline-flex items-center gap-2 font-tight font-semibold rounded-pill transition-all duration-200 select-none'

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  const variants = {
    primary: 'bg-brand text-white hover:bg-brand-d active:scale-[0.97]',
    ghost:
      'bg-transparent text-dark border border-dark/20 hover:border-dark/60 active:scale-[0.97]',
    dark: 'bg-dark text-white hover:bg-dark/80 active:scale-[0.97]',
  }

  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`

  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          weight="bold"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={`group ${cls}`}>
        {inner}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group ${cls} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {inner}
    </button>
  )
}
