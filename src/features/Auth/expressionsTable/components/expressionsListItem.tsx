import type { FC } from "react"
import Box from "@mui/joy/Box"
import RowMenu from "./rowMenu"
import type { AdminExpressionFragmentFragment } from "@@/generated/graphql"
import ExpressionStatusChip from "../../../../ui/ExpressionStatusChip"
import Typography from "@mui/joy/Typography"
import ListItem from "@mui/joy/ListItem"
import ListItemContent from "@mui/joy/ListItemContent"
import ListItemDecorator from "@mui/joy/ListItemDecorator"
import Stack from "@mui/joy/Stack"
import Flag from "@/ui/Flag"
import { useTranslation } from "react-i18next"
import { formatExpressionDate } from "@/features/expression/utils"
import { Locale } from "next/router"
import { tableDateFormat } from ".."

const ExpressionsListItem: FC<{
  expression: AdminExpressionFragmentFragment
}> = ({ expression }) => {
  const { t, i18n } = useTranslation("common", { keyPrefix: "expression" })

  return (
    <ListItem sx={{ display: "flex", alignItems: "start", pr: 1 }}>
      <ListItemContent sx={{ display: "flex", gap: 2, alignItems: "start" }}>
        <ListItemDecorator>
          <RowMenu expression={expression} />
        </ListItemDecorator>

        <ListItemContent sx={{ flex: 1 }}>
          <Typography fontWeight={600} gutterBottom>
            {expression.title}{" "}
            {expression.gender ? (
              <Typography
                component="span"
                level="body-sm"
                title={t(`genders.${expression.gender}`)}
                sx={{ textTransform: "lowercase" }}
              >
                ({expression.gender})
              </Typography>
            ) : null}{" "}
            {expression?.type ? (
              <Typography
                component="span"
                level="body-sm"
                color="primary"
                title={t(`types.${expression.type}.description`)}
              >
                {t(`types.${expression.type}.label`)}
              </Typography>
            ) : null}
          </Typography>

          <Typography level="body-md" gutterBottom>
            {expression.definition}
          </Typography>

          {expression.examples.length ? (
            <Stack gap={1}>
              {expression.examples.map((example, i) => (
                <Typography
                  key={i}
                  level="body-xs"
                  gutterBottom
                  sx={{ wordBreak: "break-word" }}
                >
                  {"example"}
                </Typography>
              ))}
            </Stack>
          ) : null}
          {expression.updatedAt ? (
            <Box sx={{ my: 1 }}>
              <Typography level="body-xs">
                <b>{t("updatedAt")}:</b>{" "}
                {formatExpressionDate({
                  date: expression.updatedAt,
                  locale: i18n.language as Locale,
                  format: tableDateFormat,
                })}
              </Typography>
            </Box>
          ) : null}
        </ListItemContent>
        <Stack gap={2} width={120} sx={{ direction: "rtl", pr: 2 }}>
          {/* <Flag mode="country" code={expression.language} /> */}
          <ExpressionStatusChip
            status={expression.published ? "published" : "unpublished"}
          />
          {expression.cantons.length ? (
            <Stack direction="row" gap={1} flexWrap="wrap" pb={1}>
              {expression.cantons.map((canton, i) => (
                <Flag key={i} mode="canton" code={canton} />
              ))}
            </Stack>
          ) : null}
        </Stack>
      </ListItemContent>
    </ListItem>
  )
}
export default ExpressionsListItem
