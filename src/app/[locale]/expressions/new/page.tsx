"use client"

import { useState, useEffect } from "react"
import { useRouter } from "@/i18n/navigation"
import { useMe } from "@/hooks/useUsers"
import { useCreateExpressionMutation } from "@/hooks/useExpressions"
import { Language, ExpressionGender, ExpressionType } from "@/generated/graphql"
import Stack from "@mui/material/Stack"
import CircularProgress from "@mui/material/CircularProgress"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import FormHelperText from "@mui/material/FormHelperText"
import Alert from "@mui/material/Alert"
import { useTranslations } from "next-intl"
import ExpressionInput from "@/components/expression/ExpressionInput"
import ExpressionDefinitionInput from "@/components/expression/ExpressionDefinitionInput"
import SelectMultipleLocation from "@/components/ui/Autocomplete/SelectMultipleLocation"
import ExpressionGenderInput from "@/components/expression/ExpressionGenderInput"
import ExpressionTypeInput from "@/components/expression/ExpressionTypeInput"
import DebouncedTextarea from "@/components/ui/DebouncedTextarea"
import Card from "@/components/ui/Card"

export default function NewExpressionPage() {
  const t = useTranslations()
  const router = useRouter()
  const { me, loading: loadingMe } = useMe()

  const [title, setTitle] = useState("")
  const [definition, setDefinition] = useState("")
  const [cantons, setCantons] = useState<string[] | null>(null)
  const [gender, setGender] = useState<ExpressionGender | undefined>(undefined)
  const [type, setType] = useState<ExpressionType | null>(null)
  const [example, setExample] = useState("")
  const [exampleCantons, setExampleCantons] = useState<string[] | null>(null)
  const [submitError, setSubmitError] = useState("")

  const titleError =
    title.length > 0 && title.trim().length < 3
      ? t("expression.form.titleTooShort")
      : ""
  const definitionError =
    definition.length > 0 && definition.trim().length < 10
      ? t("expression.form.definitionTooShort")
      : ""

  const { createExpression, loading: createLoading } =
    useCreateExpressionMutation()

  useEffect(() => {
    if (!loadingMe && !me) {
      router.push("/auth/signin?redirect=/expressions/new")
    }
  }, [loadingMe, me, router])

  if (loadingMe) {
    return (
      <Stack alignItems="center" sx={{ my: 5 }}>
        <CircularProgress size={60} />
      </Stack>
    )
  }

  if (!me) {
    return <>{t("redirecting")}</>
  }

  const canSubmit = title.trim().length >= 3 && definition.trim().length >= 10

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitError("")

    try {
      createExpression(
        {
          title: title.trim(),
          definition: definition.trim(),
          language: Language.De,
          cantons: cantons ?? undefined,
          gender: gender ?? undefined,
          type: type ?? undefined,
          example: example.trim() || undefined,
          exampleCantons: exampleCantons ?? undefined,
        },
        (id) => {
          if (id) {
            router.push(`/expressions/${id}`)
          }
        },
      )
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to create expression",
      )
    }
  }

  return (
    <Box sx={{ mt: 3 }}>
      <form onSubmit={handleSubmit}>
        {submitError && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
            onClose={() => setSubmitError("")}
          >
            {submitError}
          </Alert>
        )}
        <Card
          title={t("expression.newExpression.title")}
          description={t("expression.newExpression.description")}
          actions={{
            cancel: {
              title: t("actions.cancel"),
              onClick: () => router.back(),
              disabled: createLoading,
            },
            save: {
              title: t("actions.submit"),
              type: "submit",
              disabled: !canSubmit || createLoading,
              loading: createLoading,
            },
          }}
        >
          <ExpressionInput
            label={t("expression.form.title")}
            value={title}
            onChange={setTitle}
            required
            error={!!titleError}
          />
          {titleError && <FormHelperText error>{titleError}</FormHelperText>}
          <ExpressionDefinitionInput
            label={t("expression.form.definition")}
            value={definition}
            onChange={setDefinition}
            required
            error={!!definitionError}
          />
          {definitionError && (
            <FormHelperText error>{definitionError}</FormHelperText>
          )}
          <SelectMultipleLocation
            mode="canton"
            label={t("expression.form.cantons")}
            value={cantons}
            onChange={setCantons}
            groupOptions
            helperText={t("expression.cantonFieldHelperText")}
          />
          <ExpressionGenderInput
            label={t("expression.form.gender")}
            value={gender}
            onChange={setGender}
            helperText={t("expression.genderFieldHelperText")}
          />
          <ExpressionTypeInput
            label={t("expression.form.type")}
            value={type}
            onChange={(newType) => setType(newType ?? null)}
          />
          <DebouncedTextarea
            label={t("expression.form.example")}
            value={example}
            onChange={setExample}
            helperText={t("expression.examplesFieldHelperText")}
            fullWidth
          />
          {example.trim() && (
            <SelectMultipleLocation
              mode="canton"
              label={
                t("expression.form.cantons") +
                " (" +
                t("expression.example") +
                ")"
              }
              value={exampleCantons}
              onChange={setExampleCantons}
              groupOptions
              helperText={t("expression.exampleCantonFieldHelperText")}
            />
          )}
        </Card>
      </form>
    </Box>
  )
}
