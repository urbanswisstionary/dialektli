import { Prisma } from "@prisma/client"
import prisma from "../../src/lib/prisma"
import { anonymourUser } from "./users"

const SEED_TERMS: Prisma.TermCreateArgs["data"][] = [
  {
    title: "Bolä",
    content: "Geschlechtsverkehr",
    cantons: ["LU"],
    examples: [
      "Ich gang die huer go bolä",
      "Ich bi rattig, ich ha scho lang nimm boläd",
    ],
  },
  {
    title: "Negerwurscht",
    content: "Despektierlich für Banane",
    cantons: ["OW"],
    examples: [
      "Ich glaib ich frus a Negerwurscht",
      "Dä Neger hed a grossi Wurscht",
    ],
  },
  {
    title: "Hai",
    content: "häi: heim, nach Hause; Häi: das Daheim.",
    cantons: ["OW"],
    examples: [
      "I Huis und Häi.",
      "Huis und Häi verlyyrä.",
      "um Huis und Häi cho.",
    ],
  },
  {
    title: "Grüessech",
    content: "Hallo; Grüezi; Sali",
    cantons: ["BE"],
    examples: [
      "Grüessech, wie gohts?",
      "Grüessech, wie bisch?",
      "Grüessech, wie geits?",
    ],
  },
  {
    title: "Guetzle",
    content: "Kekse; Plätzchen",
    cantons: ["BE", "ZH", "LU"],
    examples: ["Hesch scho guetzlet?", "I ha guetzlet", "Guetzle mache"],
  },
  {
    title: "Güx",
    content: "Spaß; Scherz",
    cantons: ["BE"],
    examples: ["Mach kei güx!", "Das isch kei güx!", "Das isch e güx!"],
  },

  {
    title: "schröpfe",
    content:
      "Schreibweisen: schräpfe, gschräpft Bedeutung: 1. schröpfen, 2. ausbeuten, aussaugen, ausnehmen usw.; jmd. (z.B. den Autofahrern) mit mehr oder weniger Berechtigung (zu)viel Geld abnehmen, wie es der Staat durch Parkbussen macht",
    cantons: ["BE"],
    examples: ["I ha mi am letschte Sunntig gschräpft gfühlt."],
  },
  {
    title: "Mutsch",
    content:
      "allgemein etwas Rundes, Abgestumpftes, beleibte Person, rundliches Kind, Ziege ohne Hörner, kleiner Käselaib.",
    cantons: ["BE"],
  },
  {
    title: "Mutschlitürgg",
    content:
      "Bedeutung: beleibter Mann oder Junge. Das Wort ist eine spielerische Weiterbildung von 'Mutsch' oder 'Mutschli', was einen rundlichen Käselaib, eine Ziege ohne Hörner oder eben auch ein beleibtes Kind bezeichnen konnte. Wenn bloss der Kopf gemeint war, sprach man eher von einem > Mutschligrind oder Mutschgrind.",
    cantons: ["BE"],
  },
  {
    title: "De Fisch mache",
    content:
      "Lassen Sie ein Ereignis, ein Gespräch oder einen Ort, den Sie nicht mögen, stillschweigend hinter sich – das ist das Äquivalent dazu, still und leise der schlimmen oder lästigen Situation zu entfliehen, in der Sie sich befanden.",
    cantons: ["ZH"],
    examples: ["I mues jetzt de Fisch mache", "I ha gestern de Fisch gmacht"],
  },
  {
    title: "Schräpfe",
    content: "A local dish made with flour, water, and salt, fried in butter.",
    cantons: ["OW"],
    examples: [
      "Hesch scho Schräpfe probiert?",
      "I ha Schräpfe gmacht",
      "Schräpfe ässe",
    ],
  },
  {
    title: "Gschpänig",
    content: "Cute or charming, often applied to children or small animals.",
    cantons: ["OW"],
    examples: [
      "Das chli Bäbi isch so gschpänig!",
      "Hesch das chline Chätzli gseh? Es isch so gschpänig!",
      "E chli gschpänigi Chlapf",
    ],
  },
  {
    title: "Chnüppel",
    content:
      "A small stick or twig, commonly used in local expressions or idioms.",
    cantons: ["OW"],
    examples: [
      "Chnüppeli sammle",
      "Mit em Chnüppel spiele",
      "E chli Chnüppelholz",
    ],
  },
  {
    title: "Trübeli",
    content:
      "Cloudy or murky weather, often used to describe the sky or water conditions.",
    cantons: ["OW"],
    examples: [
      "Es isch hüt Trübeli drauße",
      "Im See isch es Trübeli",
      "Trübeli überm Berg",
    ],
  },
  {
    title: "Schuppel",
    content:
      "A term that might refer to a gentle shake or a light pat, used in various contexts such as expressing affection or getting someone's attention.",
    cantons: ["OW"],
    examples: [
      "E chli Schuppel als Liebesbeweis",
      "Schuppel uf de Rücke",
      "Gib em es Schuppel",
    ],
  },
]

export const seedTerms = async () => {
  let skippedTermsCount = 0
  let createdTermsCount = 0
  const anonymourUserId = (
    await prisma.user.findFirst({
      where: { email: anonymourUser.email },
      select: { id: true },
    })
  )?.id

  if (!anonymourUserId)
    throw new Error("Anonymous user not found, please seed users first.")
  for (const { title, content, cantons, examples } of SEED_TERMS) {
    const existingTerm = await prisma.term.findFirst({
      where: { title, content, authorId: anonymourUserId },
      select: { id: true },
    })
    if (existingTerm) {
      console.log(
        `[seed term] Skipping ${title} as it already exists, id: ${existingTerm.id}.`,
      )
      skippedTermsCount++
      continue
    }
    const createdTerm = await prisma.term.create({
      data: {
        title,
        content,
        cantons,
        examples,
        author: { connect: { id: anonymourUserId } },
        published: true,
      },
    })
    createdTermsCount++
    console.log(`[seed terms] ${title} was successfully seeded`, {
      createdTerm,
    })
  }
  console.log(
    `[seed terms]: ${skippedTermsCount} terms were skipped and ${createdTermsCount} terms were successfully seeded`,
  )
}
