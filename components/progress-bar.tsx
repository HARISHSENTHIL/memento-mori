"use client"

import { useEffect, useRef } from "react"

interface ProgressBarProps {
  percent: number
  expectedAge: number
}

export function ProgressBar({ percent, expectedAge }: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const bar = barRef.current
    const text = textRef.current
    if (!bar || !text) return

    const duration = 2000
    const start = performance.now()
    let frame: number

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * percent
      bar.style.width = `${current}%`
      text.textContent = `${current.toFixed(1)}%`
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    bar.style.width = "0%"
    text.textContent = "0.0%"
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [percent])

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-mono">
          Life Consumed
        </span>
        <span
          ref={textRef}
          className="text-xs tracking-[0.2em] font-mono text-accent tabular-nums"
        >
          0.0%
        </span>
      </div>

      {/* Track */}
      <div
        className="relative h-px w-full bg-border overflow-hidden"
        role="progressbar"
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Percentage of life elapsed"
      >
        <div
          ref={barRef}
          className="absolute top-0 left-0 h-full bg-accent transition-none"
          style={{ width: "0%" }}
        />
      </div>

      <div className="flex justify-between mt-2">
        <span className="text-xs text-muted-foreground font-mono tracking-widest">BIRTH</span>
        <span className="text-xs text-muted-foreground font-mono tracking-widest">AGE {expectedAge}</span>
      </div>

      {/* Week dots grid */}
      <WeekDots percent={percent} expectedAge={expectedAge} />
    </div>
  )
}

function WeekDots({ percent, expectedAge }: { percent: number; expectedAge: number }) {
  const totalWeeks = expectedAge * 52
  const livedWeeks = Math.floor((percent / 100) * totalWeeks)

  return (
    <div className="mt-10">
      <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-mono mb-4">
        Life in Weeks — {totalWeeks.toLocaleString()} total
      </p>
      <div
        className="flex flex-wrap gap-[3px]"
        aria-label={`${livedWeeks} weeks lived out of ${totalWeeks}`}
      >
        {Array.from({ length: Math.min(totalWeeks, 3380) }).map((_, i) => {
          const isCurrentWeek = i === livedWeeks - 1
          return (
            <div
              key={i}
              className={`w-[6px] h-[6px] rounded-none ${
                isCurrentWeek
                  ? "bg-accent opacity-100 animate-pulse scale-125"
                  : i < livedWeeks
                  ? "bg-accent opacity-90"
                  : "bg-border opacity-70"
              }`}
              aria-hidden="true"
            />
          )
        })}
      </div>
      <p className="mt-4 text-xs text-muted-foreground font-mono">
        <span className="text-accent">{livedWeeks.toLocaleString()}</span> weeks lived ·{" "}
        <span className="text-foreground">{(totalWeeks - livedWeeks).toLocaleString()}</span> weeks remaining
      </p>
    </div>
  )
}
