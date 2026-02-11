"use client"

import type { FC } from "react"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import { allLetters } from "./helper"
import FormLabel from "@mui/material/FormLabel"
import FormHelperText from "@mui/material/FormHelperText"
import FormControl, { FormControlProps } from "@mui/material/FormControl"
import { useTheme } from "@mui/material/styles"

interface SelectLetterProps extends Omit<
  FormControlProps,
  "value" | "onChange"
> {
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
}) => {
  const theme = useTheme()

  return (
    <FormControl {...props}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <Grid container direction="row" justifyContent="flex-start" spacing={0.5}>
        {allLetters.map((letter, i) => (
          <Grid key={i}>
            <Card
              role="button"
              aria-label={letter}
              onClick={() => {
                if (onChange) onChange(letter)
              }}
              sx={{
                py: 1,
                px: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "4ch",
                backgroundColor:
                  value?.toUpperCase() === letter
                    ? theme.palette.action.selected
                    : "inherit",
                boxShadow: theme.shadows[1],
                cursor: props.disabled ? "default" : "pointer",
                pointerEvents: props.disabled ? "none" : "auto",
                opacity: props.disabled ? 0.5 : 1,
                "&:hover": props.disabled
                  ? {}
                  : {
                      backgroundColor: theme.palette.action.hover,
                    },
              }}
            >
              {letter}
            </Card>
          </Grid>
        ))}
      </Grid>
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  )
}

export default SelectLetter
