"use client"

import Chip, { ChipProps } from "@mui/material/Chip"
import Avatar from "@mui/material/Avatar"
import type { FC } from "react"
import Flag from "@/components/ui/Flag"
import type { LocationOption } from "./helper"

interface SelectMultipleLocationTagProps extends ChipProps {
  option: LocationOption
  mode: "canton" | "country"
}

const SelectMultipleLocationTag: FC<SelectMultipleLocationTagProps> = ({
  option,
  mode,
  ...props
}) => (
  <Chip
    {...props}
    avatar={
      <Avatar
        sx={{ width: 20, height: 20, borderRadius: "50%" }}
        variant="square"
      >
        <Flag mode={mode} code={option.code} />
      </Avatar>
    }
    label={option.label}
  />
)

export default SelectMultipleLocationTag
