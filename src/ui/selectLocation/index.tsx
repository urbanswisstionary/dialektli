import Autocomplete from "@mui/joy/Autocomplete"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import { FC, useMemo } from "react"
import FormHelperText from "@mui/joy/FormHelperText"
import Flag from "@/ui/Flag"
import SelectLocationOption from "./selectLocationOption"
import { LocationOption, cantons, countries } from "./helper"

const SelectLocation: FC<
  Omit<FormControlProps, "value" | "onChange"> & {
    value: string | null | undefined
    onChange: (_locationCode: string | null) => void
    mode: "canton" | "country"
    helperText?: string
    label?: string | false
  }
> = ({ value, onChange, mode, label, helperText, sx, ...props }) => {
  const options = useMemo(() => getOptions(mode), [mode])
  const valueIndex = useMemo(
    () => options.findIndex((c) => c.code === value),
    [value, options],
  )
  if (!mode) return null
  return (
    <div>
      <FormControl
        {...props}
        sx={[
          { display: { sm: "contents" } },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        {label !== false ? (
          <FormLabel sx={{ textTransform: "capitalize" }}>
            {label ?? mode}
          </FormLabel>
        ) : null}
        <Autocomplete
          size="sm"
          autoHighlight
          isOptionEqualToValue={(option, value) => option.code === value?.code}
          value={valueIndex === -1 ? null : options[valueIndex]}
          onChange={(_e, canton) => {
            if (onChange) onChange(canton?.code ?? null)
          }}
          options={options}
          renderOption={(optionProps, option) => (
            <SelectLocationOption
              {...optionProps}
              mode={mode}
              label={option.label}
              flagCode={option.code.toLowerCase()}
            />
          )}
          startDecorator={
            value ? <Flag mode={mode} code={value.toLowerCase()} /> : null
          }
        />
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </div>
  )
}

export default SelectLocation

const getOptions = (mode: "canton" | "country"): LocationOption[] =>
  mode === "canton" ? cantons : countries
