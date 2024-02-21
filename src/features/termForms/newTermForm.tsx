import { FC, useEffect, useState } from "react"
import Card from "@/ui/Card"
import ReviewGuidelines from "@/features/termForms/components/reviewGuidelines"
import WordInput from "./components/wordInput"
import WordDescriptionInput from "./components/wordDescriptionInput"
import WordExamplesInput from "./components/wordExamplesInput"
import { useCreateTermMutation } from "@/hooks/useTerms"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { ReCaptcha } from "next-recaptcha-v3"
import { setQueryOnPage } from "@/utils/setQueryOnPage"
import Snackbar from "@mui/joy/Snackbar"
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded"
import Button from "@mui/joy/Button"
import { ParsedUrlQuery } from "querystring"
import SelectMultipleLocation from "@/ui/selectLocation/selectMultipleLocations"

type Query = ParsedUrlQuery & {
  title?: string
  content?: string
  examples?: string[]
  cantons?: string[] | string
}

const recaptchaTimedoutLocalStorageKey = "rto"

const RecaptchaProvider = dynamic(() => import("@/providers/Recaptcha"), {
  ssr: false,
})

const NewTermForm: FC<{ authorId?: string }> = ({ authorId }) => {
  const router = useRouter()
  const query = router.query as Query

  const [recaptchaToken, setRecaptcha] = useState<string | null>(null)
  const [recapchaError, setRecaptchaError] = useState<string | null>(null)

  const {
    createTerm,
    data: createTermData,
    loading: createTermLoading,
  } = useCreateTermMutation()

  const onChange = <K extends keyof Query>(
    queryKey: K,
    value: Query[K] | null,
  ) => {
    setQueryOnPage(router, { [queryKey]: value?.length ? value : null })
  }
  const preventSubmit = !query.title || !query.content || createTermLoading
  const onSubmit = async () => {
    if (preventSubmit) return

    const recaptchaRes = await fetch("/api/recaptcha", {
      method: "POST",
      body: recaptchaToken,
    })

    if (recaptchaRes.ok) {
      createTerm(
        {
          title: query.title!,
          content: query.content,
          examples: query.examples,
          cantons:
            typeof query.cantons === "string" ? [query.cantons] : query.cantons,
          authorId,
        },
        (termId) => {
          if (termId) router.replace(`/term/edit/${termId}?review`)
        },
      )
    } else {
      const text = await recaptchaRes.text()
      // eslint-disable-next-line no-console
      console.error("Recaptcha failed", text)
      if (text === "timeout-or-duplicate") {
        // if recaptcha times out, set a local storage key to resubmit the form
        localStorage.setItem(recaptchaTimedoutLocalStorageKey, "1")
        router.reload()
      }
      // eslint-disable-next-line no-console
      setRecaptchaError(text)
    }
  }

  // recaptcha timed out so resubmit the form
  useEffect(() => {
    const recaptchaTimedout = localStorage.getItem(
      recaptchaTimedoutLocalStorageKey,
    )
    if (recaptchaTimedout) {
      localStorage.removeItem(recaptchaTimedoutLocalStorageKey)
      onSubmit()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <RecaptchaProvider>
      <ReCaptcha onValidate={setRecaptcha} action="new_term" />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
      >
        <Card
          title="New Term"
          description="All the definitions were written by people just like you. Now's your chance to add your own!"
          actions={{
            save: { type: "submit", loading: createTermLoading },
          }}
        >
          <ReviewGuidelines />

          <WordInput
            value={query.title ?? ""}
            onChange={(value) => {
              onChange("title", value)
            }}
            label="New Value"
            required
            sx={{ pt: 1 }}
            disabled={!!createTermData?.createTerm?.id}
          />

          <SelectMultipleLocation
            label="Canton"
            mode="canton"
            helperText="Select the canton where the word is used"
            value={
              typeof query.cantons === "string"
                ? [query.cantons]
                : query.cantons ?? null
            }
            onChange={(cantons) => {
              onChange("cantons", cantons)
            }}
          />
          <WordDescriptionInput
            value={query.content ?? ""}
            onChange={(value) => {
              onChange("content", value)
            }}
            label="Description"
            required
            sx={{ pt: 1 }}
            disabled={!!createTermData?.createTerm?.id}
          />

          <WordExamplesInput
            values={
              typeof query.examples === "string"
                ? [query.examples]
                : query.examples ?? [""]
            }
            onChange={(examples) => {
              onChange("examples", examples)
            }}
            disabled={!!createTermData?.createTerm?.id}
          />
        </Card>
      </form>
      <Snackbar
        open={!!recapchaError}
        onClose={() => {}}
        variant="soft"
        color="danger"
        startDecorator={<ErrorRoundedIcon />}
        endDecorator={
          <Button
            onClick={() => router.reload()}
            size="sm"
            variant="soft"
            color="danger"
          >
            Click here to refresh the page and try again
          </Button>
        }
      >
        Sorry but an error was found.
      </Snackbar>
    </RecaptchaProvider>
  )
}

export default NewTermForm
