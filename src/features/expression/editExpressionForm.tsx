import { FC, FormEventHandler, useMemo, useState } from "react"
import Card from "@/ui/Card"
import ExpressionInput from "./expressionInput"
import ExpressionDefinitionInput from "./expressionDefinitionInput"
import { useDeleteTermMutation, useUpdateTermMutations } from "@/hooks/useTerms"
import {
  Language,
  TermFragmentFragment,
  UpdateTermInput,
} from "@@/generated/graphql"
import isEqual from "lodash/isEqual"
import Box from "@mui/joy/Box"
import Typography from "@mui/joy/Typography"
import { useRouter } from "next/router"
import Link from "@mui/joy/Link"
import SelectMultipleLocation from "@/ui/Autocomplete/selectMultipleLocations"
import { Trans, useTranslation } from "next-i18next"
// import SelectSingleLanguage from "@/ui/Autocomplete/selectSingleLanguage"
import TermCardExamples from "./expressionCardExamples"
import FormControl from "@mui/joy/FormControl"
import Checkbox from "@mui/joy/Checkbox"

type EditExpressionState = {
  title?: string
  content?: string
  cantons?: string[]
  language?: Language
  published?: boolean
}

const EditExpressionForm: FC<{
  term: TermFragmentFragment
  authorized: boolean
}> = ({ term, authorized }) => {
  const { t } = useTranslation("common")
  const router = useRouter()
  const { deleteTerm, loading: loadingDeleteExpression } =
    useDeleteTermMutation()
  const {
    updateTerm,
    loading: loadingUpdateExpression,
    data: updateExpressionData,
  } = useUpdateTermMutations()
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
          term[key],
        ),
    )
  }, [editExpressionState, term])

  const onChange = <K extends keyof EditExpressionState>(
    key: K,
    value: EditExpressionState[K] | null,
  ) => setEditExpressionState((prev) => ({ ...prev, [key]: value }))

  const disableFields =
    !authorized ||
    (loadingUpdateExpression && !!updateExpressionData?.updateTerm?.id)
  const preventSubmit =
    !authorized || loadingUpdateExpression || (!changesFound && term.published)

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (preventSubmit) return
    const updateTermInput: UpdateTermInput = {
      id: term.id,
      title: editExpressionState.title,
      content: editExpressionState.content,
      cantons: editExpressionState.cantons,
      published: editExpressionState.published,
    }
    updateTerm(updateTermInput, () =>
      router.push("/account/profile?view=expressions"),
    )
  }

  const claimOwnershipLink = (
    <Link
      key="claimOwnershipLinkHref"
      href={t("term.editTerm.claimOwnershipLinkHref", {
        termTitle: term.title,
        termId: term.id,
      })}
    />
  )
  return (
    <form onSubmit={onSubmit}>
      <Box sx={{ mb: 1, alignItems: { xs: "start", sm: "center" } }}>
        <Typography px={2} level="h2" component="h1">
          {t("term.editTerm.title")}
        </Typography>
        {!authorized ? (
          <>
            <Typography level="body-lg" color="warning" p={2}>
              {t("term.editTerm.notAuthorizedWarning")}
            </Typography>

            <Typography level="body-md" color="warning" px={2}>
              <Trans
                i18nKey={"term.editTerm.claimOwnership"}
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
              deleteTerm(term.id, () =>
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
          label={t("term.term")}
          value={
            editExpressionState.title !== undefined
              ? editExpressionState.title
              : term.title
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
                : term.published
            }
            onChange={({ currentTarget: { checked } }) =>
              onChange("published", checked)
            }
            label={t("term.published")}
          />
        </FormControl>

        {/* <SelectSingleLanguage
            label={t("term.language")}
            required
            value={
              editTermState.language !== undefined
                ? editTermState.language
                : term.language
            }
            onChange={(language) => {
              onChange("language", language)
            }}
          /> */}

        <SelectMultipleLocation
          id="canton"
          label={t("term.canton")}
          mode="canton"
          value={
            (editExpressionState.cantons !== undefined
              ? editExpressionState.cantons
              : term.cantons.length
                ? term.cantons
                : null) ?? null
          }
          onChange={(cantons) => onChange("cantons", cantons)}
          helperText={t("term.cantonFieldHelperText")}
          disabled={disableFields}
          groupOptions
        />
        <ExpressionDefinitionInput
          value={
            (editExpressionState.content !== undefined
              ? editExpressionState.content
              : term.content) ?? ""
          }
          onChange={(value) => onChange("content", value)}
          label={t("term.description")}
          required
          sx={{ pt: 1 }}
          disabled={disableFields}
          helperText={
            <Trans
              i18nKey={"term.descriptionFieldHelperText"}
              components={{ bold: <b /> }}
            />
          }
        />
        <TermCardExamples
          term={term}
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
