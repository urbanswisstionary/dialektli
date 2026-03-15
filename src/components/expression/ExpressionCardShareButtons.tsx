"use client"

import type { FC } from "react"

import { Share2, Mail, Link, Check } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"

import type { ExpressionFragmentFragment } from "@/generated/graphql"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { baseUrl } from "@/config/constants"
import { cn } from "@/lib/utils"

// ─── Brand SVG Icons ──────────────────────────────────────────────────────────

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path
      fill="currentColor"
      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
    />
  </svg>
)

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path
      fill="currentColor"
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
    />
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path
      fill="currentColor"
      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
    />
  </svg>
)

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path
      fill="currentColor"
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
    />
  </svg>
)

// ─── Types ────────────────────────────────────────────────────────────────────

type SharePlatform = {
  id: string
  label: string
  icon: React.ReactNode
  brandColor: string
  getUrl: (url: string, title: string) => string
}

// ─── Platform config ──────────────────────────────────────────────────────────

const sharePlatforms: SharePlatform[] = [
  {
    id: "facebook",
    label: "Facebook",
    icon: <FacebookIcon />,
    brandColor: "#1877F2",
    getUrl: (u, t) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}&hashtag=%23${encodeURIComponent(t)}`,
  },
  {
    id: "x",
    label: "X",
    icon: <XIcon />,
    brandColor: "#000000",
    getUrl: (u, t) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}&url=${encodeURIComponent(u)}&hashtags=${encodeURIComponent(t)}`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: <LinkedInIcon />,
    brandColor: "#0A66C2",
    getUrl: (u, _t) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}`,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: <WhatsAppIcon />,
    brandColor: "#25D366",
    getUrl: (u, t) =>
      `https://api.whatsapp.com/send?text=${encodeURIComponent(`${t} ${u}`)}`,
  },
  {
    id: "email",
    label: "Email",
    icon: <Mail className="h-5 w-5" />,
    brandColor: "",
    getUrl: (u, t) =>
      `mailto:?subject=${encodeURIComponent(t)}&body=${encodeURIComponent(u)}`,
  },
]

// ─── Social icon button ───────────────────────────────────────────────────────

const SocialIconButton: FC<{
  platform: SharePlatform
  onShare: () => void
}> = ({ platform, onShare }) => {
  const [hovered, setHovered] = useState(false)
  const hasBrandColor = !!platform.brandColor

  return (
    <button
      type="button"
      aria-label={platform.label}
      onClick={onShare}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative z-10 flex cursor-pointer flex-col items-center gap-1.5 rounded-lg p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <span
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200",
          hovered && hasBrandColor
            ? "scale-105 text-white shadow-md"
            : "bg-muted text-muted-foreground",
        )}
        style={
          hovered && hasBrandColor
            ? { backgroundColor: platform.brandColor }
            : undefined
        }
      >
        {platform.icon}
      </span>
      <span className="text-[10px] leading-none text-muted-foreground">
        {platform.label}
      </span>
    </button>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

const ExpressionCardShareButtons: FC<{
  expression: ExpressionFragmentFragment
}> = ({ expression }) => {
  const t = useTranslations()
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/expressions/${expression.id}`
      : `${baseUrl}/expressions/${expression.id}`

  const title = expression.title ?? ""

  const firstRow = sharePlatforms.slice(0, 3)
  const secondRow = sharePlatforms.slice(3)

  const handleShare = (platform: SharePlatform) => {
    const shareUrl = platform.getUrl(url, title)
    if (platform.id === "email") {
      window.location.assign(shareUrl)
    } else {
      window.open(
        shareUrl,
        "_blank",
        "noopener,noreferrer,width=600,height=400",
      )
    }
    setOpen(false)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // fallback: no-op
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative z-10"
          aria-label={t("seo.share.shareButton")}
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={6} className="w-64 p-4">
        {/* Header */}
        <p className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Share
        </p>

        {/* First row: 3 icons */}
        <div className="mb-1 grid grid-cols-3 justify-items-center gap-1">
          {firstRow.map((platform) => (
            <SocialIconButton
              key={platform.id}
              platform={platform}
              onShare={() => handleShare(platform)}
            />
          ))}
        </div>

        {/* Second row: 2 icons centered */}
        <div className="mb-3 flex justify-center gap-1">
          {secondRow.map((platform) => (
            <SocialIconButton
              key={platform.id}
              platform={platform}
              onShare={() => handleShare(platform)}
            />
          ))}
        </div>

        {/* Divider + Copy Link */}
        <div className="border-t border-border pt-3">
          <button
            type="button"
            onClick={handleCopy}
            className="relative z-10 flex w-full cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span
              className={cn(
                "transition-all duration-200",
                copied ? "text-green-500" : "text-muted-foreground",
              )}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Link className="h-4 w-4" />
              )}
            </span>
            <span className={cn(copied && "text-green-500")}>
              {copied ? t("seo.share.copied") : t("seo.share.copyLink")}
            </span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ExpressionCardShareButtons
