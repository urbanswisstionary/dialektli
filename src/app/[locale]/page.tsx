"use client"

import { useTranslations } from "next-intl"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

import { useExpressionsQuery } from "@/hooks/useExpressions"
import { usePaginationState } from "@/hooks/usePaginationState"
import { useRouter, usePathname } from "@/i18n/navigation"
import {
  sanitizeCanton,
  sanitizeFirstChar,
  sanitizeLanguage,
} from "@/utils/sanitizeQueries"
import { setQueryOnPage } from "@/utils/setQueryOnPage"

const SearchExpressionsInput = dynamic(
  () => import("@/components/ui/SearchExpressionsInput"),
  {
    ssr: false,
    loading: () => null,
  },
)
const SelectSingleLocation = dynamic(
  () => import("@/components/ui/Autocomplete/SelectSingleLocation"),
  {
    ssr: false,
    loading: () => null,
  },
)
const SelectLanguage = dynamic(
  () => import("@/components/ui/Select/SelectLanguage"),
  {
    ssr: false,
    loading: () => null,
  },
)
const SelectSort = dynamic(() => import("@/components/ui/Select/SelectSort"), {
  ssr: false,
  loading: () => null,
})
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

  const {
    sanitizedAuthor,
    sanitizedCanton,
    sanitizedFirstChar,
    sanitizedLanguage,
    sanitizedQ,
  } = useMemo(() => {
    const trimmedQ = q?.trim() ?? ""
    const trimmedAuthor = author?.trim() ?? ""
    return {
      sanitizedAuthor: trimmedAuthor.length ? trimmedAuthor : undefined,
      sanitizedCanton: sanitizeCanton(canton ?? undefined),
      sanitizedFirstChar: sanitizeFirstChar(firstChar ?? undefined),
      sanitizedLanguage: sanitizeLanguage(language ?? undefined),
      sanitizedQ: trimmedQ.length ? trimmedQ : undefined,
    }
  }, [q, author, canton, firstChar, language])

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
    language: sanitizedLanguage,
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
        <SelectLanguage
          value={sanitizedLanguage}
          onChange={(val) =>
            setQueryOnPage(router, pathname, searchParams, {
              language: val ?? null,
            })
          }
          disabled={loadingExpressionsQuery}
        />

        <SelectSort
          value={sortByPopularity ? "popularity" : "random"}
          onChange={(val) =>
            setQueryOnPage(router, pathname, searchParams, {
              sortByPopularity: val === "popularity" ? "true" : null,
            })
          }
          disabled={loadingExpressionsQuery}
        />
      </div>
      {!sanitizedQ ? (
        <Accordion
          content={[
            {
              label: t("filterBy.firstChar"),
              expanded: !!sanitizedFirstChar,
              children: (
                <SelectLetter
                  clasName={"px-1"}
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
