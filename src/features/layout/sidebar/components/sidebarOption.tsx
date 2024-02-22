import type { FC, ReactNode } from "react"
import ListItem from "@mui/joy/ListItem"
import ListItemButton from "@mui/joy/ListItemButton"
import ListItemContent from "@mui/joy/ListItemContent"
import Typography from "@mui/joy/Typography"
import Toggler from "@/ui/Toggler"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import List from "@mui/joy/List"
import Link from "next/link"
import { IconButton } from "@mui/joy"
import { useTranslation } from "next-i18next"

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
  const { t } = useTranslation("common")

  if (hide) return null
  if (nested)
    return (
      <ListItem nested={nested}>
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
              {startDecorator}
              <ListItemContent>
                <Typography level="title-sm">{label}</Typography>
              </ListItemContent>
              {endDecorator}
              <IconButton
                variant="plain"
                size="sm"
                onClick={() => setOpen(!open)}
                title={t(`actions.${open ? "collapse" : "expand"}`)}
              >
                <ArrowDropDownIcon
                  sx={{
                    transform: open ? "rotate(-180deg)" : "none",
                    borderRadius: "var(--joy-radius-sm)",
                    ":hover": {
                      backgroundColor: "var(--joy-palette-background-level2)",
                    },
                  }}
                />
              </IconButton>
            </ListItemButton>
          )}
        >
          <List sx={{ gap: 0.5 }}>
            {nestedOptions.map((props, i) => (
              <SidebarOption key={i} {...props} firstOfType={!i} />
            ))}
          </List>
        </Toggler>
      </ListItem>
    )
  return (
    <ListItem
      sx={{
        ":first-of-type": firstOfType ? { mt: 0.5 } : undefined,
      }}
      component={link && !selected && !disabled ? Link : "div"}
      href={link}
    >
      <ListItemButton
        selected={selected}
        disabled={selected || disabled}
        onClick={() => {
          if (onClick) onClick()
        }}
      >
        {startDecorator}
        <ListItemContent>
          <Typography level="title-sm">{label}</Typography>
        </ListItemContent>
        {endDecorator}
      </ListItemButton>
    </ListItem>
  )
}

export default SidebarOption
