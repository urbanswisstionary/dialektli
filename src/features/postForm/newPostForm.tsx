import { FC, FormEventHandler, useState } from "react"
import Card from "@/ui/Card"
import ReviewGuidelines from "@/features/postForm/components/reviewGuidelines"
import WordInput from "./components/wordInput"
import WordDescriptionInput from "./components/wordDescriptionInput"
import WordExamplesInput from "./components/wordExamplesInput"
import { useCreatePostMutation } from "@/hooks/usePosts"
import { useRouter } from "next/router"
import SelectLocation from "../Auth/profile/components/selectLocation"
import dynamic from "next/dynamic"
import { ReCaptcha } from "next-recaptcha-v3"
import { setQueryOnPage } from "@/utils/setQueryOnPage"
import Snackbar from "@mui/joy/Snackbar"
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded"
import Button from "@mui/joy/Button"

type Query = {
  title?: string
  content?: string
  examples?: string[]
  canton?: string
}

const RecaptchaProvider = dynamic(() => import("@/providers/Recaptcha"), {
  ssr: false,
})

const NewPostForm: FC = () => {
  const router = useRouter()
  const query = router.query as Query

  const [recaptchaToken, setRecaptcha] = useState<string | null>(null)
  const [recapchaError, setRecaptchaError] = useState<string | null>(null)

  const {
    createPost,
    data: createPostData,
    loading: createPostLoading,
  } = useCreatePostMutation()

  const onValueChange = <K extends keyof Query>(
    queryKey: K,
    value: Query[K] | null,
  ) => {
    setQueryOnPage(router, { [queryKey]: value?.length ? value : [] })
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (!query.title || !query.content) return

    const recaptchaRes = await fetch("/api/recaptcha", {
      method: "POST",
      body: recaptchaToken,
    })

    if (recaptchaRes.ok)
      createPost(
        {
          title: query.title,
          content: query.content,
          examples: query.examples,
          canton: query.canton,
        },
        (postId) => {
          if (postId) router.replace(`/post/${postId}`)
        },
      )
    else {
      const text = await recaptchaRes.text()
      // eslint-disable-next-line no-console
      console.error("Recaptcha failed", text)
      setRecaptchaError(text)
    }
  }

  return (
    <RecaptchaProvider>
      <ReCaptcha onValidate={setRecaptcha} action="new_post" />
      <form onSubmit={onSubmit}>
        <Card
          title="New Post"
          description="All the definitions were written by people just like you. Now's your chance to add your own!"
          actions={{
            save: { type: "submit", loading: createPostLoading },
          }}
        >
          <ReviewGuidelines />

          <WordInput
            value={query.title ?? ""}
            onChange={(value) => {
              onValueChange("title", value)
            }}
            label="New Value"
            required
            sx={{ pt: 1 }}
            disabled={!!createPostData?.createPost?.id}
          />
          <SelectLocation
            id="canton"
            mode="canton"
            value={query.canton}
            onChange={(canton) => {
              onValueChange("canton", canton)
            }}
            helperText="Select the canton where the word is used"
          />
          <WordDescriptionInput
            value={query.content ?? ""}
            onChange={(value) => {
              onValueChange("content", value)
            }}
            label="Description"
            required
            sx={{ pt: 1 }}
            disabled={!!createPostData?.createPost?.id}
          />

          <WordExamplesInput
            values={
              typeof query.examples === "string"
                ? [query.examples]
                : query.examples ?? [""]
            }
            onChange={(examples) => {
              onValueChange("examples", examples)
            }}
            disabled={!!createPostData?.createPost?.id}
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

export default NewPostForm
