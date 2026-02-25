"use client"

import { FC, useEffect, useState } from "react"

import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface DebouncedTextareaProps {
  value: string
  onChange: (_value: string) => void
  debounce?: number
  minRows?: number
  className?: string
  disabled?: boolean
  placeholder?: string
  id?: string
  name?: string
  autoFocus?: boolean
  readOnly?: boolean
  required?: boolean
  maxLength?: number
  "aria-label"?: string
  "aria-describedby"?: string
}

const DebouncedTextarea: FC<DebouncedTextareaProps> = ({
  value,
  onChange,
  debounce = 500,
  minRows = 4,
  className,
  disabled,
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
    <Textarea
      value={textareaState}
      onChange={(e) => setTextareaState(e.target.value)}
      rows={minRows}
      className={cn("resize-y", className)}
      disabled={disabled}
      {...props}
    />
  )
}

export default DebouncedTextarea
