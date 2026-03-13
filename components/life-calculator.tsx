"use client"

import Link from "next/link"
import { StatCard } from "@/components/stat-card"
import { ProgressBar } from "@/components/progress-bar"
import { RandomQuote } from "@/components/random-quote"
import type { Person } from "@/lib/people"

function parseLocalDate(str: string): Date {
  const [y, m, d] = str.split("-").map(Number)
  return new Date(y, m - 1, d)
}

function lifeRemaining(birthDateStr: string, expectedAge: number) {
  const birthDate = parseLocalDate(birthDateStr)
  const today = new Date()

  const deathDate = new Date(birthDate)
  deathDate.setFullYear(birthDate.getFullYear() + expectedAge)

  const remainingMs = deathDate.getTime() - today.getTime()
  const remainingDays = Math.max(0, Math.floor(remainingMs / (1000 * 60 * 60 * 24)))
  const remainingWeeks = Math.floor(remainingDays / 7)
  const remainingYears = Math.floor(remainingDays / 365)

  const totalDays = Math.floor(
    (deathDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24)
  )
  const livedDays = totalDays - remainingDays
  const percentLived = (livedDays / totalDays) * 100

  return { years_left: remainingYears, weeks_left: remainingWeeks, days_left: remainingDays, percentLived }
}

interface LifeCalculatorProps {
  person: Person
  color: string
}

export function LifeCalculator({ person, color }: LifeCalculatorProps) {
  const stats = lifeRemaining(person.birthDate, person.expectedAge)
  const now = new Date()
  const timestamp = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const bornDate = parseLocalDate(person.birthDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <main
      className="min-h-screen bg-background text-foreground flex flex-col"
      style={{ "--accent": color, "--accent-foreground": "oklch(0.1 0 0)" } as React.CSSProperties}
    >
      {/* Header */}
      <header className="border-b border-border px-6 md:px-12 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-mono hover:text-foreground transition-colors"
          >
            ← Back
          </Link>
          <span className="text-border font-mono">|</span>
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-mono">
            Memento Mori
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
          <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-mono">
            Live
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 md:px-12 pt-16 pb-10 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-16">
          {/* Left: title */}
          <div className="flex-1 min-w-0">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-mono mb-4">
              {person.name} — Born {bornDate}
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-foreground leading-tight text-balance">
              Time is the only{" "}
              <em className="not-italic text-accent">non-renewable</em>{" "}
              resource.
            </h1>
            <p className="mt-6 text-muted-foreground font-mono text-sm leading-relaxed max-w-xl">
              Based on an estimated lifespan of{" "}
              <span className="text-foreground">{person.expectedAge} years</span>. Calculated as of{" "}
              <span className="text-foreground">{timestamp}</span>.
            </p>
          </div>

          {/* Right: quote */}
          <div className="md:w-72 lg:w-80 flex-shrink-0 md:pt-9">
            <RandomQuote />
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="px-6 md:px-12 py-10" aria-label="Life remaining statistics">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          <StatCard
            value={stats.years_left}
            label="Years Remaining"
            sublabel="— Years —"
            index={0}
          />
          <StatCard
            value={stats.weeks_left}
            label="Weeks Remaining"
            sublabel="— Weeks —"
            index={1}
          />
          <StatCard
            value={stats.days_left}
            label="Days Remaining"
            sublabel="— Days —"
            index={2}
          />
        </div>
      </section>

      {/* Progress Bar */}
      <section className="px-6 md:px-12 pb-16 flex-1">
        <ProgressBar percent={stats.percentLived} expectedAge={person.expectedAge} />
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 md:px-12 py-5">
        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-mono text-center">
          Make every day count — Status: Active
        </p>
      </footer>
    </main>
  )
}
