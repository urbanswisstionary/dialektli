"use client"

import { useState } from "react"
import type { FC } from "react"
import { ExpressionFragmentFragment } from "@/generated/graphql"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import IconButton from "@mui/material/IconButton"
import dynamic from "next/dynamic"
import ShareIcon from "@mui/icons-material/Share"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { useTranslations } from "next-intl"
import Link from "@mui/material/Link"
import EmailIcon from "@mui/icons-material/Email"
import FacebookIcon from "@mui/icons-material/Facebook"
import XIcon from "@mui/icons-material/X"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"

const EmailShareButton = dynamic(
  () => import("react-share").then((module) => module.EmailShareButton),
  { ssr: false },
)
const FacebookShareButton = dynamic(
  () => import("react-share").then((module) => module.FacebookShareButton),
  { ssr: false },
)
const LinkedinShareButton = dynamic(
  () => import("react-share").then((module) => module.LinkedinShareButton),
  { ssr: false },
)
const XShareButton = dynamic(
  () => import("react-share").then((module) => module.TwitterShareButton),
  { ssr: false },
)
const WhatsappShareButton = dynamic(
  () => import("react-share").then((module) => module.WhatsappShareButton),
  { ssr: false },
)

const ExpressionCardShareButtons: FC<{
  expression: ExpressionFragmentFragment
}> = ({ expression }) => {
  const t = useTranslations()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const url = `${typeof window !== "undefined" ? window?.location.origin : ""}/expressions/${expression.id}`

  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <IconButton
        size="small"
        title={t("seo.share.shareButton")}
        aria-label="Share this expression"
        aria-haspopup="menu"
        aria-expanded={Boolean(anchorEl)}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ border: "1px solid", borderColor: "divider" }}
      >
        <ShareIcon fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        aria-label="Share options"
        slotProps={{
          paper: {
            sx: {
              padding: 0,
              "& .MuiMenuItem-root": { pb: 0, pt: 0.75 },
              "& .MuiMenuItem-root:first-of-type": { pt: 1 },
              "& .MuiMenuItem-root:last-of-type": { pb: 1 },
            },
          },
        }}
      >
        <MenuItem title={t("seo.share.facebook")} onClick={handleClose}>
          <FacebookShareButton
            url={url}
            hashtag={`#${expression.title}`}
            aria-label="Share on Facebook"
            style={{
              display: "flex",
              alignItems: "center",
              border: "none",
              background: "none",
              padding: 0,
            }}
          >
            <FacebookIcon sx={{ mr: 1 }} aria-hidden="true" />
            Facebook
          </FacebookShareButton>
        </MenuItem>
        <MenuItem title={t("seo.share.twitter")} onClick={handleClose}>
          <XShareButton
            url={url}
            title={expression.title ?? ""}
            hashtags={[expression.title ?? ""]}
            aria-label="Share on X (Twitter)"
            style={{
              display: "flex",
              alignItems: "center",
              border: "none",
              background: "none",
              padding: 0,
            }}
          >
            <XIcon sx={{ mr: 1 }} aria-hidden="true" />X (Twitter)
          </XShareButton>
        </MenuItem>
        <MenuItem title={t("seo.share.linkedin")} onClick={handleClose}>
          <LinkedinShareButton
            url={url}
            aria-label="Share on LinkedIn"
            style={{
              display: "flex",
              alignItems: "center",
              border: "none",
              background: "none",
              padding: 0,
            }}
          >
            <LinkedInIcon sx={{ mr: 1 }} aria-hidden="true" />
            LinkedIn
          </LinkedinShareButton>
        </MenuItem>
        <MenuItem title={t("seo.share.whatsapp")} onClick={handleClose}>
          <WhatsappShareButton
            url={url}
            title={expression.title ?? ""}
            separator=" :: "
            aria-label="Share on WhatsApp"
            style={{
              display: "flex",
              alignItems: "center",
              border: "none",
              background: "none",
              padding: 0,
            }}
          >
            <WhatsAppIcon sx={{ mr: 1 }} aria-hidden="true" />
            WhatsApp
          </WhatsappShareButton>
        </MenuItem>
        <MenuItem title={t("seo.share.email")} onClick={handleClose}>
          <EmailShareButton
            url={url}
            subject={expression.title ?? ""}
            body={expression.definition ?? ""}
            aria-label="Share via Email"
            style={{
              display: "flex",
              alignItems: "center",
              border: "none",
              background: "none",
              padding: 0,
            }}
          >
            <EmailIcon sx={{ mr: 1 }} aria-hidden="true" />
            Email
          </EmailShareButton>
        </MenuItem>
        <MenuItem
          title={t("seo.share.copyLink")}
          aria-label="Copy link to clipboard"
          onClick={() => {
            navigator?.clipboard.writeText(url)
            handleClose()
          }}
          sx={{ justifyContent: "center" }}
        >
          <Link
            href={url}
            onClick={(e) => e.preventDefault()}
            aria-label="Copy link"
            sx={{
              py: 0.7,
              px: 0.7,
              borderRadius: 1,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <ContentCopyIcon fontSize={"small"} aria-hidden="true" />
          </Link>
        </MenuItem>
      </Menu>
    </>
  )
}

export default ExpressionCardShareButtons
