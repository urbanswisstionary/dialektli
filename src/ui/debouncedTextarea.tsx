import { FC, useEffect, useState } from "react"
import Textarea, { TextareaProps } from "@mui/joy/Textarea"

interface DebouncedTextareaProps
  extends Omit<TextareaProps, "value" | "onChange"> {
  value: string
  onChange: (_value: string) => void
  debounce?: number
  disableClearable?: boolean
}

/**
 * DebouncedTextarea component for handling delayed textarea changes with optional clear functionality.
 *
 * @component
 * @example
 * // Usage example with TypeScript:
 * <DebouncedTextarea
 *   value={textareaValue}
 *   onChange={(value: string) => handleTextareaChange(value)}
 *   debounce={500}
 *   placeholder="Type something..."
 * />
 *
 * @param {string} value - The current value of the textarea.
 * @param {(_value: string) => void} onChange - Callback function triggered on textarea change.
 * @param {number} [debounce=500] - Debounce time in milliseconds (default is 500).
 * @param {boolean} [disableClearable=false] - Disables the clear button when true.
 * @params {...TextareaProps} props - Additional props from JOY MUI Textarea component.
 */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textareaState])

  return (
    <Textarea
      value={textareaState}
      onChange={({ currentTarget: { value } }) => setTextareaState(value)}
      minRows={minRows}
      maxRows={maxRows}
      {...props}
    />
  )
}

export default DebouncedTextarea
