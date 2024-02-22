import type { FC } from "react"
import Tooltip from "@mui/joy/Tooltip"
import Chip from "@mui/joy/Chip"
import Flag from "@/ui/Flag"
import type { AutocompleteRenderGetTagProps } from "@mui/joy/Autocomplete"
import { LocationOption } from "./helper"

type SelectMultipleLocationTagProps = {
  mode: "canton" | "country"
  option: LocationOption
} & ReturnType<AutocompleteRenderGetTagProps>

const SelectMultipleLocationTag: FC<SelectMultipleLocationTagProps> = ({
  mode,
  option: { code, label },
  ...props
}) => (
  <Tooltip title={label}>
    <Chip
      variant="plain"
      endDecorator={<Flag mode={mode} code={code} />}
      sx={{
        pt: 0.25,
        pb: 0.125,
        pl: 1,
        pr: 1.5,
        border: "1px solid",
        borderColor: "var(--joy-palette-neutral-outlinedBorder)",
        boxShadow:
          "var(--joy-shadowRing, 0 0 #000),0px 1px 2px 0px rgba(var(--joy-shadowChannel, 21 21 21) / var(--joy-shadowOpacity, 0.08))",
        boxSizing: "border-box",
        gap: 1,
      }}
      {...props}
    >
      {code}
    </Chip>
  </Tooltip>
)

export default SelectMultipleLocationTag
