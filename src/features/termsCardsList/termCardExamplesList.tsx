import type { FC } from "react"
import List from "@mui/joy/List"
import ListSubHeader from "@mui/joy/ListSubheader"
import ListItem from "@mui/joy/ListItem"
import { useTranslation } from "next-i18next"

type TermCardExamplesProps = {
  examples?: string[]
}

const TermCardExample: FC<TermCardExamplesProps> = ({ examples }) => {
  const { t } = useTranslation("common", { keyPrefix: "term" })

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
      <ListSubHeader>{t("examples")}</ListSubHeader>
      {examples.map((example, i) => (
        <ListItem key={i}>{example}</ListItem>
      ))}
    </List>
  )
}
export default TermCardExample
