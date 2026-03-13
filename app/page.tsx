import { people } from "@/lib/people"
import { getPersonColor } from "@/lib/colors"
import { PersonCard } from "@/components/person-card"

export default function DashboardPage() {
  const now = new Date()
  const timestamp = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 md:px-12 py-5 flex items-center justify-between">
        <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-mono">
          Memento Mori
        </span>
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
          <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-mono">
            Live
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 md:px-12 pt-16 pb-10 border-b border-border">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-mono mb-4">
          {timestamp}
        </p>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-foreground leading-tight text-balance max-w-3xl">
          Whose time are{" "}
          <em className="not-italic text-accent">you</em>{" "}
          counting?
        </h1>
        <p className="mt-6 text-muted-foreground font-mono text-sm leading-relaxed max-w-xl">
          Select a profile to see their life remaining.{" "}
          <span className="text-foreground">Every second counts.</span>
        </p>
      </section>

      {/* Person Row */}
      <section className="py-12 flex-1">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-mono mb-8 px-6 md:px-12">
          — Profiles —
        </p>
        <div className="flex flex-row gap-4 overflow-x-auto px-6 md:px-12 pb-4 scrollbar-none">
          {people.map((person, i) => (
            <div key={person.slug} className="flex-none w-64">
              <PersonCard person={person} color={getPersonColor(i)} />
            </div>
          ))}

          {/* Add person hint */}
          <div className="flex-none w-48 flex flex-col items-center justify-center border border-dashed border-border p-8 text-center opacity-40">
            <span className="text-2xl font-mono text-muted-foreground">+</span>
            <p className="mt-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono">
              contact admin to add more
            </p>
          </div>
        </div>
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
