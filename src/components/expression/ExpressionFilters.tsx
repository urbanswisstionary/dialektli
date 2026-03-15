"use client"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { type FC, useMemo } from "react"

import SelectSingleLocation from "@/components/ui/Autocomplete/SelectSingleLocation"
import { Button } from "@/components/ui/button"
import SelectLanguage from "@/components/ui/Select/SelectLanguage"
import SelectLetter from "@/components/ui/Select/SelectLetter"
import { useRouter, usePathname } from "@/i18n/navigation"
import {
  sanitizeCanton,
  sanitizeFirstChar,
  sanitizeLanguage,
} from "@/utils/sanitizeQueries"
import { setQueryOnPage } from "@/utils/setQueryOnPage"

import Accordion from "../ui/Accordion"
import SearchExpressionsInput from "../ui/SearchExpressionsInput"
import SelectSort from "../ui/Select/SelectSort"

export const useExpressionsFilters = () => {
  const searchParams = useSearchParams()

  const q = searchParams.get("q")
  const canton = searchParams.get("canton")
  const firstChar = searchParams.get("firstChar")
  const language = searchParams.get("language")
  const sortByPopularity = searchParams.get("sortByPopularity") === "true"

  const { sanitizedCanton, sanitizedFirstChar, sanitizedLanguage, sanitizedQ } =
    useMemo(() => {
      const trimmedQ = q?.trim() ?? ""
      return {
        sanitizedCanton: sanitizeCanton(canton ?? undefined),
        sanitizedFirstChar: sanitizeFirstChar(firstChar ?? undefined),
        sanitizedLanguage: sanitizeLanguage(language ?? undefined),
        sanitizedQ: trimmedQ.length ? trimmedQ : undefined,
      }
    }, [q, canton, firstChar, language])

  return {
    q: sanitizedQ,
    canton: sanitizedCanton,
    firstChar: sanitizedFirstChar,
    language: sanitizedLanguage,
    sortByPopularity: sortByPopularity,
  }
}

interface ExpressionFiltersProps {
  loading?: boolean
}

const ExpressionFilters: FC<ExpressionFiltersProps> = ({ loading }) => {
  const t = useTranslations()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { q, canton, firstChar, language, sortByPopularity } =
    useExpressionsFilters()
  const hasActiveFilters = !!(q || canton || language || firstChar)

  return (
    <>
      <SearchExpressionsInput className="flex-1" disabled={loading} />
      <SelectSingleLocation
        mode="canton"
        value={canton}
        onChange={(canton) =>
          setQueryOnPage(router, pathname, searchParams, { canton })
        }
        placeholder={t("filterBy.canton")}
        disabled={loading}
        groupOptions
      />
      <div className="flex flex-col gap-4 sm:flex-row">
        <SelectLanguage
          value={language}
          onChange={(val) =>
            setQueryOnPage(router, pathname, searchParams, {
              language: val ?? null,
            })
          }
          disabled={loading}
        />

        <SelectSort
          value={sortByPopularity ? "popularity" : "random"}
          onChange={(val) =>
            setQueryOnPage(router, pathname, searchParams, {
              sortByPopularity: val === "popularity" ? "true" : null,
            })
          }
          disabled={loading}
        />
      </div>
      {!q ? (
        <Accordion
          content={[
            {
              label: t("filterBy.firstChar"),
              expanded: !!firstChar,
              children: (
                <SelectLetter
                  clasName={"px-1"}
                  value={firstChar}
                  onChange={(value) =>
                    setQueryOnPage(router, pathname, searchParams, {
                      firstChar: value === firstChar ? null : value,
                      q: null,
                    })
                  }
                  disabled={loading}
                />
              ),
            },
          ]}
        />
      ) : null}
      <Button
        onClick={() => router.replace(pathname, { scroll: false })}
        className="self-end text-primary/75 hover:text-primary"
        variant="ghost"
        title={t("actions.clearFilters")}
        disabled={!hasActiveFilters}
      >
        {t("actions.clearFilters")}
      </Button>
    </>
  )
}

export default ExpressionFilters
