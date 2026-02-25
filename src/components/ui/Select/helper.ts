export const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
]

export const germanLetters = ["Ä", "Ö", "Ü", "ß"]

const customSort = (a: string, b: string) => {
  const sortMap: Record<string, string> = {
    Ä: "A~",
    Ö: "O~",
    Ü: "U~",
    ß: "S~",
  }
  const aSort = sortMap[a] || a
  const bSort = sortMap[b] || b
  return aSort.localeCompare(bSort)
}

export const allLetters = [...letters, ...germanLetters].sort(customSort)
