import { type FC, useMemo } from "react"
import { ExpressionType } from "@@/generated/graphql"
import { useTranslation } from "react-i18next"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import FormHelperText from "@mui/joy/FormHelperText"
import Autocomplete from "@mui/joy/Autocomplete"
import AutocompleteOption from "@mui/joy/AutocompleteOption"
import Typography from "@mui/joy/Typography"

export const expressionTypes = Object.values(ExpressionType)

type ExpressionTypeInputProps = Omit<FormControlProps, "onChange"> & {
  value?: ExpressionType | null
  onChange?: (_type?: ExpressionType | null) => void
  label?: string
  helperText?: string
}

const ExpressionTypeInput: FC<ExpressionTypeInputProps> = ({
  value,
  onChange,
  label,
  helperText,
  ...props
}) => {
  const { t } = useTranslation("common")
  const options = useMemo(
    () =>
      expressionTypes.map((type) => ({
        type,
        label: t(`expression.types.${type}.label`),
        description: t(`expression.types.${type}.description`),
      })),
    [t],
  )
  const valueIndex = useMemo(
    () => options.findIndex(({ type }) => type === value),
    [value, options],
  )
  return (
    <FormControl {...props}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <Autocomplete
        slotProps={{
          listbox: {
            sx: {
              paddingBlock: 0,
            },
          },
        }}
        placeholder="Select a type"
        size="sm"
        autoHighlight
        isOptionEqualToValue={(option, value) => option.type === value?.type}
        value={valueIndex === -1 ? null : options[valueIndex]}
        onChange={(_, option) => {
          if (onChange) onChange(option?.type ?? null)
        }}
        options={options}
        renderOption={(optionProps, option) => (
          <AutocompleteOption
            {...optionProps}
            sx={{
              alignItems: "flex-start",
              flexDirection: "column",
              gap: 0,
              borderInline: "none",
              borderBlock: "1px solid",
              borderColor: "divider",
              '&[aria-selected="true"]': {
                fontWeight: "normal",
              },
            }}
          >
            <Typography level="title-sm">{option.label}</Typography>
            <Typography level="body-xs">{option.description}</Typography>
          </AutocompleteOption>
        )}
        openText={t("actions.open")}
        clearText={t("actions.clear")}
        closeText={t("actions.close")}
      />
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  )
}

export default ExpressionTypeInput
