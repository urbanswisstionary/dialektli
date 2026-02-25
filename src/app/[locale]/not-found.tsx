import { MapPin, Home, Map } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"

export default async function NotFound() {
  const t = await getTranslations("404Page")

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <div className="relative mb-6">
          <span className="text-[8rem] font-bold leading-none tracking-tighter text-primary/10">
            {t("title")}
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <MapPin className="h-10 w-10 text-primary" />
            </div>
          </div>
        </div>

        <h1 className="text-balance text-2xl font-bold text-foreground">
          {t("subtitle")}
        </h1>
        <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground">
          {t("description")}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              {t("toHome")}
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/sprachatlas">
              <Map className="mr-2 h-4 w-4" />
              {t("toAtlas")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
