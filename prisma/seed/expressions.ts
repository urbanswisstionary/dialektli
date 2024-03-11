import { Language, Prisma } from "@prisma/client"
import prisma from "../../src/lib/prisma"
import { anonymourUser } from "./users"

const SEED_EXPRESSIONS: Prisma.ExpressionCreateArgs["data"][] = [
  {
    title: "Bolä",
    definition: "Geschlechtsverkehr",
    cantons: ["LU"],
    language: Language.DE,

    examples: {
      createMany: {
        data: [
          { definition: "Ich gang die huer go bolä" },
          { definition: "Ich bi rattig, ich ha scho lang nimm boläd" },
        ],
      },
    },
  },
  // {
  //   title: "Negerwurscht",
  //   definition: "Despektierlich für Banane",
  //   cantons: ["OW"],
  //   language: Language.DE,
  //   examples: {
  //     createMany: {
  //       data: [
  //         { definition: "Ich glaib ich frus a Negerwurscht" },
  //         { definition: "Dä Neger hed a grossi Wurscht" },
  //       ],
  //     },
  //   },
  // },
  {
    title: "Hai",
    definition: "häi: heim, nach Hause; Häi: das Daheim.",
    cantons: ["OW"],
    language: Language.DE,
    examples: {
      createMany: {
        data: [
          { definition: "I Huis und Häi." },
          { definition: "Huis und Häi verlyyrä." },
          { definition: "um Huis und Häi cho." },
        ],
      },
    },
  },
  {
    title: "Grüessech",
    definition: "Hallo; Grüezi; Sali",
    cantons: ["BE"],
    language: Language.DE,
    examples: {
      createMany: {
        data: [
          { definition: "Grüessech, wie gohts?" },
          { definition: "Grüessech, wie bisch?" },
          { definition: "Grüessech, wie geits?" },
        ],
      },
    },
  },
  {
    title: "Guetzle",
    definition: "Kekse; Plätzchen",
    cantons: ["BE", "ZH", "LU"],
    language: Language.DE,
    examples: {
      createMany: {
        data: [
          { definition: "Hesch scho guetzlet?" },
          { definition: "I ha guetzlet" },
          { definition: "Guetzle mache" },
        ],
      },
    },
  },
  {
    title: "Güx",
    definition: "Spaß; Scherz",
    cantons: ["BE"],
    language: Language.DE,
    examples: {
      createMany: {
        data: [
          { definition: "Mach kei güx!" },
          { definition: "Das isch kei güx!" },
          { definition: "Das isch e güx!" },
        ],
      },
    },
  },

  {
    title: "schröpfe",
    definition:
      "Schreibweisen: schräpfe, gschräpft Bedeutung: 1. schröpfen, 2. ausbeuten, aussaugen, ausnehmen usw.; jmd. (z.B. den Autofahrern) mit mehr oder weniger Berechtigung (zu)viel Geld abnehmen, wie es der Staat durch Parkbussen macht",
    cantons: ["BE"],
    language: Language.DE,
    examples: {
      createMany: {
        data: [{ definition: "I ha mi am letschte Sunntig gschräpft gfühlt." }],
      },
    },
  },
  {
    title: "Mutsch",
    definition:
      "allgemein etwas Rundes, Abgestumpftes, beleibte Person, rundliches Kind, Ziege ohne Hörner, kleiner Käselaib.",
    cantons: ["BE"],
  },
  {
    title: "Mutschlitürgg",
    definition:
      "Bedeutung: beleibter Mann oder Junge. Das Wort ist eine spielerische Weiterbildung von 'Mutsch' oder 'Mutschli', was einen rundlichen Käselaib, eine Ziege ohne Hörner oder eben auch ein beleibtes Kind bezeichnen konnte. Wenn bloss der Kopf gemeint war, sprach man eher von einem > Mutschligrind oder Mutschgrind.",
    cantons: ["BE"],
  },
  {
    title: "De Fisch mache",
    definition:
      "Lassen Sie ein Ereignis, ein Gespräch oder einen Ort, den Sie nicht mögen, stillschweigend hinter sich – das ist das Äquivalent dazu, still und leise der schlimmen oder lästigen Situation zu entfliehen, in der Sie sich befanden.",
    cantons: ["ZH"],
    language: Language.DE,
    examples: {
      createMany: {
        data: [
          { definition: "I mues jetzt de Fisch mache" },
          { definition: "I ha gestern de Fisch gmacht" },
        ],
      },
    },
  },
  {
    title: "Schräpfe",
    definition:
      "A local dish made with flour, water, and salt, fried in butter.",
    cantons: ["OW"],
    language: Language.DE,
    examples: {
      createMany: {
        data: [
          { definition: "Hesch scho Schräpfe probiert?" },
          { definition: "I ha Schräpfe gmacht" },
          { definition: "Schräpfe ässe" },
        ],
      },
    },
  },
  {
    title: "Gschpänig",
    definition: "Cute or charming, often applied to children or small animals.",
    cantons: ["OW"],
    language: Language.DE,
    examples: {
      createMany: {
        data: [
          { definition: "Das chli Bäbi isch so gschpänig!" },
          {
            definition: "Hesch das chline Chätzli gseh? Es isch so gschpänig!",
          },
          { definition: "E chli gschpänigi Chlapf" },
        ],
      },
    },
  },
  {
    title: "Chnüppel",
    definition:
      "A small stick or twig, commonly used in local expressions or idioms.",
    cantons: ["OW"],
    language: Language.DE,
    examples: {
      createMany: {
        data: [
          { definition: "Chnüppeli sammle" },
          { definition: "Mit em Chnüppel spiele" },
          { definition: "E chli Chnüppelholz" },
        ],
      },
    },
  },
  {
    title: "Trübeli",
    definition:
      "Cloudy or murky weather, often used to describe the sky or water conditions.",
    cantons: ["OW"],
    language: Language.DE,
    examples: {
      createMany: {
        data: [
          { definition: "Es isch hüt Trübeli drauße" },
          { definition: "Im See isch es Trübeli" },
          { definition: "Trübeli überm Berg" },
        ],
      },
    },
  },
  {
    title: "Schuppel",
    definition:
      "A term that might refer to a gentle shake or a light pat, used in various contexts such as expressing affection or getting someone's attention.",
    cantons: ["OW"],
    language: Language.DE,
    examples: {
      createMany: {
        data: [
          { definition: "E chli Schuppel als Liebesbeweis" },
          { definition: "Schuppel uf de Rücke" },
          { definition: "Gib em es Schuppel" },
        ],
      },
    },
  },
]

