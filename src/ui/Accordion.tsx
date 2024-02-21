import type { FC, PropsWithChildren } from "react"
import AccordionGroup from "@mui/joy/AccordionGroup"
import JoyAccordion from "@mui/joy/Accordion"
import AccordionDetails from "@mui/joy/AccordionDetails"
import AccordionSummary from "@mui/joy/AccordionSummary"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import FormLabel from "@mui/joy/FormLabel"
import { Box } from "@mui/joy"

type AccordionContent = PropsWithChildren<{
  label?: string
  expanded?: boolean
}>
type AccordionProps = { label?: string; content: AccordionContent[] }

const Accordion: FC<AccordionProps> = ({ label, content }) => (
  <Box>
    {label ? <FormLabel sx={{ pb: 1 }}>{label}</FormLabel> : null}
    <AccordionGroup size="sm">
      {content.map(({ children, label, expanded }, i) => (
        <JoyAccordion
          key={i}
          sx={{ p: 0, borderBottom: "none" }}
          expanded={expanded}
        >
          <AccordionLabel label={label} />
          <AccordionDetails sx={{ p: 0, pt: 2 }}>{children}</AccordionDetails>
        </JoyAccordion>
      ))}
    </AccordionGroup>
  </Box>
)

export default Accordion

const AccordionLabel: FC<{ label?: string }> = ({ label }) => (
  <AccordionSummary
    indicator={
      <ArrowDropDownIcon
        sx={{
          p: 0.5,
          height: "22px",
          width: "22px",
          borderRadius: "1px",
          "&:hover": {
            background: "var(--joy-palette-background-level1)",
          },
        }}
      />
    }
    sx={{
      m: 0,
      py: 0,
      pl: 1,
      pr: 0.5,
      fontSize: "sm",
      borderRadius: "var(--joy-radius-sm)",
      border: "1px solid",
      borderColor: "var(--joy-palette-neutral-outlinedBorder)",
      background: "var(--joy-palette-background-surface)",
      "&:hover": {
        background: "var(--joy-palette-background-surface)",
      },
      boxShadow:
        "var(--joy-shadowRing, 0 0 #000),0px 1px 2px 0px rgba(var(--joy-shadowChannel, 21 21 21) / var(--joy-shadowOpacity, 0.08))",
      boxSizing: "border-box",
    }}
    slotProps={{
      button: {
        sx: {
          borderRadius: "sm",
          p: 0,
          m: 0,
          fontWeight: "normal",
          opacity: 0.6,
          "&:hover": {
            background: "var(--joy-palette-background-surface) !important",
            color: "var(--joy-palette-neutral-plainColor) !important",
          },
        },
      },
    }}
  >
    {label}
  </AccordionSummary>
)
