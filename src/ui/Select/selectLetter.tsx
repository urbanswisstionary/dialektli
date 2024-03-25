import type { FC } from "react"
import Grid from "@mui/joy/Grid"
import Card from "@mui/joy/Card"
import { allLetters } from "./helper"
import FormLabel from "@mui/joy/FormLabel"
import FormHelperText from "@mui/joy/FormHelperText"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"

interface SelectLetterProps
  extends Omit<FormControlProps, "value" | "onChange"> {
  value?: string
  onChange?: (_value: string) => void
  label?: string
  helperText?: string
}

const SelectLetter: FC<SelectLetterProps> = ({
  value,
  onChange,
  label,
  helperText,
  ...props
}) => (
  <FormControl {...props}>
    {label ? <FormLabel>{label}</FormLabel> : null}
    <Grid container direction="row" justifyContent="flex-start" spacing={0.5}>
      {allLetters.map((letter, i) => (
        <Grid key={i}>
          <Card
            aria-label={letter}
            onClick={() => {
              if (onChange) onChange(letter)
            }}
            sx={[
              {
                py: 1,
                px: 2,
                alignItems: "center",
                width: "4ch",
                backgroundColor:
                  value?.toUpperCase() === letter
                    ? "background.level1"
                    : "inherit",
                boxShadow:
                  "var(--joy-shadowRing, 0 0 #000),0px 1px 2px 0px rgba(var(--joy-shadowChannel, 21 21 21) / var(--joy-shadowOpacity, 0.08))",
                boxSizing: "border-box",
                ":hover": {
                  cursor: "pointer",
                  backgroundColor: "background.level2",
                },
              },
              props.disabled
                ? {
                    pointerEvents: "none",
                    backgroundColor: "background.level1",
                    opacity: 0.5,
                  }
                : {},
            ]}
          >
            {letter}
          </Card>
        </Grid>
      ))}
    </Grid>
    {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
  </FormControl>
)

export default SelectLetter
