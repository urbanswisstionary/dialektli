"use client"

import { useState, useMemo, useEffect, type FormEventHandler } from "react"
import { useRouter, useParams } from "next/navigation"
import { useMe } from "@/hooks/useUsers"
import {
  useExpression,
  useUpdateExpressionMutation,
  useDeleteExpressionMutation,
  ExpressionFragment,
} from "@/hooks/useExpressions"
import {
  Language,
  ExpressionGender,
  ExpressionType,
  UpdateExpressionInput,
  ExpressionFragmentFragment,
} from "@/generated/graphql"
import { getFragmentData } from "@/generated"
import Stack from "@mui/material/Stack"
import CircularProgress from "@mui/material/CircularProgress"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormHelperText from "@mui/material/FormHelperText"
import { useTranslations } from "next-intl"
import ExpressionInput from "@/components/expression/ExpressionInput"
import ExpressionDefinitionInput from "@/components/expression/ExpressionDefinitionInput"
import SelectMultipleLocation from "@/components/ui/Autocomplete/SelectMultipleLocation"
import ExpressionGenderInput from "@/components/expression/ExpressionGenderInput"
import ExpressionTypeInput from "@/components/expression/ExpressionTypeInput"
import Card from "@/components/ui/MuiCard"
import isEqual from "lodash/isEqual"

type EditExpressionState = {
  title?: string | null
  definition?: string | null
  cantons?: string[] | null
  language?: Language | null
  published?: boolean | null
  gender?: ExpressionGender | null
  type?: ExpressionType | null
}

export default function EditExpressionPage() {
  const t = useTranslations()
  const router = useRouter()
  const params = useParams()
  const expressionId = params?.id as string

  const { me, isAdmin, loading: loadingMe } = useMe()
  const { data, loading: loadingExpression } = useExpression(
    expressionId,
    !expressionId,
  )

  const expressionData = getFragmentData(ExpressionFragment, data?.expression)
  const expression = expressionData
  const authorized =
    expressionData?.author?.id &&
    (me?.id === expressionData.author.id || isAdmin)

  const [editExpressionState, setEditExpressionState] =
    useState<EditExpressionState>({})

  const {
    updateExpression,
    loading: loadingUpdateExpression,
    data: updateExpressionData,
  } = useUpdateExpressionMutation()
  const { deleteExpression, loading: loadingDeleteExpression } =
    useDeleteExpressionMutation()

  useEffect(() => {
    if (!loadingMe && !me && expressionId) {
      router.push(`/auth/signin?redirect=/expressions/${expressionId}/edit`)
    }
  }, [loadingMe, me, expressionId, router])

  const changesFound = useMemo(() => {
    if (!expression) return false
    const updatedFields = Object.keys(
      editExpressionState,
    ) as (keyof EditExpressionState)[]
    if (!updatedFields.length) return false
    return updatedFields.some(
      (key) =>
        !isEqual(
          Array.isArray(editExpressionState[key])
            ? (editExpressionState[key] as string[]).filter(
                (item) => item.length,
              )
            : editExpressionState[key],
          expression[key],
        ),
    )
  }, [editExpressionState, expression])

  const onChange = <K extends keyof EditExpressionState>(
    key: K,
    value: EditExpressionState[K] | null,
  ) => setEditExpressionState((prev) => ({ ...prev, [key]: value }))

  const disableFields =
    !authorized ||
    (loadingUpdateExpression && !!updateExpressionData?.updateExpression?.id)
  const preventSubmit =
    !authorized ||
    loadingUpdateExpression ||
    (!changesFound && (expression?.published ?? false))

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (preventSubmit || !expression) return

    const updateExpressionInput: UpdateExpressionInput = {
      id: expression.id || "",
      title: editExpressionState.title ?? undefined,
      definition: editExpressionState.definition ?? undefined,
      cantons: editExpressionState.cantons ?? undefined,
      published: editExpressionState.published ?? undefined,
      gender: editExpressionState.gender ?? undefined,
      type: editExpressionState.type ?? undefined,
    }
    updateExpression(updateExpressionInput)
  }

  const handleDelete = () => {
    if (!expression?.id) return
    deleteExpression(expression.id, () => router.push("/"))
  }

  if (loadingMe || loadingExpression) {
    return (
      <Stack alignItems="center" sx={{ my: 5 }}>
        <CircularProgress size={60} />
      </Stack>
    )
  }

  if (!me) {
    return <>{t("redirecting")}</>
  }

  if (!expression) {
    return (
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography variant="h6">{t("noData")}</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ mb: 1, px: 2 }}>
        <Typography variant="h4" component="h1">
          {t("expression.editExpression.title")}
        </Typography>
        {!authorized && (
          <>
            <Typography color="warning.main" sx={{ mt: 1 }}>
              {t("expression.editExpression.notAuthorizedWarning")}
            </Typography>
            <Typography color="warning.main" sx={{ mt: 1 }}>
              {t("expression.editExpression.claimOwnership")}
            </Typography>
          </>
        )}
      </Box>

      <form onSubmit={handleSubmit}>
        <Card
          title=""
          actions={{
            delete: {
              title: t("actions.delete"),
              onClick: handleDelete,
              disabled: loadingDeleteExpression || !authorized,
            },
            cancel: {
              title: t("actions.cancel"),
              onClick: () => setEditExpressionState({}),
              disabled: !changesFound || loadingUpdateExpression,
            },
            save: {
              title: t("actions.save"),
              type: "submit",
              disabled: preventSubmit,
              loading: loadingUpdateExpression,
            },
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={
                  ("published" in editExpressionState
                    ? editExpressionState.published
                    : expression.published) ?? false
                }
                onChange={(e) => onChange("published", e.target.checked)}
                disabled={disableFields}
              />
            }
            label={t("expression.published")}
            sx={{ mb: 2 }}
          />

          <ExpressionInput
            label={t("expression.form.title")}
            value={
              ("title" in editExpressionState
                ? editExpressionState.title
                : expression.title) ?? ""
            }
            onChange={(title) => onChange("title", title)}
            required
            disabled={disableFields}
          />

          <ExpressionDefinitionInput
            label={t("expression.form.definition")}
            value={
              ("definition" in editExpressionState
                ? editExpressionState.definition
                : expression.definition) ?? ""
            }
            onChange={(value) => onChange("definition", value)}
            required
            disabled={disableFields}
          />

          <FormHelperText>
            {t("expression.descriptionFieldHelperText")}
          </FormHelperText>

          <SelectMultipleLocation
            mode="canton"
            label={t("expression.form.cantons")}
            value={
              "cantons" in editExpressionState
                ? editExpressionState.cantons
                : expression.cantons
            }
            onChange={(cantons) => onChange("cantons", cantons)}
            groupOptions
            helperText={t("expression.cantonFieldHelperText")}
            disabled={disableFields}
          />

          <ExpressionGenderInput
            label={t("expression.form.gender")}
            value={
              "gender" in editExpressionState
                ? editExpressionState.gender
                : expression.gender
            }
            onChange={(gender) => onChange("gender", gender)}
            helperText={t("expression.genderFieldHelperText")}
            disabled={disableFields}
          />

          <ExpressionTypeInput
            label={t("expression.form.type")}
            value={
              "type" in editExpressionState
                ? editExpressionState.type
                : expression.type
            }
            onChange={(type) => onChange("type", type)}
            disabled={disableFields}
          />
        </Card>
      </form>
    </Box>
  )
}
