import { FC, useMemo, useState } from "react"
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
import {
  sanitizeCantons,
  sanitizeLanguage,
  sanitizeExample,
} from "@/utils/sanitizeQueries"
import { Language } from "@@/generated/graphql"
import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import FormHelperText from "@mui/joy/FormHelperText"
import { exampleMaxLength } from "./expressionExampleInput"
import DebouncedTextarea from "@/ui/debouncedTextarea"

type Query = ParsedUrlQuery & {
  expression?: string
  definition?: string
  cantons?: string[] | string
  language?: string
  synonym?: string
  example?: string
}

type CreateExpressionState = {
  expression: string
  definition: string
  cantons?: string[]
  language?: Language
  example: string
  synonymId?: string
}
const CreateExpressionForm: FC = () => {
  const { t } = useTranslation("common")
  const router = useRouter()
  const query = router.query as Query
  const synonymId = (router.query as Query).synonym

  const { sanitizedCantons, sanitizedLanguage, sanitizedExample } = useMemo(
    () => ({
      sanitizedCantons: sanitizeCantons(
        typeof query.cantons === "string" ? [query.cantons] : query.cantons,
      ),
      sanitizedLanguage: sanitizeLanguage(query.language) ?? Language.De,
      sanitizedExample: sanitizeExample(query.example),
    }),
    [query.cantons, query.example, query.language],
  )

  const [createExpressionState, setCreateExpressionState] =
    useState<CreateExpressionState>(() => ({
      expression: query.expression ?? "",
      definition: query.definition ?? "",
      cantons: sanitizedCantons,
      language: sanitizedLanguage,
      example: sanitizedExample,
      synonymId: synonymId,
    }))

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
    setCreateExpressionState((prev) => ({
      ...prev,
      [queryKey]: value,
    }))
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
          synonymId,
          example: sanitizedExample,
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
          `expression.newExpression.${synonymId ? "newSynonym." : ""}description`,
        )}
        actions={{
          save: { type: "submit", loading: createExpressionLoading },
        }}
      >
        <ReviewGuidelines />

        <ExpressionInput
          value={createExpressionState.expression}
          onChange={(expression) => onChange("expression", expression)}
          label={t("expression.title")}
          required
          sx={{ pt: 1 }}
          disabled={!!createdExpression}
        />
        {/* <SelectSingleLanguage
          label={t("expression.language")}
          required
          value={createExpressionState.language}
          onChange={(language) => {
            onChange("language", language)
          }}
          disableClearable
        /> */}
        <SelectMultipleLocation
          label={t("expression.canton")}
          mode="canton"
          helperText={t("expression.cantonFieldHelperText")}
          value={createExpressionState.cantons}
          onChange={(cantons) => onChange("cantons", cantons)}
          groupOptions
        />
        <ExpressionDefinitionInput
          value={createExpressionState.definition}
          onChange={(definition) => onChange("definition", definition)}
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
        <FormControl sx={{ pt: 1 }}>
          <FormLabel sx={{ display: "block" }}>
            {t("expression.examples")}:
          </FormLabel>
          <DebouncedTextarea
            value={createExpressionState.example}
            onChange={(example) => onChange("example", example ?? "")}
            debounce={250}
            minRows={6}
            maxRows={6}
            slotProps={{ textarea: { maxLength: exampleMaxLength } }}
          />
          <FormHelperText>
            {t("expression.examplesFieldHelperText")}
          </FormHelperText>
        </FormControl>
      </Card>
    </form>
  )
}

export default CreateExpressionForm
