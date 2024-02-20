import type { FC } from "react"
import Grid from "@mui/joy/Grid"
import Card from "@mui/joy/Card"
import { allLetters } from "./helper"
import FormLabel from "@mui/joy/FormLabel"
import FormHelperText from "@mui/joy/FormHelperText"
import FormControl, { FormControlProps } from "@mui/joy/FormControl"

type SelectLetterProps = Omit<FormControlProps, "value" | "onChange"> & {
  value?: string
  onChange?: (_value: string) => void
  label?: string | false
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
    {label !== false ? (
      <FormLabel sx={{ textTransform: "capitalize" }}>
        {label ?? "Select Letter"}
      </FormLabel>
    ) : null}
    <Grid container direction="row" justifyContent="flex-start" spacing={0.5}>
      {allLetters.map((letter, i) => (
        <Grid key={i}>
          <Card
            onClick={() => {
              if (onChange) onChange(letter)
            }}
            sx={{
              p: 2,
              alignItems: "center",
              width: "4ch",
              backgroundColor:
                value?.toUpperCase() === letter
                  ? "background.level1"
                  : "inherit",
              ":hover": {
                cursor: "pointer",
                backgroundColor: "background.level2",
              },
            }}
          >
            {letter}
          </Card>
        </Grid>
      ))}
    </Grid>
    <FormHelperText>{helperText}</FormHelperText>
  </FormControl>
)

export default SelectLetter
