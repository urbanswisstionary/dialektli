import { FC, FormEventHandler, useMemo, useState } from "react"
import Card from "@/ui/Card"
import WordInput from "./components/wordInput"
import WordDescriptionInput from "./components/wordDescriptionInput"
import WordExamplesInput from "./components/wordExamplesInput"
import { useUpdateTermMutations } from "@/hooks/useTerms"
import SelectSingleLocation from "../../ui/selectLocation/selectSingleLocation"
import { TermFragmentFragment, UpdateTermInput } from "@@/generated/graphql"
import isEqual from "lodash/isEqual"
import Box from "@mui/joy/Box"
import Typography from "@mui/joy/Typography"
import { useRouter } from "next/router"
import Link from "@mui/joy/Link"
import SelectMultipleLocation from "@/ui/selectLocation/selectMultipleLocations"

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

  const claimOnwershipLink = (
    <Link
      href={`mailto:urbanswisstionary@gmail.com?subject=Claim ownership over "${term.title}", id "${term.id}"&body=Hi, I would like to claim ownership over "${term.title}", id "${term.id}" and here I provide proofs of my claim.`}
    >
      claim ownership
    </Link>
  )
  return (
    <>
      <Box sx={{ mb: 1, alignItems: { xs: "start", sm: "center" } }}>
        <Typography px={2} level="h2" component="h1">
          Edit Term
        </Typography>
        {!authorized ? (
          <>
            <Typography level="body-lg" color="warning" p={2}>
              You are not authorized to edit this term
            </Typography>
            {!reviewBeforPublish ? (
              <Typography level="body-md" color="warning" px={2}>
                If you contributed this value and would like to{" "}
                {claimOnwershipLink} over this value
              </Typography>
            ) : null}
          </>
        ) : null}

        {reviewBeforPublish && anonymous ? (
          <Typography level="body-md" color="warning" px={2}>
            To make changes, please log in to your account and{" "}
            {claimOnwershipLink} of the term, or in case you prefer to remain
            anonymous, your term will be submitted for review by an
            administrator before being published anonymously.
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
              title: "publish",
            },
            cancel: {
              disabled: !changesFound || updateTermLoading,
              onClick: () => setEditTermState({}),
            },
          }}
        >
          <WordInput
            label="Value"
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
            label="Canton"
            mode="canton"
            value={
              (editTermState.cantons !== undefined
                ? editTermState.cantons
                : term.cantons.length
                  ? term.cantons
                  : null) ?? null
            }
            onChange={(cantons) => onChange("cantons", cantons)}
            helperText="Select the cantons where the word is used"
            disabled={disableFields}
          />
          <WordDescriptionInput
            value={
              (editTermState.content !== undefined
                ? editTermState.content
                : term.content) ?? ""
            }
            onChange={(value) => onChange("content", value)}
            label="Description"
            required
            sx={{ pt: 1 }}
            disabled={disableFields}
          />
          <WordExamplesInput
            values={
              (editTermState.examples !== undefined
                ? editTermState.examples
                : term.examples.length
                  ? term.examples
                  : [""]) ?? [""]
            }
            onChange={(examples) => onChange("examples", examples)}
            disabled={disableFields}
          />
        </Card>
      </form>
    </>
  )
}

export default EditTermForm
