"use client"

import type { FC, PropsWithChildren, ReactNode } from "react"
import List from "@mui/material/List"
import ListSubheader from "@mui/material/ListSubheader"

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
    <ListSubheader
      sx={{
        borderBottom: "1.5px solid",
        borderColor: "divider",
        pb: 1,
        mb: 1,
        display: "block",
        color: disabled ? "text.disabled" : undefined,
      }}
    >
      {label}
    </ListSubheader>
    {children}
  </List>
)

export default ExpressionCardContentList
