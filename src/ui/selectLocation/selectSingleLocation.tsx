import Autocomplete from "@mui/joy/Autocomplete"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import { FC, useMemo } from "react"
import FormHelperText from "@mui/joy/FormHelperText"
import Flag from "@/ui/Flag"
import SelectLocationOption from "./selectLocationOption"
import { getOptions } from "./helper"

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
}

const SelectSingleLocation: FC<SelectSingleLocationProps> = ({
  value,
  onChange,
  mode,
  label,
  helperText,
  placeholder,
  ...props
}) => {
  const options = useMemo(() => getOptions(mode), [mode])
  const valueIndex = useMemo(
    () => options.findIndex((c) => c.code === value),
    [value, options],
  )
  if (!mode) return null
  return (
    <FormControl {...props}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <Autocomplete
        placeholder={placeholder ?? `Select a ${mode}`}
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
      />
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  )
}

export default SelectSingleLocation
