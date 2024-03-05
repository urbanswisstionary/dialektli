import { TermFragmentFragment } from "@@/generated/graphql"
import type { FC } from "react"
import Stack from "@mui/joy/Stack"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import IconButton from "@mui/joy/IconButton"
import dynamic from "next/dynamic"

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

const TermCardShareButtons: FC<{
  term: TermFragmentFragment
}> = ({ term }) => {
  const url = `${typeof window !== "undefined" ? window?.location.origin : ""}/term/${term.id}`

  const buttonProps = {
    url,
    title: term.title,
    size: 31,
    round: true,
  } as const
  return (
    <Stack
      direction="row"
      gap={1}
      alignItems={"flex-start"}
      sx={{ transform: "scale(0.75)" }}
    >
      <FacebookShare
        {...buttonProps}
        quote={term.content ?? term.title}
        hashtag={`#${term.title}`}
        aria-label="Share on Facebook"
      />

      <TwitterShare
        {...buttonProps}
        hashtags={[`#${term.title}`]}
        aria-label="Share on Twitter"
      />
      <LinkedinShare {...buttonProps} aria-label="Share on Linkedin" />
      <WhatsappShare
        {...buttonProps}
        separator=":: "
        aria-label="Share via Whatsapp"
      />
      <EmailShare
        {...buttonProps}
        subject={term.title}
        body={term.content ?? ""}
        aria-label="Share via E-mail"
      />
      <IconButton
        sx={{
          borderRadius: "50%",
          background: "var(--joy-palette-background-level2)",
          ":hover": {
            background: "var(--joy-palette-background-level2)",
          },
        }}
        size="sm"
        title={url}
        aria-label="Copy link"
        onClick={() => {
          navigator?.clipboard.writeText(url)
        }}
      >
        <ContentCopyIcon fontSize={"small"} sx={{ width: "15px" }} />
      </IconButton>
    </Stack>
  )
}
export default TermCardShareButtons
