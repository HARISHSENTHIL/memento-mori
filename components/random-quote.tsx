"use client"

import { useState, useEffect } from "react"
import { quotes } from "@/lib/quotes"

export function RandomQuote() {
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(null)

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

  if (!quote) return null

  return (
    <div className="border-l-2 border-accent pl-5">
      <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-mono mb-3">
        — Quote —
      </p>
      <blockquote className="font-serif text-base md:text-lg font-light text-foreground leading-relaxed">
        "{quote.text}"
      </blockquote>
      <p className="mt-3 text-xs tracking-[0.2em] uppercase text-accent font-mono">
        — {quote.author}
      </p>
    </div>
  )
}
