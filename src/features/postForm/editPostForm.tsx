import { FC, FormEventHandler, useMemo, useState } from "react"
import Card from "@/ui/Card"
import WordInput from "./components/wordInput"
import WordDescriptionInput from "./components/wordDescriptionInput"
import WordExamplesInput from "./components/wordExamplesInput"
import { useUpdatePostMutations } from "@/hooks/usePosts"
import SelectLocation from "../Auth/profile/components/selectLocation"
import { PostFragmentFragment, UpdatePostInput } from "@@/generated/graphql"
import isEqual from "lodash/isEqual"
import Box from "@mui/joy/Box"
import Typography from "@mui/joy/Typography"
import { useRouter } from "next/router"
import Link from "@mui/joy/Link"

type EditPostState = {
  title?: string
  content?: string
  canton?: string
  examples?: string[]
}

const EditPostForm: FC<{
  post: PostFragmentFragment
  authorized: boolean
  reviewBeforPublish?: boolean
  anonymous?: boolean
}> = ({ post, authorized, reviewBeforPublish, anonymous }) => {
  const router = useRouter()
  const {
    updatePost,
    loading: updatePostLoading,
    data: updatePostData,
  } = useUpdatePostMutations()
  const [editPostState, setEditPostState] = useState<EditPostState>({})

  const changesFound = useMemo(() => {
    const updatedFields = Object.keys(editPostState) as (keyof EditPostState)[]
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

  const onChange = <K extends keyof EditPostState>(
    key: K,
    value: EditPostState[K] | null,
  ) => setEditPostState((prev) => ({ ...prev, [key]: value }))

  const disableFields =
    !authorized || (updatePostLoading && !!updatePostData?.updatePost?.id)
  const preventSubmit =
    !authorized || updatePostLoading || (!changesFound && post.published)

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (preventSubmit) return
    const updatePostInput: UpdatePostInput = {
      id: post.id,
      title: editPostState.title,
      content: editPostState.content,
      canton: editPostState.canton,
      examples: editPostState.examples,
      published: true,
    }
    updatePost(updatePostInput, () =>
      router.push("/account/profile?view=posts"),
    )
  }

  const claimOnwershipLink = (
    <Link
      href={`mailto:urbanswisstionary@gmail.com?subject=Claim ownership over "${post.title}", id "${post.id}"&body=Hi, I would like to claim ownership over "${post.title}", id "${post.id}" and here I provide proofs of my claim.`}
    >
      claim ownership
    </Link>
  )
  return (
    <>
      <Box sx={{ mb: 1, alignItems: { xs: "start", sm: "center" } }}>
        <Typography px={2} level="h2" component="h1">
          Edit Post
        </Typography>
        {!authorized ? (
          <>
            <Typography level="body-lg" color="warning" p={2}>
              You are not authorized to edit this post
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
            {claimOnwershipLink} of the post, or in case you prefer to remain
            anonymous, your post will be submitted for review by an
            administrator before being published anonymously.
          </Typography>
        ) : null}
      </Box>
      <form onSubmit={onSubmit}>
        <Card
          actions={{
            save: {
              type: "submit",
              loading: updatePostLoading,
              disabled: preventSubmit,
              title: "publish",
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
            onChange={(title) => onChange("title", title)}
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
            onChange={(canton) => onChange("canton", canton)}
            helperText="Select the canton where the word is used"
            disabled={disableFields}
          />
          <WordDescriptionInput
            value={
              (editPostState.content !== undefined
                ? editPostState.content
                : post.content) ?? ""
            }
            onChange={(value) => onChange("content", value)}
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
            onChange={(examples) => onChange("examples", examples)}
            disabled={disableFields}
          />
        </Card>
      </form>
    </>
  )
}

export default EditPostForm
