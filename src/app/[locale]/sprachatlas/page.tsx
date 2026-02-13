"use client"

import { useState } from "react"
import { graphql } from "@/generated"
import { Language } from "@/generated/graphql"
import { useQuery } from "@apollo/client/react"
import { SwitzerlandMap } from "@/components/maps/SwitzerlandMap"
import { getCantonName } from "@/config/cantons"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { useLocale } from "next-intl"
import { Loader2, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
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

  const cantonOverview = overviewData?.cantonOverview ?? []
  const highlightedCantons = cantonOverview.map((c) => c.canton)
  const expressions = expressionsData?.expressionsByCanton ?? []

  const selectedCantonData = selectedCanton
    ? cantonOverview.find((c) => c.canton === selectedCanton)
    : null

  const handleCantonClick = (cantonId: string) => {
    setSelectedCanton((prev) => (prev === cantonId ? null : cantonId))
  }

  const validLocales: readonly string[] = ["de", "fr", "it", "en"]
  const mapLocale = validLocales.includes(locale)
    ? (locale as "de" | "fr" | "it" | "en")
    : "de"

  return (
    <div className="mt-4 mb-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">{t("layout.sidebar.sprachatlas")}</h1>

      <div className="max-w-[200px]">
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
            <SelectItem value="all">All</SelectItem>
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
        <div className="rounded-md border border-border p-4">
          <SwitzerlandMap
            highlightedCantons={highlightedCantons}
            onCantonClick={handleCantonClick}
            showLabels
            showAttribution
            height={500}
            width="100%"
            locale={mapLocale}
          />
        </div>
      )}

      {selectedCanton && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-4">
            <h2 className="text-xl font-semibold">
              {getCantonName(selectedCanton, mapLocale)}
            </h2>
            {selectedCantonData && (
              <Badge variant="outline">
                {`${selectedCantonData.count} expression${selectedCantonData.count !== 1 ? "s" : ""}`}
              </Badge>
            )}
            <Badge
              variant="secondary"
              className="cursor-pointer gap-1"
              onClick={() => setSelectedCanton(null)}
            >
              Clear
              <X className="h-3 w-3" />
            </Badge>
          </div>

          {loadingExpressions ? (
            <div className="my-6 flex items-center justify-center">
              <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
            </div>
          ) : expressions.length > 0 ? (
            <ul className="divide-y divide-border">
              {expressions.map((expr) => (
                <li key={expr.id}>
                  <Link
                    href={`/expressions/${expr.id}` as "/expressions/[id]"}
                    className="flex flex-col gap-0.5 px-3 py-2.5 transition-colors hover:bg-muted/50"
                  >
                    <span className="text-sm font-medium">{expr.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {expr.language}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              No expressions found for this canton.
            </p>
          )}
        </div>
      )}

      {!selectedCanton && cantonOverview.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-muted-foreground">
            {cantonOverview.length} cantons with expressions
          </p>
          <div className="flex flex-row flex-wrap gap-2">
            {cantonOverview.map((c) => (
              <Badge
                key={c.canton}
                variant="outline"
                className="cursor-pointer transition-colors hover:bg-muted"
                onClick={() => handleCantonClick(c.canton)}
              >
                {`${getCantonName(c.canton, mapLocale)} (${c.count})`}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
