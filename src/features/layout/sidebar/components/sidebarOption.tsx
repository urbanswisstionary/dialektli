import type { FC, ReactNode } from "react"
import ListItem from "@mui/joy/ListItem"
import ListItemButton from "@mui/joy/ListItemButton"
import ListItemContent from "@mui/joy/ListItemContent"
import Typography from "@mui/joy/Typography"
import Toggler from "@/ui/Toggler"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import List from "@mui/joy/List"

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
}) =>
  hide ? null : nested ? (
    <ListItem nested={nested}>
      <Toggler
        defaultExpanded={defaultExpanded}
        renderToggle={({ open, setOpen }) => (
          <SidebarOption
            label={label}
            startDecorator={startDecorator}
            endDecorator={
              <KeyboardArrowDownIcon
                sx={{ transform: open ? "rotate(180deg)" : "none" }}
              />
            }
            disabled={disabled}
            onClick={() => {
              if (onClick && process.env.NODE_ENV !== "production") {
                console.info(
                  `nested SidebarOption "${label}" was passed a click handler, it will be ignored!`,
                )
              }
              setOpen(!open)
            }}
          />
        )}
      >
        <List sx={{ gap: 0.5, ":first-child": { mt: 0.5 } }}>
          {nestedOptions.map((props, i) => (
            <SidebarOption key={i} {...props} />
          ))}
        </List>
      </Toggler>
    </ListItem>
  ) : (
    <ListItem>
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
