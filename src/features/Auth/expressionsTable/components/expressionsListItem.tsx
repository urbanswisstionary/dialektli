import type { FC } from "react"
import Box from "@mui/joy/Box"
import RowMenu from "./rowMenu"
import type { AdminExpressionFragmentFragment } from "@@/generated/graphql"
import { formatDate } from "../expressionsTable.utils"
import ExpressionStatusChip from "../../../../ui/ExpressionStatusChip"
import Typography from "@mui/joy/Typography"
import ListItem from "@mui/joy/ListItem"
import ListItemContent from "@mui/joy/ListItemContent"
import ListItemDecorator from "@mui/joy/ListItemDecorator"
import Stack from "@mui/joy/Stack"
import Flag from "@/ui/Flag"

const ExpressionsListItem: FC<{
  expression: AdminExpressionFragmentFragment
}> = ({ expression }) => (
  <ListItem sx={{ display: "flex", alignItems: "start", pr: 1 }}>
    <ListItemContent sx={{ display: "flex", gap: 2, alignItems: "start" }}>
      <ListItemDecorator>
        <RowMenu expression={expression} />
      </ListItemDecorator>

      <ListItemContent sx={{ flex: 1 }}>
        <Typography fontWeight={600} gutterBottom>
          {expression.title}
        </Typography>

        <Typography level="body-xs" gutterBottom>
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
        <Box sx={{ my: 1 }}>
          <Typography level="body-xs">
            <b>Last Updated:</b> {formatDate({ date: expression.updatedAt })}
          </Typography>
        </Box>
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
export default ExpressionsListItem
