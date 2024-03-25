import { FC, useEffect, useState } from "react"
import Input, { InputProps } from "@mui/joy/Input"
import IconButton from "@mui/joy/IconButton"
import ClearIcon from "@mui/icons-material/Clear"
import { useTranslation } from "next-i18next"

interface DebouncedInputProps extends Omit<InputProps, "value" | "onChange"> {
  value: string
  onChange: (_value: string) => void
  debounce?: number
  disableClearable?: boolean
}

/**
 * DebouncedInput component for handling delayed input changes with optional clear functionality.
 *
 * @component
 * @example
 * // Usage example with TypeScript:
 * <DebouncedInput
 *   value={inputValue}
 *   onChange={(value: string) => handleInputChange(value)}
 *   debounce={500}
 *   placeholder="Type something..."
 * />
 *
 * @param {string} value - The current value of the input.
 * @param {(_value: string) => void} onChange - Callback function triggered on input change.
 * @param {number} [debounce=500] - Debounce time in milliseconds (default is 500).
 * @param {boolean} [disableClearable=false] - Disables the clear button when true.
 * @params {...InputProps} props - Additional props from JOY MUI Input component.
 */
const DebouncedInput: FC<DebouncedInputProps> = ({
  value,
  onChange,
  debounce = 500,
  disableClearable,
  ...props
}) => {
  const { t } = useTranslation("common")
  const [inputState, setInputState] = useState(value)

  useEffect(() => {
    setInputState(value)
  }, [value])

  useEffect(() => {
    const timeout = setTimeout(() => onChange(inputState), debounce)
    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputState])

  return (
    <Input
      value={inputState}
      onChange={(e) => setInputState(e.target.value)}
      endDecorator={
        !disableClearable && inputState.toString().length ? (
          <IconButton
            onClick={() => setInputState("")}
            title={t("actions.clear")}
          >
            <ClearIcon />
          </IconButton>
        ) : null
      }
      {...props}
    />
  )
}

export default DebouncedInput
