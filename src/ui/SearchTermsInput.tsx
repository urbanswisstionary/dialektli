import { useState, FC } from "react"
import Autocomplete from "@mui/joy/Autocomplete"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import FormHelperText from "@mui/joy/FormHelperText"
import { useRouter } from "next/router"
import Search from "@mui/icons-material/Search"
import { setQueryOnPage } from "@/utils/setQueryOnPage"
import { useQuery } from "@apollo/client"
import { getFragmentData, graphql } from "@@/generated"
import { TermOptionFragmentFragment } from "@@/generated/graphql"
import { useTranslation } from "next-i18next"

const TermOptionFragment = graphql(/* GraphQL */ `
  fragment TermOptionFragment on Term {
    id
    title
  }
`)

const useSearchTermsQuery = (q: string, skip?: boolean) =>
  useQuery(
    graphql(/* GraphQL */ `
      query SearchTerm($data: TermsQueryInput!) {
        termsQuery(data: $data) {
          terms {
            ...TermOptionFragment
          }
        }
      }
    `),
    { variables: { data: { q } }, skip },
  )

type SearchTermsInputProps = Omit<FormControlProps, "value" | "onChange"> & {
  label?: string
  helperText?: string
}

const SearchTermsInput: FC<SearchTermsInputProps> = ({
  label,
  helperText,
  ...props
}) => {
  const { t } = useTranslation("common", { keyPrefix: "searchTermsInput" })
  const router = useRouter()
  const [query, setQuery] = useState("")
  const { data, previousData } = useSearchTermsQuery(query, !query.length)
  const [selectedOption, setSelectedOption] =
    useState<TermOptionFragmentFragment | null>(null) // store selected option to prevent a no known option error getting logged to the console
  const options = query.length
    ? getFragmentData(
        TermOptionFragment,
        data?.termsQuery?.terms ?? previousData?.termsQuery?.terms,
      ) ?? []
    : []

  return (
    <FormControl {...props} id="searchTerms" size="sm">
      {label ? <FormLabel>{label}</FormLabel> : null}
      <Autocomplete
        placeholder={t("search")}
        options={selectedOption ? [selectedOption] : options}
        groupBy={(option) => option.title[0]?.toUpperCase()}
        getOptionLabel={(option) => option.title}
        onChange={(_, option) => {
          setSelectedOption(option)
          setQueryOnPage(router, {
            q: option?.title.length ? option?.title : null,
          })
        }}
        startDecorator={<Search sx={{ padding: "2px" }} />}
        blurOnSelect
        clearOnEscape
        autoComplete
        onInputChange={(_, value) => setQuery(value.trim())}
      />
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  )
}

export default SearchTermsInput
