import { FC, useEffect, useState } from "react"
import Card from "@/ui/Card"
import ReviewGuidelines from "@/features/newPostForm/components/reviewGuidelines"
import WordInput from "./components/wordInput"
import WordDescriptionInput from "./components/wordDescriptionInput"
import WordExamplesInput from "./components/wordExamplesInput"
import { useCreatePostMutation } from "@/hooks/usePosts"
import { useRouter } from "next/router"
import SelectLocation from "../Auth/profile/components/selectLocation"

const formInitialState = {
  title: "",
  content: "",
  examples: [""],
  canton: "",
}

const NewPostForm: FC = () => {
  const router = useRouter()
  const [formData, setFormData] = useState(formInitialState)
  const {
    createPost,
    data: createPostData,
    loading: createPostLoading,
  } = useCreatePostMutation()

  useEffect(() => {
    if (createPostData?.createPost?.id) {
      router.push(`/post/${createPostData.createPost.id}`)
    }
  }, [createPostData, router])
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        createPost(formData)
      }}
    >
      <Card
        title="New Post"
        description="All the definitions were written by people just like you. Now's your chance to add your own!"
        actions={{
          save: { type: "submit", loading: createPostLoading },
        }}
      >
        <ReviewGuidelines />

        <WordInput
          value={formData.title}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, title: value }))
          }
          required
          sx={{ pt: 1 }}
          disabled={!!createPostData?.createPost?.id}
        />
        <SelectLocation
          id="canton"
          mode="canton"
          value={formData.canton}
          onChange={(canton) =>
            setFormData((prev) => ({ ...prev, canton: canton ?? "" }))
          }
          helperText="Select the canton where the word is used"
        />
        <WordDescriptionInput
          value={formData.content}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, content: value }))
          }
          required
          sx={{ pt: 1 }}
          disabled={!!createPostData?.createPost?.id}
        />

        <WordExamplesInput
          values={formData.examples}
          onChange={(examples) =>
            setFormData((prev) => ({ ...prev, examples }))
          }
          disabled={!!createPostData?.createPost?.id}
        />
      </Card>
    </form>
  )
}

export default NewPostForm
