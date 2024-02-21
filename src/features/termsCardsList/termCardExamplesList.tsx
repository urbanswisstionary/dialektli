import type { FC } from "react"
import List from "@mui/joy/List"
import ListSubHeader from "@mui/joy/ListSubheader"
import ListItem from "@mui/joy/ListItem"

type TermCardExamplesProps = {
  examples?: string[]
}

const TermCardExample: FC<TermCardExamplesProps> = ({ examples }) => {
  if (!examples?.length) return null
  return (
    <List
      marker={"upper-roman"}
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
        px: 2,
      }}
    >
      <ListSubHeader>Examples</ListSubHeader>
      {examples.map((example, i) => (
        <ListItem key={i}>{example}</ListItem>
      ))}
    </List>
  )
}
export default TermCardExample
