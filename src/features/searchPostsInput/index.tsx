import { useState, type FC } from "react"
import Autocomplete from "@mui/joy/Autocomplete"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import { useRouter } from "next/router"
import Search from "@mui/icons-material/Search"
import { setQueryOnPage } from "@/utils/setQueryOnPage"
import { ParsedUrlQuery } from "querystring"
import { useQuery } from "@apollo/client"
import { getFragmentData, graphql } from "@@/generated"
import { PostOptionFragmentFragment } from "@@/generated/graphql"

type Query = ParsedUrlQuery & { q: string }

const PostOptionFragment = graphql(/* GraphQL */ `
  fragment PostOptionFragment on Post {
    id
    title
  }
`)

const useSearchPostsQuery = (q: string, skip?: boolean) =>
  useQuery(
    graphql(/* GraphQL */ `
      query SearchPosts($q: String) {
        posts(q: $q) {
          ...PostOptionFragment
        }
      }
    `),
    { variables: { q }, skip },
  )

const SearchPostsInput: FC<FormControlProps> = (formControlProps) => {
  const router = useRouter()
  const query = router.query as Query
  const { data, previousData } = useSearchPostsQuery(
    query.q ?? "",
    !query.q?.length,
  )
  const [selectedOption, setSelectedOption] =
    useState<PostOptionFragmentFragment | null>(null) // store selected option to prevent a no known option error getting logged to the console
  const options =
    getFragmentData(PostOptionFragment, data?.posts ?? previousData?.posts) ??
    []

  return (
    <FormControl {...formControlProps} id="searchPosts">
      <Autocomplete
        placeholder="Search"
        options={selectedOption ? [selectedOption] : options}
        groupBy={(option) => option.title[0]?.toUpperCase()}
        getOptionLabel={(option) => option.title}
        onChange={(_, option) => {
          setSelectedOption(option)
          if (option?.id) router.push(`/post/${option.id}`)
        }}
        startDecorator={<Search sx={{ padding: "2px" }} />}
        blurOnSelect
        clearOnEscape
        autoComplete
        onInputChange={(_, value) => {
          const q = value.trim()
          setQueryOnPage(router, { q: q.length ? q : [] })
        }}
      />
    </FormControl>
  )
}

export default SearchPostsInput
