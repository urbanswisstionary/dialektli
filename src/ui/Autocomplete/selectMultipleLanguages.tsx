import Autocomplete from "@mui/joy/Autocomplete"
import { FC, useMemo } from "react"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import FormHelperText from "@mui/joy/FormHelperText"
import SelectLocationOption from "./selectLocationOption"
import SelectMultipleLocationTag from "./selectMultipleLocationTag"
import { useTranslation } from "next-i18next"
import type { Language } from "@@/generated/graphql"
import { languages } from "./helper"

type SelectMultipleLanguagesProps = Omit<
  FormControlProps,
  "value" | "onChange"
> & {
  value: Language[] | null | undefined
  onChange: (_locationCode: Language[] | null) => void
  placeholder?: string
  helperText?: string
  label?: string
  limitTags?: number
}

const SelectMultipleLanguages: FC<SelectMultipleLanguagesProps> = ({
  placeholder,
  helperText,
  label,
  value,
  onChange,
  limitTags,
  ...props
}) => {
  const { t } = useTranslation("common")
  const options = useMemo(
    () =>
      languages.map((language) => ({
        label: t(`selectLanguage.${language}`),
        code: language,
      })),
    [t],
  )

  const values = useMemo(
    () => (value ?? []).map((code) => options.find((o) => o.code === code)!),
    [options, value],
  )
  return (
    <FormControl {...props}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <Autocomplete
        multiple
        placeholder={placeholder ?? t(`selectLanguage.title`)}
        size="sm"
        autoHighlight
        options={options}
        getOptionLabel={(option) => option.label}
        value={values}
        onChange={(_e, options) => {
          const values = options.map(({ code }) => code)
          onChange(values.length ? values.sort() : null)
        }}
        renderOption={(optionProps, option) => (
          <SelectLocationOption
            {...optionProps}
            mode={"country"}
            label={option.label}
            flagCode={option.code}
          />
        )}
        renderTags={(tags, getTagProps) =>
          tags.map((option, index) => (
            <SelectMultipleLocationTag
              option={option}
              mode={"country"}
              {...getTagProps({ index })}
              key={index}
            />
          ))
        }
        limitTags={limitTags}
        openText={t("actions.open")}
        clearText={t("actions.clear")}
        closeText={t("actions.close")}
        filterSelectedOptions
        disableCloseOnSelect
      />
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  )
}

export default SelectMultipleLanguages
