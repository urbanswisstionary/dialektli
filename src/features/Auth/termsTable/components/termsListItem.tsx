import type { FC } from "react"
import Box from "@mui/joy/Box"
import RowMenu from "./rowMenu"
import type { AdminTermFragmentFragment } from "@@/generated/graphql"
import { formatDate } from "../termsTable.utils"
import TermStatusChip from "../../../../ui/TermStatusChip"
import Typography from "@mui/joy/Typography"
import ListItem from "@mui/joy/ListItem"
import ListItemContent from "@mui/joy/ListItemContent"
import ListItemDecorator from "@mui/joy/ListItemDecorator"
import Stack from "@mui/joy/Stack"
import Flag from "@/ui/Flag"

const TermsListItem: FC<{ term: AdminTermFragmentFragment }> = ({ term }) => (
  <ListItem sx={{ display: "flex", alignItems: "start", pr: 1 }}>
    <ListItemContent sx={{ display: "flex", gap: 2, alignItems: "start" }}>
      <ListItemDecorator>
        <RowMenu term={term} />
      </ListItemDecorator>

      <ListItemContent sx={{ flex: 1 }}>
        <Typography fontWeight={600} gutterBottom>
          {term.title}
        </Typography>

        <Typography level="body-xs" gutterBottom>
          {term.content}
        </Typography>

        {term.examples.length ? (
          <Stack gap={1}>
            {term.examples.map((example, i) => (
              <Typography
                key={i}
                level="body-xs"
                gutterBottom
                sx={{ wordBreak: "break-word" }}
              >
                {example}
              </Typography>
            ))}
          </Stack>
        ) : null}
        <Box sx={{ my: 1 }}>
          <Typography level="body-xs">
            <b>Last Updated:</b> {formatDate({ date: term.updatedAt })}
          </Typography>
        </Box>
      </ListItemContent>
      <Stack gap={2} width={120} sx={{ direction: "rtl" }}>
        <TermStatusChip status={term.published ? "published" : "unpublished"} />
        {term.cantons.length ? (
          <Stack direction="row" gap={1} flexWrap="wrap" pb={1} pr={1.25}>
            {term.cantons.map((canton, i) => (
              <Flag key={i} mode="canton" code={canton} />
            ))}
          </Stack>
        ) : null}
      </Stack>
    </ListItemContent>
  </ListItem>
)
export default TermsListItem
