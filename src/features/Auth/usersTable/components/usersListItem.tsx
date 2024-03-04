import type { FC } from "react"
import Box from "@mui/joy/Box"
import type { AdminUsersFragmentFragment } from "@@/generated/graphql"
import TermStatusChip from "../../../../ui/TermStatusChip"
import Typography from "@mui/joy/Typography"
import ListItem from "@mui/joy/ListItem"
import ListItemContent from "@mui/joy/ListItemContent"
import ListItemDecorator from "@mui/joy/ListItemDecorator"
import Stack from "@mui/joy/Stack"
import Flag from "@/ui/Flag"
import { useTranslation } from "next-i18next"

const TermsListItem: FC<{ user: AdminUsersFragmentFragment }> = ({ user }) => {
  const { t } = useTranslation("common")
  return (
    <ListItem sx={{ display: "flex", alignItems: "start", p: 1 }}>
      <ListItemContent sx={{ display: "flex", gap: 2, alignItems: "start" }}>
        <ListItemDecorator>
          {/* <RowMenu term={term} /> */}
          <Stack gap={1}>
            {user.country ? <Flag mode="country" code={user.country} /> : null}
            {user.canton ? <Flag mode="canton" code={user.canton} /> : null}
          </Stack>
        </ListItemDecorator>

        <ListItemContent sx={{ flex: 1 }}>
          <Typography gutterBottom sx={{ textDecoration: "underline" }}>
            <b>{user.role}</b>
          </Typography>
          <Typography gutterBottom>
            <b>{t("auth.profile.name")}:</b> {user.name}
          </Typography>
          <Typography gutterBottom>
            <b>{t("auth.profile.email")}:</b> {user.email}
          </Typography>
          <Typography gutterBottom>
            <b>{t("term.published")}:</b> {user.publishedTermsCount}
          </Typography>
          <Typography gutterBottom>
            <b>{t("term.unpublished")}:</b> {user.unpublishedTermsCount}
          </Typography>
          <Typography gutterBottom>
            <b>Likes:</b> {user.likesCount}
          </Typography>
          <Typography gutterBottom>
            <b>Dislikes:</b> {user.dislikesCount}
          </Typography>
        </ListItemContent>
      </ListItemContent>
    </ListItem>
  )
}
export default TermsListItem
