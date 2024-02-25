import { FC, FormEventHandler, useMemo, useState } from "react"
import Card from "@/ui/Card"
import WordInput from "./components/wordInput"
import WordContentInput from "./components/wordContentInput"
import WordExamplesInput from "./components/wordExamplesInput"
import { useUpdateTermMutations } from "@/hooks/useTerms"
import { TermFragmentFragment, UpdateTermInput } from "@@/generated/graphql"
import isEqual from "lodash/isEqual"
import Box from "@mui/joy/Box"
import Typography from "@mui/joy/Typography"
import { useRouter } from "next/router"
import Link from "@mui/joy/Link"
import SelectMultipleLocation from "@/ui/Autocomplete/selectMultipleLocations"
import { Trans, useTranslation } from "next-i18next"

type EditTermState = {
  title?: string
  content?: string
  cantons?: string[]
  examples?: string[]
}

const EditTermForm: FC<{
  term: TermFragmentFragment
  authorized: boolean
  reviewBeforPublish?: boolean
  anonymous?: boolean
}> = ({ term, authorized, reviewBeforPublish, anonymous }) => {
  const { t } = useTranslation("common")

  const router = useRouter()
  const {
    updateTerm,
    loading: updateTermLoading,
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
    !authorized || (updateTermLoading && !!updateTermData?.updateTerm?.id)
  const preventSubmit =
    !authorized || updateTermLoading || (!changesFound && term.published)

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (preventSubmit) return
    const updateTermInput: UpdateTermInput = {
      id: term.id,
      title: editTermState.title,
      content: editTermState.content,
      cantons: editTermState.cantons,
      examples: editTermState.examples,
      published: true,
    }
    updateTerm(updateTermInput, () =>
      router.push("/account/profile?view=terms"),
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
            {!reviewBeforPublish ? (
              <Typography level="body-md" color="warning" px={2}>
                <Trans
                  i18nKey={"term.editTerm.claimOwnership"}
                  components={[claimOwnershipLink]}
                />
              </Typography>
            ) : null}
          </>
        ) : null}

        {reviewBeforPublish && anonymous ? (
          <Typography level="body-md" color="warning" px={2}>
            <Trans
              i18nKey={"term.editTerm.claimOwnershipAnonymous"}
              components={[claimOwnershipLink]}
            />
          </Typography>
        ) : null}
      </Box>
      <form onSubmit={onSubmit}>
        <Card
          actions={{
            save: {
              type: "submit",
              loading: updateTermLoading,
              disabled: preventSubmit,
              title: t("actions.publish"),
            },
            cancel: {
              disabled: !changesFound || updateTermLoading,
              onClick: () => setEditTermState({}),
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
