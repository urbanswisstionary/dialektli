"use client"

import { type FC, useMemo } from "react"
import { ExpressionType } from "@/generated/graphql"
import { useTranslations } from "next-intl"
import FormControl, { type FormControlProps } from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import FormHelperText from "@mui/material/FormHelperText"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { Box } from "@mui/material"

export const expressionTypes = Object.values(ExpressionType)

interface ExpressionTypeInputProps extends Omit<FormControlProps, "onChange"> {
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
  const t = useTranslations()
  const options = useMemo(
    () =>
      expressionTypes.map((type) => ({
        type,
        label: t(`expression.types.${type}.label`),
        description: t(`expression.types.${type}.description`),
      })),
    [t],
  )
  const selectedOption = useMemo(
    () => options.find(({ type }) => type === value) ?? null,
    [value, options],
  )
  return (
    <FormControl {...props}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <Autocomplete
        size="small"
        autoHighlight
        isOptionEqualToValue={(option, value) => option.type === value?.type}
        value={selectedOption}
        onChange={(_, option) => {
          if (onChange) onChange(option?.type ?? null)
        }}
        options={options}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => (
          <Box
            {...props}
            component="li"
            sx={{
              alignItems: "flex-start",
              flexDirection: "column",
              gap: 0,
              display: "flex",
              borderBottom: "1px solid",
              borderColor: "divider",
              paddingBlock: 1,
            }}
          >
            <Typography variant="subtitle2">{option.label}</Typography>
            <Typography variant="caption">{option.description}</Typography>
          </Box>
        )}
        renderInput={(params) => (
          <TextField {...params} placeholder="Select a type" />
        )}
      />
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  )
}

export default ExpressionTypeInput
