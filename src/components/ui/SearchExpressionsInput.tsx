"use client"

import { useState, FC } from "react"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import FormControl, { FormControlProps } from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import FormHelperText from "@mui/material/FormHelperText"
import Search from "@mui/icons-material/Search"
import { useRouter, usePathname } from "@/i18n/navigation"
import { useSearchParams } from "next/navigation"
import { setQueryOnPage } from "@/utils/setQueryOnPage"
import { useQuery } from "@apollo/client/react"
import { getFragmentData, graphql } from "@/generated"
import {
  ExpressionOptionFragmentFragment,
  ExpressionsQueryInput,
} from "@/generated/graphql"
import { useTranslations } from "next-intl"
import { InputAdornment } from "@mui/material"

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

interface SearchExpressionsInputProps extends Omit<
  FormControlProps,
  "value" | "onChange"
> {
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
  const t = useTranslations()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [q, setQ] = useState<string | null>(null)
  const { data, previousData } = useSearchExpressionsQuery(
    { q, ...additionalQueryInput },
    !q,
  )
  const [selectedOption, setSelectedOption] =
    useState<ExpressionOptionFragmentFragment | null>(null)
  const options =
    getFragmentData(
      ExpressionOptionFragment,
      data?.expressionsQuery?.expressions ??
        previousData?.expressionsQuery?.expressions,
    ) ?? []

  return (
    <FormControl {...props} id="searchExpressions" size="small">
      {label ? <InputLabel shrink>{label}</InputLabel> : null}
      <Autocomplete
        options={
          selectedOption
            ? options.find(({ id }) => id === selectedOption.id)
              ? options
              : [selectedOption, ...options]
            : options
        }
        filterOptions={(options) => options}
        groupBy={(option) => option.title?.[0]?.toUpperCase() ?? ""}
        getOptionLabel={(option) => option.title ?? ""}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(_, option) => {
          setSelectedOption(option)
          setQueryOnPage(router, pathname, searchParams, {
            q: option?.title?.length ? option?.title : null,
          })
        }}
        onInputChange={(_, value) => {
          setQ(value.trim())
          setSelectedOption(null)
        }}
        blurOnSelect
        clearOnEscape
        autoComplete
        disableClearable={false}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={t("actions.search")}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <Search sx={{ padding: "2px" }} />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        )}
      />
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  )
}

export default SearchExpressionsInput
