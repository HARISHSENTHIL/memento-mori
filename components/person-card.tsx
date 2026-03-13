"use client"

import Link from "next/link"
import type { Person } from "@/lib/people"

function parseLocalDate(str: string): Date {
  const [y, m, d] = str.split("-").map(Number)
  return new Date(y, m - 1, d)
}

function getStats(person: Person) {
  const birthDate = parseLocalDate(person.birthDate)
  const today = new Date()
  const deathDate = new Date(birthDate)
  deathDate.setFullYear(birthDate.getFullYear() + person.expectedAge)

  const totalMs = deathDate.getTime() - birthDate.getTime()
  const remainingMs = Math.max(0, deathDate.getTime() - today.getTime())
  const remainingDays = Math.floor(remainingMs / (1000 * 60 * 60 * 24))
  const yearsLeft = Math.floor(remainingDays / 365)
  const percentLived = ((totalMs - remainingMs) / totalMs) * 100

  const born = birthDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return { yearsLeft, percentLived, born }
}

interface PersonCardProps {
  person: Person
  color: string
}

export function PersonCard({ person, color }: PersonCardProps) {
  const { yearsLeft, percentLived, born } = getStats(person)
  const initials = person.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <Link href={`/${person.slug}`} className="group block outline-none">
      <div
        className="relative flex flex-col border border-border bg-card p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1"
        style={{ "--p-color": color } as React.CSSProperties}
      >
        {/* Corner accents */}
        <span
          className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 transition-all duration-300 group-hover:w-10 group-hover:h-10"
          style={{ borderColor: `color-mix(in srgb, ${color} 40%, transparent)` }}
          aria-hidden="true"
        />
        <span
          className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 transition-all duration-300 group-hover:w-10 group-hover:h-10"
          style={{ borderColor: `color-mix(in srgb, ${color} 25%, transparent)` }}
          aria-hidden="true"
        />

        {/* Initials */}
        <p
          className="text-4xl font-serif font-light leading-none mb-1"
          style={{ color }}
        >
          {initials}
        </p>

        {/* Name + relation */}
        <div className="mt-4">
          <p className="text-xs tracking-[0.3em] uppercase text-foreground font-mono font-bold">
            {person.name}
          </p>
          {person.relation && (
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-mono mt-0.5">
              — {person.relation} —
            </p>
          )}
        </div>

        {/* Birth date */}
        <p className="mt-4 text-xs text-muted-foreground font-mono tracking-widest">
          b. {born}
        </p>

        {/* Mini progress bar */}
        <div className="mt-5">
          <div className="relative h-px w-full bg-border overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full transition-none"
              style={{ width: `${percentLived}%`, backgroundColor: color }}
            />
          </div>
          <div className="mt-1.5">
            <span className="text-[10px] font-mono tracking-widest" style={{ color }}>
              {percentLived.toFixed(1)}%
            </span>
            <span className="text-[10px] text-muted-foreground font-mono tracking-widest">
              {" "}consumed
            </span>
          </div>
        </div>

        {/* Years remaining */}
        <div className="mt-4 flex items-end justify-between">
          <p className="text-xs tracking-[0.2em] uppercase font-mono" style={{ color }}>
            {yearsLeft} yrs remaining
          </p>
          <span
            className="font-mono text-sm transition-all duration-300 group-hover:translate-x-1"
            style={{ color }}
          >
            →
          </span>
        </div>
      </div>
    </Link>
  )
}
