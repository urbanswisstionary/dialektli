import type { FC, PropsWithChildren, ReactNode } from "react"
import List from "@mui/joy/List"
import ListSubHeader from "@mui/joy/ListSubheader"

type ExpressionCardContentListProps = {
  label?: ReactNode
  disabled?: boolean
}

const ExpressionCardContentList: FC<
  PropsWithChildren<ExpressionCardContentListProps>
> = ({ label, disabled, children }) => (
  <List
    sx={{
      borderTop: "1px solid",
      borderColor: "divider",
    }}
  >
    <ListSubHeader
      sx={{
        borderBottom: "1.5px solid",
        borderColor: "divider",
        pb: 1,
        mb: 1,
        display: "block",
        color: disabled
          ? "var(--joy-palette-neutral-plainDisabledColor)"
          : undefined,
      }}
    >
      {label}
    </ListSubHeader>
    {children}
  </List>
)

export default ExpressionCardContentList
