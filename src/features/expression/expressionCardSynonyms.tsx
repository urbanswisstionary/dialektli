import type { FC } from "react"
import ListItem from "@mui/joy/ListItem"
import { useTranslation } from "next-i18next"
import ListItemContent from "@mui/joy/ListItemContent"
import ListDivider from "@mui/joy/ListDivider"
import Grid from "@mui/joy/Grid"
import JoyLink from "@mui/joy/Link"
import { ExpressionFragmentFragment } from "@@/generated/graphql"
import Flag from "@/ui/Flag"
import NextLink from "next/link"
import ExpressionCardContentList from "./expressionCardList"

type ExpressionCardSynonymsProps = {
  expression: ExpressionFragmentFragment
}

const ExpressionCardSynonyms: FC<ExpressionCardSynonymsProps> = ({
  expression,
}) => {
  const { t } = useTranslation("common", { keyPrefix: "expression" })

  return (
    <ExpressionCardContentList label={`${t("synonyms")}:`}>
      {expression.synonyms.map(({ synonymOf: s }, i) => (
        <ListItem key={i}>
          <ListItemContent>
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
              <Grid xs={8}>
                <JoyLink
                  component={NextLink}
                  href={`/expression/${s.id}`}
                  level="body-sm"
                >
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
          component={NextLink}
        >
          {t("suggestSynonym")}
        </JoyLink>
      </ListItem>
    </ExpressionCardContentList>
  )
}

export default ExpressionCardSynonyms
