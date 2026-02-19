/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

const pool = new pg.Pool({
  connectionString: process.env.POSTGRES_URL,
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("🌱 Seeding database...")

  // Create test users
  const user1 = await prisma.user.upsert({
    where: { email: "test@urbanswisstionary.ch" },
    update: {},
    create: {
      email: "test@urbanswisstionary.ch",
      name: "Test User",
      emailVerified: new Date(),
      role: "USER",
      country: "CH",
      canton: "ZH",
      bio: "Test user for development",
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: "admin@urbanswisstionary.ch" },
    update: {},
    create: {
      email: "admin@urbanswisstionary.ch",
      name: "Admin User",
      emailVerified: new Date(),
      role: "ADMIN",
      country: "CH",
      canton: "BE",
      bio: "Admin user for development",
    },
  })

  console.log(`✅ Created users: ${user1.name}, ${user2.name}`)

  // Create Swiss German expressions
  const expressions = [
    {
      title: "Grüezi",
      definition:
        "Schweizerdeutsche Begrüßung, entspricht dem hochdeutschen 'Guten Tag'",
      cantons: ["ZH", "AG", "SH", "TG"],
      language: "DE" as const,
      authorId: user1.id,
      published: true,
      type: "INTERJECTION" as const,
    },
    {
      title: "Chuchichäschtli",
      definition:
        "Kleiner Küchenschrank, oft als schwierig auszusprechendes Wort für Nicht-Schweizer bekannt",
      cantons: ["ZH", "AG"],
      language: "DE" as const,
      authorId: user1.id,
      published: true,
      gender: "N" as const,
      type: "NOUN" as const,
    },
    {
      title: "Znüni",
      definition: "Zwischenmahlzeit am Vormittag, typischerweise um neun Uhr",
      cantons: ["ZH", "BE", "LU", "AG"],
      language: "DE" as const,
      authorId: user2.id,
      published: true,
      gender: "M" as const,
      type: "NOUN" as const,
    },
    {
      title: "Zvieri",
      definition: "Zwischenmahlzeit am Nachmittag, typischerweise um vier Uhr",
      cantons: ["ZH", "BE", "LU", "AG"],
      language: "DE" as const,
      authorId: user2.id,
      published: true,
      gender: "M" as const,
      type: "NOUN" as const,
    },
    {
      title: "Rösti",
      definition:
        "Schweizer Kartoffelgericht, gilt als Nationalgericht der Deutschschweiz",
      cantons: ["BE", "ZH", "LU"],
      language: "DE" as const,
      authorId: user1.id,
      published: true,
      gender: "M" as const,
      type: "NOUN" as const,
    },
    {
      title: "Nüt",
      definition: "Nichts",
      cantons: ["ZH", "AG", "SH"],
      language: "DE" as const,
      authorId: user1.id,
      published: true,
      type: "PRONOUN" as const,
    },
    {
      title: "Luege",
      definition: "Schauen, gucken",
      cantons: ["ZH", "AG", "SH", "TG"],
      language: "DE" as const,
      authorId: user2.id,
      published: true,
      type: "VERB" as const,
    },
    {
      title: "Gömmer",
      definition:
        "Gehen wir - Aufforderung oder Vorschlag, irgendwohin zu gehen",
      cantons: ["ZH", "AG"],
      language: "DE" as const,
      authorId: user1.id,
      published: true,
      type: "VERB" as const,
    },
    {
      title: "Meitli",
      definition: "Mädchen",
      cantons: ["BE", "LU", "ZH"],
      language: "DE" as const,
      authorId: user2.id,
      published: true,
      gender: "N" as const,
      type: "NOUN" as const,
    },
    {
      title: "Bueb",
      definition: "Junge, Bub",
      cantons: ["BE", "LU", "ZH"],
      language: "DE" as const,
      authorId: user1.id,
      published: true,
      gender: "M" as const,
      type: "NOUN" as const,
    },
  ]

  const createdExpressions = []
  for (const expr of expressions) {
    const created = await prisma.expression.create({
      data: expr,
    })
    createdExpressions.push(created)
    console.log(`✅ Created expression: ${created.title}`)
  }

  // Add examples to some expressions
  await prisma.expressionExample.create({
    data: {
      expressionId: createdExpressions[0].id, // Grüezi
      definition: "Grüezi mitenand! Wie gaht's öich?",
      cantons: ["ZH"],
      authorId: user1.id,
    },
  })

  await prisma.expressionExample.create({
    data: {
      expressionId: createdExpressions[2].id, // Znüni
      definition: "Ich ha no chli Znüni im Rucksack.",
      cantons: ["ZH"],
      authorId: user1.id,
    },
  })

  await prisma.expressionExample.create({
    data: {
      expressionId: createdExpressions[4].id, // Rösti
      definition: "Morn git's Rösti mit Spiegelei.",
      cantons: ["BE"],
      authorId: user2.id,
    },
  })

  console.log("✅ Created examples")

  // Create some synonyms
  await prisma.synonym.create({
    data: {
      synonymOfId: createdExpressions[2].id, // Znüni
      synonymId: createdExpressions[3].id, // Zvieri (they're both snack times)
    },
  })

  console.log("✅ Created synonyms")

  // Add some likes
  await prisma.like.createMany({
    data: [
      { expressionId: createdExpressions[0].id, authorId: user2.id },
      { expressionId: createdExpressions[1].id, authorId: user2.id },
      { expressionId: createdExpressions[2].id, authorId: user1.id },
      { expressionId: createdExpressions[4].id, authorId: user1.id },
      { expressionId: createdExpressions[4].id, authorId: user2.id },
    ],
  })

  console.log("✅ Created likes")

  console.log("\n🎉 Seeding completed successfully!")
  console.log("\n📊 Summary:")
  console.log(`   - Users: 2`)
  console.log(`   - Expressions: ${expressions.length}`)
  console.log(`   - Examples: 3`)
  console.log(`   - Synonyms: 1`)
  console.log(`   - Likes: 5`)
  console.log("\n🌐 Test users:")
  console.log(`   - test@urbanswisstionary.ch (USER)`)
  console.log(`   - admin@urbanswisstionary.ch (ADMIN)`)
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
