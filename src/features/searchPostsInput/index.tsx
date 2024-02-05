import { FC, useState } from "react"
import Autocomplete from "@mui/joy/Autocomplete"
import FormControl from "@mui/joy/FormControl"
import { usePostsQuery } from "@/hooks/usePosts"
import { useRouter } from "next/router"
import { setQueryOnPage } from "@/utils/setQueryOnPage"
import Search from "@mui/icons-material/Search"

const SearchPostsInput: FC = () => {
  const router = useRouter()

  const [searchState, setSearchState] = useState<string>("")
  const { data, previousData } = usePostsQuery(searchState)
  const options: {
    __typename?: "Post" | undefined
    id: string
    title: string
  }[] = data?.posts ?? previousData?.posts ?? []

  return (
    <FormControl>
      <Autocomplete
        placeholder="Search"
        options={options}
        groupBy={(option) => option.title[0]?.toUpperCase()}
        getOptionLabel={(option) => option.title}
        filterOptions={(options, { inputValue }) => {
          setSearchState(inputValue.trim())
          return options
        }}
        onChange={(_, value) => setQueryOnPage(router, { id: value?.id ?? [] })}
        startDecorator={<Search sx={{ padding: "2px" }} />}
        blurOnSelect
        clearOnEscape
        autoComplete
      />
    </FormControl>
  )
}

export default SearchPostsInput
