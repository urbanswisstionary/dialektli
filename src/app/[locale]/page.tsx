"use client"

import { useMe } from "@/hooks/useUsers"
import SearchExpressionsInput from "@/components/ui/SearchExpressionsInput"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import { useExpressionsQuery } from "@/hooks/useExpressions"
import SelectSingleLocation from "@/components/ui/Autocomplete/SelectSingleLocation"
import { useRouter, usePathname } from "@/i18n/navigation"
import { useSearchParams } from "next/navigation"
import { setQueryOnPage } from "@/utils/setQueryOnPage"
import { usePaginationState } from "@/hooks/usePaginationState"
import NewExpressionButton from "@/components/ui/NewExpressionButton"
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
  const me = useMe().me

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
    <Stack sx={{ mt: 10, mb: 3, gap: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", sm: "row" },
          gap: 2,
        }}
      >
        <SearchExpressionsInput
          sx={{ flex: 1 }}
          disabled={loadingExpressionsQuery}
        />
        <NewExpressionButton
          sx={{ flex: 1 }}
          disabled={loadingExpressionsQuery}
        />
      </Box>
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
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <FormControl fullWidth>
          <InputLabel>{t("filterBy.language")}</InputLabel>
          <Select
            value={language ?? ""}
            onChange={(e) =>
              setQueryOnPage(router, pathname, searchParams, {
                language: e.target.value || null,
              })
            }
            label={t("filterBy.language")}
            disabled={loadingExpressionsQuery}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="DE">{t("selectLanguage.DE")}</MenuItem>
            <MenuItem value="FR">{t("selectLanguage.FR")}</MenuItem>
            <MenuItem value="IT">{t("selectLanguage.IT")}</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Sort</InputLabel>
          <Select
            value={sortByPopularity ? "popularity" : "random"}
            onChange={(e) =>
              setQueryOnPage(router, pathname, searchParams, {
                sortByPopularity:
                  e.target.value === "popularity" ? "true" : null,
              })
            }
            label="Sort"
            disabled={loadingExpressionsQuery}
          >
            <MenuItem value="random">Random</MenuItem>
            <MenuItem value="popularity">Most Popular</MenuItem>
          </Select>
        </FormControl>
      </Box>
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
    </Stack>
  )
}
