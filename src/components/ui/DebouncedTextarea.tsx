"use client"

import { FC, useEffect, useState } from "react"
import TextField, { TextFieldProps } from "@mui/material/TextField"

interface DebouncedTextareaProps extends Omit<
  TextFieldProps,
  "value" | "onChange"
> {
  value: string
  onChange: (_value: string) => void
  debounce?: number
}

const DebouncedTextarea: FC<DebouncedTextareaProps> = ({
  value,
  onChange,
  debounce = 500,
  minRows = 4,
  maxRows = 6,
  ...props
}) => {
  const [textareaState, setTextareaState] = useState(value)

  useEffect(() => {
    setTextareaState(value)
  }, [value])

  useEffect(() => {
    const timeout = setTimeout(() => onChange(textareaState), debounce)
    return () => clearTimeout(timeout)
  }, [textareaState, onChange, debounce])

  return (
    <TextField
      value={textareaState}
      onChange={(e) => setTextareaState(e.target.value)}
      multiline
      minRows={minRows}
      maxRows={maxRows}
      {...props}
    />
  )
}

export default DebouncedTextarea
