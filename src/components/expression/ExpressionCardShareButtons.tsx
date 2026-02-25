"use client"

import type { FC } from "react"

import { Share2, Copy } from "lucide-react"
import { useTranslations } from "next-intl"
import dynamic from "next/dynamic"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ExpressionFragmentFragment } from "@/generated/graphql"

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
  const [open, setOpen] = useState(false)
  const url = `${typeof window !== "undefined" ? window?.location.origin : ""}/expressions/${expression.id}`

  const handleClose = () => setOpen(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative z-10"
          aria-label={t("seo.share.shareButton")}
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={handleClose}
          className="cursor-pointer"
          asChild
        >
          <FacebookShareButton
            url={url}
            hashtag={`#${expression.title}`}
            aria-label={t("seo.share.facebook")}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              border: "none",
              background: "none",
              padding: 0,
              textAlign: "left",
            }}
          >
            <span className="text-sm">Facebook</span>
          </FacebookShareButton>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleClose}
          className="cursor-pointer"
          asChild
        >
          <XShareButton
            url={url}
            title={expression.title ?? ""}
            hashtags={[expression.title ?? ""]}
            aria-label={t("seo.share.twitter")}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              border: "none",
              background: "none",
              padding: 0,
              textAlign: "left",
            }}
          >
            <span className="text-sm">X (Twitter)</span>
          </XShareButton>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleClose}
          className="cursor-pointer"
          asChild
        >
          <LinkedinShareButton
            url={url}
            aria-label={t("seo.share.linkedin")}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              border: "none",
              background: "none",
              padding: 0,
              textAlign: "left",
            }}
          >
            <span className="text-sm">LinkedIn</span>
          </LinkedinShareButton>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleClose}
          className="cursor-pointer"
          asChild
        >
          <WhatsappShareButton
            url={url}
            title={expression.title ?? ""}
            separator=" :: "
            aria-label={t("seo.share.whatsapp")}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              border: "none",
              background: "none",
              padding: 0,
              textAlign: "left",
            }}
          >
            <span className="text-sm">WhatsApp</span>
          </WhatsappShareButton>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleClose}
          className="cursor-pointer"
          asChild
        >
          <EmailShareButton
            url={url}
            subject={expression.title ?? ""}
            body={expression.definition ?? ""}
            aria-label={t("seo.share.email")}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              border: "none",
              background: "none",
              padding: 0,
              textAlign: "left",
            }}
          >
            <span className="text-sm">Email</span>
          </EmailShareButton>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            navigator?.clipboard.writeText(url)
            handleClose()
          }}
          className="cursor-pointer"
        >
          <Copy className="h-4 w-4 mr-2" />
          <span className="text-sm">{t("seo.share.copyLink")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ExpressionCardShareButtons
