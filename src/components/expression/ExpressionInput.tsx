"use client"

import type { FC } from "react"
import FormControl, { FormControlProps } from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import { useState, useEffect } from "react"

interface ExpressionInputProps extends Omit<
  FormControlProps,
  "value" | "onChange"
> {
  value?: string
  onChange: (_value: string) => void
  label?: string
}

const ExpressionInput: FC<ExpressionInputProps> = ({
  value = "",
  onChange,
  label,
  ...formControlProps
}) => {
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  useEffect(() => {
    const timeout = setTimeout(() => onChange(inputValue), 250)
    return () => clearTimeout(timeout)
  }, [inputValue, onChange])

  return (
    <FormControl {...formControlProps}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <TextField
        size="medium"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        inputProps={{ autoComplete: "off", maxLength: 240 }}
        fullWidth
      />
    </FormControl>
  )
}

export default ExpressionInput
