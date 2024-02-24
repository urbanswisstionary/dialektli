import Autocomplete from "@mui/joy/Autocomplete"
import { FC, useMemo } from "react"
import { LocationOption, getOptions } from "./helper"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import FormHelperText from "@mui/joy/FormHelperText"
import SelectLocationOption from "./selectLocationOption"
import SelectMultipleLocationTag from "./selectMultipleLocationTag"
import { useTranslation } from "next-i18next"

type SelectMultipleLocationProps = Omit<
  FormControlProps,
  "value" | "onChange"
> & {
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
  const { t } = useTranslation("common")
  const options = useMemo(() => {
    const options = getOptions(mode)
    return groupOptions
      ? [...options].sort(({ group: a }, { group: b }) =>
          !a || !b ? 0 : a.localeCompare(b),
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
        placeholder={placeholder ?? t(`term.${mode}FieldPlaceholder`)}
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
        openText={t("actions.open")}
        clearText={t("actions.clear")}
        closeText={t("actions.close")}
        filterSelectedOptions
        disableCloseOnSelect
        groupBy={
          groupOptions
            ? (option) => (option.group ? option.group : option.label[0])
            : undefined
        }
      />
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  )
}

export default SelectMultipleLocation
