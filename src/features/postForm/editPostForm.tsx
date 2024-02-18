import { FC, FormEventHandler, useMemo, useState } from "react"
import Card from "@/ui/Card"
import WordInput from "./components/wordInput"
import WordDescriptionInput from "./components/wordDescriptionInput"
import WordExamplesInput from "./components/wordExamplesInput"
import { useUpdatePostMutations } from "@/hooks/usePosts"
import SelectLocation from "../Auth/profile/components/selectLocation"
import { PostFragmentFragment } from "@@/generated/graphql"
import isEqual from "lodash/isEqual"
import Box from "@mui/joy/Box"
import Typography from "@mui/joy/Typography"

type EditPostState = {
  title?: string
  content?: string
  canton?: string
  examples?: string[]
}

const EditPostForm: FC<{ post: PostFragmentFragment }> = ({ post }) => {
  const {
    updatePost,
    loading: updatePostLoading,
    data: updatePostData,
  } = useUpdatePostMutations()
  const [editPostState, setEditPostState] = useState<EditPostState>({})

  const changesFound = useMemo(() => {
    const updatedFields = Object.keys(
      editPostState,
    ) as (keyof typeof editPostState)[]
    if (!updatedFields.length) return false
    return updatedFields.some(
      (key) =>
        !isEqual(
          Array.isArray(editPostState[key])
            ? (editPostState[key] as string[]).filter(
                (example) => example.length,
              )
            : editPostState[key],
          post[key],
        ),
    )
  }, [editPostState, post])

  const onValueChange = <K extends keyof EditPostState>(
    key: K,
    value: EditPostState[K] | null,
  ) => setEditPostState((prev) => ({ ...prev, [key]: value }))

  const disableFields = updatePostLoading && !!updatePostData?.updatePost?.id
  const preventSubmit = updatePostLoading || !changesFound

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (preventSubmit) return
    updatePost({
      id: post.id,
      title: editPostState.title,
      content: editPostState.content,
      canton: editPostState.canton,
      examples: editPostState.examples,
    })
  }

  return (
    <>
      <Box sx={{ mb: 1, alignItems: { xs: "start", sm: "center" } }}>
        <Typography level="h2" component="h1">
          Edit Post
        </Typography>
      </Box>
      <form onSubmit={onSubmit}>
        <Card
          actions={{
            save: {
              type: "submit",
              loading: updatePostLoading,
              disabled: preventSubmit,
              title: "Save Changes",
            },
            cancel: {
              disabled: !changesFound || updatePostLoading,
              onClick: () => setEditPostState({}),
            },
          }}
        >
          <WordInput
            label="Value"
            value={
              editPostState.title !== undefined
                ? editPostState.title
                : post.title
            }
            onChange={(value) => onValueChange("title", value)}
            required
            sx={{ pt: 1 }}
            disabled={disableFields}
          />
          <SelectLocation
            id="canton"
            mode="canton"
            value={
              editPostState.canton !== undefined
                ? editPostState.canton
                : post.canton
            }
            onChange={(canton) => onValueChange("canton", canton)}
            helperText="Select the canton where the word is used"
            disabled={disableFields}
          />
          <WordDescriptionInput
            value={
              (editPostState.content !== undefined
                ? editPostState.content
                : post.content) ?? ""
            }
            onChange={(value) => onValueChange("content", value)}
            label="Description"
            required
            sx={{ pt: 1 }}
            disabled={disableFields}
          />

          <WordExamplesInput
            values={
              (editPostState.examples !== undefined
                ? editPostState.examples
                : post.examples.length
                  ? post.examples
                  : [""]) ?? [""]
            }
            onChange={(examples) => onValueChange("examples", examples)}
            disabled={disableFields}
          />
        </Card>
      </form>
    </>
  )
}

export default EditPostForm
