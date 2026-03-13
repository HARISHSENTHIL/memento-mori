export interface Person {
  slug: string
  name: string
  birthDate: string // "YYYY-MM-DD"
  expectedAge: number
  relation?: string
}

// ─── Add your people here ────────────────────────────────────────────────────
export const people: Person[] = [
  {
    slug: "harish",
    name: "Harish",
    birthDate: "2002-10-27",
    expectedAge: 65,
    relation: "Me",
  },
  {
    slug: "tofic",
    name: "Mohamed Tawfiq",
    birthDate: "2001-08-09",
    expectedAge: 55,
    relation: "Friend",
  },
  {
    slug: "vaithi",
    name: "Vaithiyanathan",
    birthDate: "2003-06-03",
    expectedAge: 65,
    relation: "Friend",
  },
  {
    slug: "Maddy",
    name: "Madhavan",
    birthDate: "2002-07-03",
    expectedAge: 60,
    relation: "Friend",
  },
  {
    slug: "Abinav",
    name: "Abinav",
    birthDate: "2003-07-31",
    expectedAge: 50,
    relation: "Friend",
  },
  {
    slug: "Sheik",
    name: "Sheik",
    birthDate: "2002-07-01",
    expectedAge: 75,
    relation: "Friend",
  },
]
