"use client"

import { useEffect, useRef } from "react"

interface StatCardProps {
  value: number
  label: string
  sublabel: string
  index: number
}

export function StatCard({ value, label, sublabel, index }: StatCardProps) {
  const countRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = countRef.current
    if (!el) return

    const duration = 1800
    const delay = index * 180
    const start = performance.now() + delay
    let frame: number

    const tick = (now: number) => {
      const elapsed = Math.max(0, now - start)
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      el.textContent = Math.floor(eased * value).toLocaleString()
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    el.textContent = "0"
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, index])

  return (
    <div className="group flex flex-col border border-border bg-card p-8 md:p-10 relative overflow-hidden transition-all duration-500 hover:border-accent/60">
      {/* faint corner accent */}
      <span
        className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/40 transition-all duration-500 group-hover:w-12 group-hover:h-12 group-hover:border-accent"
        aria-hidden="true"
      />
      <span
        className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent/20 transition-all duration-500 group-hover:w-12 group-hover:h-12 group-hover:border-accent/60"
        aria-hidden="true"
      />

      <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6">{sublabel}</p>

      <p className="text-6xl md:text-7xl lg:text-8xl font-mono font-bold text-foreground leading-none tabular-nums">
        <span ref={countRef}>0</span>
      </p>

      <p className="mt-6 text-sm tracking-[0.2em] uppercase text-accent font-mono">{label}</p>
    </div>
  )
}
