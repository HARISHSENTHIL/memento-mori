export const PERSON_COLORS = [
  "#e8934a", // amber
  "#4abcd8", // cyan
  "#5dc87a", // green
  "#e06878", // rose
  "#a070d0", // purple
  "#5090d8", // blue
]

export function getPersonColor(index: number): string {
  return PERSON_COLORS[index % PERSON_COLORS.length]
}
