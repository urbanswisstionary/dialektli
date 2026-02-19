"use client"

import { useMemo, useState } from "react"
import { graphql } from "@/generated"
import { Language } from "@/generated/graphql"
import { useQuery } from "@apollo/client/react"
import { CantonMap } from "@/components/map/CantonMap"
import { getCantonName } from "@/config/cantons"
import { Link } from "@/i18n/navigation"
import { useTranslations, useLocale } from "next-intl"
import { Loader2, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import CantonBadge from "@/components/ui/CantonBadge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CantonOverviewQuery = graphql(/* GraphQL */ `
  query CantonOverview($language: Language) {
    cantonOverview(language: $language) {
      canton
      count
    }
  }
`)

const ExpressionsByCantonQuery = graphql(/* GraphQL */ `
  query ExpressionsByCanton(
    $canton: String!
    $language: Language
    $limit: Int
  ) {
    expressionsByCanton(canton: $canton, language: $language, limit: $limit) {
      id
      title
      language
    }
  }
`)

export default function SprachatlasPage() {
  const t = useTranslations()
  const ts = useTranslations("sprachatlas")
  const locale = useLocale()

  const [selectedCanton, setSelectedCanton] = useState<string | null>(null)
  const [language, setLanguage] = useState<Language | "all">("all")

  const { data: overviewData, loading: loadingOverview } = useQuery(
    CantonOverviewQuery,
    {
      variables: {
        language: language === "all" ? null : language,
      },
    },
  )

  const { data: expressionsData, loading: loadingExpressions } = useQuery(
    ExpressionsByCantonQuery,
    {
      variables: {
        canton: selectedCanton ?? "",
        language: language === "all" ? null : language,
        limit: 20,
      },
      skip: !selectedCanton,
    },
  )

  const cantonOverview = useMemo(
    () => overviewData?.cantonOverview ?? [],
    [overviewData?.cantonOverview],
  )
  const highlightedCantons = cantonOverview.map((c) => c.canton)
  const expressions = expressionsData?.expressionsByCanton ?? []

  const counts = useMemo(() => {
    const map: Record<string, number> = {}
    for (const c of cantonOverview) {
      map[c.canton] = c.count
    }
    return map
  }, [cantonOverview])

  const selectedCantonData = selectedCanton
    ? cantonOverview.find((c) => c.canton === selectedCanton)
    : null

  const sortedCantons = useMemo(() => {
    return [...cantonOverview]
      .filter((c) => c.count > 0)
      .sort((a, b) => b.count - a.count)
  }, [cantonOverview])

  const handleCantonClick = (cantonId: string) => {
    setSelectedCanton((prev) => (prev === cantonId ? null : cantonId))
  }

  const validLocales: readonly string[] = ["de", "fr", "it", "en"]
  const mapLocale = validLocales.includes(locale)
    ? (locale as "de" | "fr" | "it" | "en")
    : "de"

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground text-balance">
          {t("layout.sidebar.sprachatlas")}
        </h1>
        <p className="mt-1 text-muted-foreground">{ts("subtitle")}</p>
      </div>

      <div className="mb-4 max-w-50">
        <Select
          value={language}
          onValueChange={(value) => {
            setLanguage(value as Language | "all")
            setSelectedCanton(null)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("filterBy.language")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{ts("allLanguages")}</SelectItem>
            <SelectItem value="DE">{t("selectLanguage.DE")}</SelectItem>
            <SelectItem value="FR">{t("selectLanguage.FR")}</SelectItem>
            <SelectItem value="IT">{t("selectLanguage.IT")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loadingOverview ? (
        <div className="my-10 flex items-center justify-center">
          <Loader2 className="h-15 w-15 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border bg-card p-3 sm:p-5">
          <CantonMap
            highlightedCantons={highlightedCantons}
            selectedCanton={selectedCanton}
            onCantonClick={handleCantonClick}
            counts={counts}
          />
          <p className="mt-2 text-right text-[0.7rem] text-muted-foreground/60">
            {ts("inspiredBy")}{" "}
            <a
              href="https://www.kleinersprachatlas.ch/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-muted-foreground"
            >
              Kleiner Sprachatlas
            </a>
          </p>
        </div>
      )}

      {selectedCanton && (
        <div className="mt-6">
          <div className="flex flex-row flex-wrap items-center gap-3">
            <h2 className="text-xl font-semibold text-foreground">
              {getCantonName(selectedCanton, mapLocale)}
            </h2>
            {selectedCantonData && (
              <Badge variant="outline" className="text-xs">
                {selectedCantonData.count}{" "}
                {selectedCantonData.count === 1
                  ? ts("expressionSingular")
                  : ts("expressionPlural")}
              </Badge>
            )}
            <button
              onClick={() => setSelectedCanton(null)}
              className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
            >
              {ts("clear")}
              <X className="h-3 w-3" />
            </button>
          </div>

          {loadingExpressions ? (
            <div className="my-6 flex items-center justify-center">
              <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
            </div>
          ) : expressions.length > 0 ? (
            <ul className="mt-3 divide-y divide-border overflow-hidden rounded-lg border border-border">
              {expressions.map((expr) => (
                <li key={expr.id}>
                  <Link
                    href={`/expressions/${expr.id}` as "/expressions/[id]"}
                    className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium text-foreground">
                        {expr.title}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-[10px]">
                      {expr.language}
                    </Badge>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              {ts("noExpressionsFound")}
            </p>
          )}
        </div>
      )}

      {!selectedCanton && sortedCantons.length > 0 && (
        <div className="mt-8">
          <p className="text-sm font-medium text-muted-foreground">
            {ts("cantonsWithExpressions", { count: sortedCantons.length })}
          </p>
          <div className="mt-3 flex flex-row flex-wrap gap-2">
            {sortedCantons.map((c) => (
              <CantonBadge
                key={c.canton}
                code={c.canton}
                name={`${getCantonName(c.canton, mapLocale)} (${c.count})`}
                className="cursor-pointer"
                onClick={() => handleCantonClick(c.canton)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