export const seedExpression = async () => {
  let skippedExpressionssCount = 0
  let createdExpressionsCount = 0
  const anonymourUserId = (
    await prisma.user.findFirst({
      where: { email: anonymourUser.email },
      select: { id: true },
    })
  )?.id

  if (!anonymourUserId)
    throw new Error("Anonymous user not found, please seed users first.")
  for (const { title, definition, cantons, examples } of SEED_EXPRESSIONS) {
    const existingExpression = await prisma.expression.findFirst({
      where: { title, definition, authorId: anonymourUserId },
      select: { id: true },
    })
    if (existingExpression) {
      // eslint-disable-next-line no-console
      console.log(
        `[seed expression] Skipping ${title} as it already exists, id: ${existingExpression.id}.`,
      )
      skippedExpressionssCount++
      continue
    }
    const createdExpression = await prisma.expression.create({
      data: {
        title,
        definition,
        cantons,
        examples,
        author: { connect: { id: anonymourUserId } },
        published: true,
      },
    })
    createdExpressionsCount++
    // eslint-disable-next-line no-console
    console.log(`[seed expressions] ${title} was successfully seeded`, {
      createdExpression: createdExpression,
    })
  }
  // eslint-disable-next-line no-console
  console.log(
    `[seed expressions]: ${skippedExpressionssCount} expressions were skipped and ${createdExpressionsCount} expressions were successfully seeded`,
  )
}
