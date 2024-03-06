/* eslint-disable no-console */
import dayjs from "dayjs"
import fs from "fs"
import { globby } from "globby"
const func = async () => {
  console.log("Generating sitemap...")

  const pages = await globby([
    // List of pages
    "*/pages/**/*.tsx",
    "!*/pages/account/*.tsx",
    "!*/pages/expression/[id]/edit.tsx",
    "!*/pages/_*.tsx",
    "!*/pages/api", // Exclude API routes
    "!*/pages/404.tsx", // Exclude custom 404 page
  ])

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((page) => {
    const path = page.replace("src/pages", "").replace(".tsx", "")

    const route = path === "/index" ? "" : path

    return `    <url>
        <loc>${`https://dialektli.ch${route}`}</loc>
        <lastmod>${dayjs().format("YYYY-MM-DD")}</lastmod>
    </url>`
  })
  .join("\n")}
</urlset>
`

  fs.writeFileSync("public/sitemap.xml", sitemap)
  console.log("Sitemap generated!")
}

func()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e.message)
    process.exit(-1)
  })
