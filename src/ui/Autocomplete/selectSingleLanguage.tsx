import Autocomplete from "@mui/joy/Autocomplete"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import { FC, useMemo } from "react"
import FormHelperText from "@mui/joy/FormHelperText"
import Flag from "@/ui/Flag"
import SelectLocationOption from "./selectLocationOption"
import { useTranslation } from "next-i18next"
import { Language } from "@@/generated/graphql"

type SelectSingleLanguageProps = Omit<
  FormControlProps,
  "value" | "onChange"
> & {
  value: Language | null | undefined
  onChange: (_locationCode: Language | null) => void
  placeholder?: string
  helperText?: string
  label?: string
}

const SelectSingleLanguage: FC<SelectSingleLanguageProps> = ({
  value,
  onChange,
  label,
  helperText,
  placeholder,
  ...props
}) => {
  const { t } = useTranslation("common")
  const options = useMemo(
    () =>
      Object.values(Language).map((language) => ({
        label: t(`selectLanguage.${language}`),
        code: language,
      })),
    [t],
  )

  const valueIndex = useMemo(
    () => options.findIndex((c) => c.code === value),
    [value, options],
  )

  return (
    <FormControl {...props}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <Autocomplete
        placeholder={placeholder ?? t(`selectLanguage.title`)}
        size="sm"
        autoHighlight
        isOptionEqualToValue={(option, value) => option === value}
        value={valueIndex === -1 ? null : options[valueIndex]}
        onChange={(_e, option) => onChange(option?.code ?? null)}
        options={options}
        renderOption={(optionProps, option) => (
          <SelectLocationOption
            {...optionProps}
            mode={"country"}
            label={option.label}
            flagCode={option.code}
          />
        )}
        startDecorator={value ? <Flag mode={"country"} code={value} /> : null}
        openText={t("actions.open")}
        clearText={t("actions.clear")}
        closeText={t("actions.close")}
      />
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  )
}

export default SelectSingleLanguage
