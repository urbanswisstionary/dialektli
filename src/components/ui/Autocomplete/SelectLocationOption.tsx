"use client"

import MenuItem, { MenuItemProps } from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import Avatar from "@mui/material/Avatar"
import type { FC } from "react"
import Flag from "@/components/ui/Flag"

interface SelectLocationOptionProps extends MenuItemProps {
  mode: "canton" | "country"
  label: string
  flagCode: string
}

const SelectLocationOption: FC<SelectLocationOptionProps> = ({
  mode,
  label,
  flagCode,
  ...props
}) => (
  <MenuItem {...props}>
    <ListItemIcon>
      <Avatar
        sx={{ width: 20, height: 20, borderRadius: "50%" }}
        variant="square"
      >
        <Flag mode={mode} code={flagCode} />
      </Avatar>
    </ListItemIcon>
    {label}
  </MenuItem>
)

export default SelectLocationOption
