import { type FC, type FormEventHandler, useMemo, useState } from "react"
import Card from "@/ui/Card"
import ExpressionInput from "./expressionInput"
import ExpressionDefinitionInput from "./expressionDefinitionInput"
import {
  useDeleteExpressionMutation,
  useUpdateExpressionMutation,
} from "@/hooks/useExpressions"
import type {
  Language,
  ExpressionFragmentFragment,
  UpdateExpressionInput,
  ExpressionGender,
  ExpressionType,
} from "@@/generated/graphql"
import isEqual from "lodash/isEqual"
import Box from "@mui/joy/Box"
import Typography from "@mui/joy/Typography"
import { useRouter } from "next/router"
import Link from "@mui/joy/Link"
import SelectMultipleLocation from "@/ui/Autocomplete/selectMultipleLocations"
import { Trans, useTranslation } from "next-i18next"
// import SelectSingleLanguage from "@/ui/Autocomplete/selectSingleLanguage"
import ExpressionCardExamples from "./expressionCardExamples"
import FormControl from "@mui/joy/FormControl"
import Checkbox from "@mui/joy/Checkbox"
import ExpressionGenderInput from "./expressionGenderInput"
import ExpressionTypeInput from "./expressionTypeInput"

type EditExpressionState = {
  title?: string
  definition?: string
  cantons?: string[]
  language?: Language
  published?: boolean
  gender?: ExpressionGender
  type?: ExpressionType
}

const EditExpressionForm: FC<{
  expression: ExpressionFragmentFragment
  authorized: boolean
}> = ({ expression, authorized }) => {
  const { t } = useTranslation("common")
  const router = useRouter()
  const { deleteExpression, loading: loadingDeleteExpression } =
    useDeleteExpressionMutation()
  const {
    updateExpression,
    loading: loadingUpdateExpression,
    data: updateExpressionData,
  } = useUpdateExpressionMutation()
  const [editExpressionState, setEditExpressionState] =
    useState<EditExpressionState>({})

  const changesFound = useMemo(() => {
    const updatedFields = Object.keys(
      editExpressionState,
    ) as (keyof EditExpressionState)[]
    if (!updatedFields.length) return false
    return updatedFields.some(
      (key) =>
        !isEqual(
          Array.isArray(editExpressionState[key])
            ? (editExpressionState[key] as string[]).filter(
                (example) => example.length,
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
    (!changesFound && expression.published)

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (preventSubmit) return
    const updateExpressionInput: UpdateExpressionInput = {
      id: expression.id,
      ...editExpressionState,
    }
    updateExpression(updateExpressionInput)
  }

  const claimOwnershipLink = (
    <Link
      key="claimOwnershipLinkHref"
      href={t("expression.editExpression.claimOwnershipLinkHref", {
        expressionTitle: expression.title,
        expressionId: expression.id,
      })}
    />
  )

  return (
    <form onSubmit={onSubmit}>
      <Box sx={{ mb: 1, alignItems: { xs: "start", sm: "center" } }}>
        <Typography px={2} level="h2" component="h1">
          {t("expression.editExpression.title")}
        </Typography>
        {!authorized ? (
          <>
            <Typography level="body-lg" color="warning" p={2}>
              {t("expression.editExpression.notAuthorizedWarning")}
            </Typography>

            <Typography level="body-md" color="warning" px={2}>
              <Trans
                i18nKey={"expression.editExpression.claimOwnership"}
                components={[claimOwnershipLink]}
              />
            </Typography>
          </>
        ) : null}
      </Box>
      <Card
        actions={{
          delete: {
            disabled: loadingDeleteExpression,
            onClick: () =>
              deleteExpression(expression.id, () =>
                router.push("/account/profile?view=expressions"),
              ),
          },
          cancel: {
            disabled: !changesFound || loadingUpdateExpression,
            onClick: () => setEditExpressionState({}),
          },
          save: {
            type: "submit",
            loading: loadingUpdateExpression,
            disabled: preventSubmit,
            title: t("actions.save"),
          },
        }}
      >
        <FormControl id="published" sx={{ pt: 1 }}>
          <Checkbox
            checked={
              "published" in editExpressionState
                ? editExpressionState.published
                : expression.published
            }
            onChange={({ currentTarget: { checked } }) =>
              onChange("published", checked)
            }
            label={t("expression.published")}
          />
        </FormControl>
        <ExpressionInput
          label={t("expression.expression")}
          value={
            "title" in editExpressionState
              ? editExpressionState.title
              : expression.title
          }
          onChange={(title) => onChange("title", title)}
          required
          disabled={disableFields}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            flexDirection: { xs: "column", md: "row" },
            py: 1,
            gap: 2,
          }}
        >
          <ExpressionGenderInput
            value={
              "gender" in editExpressionState
                ? editExpressionState.gender
                : expression.gender
            }
            onChange={(gender) => onChange("gender", gender)}
            sx={{ flex: 1 }}
            label={t("expression.gender")}
            helperText={t("expression.genderFieldHelperText")}
          />
          <ExpressionTypeInput
            label={t("expression.type")}
            sx={{
              width: { xs: "100%", md: "unset" },
            }}
            value={
              "type" in editExpressionState
                ? editExpressionState.type
                : expression.type
            }
            onChange={(type) => onChange("type", type)}
          />
        </Box>
        {/* <SelectSingleLanguage
          label={t("expression.language")}
          required
          value={
            "language" in editTermState
              ? editTermState.language
              : expression.language
          }
          onChange={(language) => {
            onChange("language", language)
          }}
        /> */}

        <SelectMultipleLocation
          id="canton"
          label={t("expression.canton")}
          mode="canton"
          value={
            "cantons" in editExpressionState
              ? editExpressionState.cantons
              : expression.cantons
          }
          onChange={(cantons) => onChange("cantons", cantons)}
          helperText={t("expression.cantonFieldHelperText")}
          disabled={disableFields}
          groupOptions
        />

        <ExpressionDefinitionInput
          value={
            "definition" in editExpressionState
              ? editExpressionState.definition
              : expression.definition
          }
          onChange={(value) => onChange("definition", value)}
          label={t("expression.description")}
          required
          sx={{ pt: 1 }}
          disabled={disableFields}
          helperText={
            <Trans
              i18nKey={"expression.descriptionFieldHelperText"}
              components={{ bold: <b /> }}
            />
          }
        />
        <ExpressionCardExamples
          expression={expression}
          addExampleButtonProps={{
            type: "iconButton",
            sx: { justifyContent: "flex-end" },
          }}
        />
      </Card>
    </form>
  )
}

export default EditExpressionForm
