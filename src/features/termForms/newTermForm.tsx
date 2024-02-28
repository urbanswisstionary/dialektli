import { FC, useCallback } from "react"
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
import { useReCaptcha } from "next-recaptcha-v3"
import { getOptions } from "@/ui/Autocomplete/helper"

type Query = ParsedUrlQuery & {
  title?: string
  content?: string
  examples?: string[]
  cantons?: string[] | string
  language?: string
}
const sanitizeCantons = (cantons: string[] = []): string[] => {
  const cantonsList = getOptions("canton").map((canton) => canton.code)
  return cantons.filter((canton) => cantonsList.includes(canton))
}

const sanitizeExamples = (examples: string[] = [""]): string[] =>
  examples.slice(0, 3)

const NewTermForm: FC<{ authorId?: string }> = ({ authorId }) => {
  const { t } = useTranslation("common")
  const { executeRecaptcha } = useReCaptcha()

  const router = useRouter()
  const query = router.query as Query

  const {
    createTerm,
    data: createTermData,
    loading: createTermLoading,
  } = useCreateTermMutation()

  const onChange = <K extends keyof Query>(
    queryKey: K,
    value: Query[K] | null,
  ) => {
    setQueryOnPage(router, { [queryKey]: value?.length ? value : null })
  }
  const preventSubmit = !query.title || !query.content || createTermLoading
  const onSubmit = useCallback(async () => {
    try {
      const recaptchaToken = await executeRecaptcha("new_term")
      const recaptchaRes = await fetch("/api/recaptcha", {
        method: "POST",
        body: recaptchaToken,
      })

      if (recaptchaRes.ok) {
        createTerm(
          {
            title: query.title!,
            content: query.content,
            examples: sanitizeExamples(query.examples),
            cantons: sanitizeCantons(
              typeof query.cantons === "string"
                ? [query.cantons]
                : query.cantons,
            ),
            authorId,
          },
          (termId) => {
            if (termId) router.replace(`/term/${termId}/edit?review`)
          },
        )
      } else {
        const text = await recaptchaRes.text()
        // eslint-disable-next-line no-console
        console.error("Recaptcha failed", text)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("error", error)
    }
  }, [authorId, createTerm, executeRecaptcha, query, router])

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
        // description="All the definitions were written by people just like you. Now's your chance to add your own!"
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
          disabled={!!createTermData?.createTerm?.id}
        />

        <SelectMultipleLocation
          label={t("term.canton")}
          mode="canton"
          helperText={t("term.cantonFieldHelperText")}
          value={sanitizeCantons(
            typeof query.cantons === "string" ? [query.cantons] : query.cantons,
          )}
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
          disabled={!!createTermData?.createTerm?.id}
        />

        <WordExamplesInput
          label={t("term.examples")}
          helperText={t("term.examplesFieldHelperText")}
          values={sanitizeExamples(
            typeof query.examples === "string"
              ? [query.examples]
              : query.examples,
          )}
          onChange={(examples) => {
            onChange("examples", examples)
          }}
          disabled={!!createTermData?.createTerm?.id}
        />
      </Card>
    </form>
  )
}

export default NewTermForm
