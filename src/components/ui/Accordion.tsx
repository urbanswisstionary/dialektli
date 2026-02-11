"use client"

import type { FC, PropsWithChildren } from "react"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import FormLabel from "@mui/material/FormLabel"
import { Box } from "@mui/material"
import { useTranslations } from "next-intl"
import Toggler from "./Toggler"

type AccordionContent = PropsWithChildren<{
  label?: string
  expanded?: boolean
}>

type AccordionWrapperProps = { label?: string; content: AccordionContent[] }

const AccordionWrapper: FC<AccordionWrapperProps> = ({ label, content }) => (
  <Box>
    {label ? <FormLabel sx={{ pb: 1 }}>{label}</FormLabel> : null}
    <Box>
      {content.map(({ children, label, expanded }, i) => (
        <Toggler
          key={i}
          defaultExpanded={expanded}
          renderToggle={({ open, setOpen }) => (
            <Accordion
              sx={{ p: 0, border: "none", boxShadow: "none" }}
              expanded={open}
              onChange={() => setOpen((o) => !o)}
            >
              <AccordionLabel label={label} expanded={open} />
              <AccordionDetails sx={{ p: 0, pt: 2 }}>
                {children}
              </AccordionDetails>
            </Accordion>
          )}
        />
      ))}
    </Box>
  </Box>
)

export default AccordionWrapper

const AccordionLabel: FC<{
  label?: string
  expanded?: boolean
}> = ({ label, expanded }) => {
  const t = useTranslations()
  return (
    <AccordionSummary
      expandIcon={
        <ExpandMoreIcon
          titleAccess={t(`actions.${expanded ? "close" : "open"}`)}
        />
      }
      sx={{
        m: 0,
        py: 1,
        px: 1.5,
        fontSize: "small",
        borderRadius: 1,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      <Box component="span" sx={{ opacity: 0.6 }}>
        {label}
      </Box>
    </AccordionSummary>
  )
}
