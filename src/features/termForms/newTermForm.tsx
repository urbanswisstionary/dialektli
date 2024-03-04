import { FC, useMemo } from "react"
import Card from "@/ui/Card"
import ReviewGuidelines from "@/features/termForms/components/reviewGuidelines"
import WordInput from "./components/wordInput"
import WordContentInput from "./components/wordContentInput"
import WordExamplesInput from "./components/wordExamplesInput"
import { useCreateTermMutation } from "@/hooks/useTerms"
import { useRouter } from "next/router"

import { setQueryOnPage } from "@/utils/setQueryOnPage"

import { ParsedUrlQuery } from "querystring"
import SelectMultipleLocation from "@/ui/Autocomplete/selectMultipleLocations"
import { Trans, useTranslation } from "next-i18next"
import SelectSingleLanguage from "@/ui/Autocomplete/selectSingleLanguage"
import {
  sanitizeCantons,
  sanitizeExamples,
  sanitizeLanguage,
} from "@/utils/sanitizeQueries"

type Query = ParsedUrlQuery & {
  title?: string
  content?: string
  examples?: string[]
  cantons?: string[] | string
  language?: string
}

const NewTermForm: FC = () => {
  const { t } = useTranslation("common")

  const router = useRouter()
  const query = router.query as Query

  const { sanitizedCantons, sanitizedExamples, sanitizedLanguage } = useMemo(
    () => ({
      sanitizedCantons: sanitizeCantons(
        typeof query.cantons === "string" ? [query.cantons] : query.cantons,
      ),
      sanitizedExamples: sanitizeExamples(
        typeof query.examples === "string" ? [query.examples] : query.examples,
      ),
      sanitizedLanguage: sanitizeLanguage(query.language),
    }),
    [query.cantons, query.examples, query.language],
  )
  const {
    createTerm,
    data: createTermData,
    loading: createTermLoading,
  } = useCreateTermMutation()
  const createdTerm = createTermData?.createTerm
  const onChange = <K extends keyof Query>(
    queryKey: K,
    value: Query[K] | null,
  ) => {
    setQueryOnPage(router, { [queryKey]: value?.length ? value : null })
  }
  const preventSubmit = !query.title || !query.content || createTermLoading

  const onSubmit = async () => {
    try {
      createTerm(
        {
          title: query.title!,
          content: query.content,
          examples: sanitizedExamples,
          cantons: sanitizedCantons,
          language: sanitizedLanguage,
        },
        (termId) => {
          if (termId) router.replace(`/term/${termId}/edit?review`)
        },
      )
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("error", error)
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (preventSubmit) return
        onSubmit()
      }}
    >
      <Card
        title={t("term.newTerm.title")}
        description={t("term.newTerm.description")}
        actions={{
          save: { type: "submit", loading: createTermLoading },
        }}
      >
        <ReviewGuidelines />

        <WordInput
          value={query.title ?? ""}
          onChange={(value) => {
            onChange("title", value)
          }}
          label={t("term.title")}
          required
          sx={{ pt: 1 }}
          disabled={!!createdTerm}
        />
        <SelectSingleLanguage
          label={t("term.language")}
          required
          value={sanitizedLanguage}
          onChange={(language) => {
            onChange("language", language)
          }}
        />
        <SelectMultipleLocation
          label={t("term.canton")}
          mode="canton"
          helperText={t("term.cantonFieldHelperText")}
          value={sanitizedCantons}
          onChange={(cantons) => {
            onChange("cantons", cantons)
          }}
          groupOptions
        />
        <WordContentInput
          value={query.content ?? ""}
          onChange={(value) => {
            onChange("content", value)
          }}
          label={t("term.description")}
          helperText={
            <Trans
              i18nKey="term.descriptionFieldHelperText"
              components={{ bold: <b /> }}
            />
          }
          required
          sx={{ pt: 1 }}
          disabled={!!createdTerm}
        />

        <WordExamplesInput
          label={t("term.examples")}
          helperText={t("term.examplesFieldHelperText")}
          values={sanitizedExamples}
          onChange={(examples) => {
            onChange("examples", examples)
          }}
          disabled={!!createdTerm}
        />
      </Card>
    </form>
  )
}

export default NewTermForm
