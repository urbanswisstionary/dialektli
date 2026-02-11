"use client"

import type { FC } from "react"
import FormControl, { FormControlProps } from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import DebouncedTextarea from "@/components/ui/DebouncedTextarea"

interface ExpressionDefinitionInputProps extends Omit<
  FormControlProps,
  "value" | "onChange"
> {
  value?: string
  onChange: (_value: string) => void
  label?: string
}

const ExpressionDefinitionInput: FC<ExpressionDefinitionInputProps> = ({
  value = "",
  onChange,
  label,
  ...formControlProps
}) => (
  <FormControl {...formControlProps}>
    {label ? <FormLabel>{label}</FormLabel> : null}
    <DebouncedTextarea
      value={value}
      onChange={(value) => onChange(value)}
      minRows={4}
      maxRows={8}
      fullWidth
    />
  </FormControl>
)

export default ExpressionDefinitionInput
