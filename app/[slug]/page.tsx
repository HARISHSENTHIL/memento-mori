import { notFound } from "next/navigation"
import { people } from "@/lib/people"
import { getPersonColor } from "@/lib/colors"
import { LifeCalculator } from "@/components/life-calculator"

export function generateStaticParams() {
  return people.map((p) => ({ slug: p.slug }))
}

export default async function PersonPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const index = people.findIndex((p) => p.slug === slug)
  if (index === -1) notFound()
  const person = people[index]
  const color = getPersonColor(index)
  return <LifeCalculator person={person} color={color} />
}
