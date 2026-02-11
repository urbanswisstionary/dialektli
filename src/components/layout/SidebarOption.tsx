"use client"

import type { FC, ReactNode } from "react"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Typography from "@mui/material/Typography"
import Toggler from "@/components/ui/Toggler"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import List from "@mui/material/List"
import { Link } from "@/i18n/navigation"
import IconButton from "@mui/material/IconButton"
import { useTranslations } from "next-intl"
import Box from "@mui/material/Box"

type SidebarOptionProps = {
  hide?: boolean
  label: string
  onClick?: () => void
  selected?: boolean
  disabled?: boolean
  startDecorator?: ReactNode
  endDecorator?: ReactNode
  nested?: boolean
  nestedOptions?: SidebarOptionProps[]
  defaultExpanded?: boolean
  firstOfType?: boolean
  link?: string
}

const SidebarOption: FC<SidebarOptionProps> = ({
  hide,
  label,
  onClick,
  selected,
  disabled,
  startDecorator,
  endDecorator,
  nested,
  defaultExpanded,
  nestedOptions = [],
  firstOfType,
  link,
}) => {
  const t = useTranslations()

  if (hide) return null

  if (nested) {
    return (
      <ListItem
        disablePadding
        sx={{ flexDirection: "column", alignItems: "stretch" }}
      >
        <Toggler
          defaultExpanded={defaultExpanded}
          renderToggle={({ open, setOpen }) => (
            <ListItemButton
              selected={selected}
              disabled={disabled}
              onClick={() => {
                if (onClick) onClick()
                if (selected || !open) setOpen(!open)
              }}
            >
              {startDecorator && <Box sx={{ mr: 1.5 }}>{startDecorator}</Box>}
              <ListItemText
                primary={
                  <Typography variant="subtitle2" component="span">
                    {label}
                  </Typography>
                }
              />
              {endDecorator}
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation()
                  setOpen(!open)
                }}
                title={t(`actions.${open ? "collapse" : "expand"}`)}
                sx={{ ml: 1 }}
              >
                <ArrowDropDownIcon
                  sx={{
                    transform: open ? "rotate(-180deg)" : "none",
                    transition: "transform 0.2s",
                  }}
                />
              </IconButton>
            </ListItemButton>
          )}
        >
          <List sx={{ gap: 0.5, pl: 2 }}>
            {nestedOptions.map((props, i) => (
              <SidebarOption key={i} {...props} firstOfType={!i} />
            ))}
          </List>
        </Toggler>
      </ListItem>
    )
  }

  const content = (
    <ListItemButton
      selected={selected}
      disabled={selected || disabled}
      onClick={() => {
        if (onClick) onClick()
      }}
      component={link && !selected && !disabled ? Link : "div"}
      href={link || undefined}
    >
      {startDecorator && <Box sx={{ mr: 1.5 }}>{startDecorator}</Box>}
      <ListItemText
        primary={
          <Typography variant="subtitle2" component="span">
            {label}
          </Typography>
        }
      />
      {endDecorator}
    </ListItemButton>
  )

  return (
    <ListItem
      disablePadding
      sx={{
        ":first-of-type": firstOfType ? { mt: 0.5 } : undefined,
      }}
    >
      {content}
    </ListItem>
  )
}

export default SidebarOption
