import type { FC, ReactNode } from "react"
import ListItem from "@mui/joy/ListItem"
import ListItemButton from "@mui/joy/ListItemButton"
import ListItemContent from "@mui/joy/ListItemContent"
import Typography from "@mui/joy/Typography"
import Toggler from "@/ui/Toggler"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import List from "@mui/joy/List"
import Link from "next/link"

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
}) =>
  hide ? null : nested ? (
    <ListItem nested={nested}>
      <Toggler
        defaultExpanded={defaultExpanded}
        renderToggle={({ open, setOpen }) => (
          <ListItemButton
            disabled={disabled}
            onClick={() => {
              if (onClick && process.env.NODE_ENV !== "production") {
                console.info(
                  `nested SidebarOption "${label}" was passed a click handler, it will be ignored!`,
                )
              }
              setOpen(!open)
            }}
          >
            {startDecorator}
            <ListItemContent>
              <Typography level="title-sm">{label}</Typography>
            </ListItemContent>
            <KeyboardArrowDownIcon
              sx={{ transform: open ? "rotate(180deg)" : "none" }}
            />
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
  ) : (
    <ListItem
      sx={{
        ":first-of-type": firstOfType ? { mt: 0.5 } : undefined,
      }}
      component={link ? Link : "div"}
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

export default SidebarOption
