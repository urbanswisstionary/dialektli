import { FC, useEffect, useState } from "react"
import Card from "@/ui/Card"
import ReviewGuidelines from "@/features/termForms/components/reviewGuidelines"
import WordInput from "./components/wordInput"
import WordContentInput from "./components/wordContentInput"
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
import SelectMultipleLocation from "@/ui/Autocomplete/selectMultipleLocations"
import { Trans, useTranslation } from "next-i18next"

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
  const { t } = useTranslation("common")

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
          if (termId) router.replace(`/term/${termId}/edit?review`)
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
          title={t("term.newTerm.title")}
          description={t("term.newTerm.description")}
          // description="All the definitions were written by people just like you. Now's your chance to add your own!"
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
            label={t("term.title")}
            required
            sx={{ pt: 1 }}
            disabled={!!createTermData?.createTerm?.id}
          />

          <SelectMultipleLocation
            label={t("term.canton")}
            mode="canton"
            helperText={t("term.cantonFieldHelperText")}
            value={
              typeof query.cantons === "string"
                ? [query.cantons]
                : query.cantons ?? null
            }
            onChange={(cantons) => {
              onChange("cantons", cantons)
            }}
            groupOptions
          />
          <WordContentInput
            value={query.content ?? ""}
            onChange={(value) => {
              onChange("content", value)
            }}
            label={t("term.description")}
            helperText={
              <Trans
                i18nKey="term.descriptionFieldHelperText"
                components={{ bold: <b /> }}
              />
            }
            required
            sx={{ pt: 1 }}
            disabled={!!createTermData?.createTerm?.id}
          />

          <WordExamplesInput
            label={t("term.examples")}
            helperText={t("term.examplesFieldHelperText")}
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
            {t("term.newTerm.recapchaError.clickHere")}
          </Button>
        }
      >
        {t("term.newTerm.recapchaError.message")}
      </Snackbar>
    </RecaptchaProvider>
  )
}

export default NewTermForm
