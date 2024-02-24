import Autocomplete from "@mui/joy/Autocomplete"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import { FC, useMemo } from "react"
import FormHelperText from "@mui/joy/FormHelperText"
import Flag from "@/ui/Flag"
import SelectLocationOption from "./selectLocationOption"
import { getOptions } from "./helper"
import { useTranslation } from "next-i18next"

type SelectSingleLocationProps = Omit<
  FormControlProps,
  "value" | "onChange"
> & {
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
  const { t } = useTranslation("common")
  const options = useMemo(() => {
    const options = getOptions(mode)
    return groupOptions
      ? [...options].sort(({ group: a }, { group: b }) =>
          !a || !b ? 0 : a.localeCompare(b),
        )
      : options
  }, [groupOptions, mode])

  const valueIndex = useMemo(
    () => options.findIndex((c) => c.code === value),
    [value, options],
  )
  if (!mode) return null
  return (
    <FormControl {...props}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <Autocomplete
        placeholder={placeholder ?? t(`term.${mode}FieldPlaceholder`)}
        size="sm"
        autoHighlight
        isOptionEqualToValue={(option, value) => option.code === value?.code}
        value={valueIndex === -1 ? null : options[valueIndex]}
        onChange={(_e, canton) => onChange(canton?.code ?? null)}
        options={options}
        renderOption={(optionProps, option) => (
          <SelectLocationOption
            {...optionProps}
            mode={mode}
            label={option.label}
            flagCode={option.code}
          />
        )}
        startDecorator={value ? <Flag mode={mode} code={value} /> : null}
        openText={t("actions.open")}
        clearText={t("actions.clear")}
        closeText={t("actions.close")}
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

export default SelectSingleLocation
