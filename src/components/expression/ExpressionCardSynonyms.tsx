"use client"

import type { FC } from "react"
import ListItem from "@mui/material/ListItem"
import { useTranslations } from "next-intl"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import { ExpressionFragmentFragment } from "@/generated/graphql"
import Flag from "@/components/ui/Flag"
import { Link as I18nLink } from "@/i18n/navigation"
import ExpressionCardContentList from "./ExpressionCardContentList"

type ExpressionCardSynonymsProps = {
  expression: ExpressionFragmentFragment
}

const ExpressionCardSynonyms: FC<ExpressionCardSynonymsProps> = ({
  expression,
}) => {
  const t = useTranslations()

  return (
    <ExpressionCardContentList label={`${t("expression.synonyms")}:`}>
      {expression.synonyms?.map(({ synonymOf: s }, i) =>
        s ? (
          <ListItem key={i}>
            <ListItemText>
              <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid size={{ xs: 8 }}>
                  <Link
                    component={I18nLink}
                    href={`/expressions/${s.id}`}
                    variant="body2"
                  >
                    {s.title}
                  </Link>
                </Grid>
                <Grid
                  size={{ xs: 4 }}
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    flexWrap: "wrap",
                    gap: "2px",
                  }}
                >
                  {s.cantons?.map((canton: string, i: number) => (
                    <Flag key={i} mode="canton" code={canton} />
                  ))}
                </Grid>
              </Grid>
            </ListItemText>
          </ListItem>
        ) : null,
      )}
      {expression.synonyms?.length ? <Divider /> : null}
      <ListItem sx={{ listStyleType: "none" }}>
        <Link
          href={`/expressions/new?synonym=${expression.id}`}
          variant="subtitle2"
          fontWeight={600}
          component={I18nLink}
        >
          {t("expression.suggestSynonym")}
        </Link>
      </ListItem>
    </ExpressionCardContentList>
  )
}

export default ExpressionCardSynonyms
