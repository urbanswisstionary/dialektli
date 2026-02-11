"use client"

import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import FormControl, { type FormControlProps } from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import { type FC, useMemo } from "react"
import FormHelperText from "@mui/material/FormHelperText"
import Flag from "@/components/ui/Flag"
import SelectLocationOption from "./SelectLocationOption"
import { getOptions } from "./helper"
import { useTranslations } from "next-intl"
import { InputAdornment } from "@mui/material"

interface SelectSingleLocationProps extends Omit<
  FormControlProps,
  "value" | "onChange"
> {
  value: string | null | undefined
  onChange: (_locationCode: string | null) => void
  mode: "canton" | "country"
  placeholder?: string
  helperText?: string
  label?: string
  groupOptions?: boolean
}

const SelectSingleLocation: FC<SelectSingleLocationProps> = ({
  value,
  onChange,
  mode,
  label,
  helperText,
  placeholder,
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
  }, [groupOptions, mode])

  const selectedOption = useMemo(
    () => options.find((c) => c.code === value) ?? null,
    [value, options],
  )

  if (!mode) return null

  return (
    <FormControl {...props}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <Autocomplete
        size="small"
        autoHighlight
        isOptionEqualToValue={(option, value) => option.code === value?.code}
        value={selectedOption}
        onChange={(_e, location) => onChange(location?.code ?? null)}
        options={options}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => (
          <SelectLocationOption
            {...props}
            key={option.code}
            mode={mode}
            label={option.label}
            flagCode={option.code}
          />
        )}
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
            placeholder={placeholder ?? t(`expression.${mode}FieldPlaceholder`)}
            InputProps={{
              ...params.InputProps,
              startAdornment: value ? (
                <>
                  <InputAdornment position="start">
                    <Flag mode={mode} code={value} />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              ) : (
                params.InputProps.startAdornment
              ),
            }}
          />
        )}
      />
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  )
}

export default SelectSingleLocation
