import { FC, FormEventHandler, useMemo, useState } from "react"
import Card from "@/ui/Card"
import ExpressionInput from "./expressionInput"
import ExpressionDefinitionInput from "./expressionDefinitionInput"
import {
  useDeleteExpressionMutation,
  useUpdateExpressionMutation,
} from "@/hooks/useExpressions"
import {
  Language,
  ExpressionFragmentFragment,
  UpdateExpressionInput,
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

type EditExpressionState = {
  title?: string
  definition?: string
  cantons?: string[]
  language?: Language
  published?: boolean
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
      title: editExpressionState.title,
      definition: editExpressionState.definition,
      cantons: editExpressionState.cantons,
      published: editExpressionState.published,
    }
    updateExpression(updateExpressionInput, () =>
      router.push("/account/profile?view=expressions"),
    )
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
        <ExpressionInput
          label={t("expression.expression")}
          value={
            editExpressionState.title !== undefined
              ? editExpressionState.title
              : expression.title
          }
          onChange={(title) => onChange("title", title)}
          required
          sx={{ pt: 1 }}
          disabled={disableFields}
        />
        <FormControl id="published">
          <Checkbox
            checked={
              editExpressionState.published !== undefined
                ? editExpressionState.published
                : expression.published
            }
            onChange={({ currentTarget: { checked } }) =>
              onChange("published", checked)
            }
            label={t("expression.published")}
          />
        </FormControl>

        {/* <SelectSingleLanguage
            label={t("expression.language")}
            required
            value={
              editTermState.language !== undefined
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
            (editExpressionState.cantons !== undefined
              ? editExpressionState.cantons
              : expression.cantons.length
                ? expression.cantons
                : null) ?? null
          }
          onChange={(cantons) => onChange("cantons", cantons)}
          helperText={t("expression.cantonFieldHelperText")}
          disabled={disableFields}
          groupOptions
        />
        <ExpressionDefinitionInput
          value={
            (editExpressionState.definition !== undefined
              ? editExpressionState.definition
              : expression.definition) ?? ""
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
