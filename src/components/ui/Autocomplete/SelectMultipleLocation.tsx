"use client"

import Autocomplete from "@mui/material/Autocomplete"
import { type FC, useMemo } from "react"
import { type LocationOption, getOptions } from "./helper"
import FormControl, { type FormControlProps } from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import FormHelperText from "@mui/material/FormHelperText"
import SelectLocationOption from "./SelectLocationOption"
import SelectMultipleLocationTag from "./SelectMultipleLocationTag"
import { useTranslations } from "next-intl"
import TextField from "@mui/material/TextField"

interface SelectMultipleLocationProps extends Omit<
  FormControlProps,
  "value" | "onChange"
> {
  value: string[] | null | undefined
  onChange: (_locationCode: string[] | null) => void
  mode: "canton" | "country"
  placeholder?: string
  helperText?: string
  label?: string
  limitTags?: number
  groupOptions?: boolean
}

const SelectMultipleLocation: FC<SelectMultipleLocationProps> = ({
  mode,
  placeholder,
  helperText,
  label,
  value,
  onChange,
  limitTags,
  groupOptions,
  ...props
}) => {
  const t = useTranslations()
  const options = useMemo(() => {
    const options = getOptions(mode)
    return groupOptions
      ? [...options].sort((a, b) =>
          !!a.language && !!b.language
            ? a.language.localeCompare(b.language)
            : !a.language || !b.language
              ? a.label.localeCompare(b.label)
              : 0,
        )
      : options
  }, [mode, groupOptions])

  const values = useMemo(
    () =>
      (value ?? []).map((code) =>
        options.find((o) => o.code === code),
      ) as LocationOption[],
    [options, value],
  )

  return (
    <FormControl {...props}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <Autocomplete
        multiple
        autoHighlight
        options={options}
        getOptionLabel={(option) => option.label}
        value={values}
        onChange={(_e, options) => {
          const values = options.map(({ code }) => code)
          onChange(values.length ? values.sort() : null)
        }}
        renderOption={({ key, ...props }, option) => (
          <SelectLocationOption
            key={key ?? option.code}
            {...props}
            mode={mode}
            label={option.label}
            flagCode={option.code}
          />
        )}
        renderTags={(tags, getTagProps) =>
          tags.map((option, index) => (
            <SelectMultipleLocationTag
              option={option}
              mode={mode}
              {...getTagProps({ index })}
              key={index}
            />
          ))
        }
        limitTags={limitTags}
        filterSelectedOptions
        disableCloseOnSelect
        groupBy={
          groupOptions
            ? (option) =>
                option.language
                  ? t(`selectLanguage.${option.language}`)
                  : option.label[0]
            : undefined
        }
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            placeholder={placeholder ?? t(`expression.${mode}FieldPlaceholder`)}
          />
        )}
      />
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  )
}

export default SelectMultipleLocation
