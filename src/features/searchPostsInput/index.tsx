import { useState, type FC } from "react"
import Autocomplete from "@mui/joy/Autocomplete"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import { usePostsQuery } from "@/hooks/usePosts"
import { useRouter } from "next/router"
import Search from "@mui/icons-material/Search"
import { setQueryOnPage } from "@/utils/setQueryOnPage"
import { ParsedUrlQuery } from "querystring"

type Query = ParsedUrlQuery & { q: string }
type Option = {
  __typename?: "Post"
  id: string
  title: string
}
const SearchPostsInput: FC<FormControlProps> = (formControlProps) => {
  const router = useRouter()
  const query = router.query as Query
  const { data, previousData } = usePostsQuery(query.q ?? "", !query.q?.length)
  const [selectedOption, setSelectedOption] = useState<Option | null>(null) // store selected option to prevent a no known option error getting logged to the console
  const options: Option[] = data?.posts ?? previousData?.posts ?? []

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
