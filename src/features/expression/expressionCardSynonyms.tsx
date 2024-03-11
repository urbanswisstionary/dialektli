import type { FC } from "react"
import List from "@mui/joy/List"
import ListSubHeader from "@mui/joy/ListSubheader"
import ListItem from "@mui/joy/ListItem"
import { useTranslation } from "next-i18next"
import ListItemContent from "@mui/joy/ListItemContent"
import ListDivider from "@mui/joy/ListDivider"
import Grid from "@mui/joy/Grid"
import JoyLink from "@mui/joy/Link"

import { ExpressionFragmentFragment } from "@@/generated/graphql"
import Flag from "@/ui/Flag"

type ExpressionCardSynonymsProps = {
  expression: ExpressionFragmentFragment
}

const ExpressionCardSynonyms: FC<ExpressionCardSynonymsProps> = ({
  expression,
}) => {
  const { t } = useTranslation("common", { keyPrefix: "expression" })

  return (
    <List>
      <ListSubHeader
        sx={{
          borderBottom: "1.5px solid",
          borderColor: "divider",
          pb: 1,
          display: "block",
        }}
      >
        {t("synonyms")}:
      </ListSubHeader>
      {expression.synonyms.map(({ synonymOf: s }, i) => (
        <ListItem key={i}>
          <ListItemContent>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              <Grid xs={8}>
                <JoyLink href={`/expression/${s.id}`} level="body-sm">
                  {s.title}
                </JoyLink>
              </Grid>
              <Grid
                xs={4}
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  flexWrap: "wrap",
                  gap: "2px",
                }}
              >
                {s.cantons.map((canton, i) => (
                  <Flag key={i} mode="canton" code={canton} />
                ))}
              </Grid>
            </Grid>
          </ListItemContent>
        </ListItem>
      ))}
      {expression.synonyms.length ? <ListDivider /> : null}
      <ListItem sx={{ listStyleType: "none" }}>
        <JoyLink
          href={`/expression/new?synonym=${expression.id}`}
          level="title-sm"
          fontWeight={600}
        >
          {t("suggestSynonym")}
        </JoyLink>
      </ListItem>
    </List>
  )
}

export default ExpressionCardSynonyms
