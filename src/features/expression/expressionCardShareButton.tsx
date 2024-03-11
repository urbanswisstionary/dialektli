import { ExpressionFragmentFragment } from "@@/generated/graphql"
import type { FC } from "react"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import IconButton from "@mui/joy/IconButton"
import dynamic from "next/dynamic"
import ShareIcon from "@mui/icons-material/Share"
import Dropdown from "@mui/joy/Dropdown"
import Menu from "@mui/joy/Menu"
import MenuButton from "@mui/joy/MenuButton"
import MenuItem from "@mui/joy/MenuItem"
import { useTranslation } from "next-i18next"
import JoyLink from "@mui/joy/Link"

const EmailShare = dynamic(
  () => import("react-share-lite").then((module) => module.EmailShare),
  { ssr: false },
)
const FacebookShare = dynamic(
  () => import("react-share-lite").then((module) => module.FacebookShare),
  { ssr: false },
)
const LinkedinShare = dynamic(
  () => import("react-share-lite").then((module) => module.LinkedinShare),
  { ssr: false },
)

const TwitterShare = dynamic(
  () => import("react-share-lite").then((module) => module.TwitterShare),
  { ssr: false },
)
const WhatsappShare = dynamic(
  () => import("react-share-lite").then((module) => module.WhatsappShare),
  { ssr: false },
)

const ExpressionCardShareButtons: FC<{
  expression: ExpressionFragmentFragment
}> = ({ expression }) => {
  const { t } = useTranslation("common", { keyPrefix: "seo.share" })
  const url = `${typeof window !== "undefined" ? window?.location.origin : ""}/expression/${expression.id}`

  const buttonProps = {
    url,
    title: expression.title,
    size: 32,
    borderRadius: 10,
  } as const

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{
          root: { variant: "outlined", color: "neutral", size: "sm" },
        }}
        title={t("shareButton")}
      >
        <ShareIcon fontSize="small" />
      </MenuButton>
      <Menu
        size="sm"
        disablePortal
        keepMounted
        sx={{
          padding: 0,
          "> *": { pb: 0, pt: 0.75 },
          "> :first-child": { pt: 1 },
          "> :last-child": { pb: 1 },
        }}
      >
        <MenuItem title={t("facebook")}>
          <FacebookShare
            {...buttonProps}
            quote={expression.definition ?? expression.title}
            hashtag={`#${expression.title}`}
          />
        </MenuItem>
        <MenuItem title={t("twitter")}>
          <TwitterShare {...buttonProps} hashtags={[`#${expression.title}`]} />
        </MenuItem>
        <MenuItem title={t("linkedin")}>
          <LinkedinShare {...buttonProps} />
        </MenuItem>
        <MenuItem title={t("whatsapp")}>
          <WhatsappShare {...buttonProps} separator=":: " />
        </MenuItem>
        <MenuItem title={t("email")}>
          <EmailShare
            {...buttonProps}
            subject={expression.title}
            body={expression.definition ?? ""}
          />
        </MenuItem>
        <MenuItem
          title={t("copyLink")}
          onClick={() => navigator?.clipboard.writeText(url)}
          sx={{ justifyContent: "center" }}
        >
          <JoyLink
            variant="outlined"
            color="neutral"
            href={url}
            onClick={(e) => e.preventDefault()}
            sx={{
              py: 0.7,
              px: 0.7,
              borderRadius: "sm",
            }}
          >
            <ContentCopyIcon fontSize={"small"} />
          </JoyLink>
        </MenuItem>
      </Menu>
    </Dropdown>
  )
}
export default ExpressionCardShareButtons
