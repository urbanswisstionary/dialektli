import { FC, useEffect, useState } from "react"
import Input from "@mui/joy/Input"
import IconButton from "@mui/joy/IconButton"
import ClearIcon from "@mui/icons-material/Clear"

type DebouncedInputProps = {
  value: string | number
  onChange: (_value: string | number) => void
  debounce?: number
  placeholder?: string
  disabled?: boolean
}

const DebouncedInput: FC<DebouncedInputProps> = ({
  value,
  onChange,
  debounce = 500,
  placeholder,
  disabled,
}) => {
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
        inputState.toString().length ? (
          <IconButton onClick={() => setInputState("")}>
            <ClearIcon />
          </IconButton>
        ) : null
      }
      sx={{ py: 1, px: 2, borderRadius: "md", fontSize: "lg" }}
      placeholder={placeholder}
      disabled={disabled}
    />
  )
}

export default DebouncedInput
