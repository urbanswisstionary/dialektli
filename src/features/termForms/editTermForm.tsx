import { FC, FormEventHandler, useMemo, useState } from "react"
import Card from "@/ui/Card"
import WordInput from "./components/wordInput"
import WordContentInput from "./components/wordContentInput"
import WordExamplesInput from "./components/wordExamplesInput"
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
import SelectSingleLanguage from "@/ui/Autocomplete/selectSingleLanguage"
import Checkbox from "./components/checkbox"

type EditTermState = {
  title?: string
  content?: string
  cantons?: string[]
  examples?: string[]
  language?: Language
  published?: boolean
}

const EditTermForm: FC<{
  term: TermFragmentFragment
  authorized: boolean
}> = ({ term, authorized }) => {
  const { t } = useTranslation("common")

  const router = useRouter()
  const { deleteTerm, loading: loadingDeleteTerm } = useDeleteTermMutation()
  const {
    updateTerm,
    loading: loadingUpdateTerm,
    data: updateTermData,
  } = useUpdateTermMutations()
  const [editTermState, setEditTermState] = useState<EditTermState>({})

  const changesFound = useMemo(() => {
    const updatedFields = Object.keys(editTermState) as (keyof EditTermState)[]
    if (!updatedFields.length) return false
    return updatedFields.some(
      (key) =>
        !isEqual(
          Array.isArray(editTermState[key])
            ? (editTermState[key] as string[]).filter(
                (example) => example.length,
              )
            : editTermState[key],
          term[key],
        ),
    )
  }, [editTermState, term])

  const onChange = <K extends keyof EditTermState>(
    key: K,
    value: EditTermState[K] | null,
  ) => setEditTermState((prev) => ({ ...prev, [key]: value }))

  const disableFields =
    !authorized || (loadingUpdateTerm && !!updateTermData?.updateTerm?.id)
  const preventSubmit =
    !authorized || loadingUpdateTerm || (!changesFound && term.published)

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (preventSubmit) return
    const updateTermInput: UpdateTermInput = {
      id: term.id,
      title: editTermState.title,
      content: editTermState.content,
      cantons: editTermState.cantons,
      examples: editTermState.examples,
      published: editTermState.published,
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
    <>
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
      <form onSubmit={onSubmit}>
        <Card
          actions={{
            delete: {
              disabled: loadingDeleteTerm,
              onClick: () =>
                deleteTerm(term.id, () =>
                  router.push("/account/profile?view=expressions"),
                ),
            },
            cancel: {
              disabled: !changesFound || loadingUpdateTerm,
              onClick: () => setEditTermState({}),
            },
            save: {
              type: "submit",
              loading: loadingUpdateTerm,
              disabled: preventSubmit,
              title: t("actions.save"),
            },
          }}
        >
          <WordInput
            label={t("term.term")}
            value={
              editTermState.title !== undefined
                ? editTermState.title
                : term.title
            }
            onChange={(title) => onChange("title", title)}
            required
            sx={{ pt: 1 }}
            disabled={disableFields}
          />

          <Checkbox
            checked={
              editTermState.published !== undefined
                ? editTermState.published
                : term.published
            }
            onChange={(published) => onChange("published", published)}
            label={t("term.published")}
          />

          <SelectSingleLanguage
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
          />

          <SelectMultipleLocation
            id="canton"
            label={t("term.canton")}
            mode="canton"
            value={
              (editTermState.cantons !== undefined
                ? editTermState.cantons
                : term.cantons.length
                  ? term.cantons
                  : null) ?? null
            }
            onChange={(cantons) => onChange("cantons", cantons)}
            helperText={t("term.cantonFieldHelperText")}
            disabled={disableFields}
            groupOptions
          />
          <WordContentInput
            value={
              (editTermState.content !== undefined
                ? editTermState.content
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
          <WordExamplesInput
            label={t("term.examples")}
            values={
              (editTermState.examples !== undefined
                ? editTermState.examples
                : term.examples.length
                  ? term.examples
                  : [""]) ?? [""]
            }
            onChange={(examples) => onChange("examples", examples)}
            disabled={disableFields}
            helperText={t("term.examplesFieldHelperText")}
          />
        </Card>
      </form>
    </>
  )
}

export default EditTermForm
