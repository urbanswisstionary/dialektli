"use client"

import SearchExpressionsInput from "@/components/ui/SearchExpressionsInput"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useExpressionsQuery } from "@/hooks/useExpressions"
import SelectSingleLocation from "@/components/ui/Autocomplete/SelectSingleLocation"
import { useRouter, usePathname } from "@/i18n/navigation"
import { useSearchParams } from "next/navigation"
import { setQueryOnPage } from "@/utils/setQueryOnPage"
import { usePaginationState } from "@/hooks/usePaginationState"
import { useTranslations } from "next-intl"
import { useMemo } from "react"
import { sanitizeCanton, sanitizeFirstChar } from "@/utils/sanitizeQueries"
import { Language } from "@/generated/graphql"
import dynamic from "next/dynamic"

const SelectLetter = dynamic(
  () => import("@/components/ui/Select/SelectLetter"),
  {
    ssr: false,
    loading: () => null,
  },
)
const Accordion = dynamic(() => import("@/components/ui/Accordion"), {
  ssr: false,
  loading: () => null,
})
const ExpressionCardsList = dynamic(
  () => import("@/components/expression/ExpressionCardsList"),
  {
    ssr: false,
    loading: () => null,
  },
)

export default function HomePage() {
  const t = useTranslations()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const q = searchParams.get("q")
  const canton = searchParams.get("canton")
  const firstChar = searchParams.get("firstChar")
  const author = searchParams.get("author")
  const language = searchParams.get("language")
  const sortByPopularity = searchParams.get("sortByPopularity") === "true"

  const { sanitizedQ, sanitizedCanton, sanitizedFirstChar, sanitizedAuthor } =
    useMemo(() => {
      const trimmedQ = q?.trim() ?? ""
      const trimmedAuthor = author?.trim() ?? ""
      return {
        sanitizedCanton: sanitizeCanton(canton ?? undefined),
        sanitizedFirstChar: sanitizeFirstChar(firstChar ?? undefined),
        sanitizedQ: trimmedQ.length ? trimmedQ : undefined,
        sanitizedAuthor: trimmedAuthor.length ? trimmedAuthor : undefined,
      }
    }, [q, canton, firstChar, author])

  const { onDataCountChange, ...paginationProps } = usePaginationState()

  const {
    data,
    previousData,
    loading: loadingExpressionsQuery,
  } = useExpressionsQuery({
    offset: (paginationProps.pageIndex - 1) * paginationProps.pageSize,
    limit: paginationProps.pageSize,
    q: sanitizedQ,
    canton: sanitizedCanton,
    firstChar: sanitizedFirstChar,
    authorName: sanitizedAuthor,
    language: (language as Language) ?? undefined,
    sortByPopularity,
  })

  const expressionsQuery =
    data?.expressionsQuery ?? previousData?.expressionsQuery
  onDataCountChange(expressionsQuery?.count)

  return (
    <div className="mt-4 mb-6 flex flex-col gap-6">
      <SearchExpressionsInput
        className="flex-1"
        disabled={loadingExpressionsQuery}
      />
      <SelectSingleLocation
        mode="canton"
        value={sanitizedCanton}
        onChange={(canton) =>
          setQueryOnPage(router, pathname, searchParams, { canton })
        }
        placeholder={t("filterBy.canton")}
        disabled={loadingExpressionsQuery}
        groupOptions
      />
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="w-full">
          <Select
            value={language ?? "all"}
            onValueChange={(val) =>
              setQueryOnPage(router, pathname, searchParams, {
                language: val === "all" ? null : val,
              })
            }
            disabled={loadingExpressionsQuery}
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
        <div className="w-full">
          <Select
            value={sortByPopularity ? "popularity" : "random"}
            onValueChange={(val) =>
              setQueryOnPage(router, pathname, searchParams, {
                sortByPopularity: val === "popularity" ? "true" : null,
              })
            }
            disabled={loadingExpressionsQuery}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="random">Random</SelectItem>
              <SelectItem value="popularity">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {!sanitizedQ ? (
        <Accordion
          content={[
            {
              label: t("filterBy.firstChar"),
              expanded: !!sanitizedFirstChar,
              children: (
                <SelectLetter
                  value={sanitizedFirstChar}
                  onChange={(firstChar) =>
                    setQueryOnPage(router, pathname, searchParams, {
                      firstChar:
                        sanitizedFirstChar === firstChar ? null : firstChar,
                      q: null,
                    })
                  }
                  disabled={loadingExpressionsQuery}
                />
              ),
            },
          ]}
        />
      ) : null}
      <ExpressionCardsList
        expressions={expressionsQuery?.expressions}
        paginationProps={paginationProps}
        loading={loadingExpressionsQuery}
      />
    </div>
  )
}
