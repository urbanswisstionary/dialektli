import { TermFragmentFragment } from "@@/generated/graphql"
import { CSSProperties, FC } from "react"
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

const shareButtonStyles: CSSProperties = {
  paddingTop: "1px",
  display: "flex",
  borderRadius: "50%",
}
const TermCardShareButtons: FC<{
  term: TermFragmentFragment
}> = ({ term }) => {
  const url = `${window.location.origin}/term/${term.id}`
  return (
    <Stack
      direction="row"
      gap={1}
      alignItems={"start"}
      sx={{ svg: { borderRadius: "50%" } }}
    >
      <FacebookShare
        url={url}
        quote={term.content ?? term.title}
        hashtag={`#${term.title}`}
        size={31}
        aria-label="Share on Facebook"
        style={shareButtonStyles}
      />

      <TwitterShare
        url={url}
        title={term.title}
        hashtags={[`#${term.title}`]}
        size={31}
        aria-label="Share on Twitter"
        style={shareButtonStyles}
      />
      <LinkedinShare
        url={url}
        size={31}
        aria-label="Share on Linkedin"
        style={shareButtonStyles}
      />
      <WhatsappShare
        url={url}
        title={term.title}
        separator=":: "
        size={31}
        aria-label="Share via Whatsapp"
        style={shareButtonStyles}
      />
      <EmailShare
        url={url}
        subject={term.title}
        body={term.content ?? ""}
        size={31}
        aria-label="Share via E-mail"
        style={shareButtonStyles}
      />
      <IconButton
        sx={{
          borderRadius: "50%",
          background: "var(--joy-palette-background-level1)",
          ":hover": {
            background: "var(--joy-palette-background-level3)",
          },
        }}
        size="sm"
        title={url}
        aria-label="Copy link"
        onClick={() => {
          navigator?.clipboard.writeText(url)
        }}
      >
        <ContentCopyIcon
          fontSize={"small"}
          sx={{  width: "15px" }}
        />
      </IconButton>
    </Stack>
  )
}
export default TermCardShareButtons
