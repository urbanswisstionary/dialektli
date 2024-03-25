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
import {
  ExpressionOptionFragmentFragment,
  ExpressionsQueryInput,
} from "@@/generated/graphql"
import { useTranslation } from "next-i18next"
import { ParsedUrlQuery } from "querystring"

interface Query extends ParsedUrlQuery {
  q?: string
}

const ExpressionOptionFragment = graphql(/* GraphQL */ `
  fragment ExpressionOptionFragment on Expression {
    id
    title
  }
`)

const useSearchExpressionsQuery = (
  data: ExpressionsQueryInput,
  skip?: boolean,
) =>
  useQuery(
    graphql(/* GraphQL */ `
      query SearchExpression($data: ExpressionsQueryInput!) {
        expressionsQuery(data: $data) {
          expressions {
            ...ExpressionOptionFragment
          }
        }
      }
    `),
    { variables: { data }, skip },
  )

interface SearchExpressionsInputProps
  extends Omit<FormControlProps, "value" | "onChange"> {
  label?: string
  helperText?: string
  additionalQueryInput?: Omit<ExpressionsQueryInput, "q" | "offset" | "limit">
}

const SearchExpressionsInput: FC<SearchExpressionsInputProps> = ({
  label,
  helperText,
  additionalQueryInput = {},
  ...props
}) => {
  const { t } = useTranslation("common", { keyPrefix: "actions" })
  const router = useRouter()
  const [q, setQ] = useState<string | null>(null)
  const { data, previousData } = useSearchExpressionsQuery(
    { q, ...additionalQueryInput },
    !q,
  )
  const [selectedOption, setSelectedOption] =
    useState<ExpressionOptionFragmentFragment | null>(null) // store selected option to prevent a no known option error getting logged to the console
  const options =
    getFragmentData(
      ExpressionOptionFragment,
      data?.expressionsQuery?.expressions ??
        previousData?.expressionsQuery?.expressions,
    ) ?? []

  return (
    <FormControl {...props} id="searchExpressions" size="sm">
      {label ? <FormLabel>{label}</FormLabel> : null}
      <Autocomplete
        placeholder={t("search")}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        options={
          selectedOption
            ? options.find(({ id }) => id === selectedOption.id)
              ? options
              : [selectedOption, ...options]
            : options
        }
        filterOptions={(options) => options}
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
        onInputChange={(_, value) => setQ(value.trim())}
        slotProps={{
          input: {
            value: q ?? (router.query as Query).q ?? "",
          },
        }}
        disableClearable
      />
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  )
}

export default SearchExpressionsInput
