import { FC, useMemo } from "react"
import Card from "@/ui/Card"
import ReviewGuidelines from "@/features/expression/reviewGuidelines"
import ExpressionInput from "./expressionInput"
import ExpressionDefinitionInput from "./expressionDefinitionInput"
import { useCreateExpressionMutation } from "@/hooks/useExpressions"
import { useRouter } from "next/router"

import { setQueryOnPage } from "@/utils/setQueryOnPage"

import { ParsedUrlQuery } from "querystring"
import SelectMultipleLocation from "@/ui/Autocomplete/selectMultipleLocations"
import { Trans, useTranslation } from "next-i18next"
// import SelectSingleLanguage from "@/ui/Autocomplete/selectSingleLanguage"
import { sanitizeCantons, sanitizeLanguage } from "@/utils/sanitizeQueries"
import { Language } from "@@/generated/graphql"

type Query = ParsedUrlQuery & {
  expression?: string
  definition?: string
  cantons?: string[] | string
  language?: string
  synonym?: string
}

const CreateExpressionForm: FC = () => {
  const { t } = useTranslation("common")

  const router = useRouter()
  const query = router.query as Query
  const synonym = (router.query as Query).synonym

  const { sanitizedCantons, sanitizedLanguage } = useMemo(
    () => ({
      sanitizedCantons: sanitizeCantons(
        typeof query.cantons === "string" ? [query.cantons] : query.cantons,
      ),
      sanitizedLanguage: sanitizeLanguage(query.language) ?? Language.De,
    }),
    [query.cantons, query.language],
  )
  const {
    createExpression,
    data: createExpressionData,
    loading: createExpressionLoading,
  } = useCreateExpressionMutation()
  const createdExpression = createExpressionData?.createExpression
  const onChange = <K extends keyof Query>(
    queryKey: K,
    value: Query[K] | null,
  ) => {
    setQueryOnPage(router, { [queryKey]: value?.length ? value : null })
  }
  const preventSubmit =
    !query.expression || !query.definition || createExpressionLoading

  const onSubmit = async () => {
    try {
      createExpression(
        {
          title: query.expression!,
          definition: query.definition,
          cantons: sanitizedCantons,
          language: sanitizedLanguage,
          synonymId: synonym,
        },
        (id) => {
          if (id) router.replace(`/expression/${id}/edit`)
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
        title={t("expression.newExpression.title")}
        description={t(
          `expression.newExpression.${synonym ? "newSynonym." : ""}description`,
        )}
        actions={{
          save: { type: "submit", loading: createExpressionLoading },
        }}
      >
        <ReviewGuidelines />

        <ExpressionInput
          value={query.expression ?? ""}
          onChange={(value) => {
            onChange("expression", value)
          }}
          label={t("expression.title")}
          required
          sx={{ pt: 1 }}
          disabled={!!createdExpression}
        />
        {/* <SelectSingleLanguage
          label={t("expression.language")}
          required
          value={sanitizedLanguage}
          onChange={(language) => {
            onChange("language", language)
          }}
          disableClearable
        /> */}
        <SelectMultipleLocation
          label={t("expression.canton")}
          mode="canton"
          helperText={t("expression.cantonFieldHelperText")}
          value={sanitizedCantons}
          onChange={(cantons) => {
            onChange("cantons", cantons)
          }}
          groupOptions
        />
        <ExpressionDefinitionInput
          value={query.definition ?? ""}
          onChange={(value) => {
            onChange("definition", value)
          }}
          label={t("expression.description")}
          helperText={
            <Trans
              i18nKey="expression.descriptionFieldHelperText"
              components={{ bold: <b /> }}
            />
          }
          required
          sx={{ pt: 1 }}
          disabled={!!createdExpression}
        />
      </Card>
    </form>
  )
}

export default CreateExpressionForm
