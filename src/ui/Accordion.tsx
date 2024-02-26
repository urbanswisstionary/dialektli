import type { FC, PropsWithChildren } from "react"
import AccordionGroup from "@mui/joy/AccordionGroup"
import JoyAccordion from "@mui/joy/Accordion"
import AccordionDetails from "@mui/joy/AccordionDetails"
import AccordionSummary from "@mui/joy/AccordionSummary"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import FormLabel from "@mui/joy/FormLabel"
import { Box } from "@mui/joy"
import { useTranslation } from "next-i18next"
import Toggler from "./Toggler"

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
        <Toggler
          key={i}
          defaultExpanded={expanded}
          renderToggle={({ open, setOpen }) => (
            <JoyAccordion sx={{ p: 0, borderBottom: "none" }} expanded={open}>
              <AccordionLabel
                label={label}
                expanded={open}
                onClick={() => setOpen((o) => !o)}
              />
              <AccordionDetails sx={{ p: 0, pt: 2 }}>
                {children}
              </AccordionDetails>
            </JoyAccordion>
          )}
        />
      ))}
    </AccordionGroup>
  </Box>
)

export default Accordion

const AccordionLabel: FC<{
  label?: string
  expanded?: boolean
  onClick?: () => void
}> = ({ label, expanded, onClick }) => {
  const { t } = useTranslation("common")
  return (
    <AccordionSummary
      indicator={
        <ArrowDropDownIcon
          titleAccess={t(`actions.${expanded ? "close" : "open"}`)}
          sx={{
            p: 0.5,
            height: "24px",
            width: "24px",
            borderRadius: "3px",
            opacity: 0.7,
            "&:hover": {
              background: "var(--joy-palette-background-level1)",
              opacity: 1,
            },
          }}
        />
      }
      sx={{
        m: 0,
        py: 0,
        pl: 1,
        pr: 0.25,
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
            "&:hover": {
              background: "var(--joy-palette-background-surface) !important",
              color: "var(--joy-palette-neutral-plainColor) !important",
            },
            ".MuiAccordionSummary-label": {
              opacity: 0.6,
            },
          },
        },
      }}
      onClick={onClick}
    >
      <span className="MuiAccordionSummary-label">{label}</span>
    </AccordionSummary>
  )
}
