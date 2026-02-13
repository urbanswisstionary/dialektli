"use client"

import type { FC, PropsWithChildren } from "react"
import { useState } from "react"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import FormLabel from "@mui/material/FormLabel"
import { Box } from "@mui/material"
import { useTranslations } from "next-intl"

type AccordionContent = PropsWithChildren<{
  label?: string
  expanded?: boolean
}>

type AccordionWrapperProps = { label?: string; content: AccordionContent[] }

const AccordionItem: FC<AccordionContent & { index: number }> = ({
  children,
  label,
  expanded,
}) => {
  const [open, setOpen] = useState(expanded)
  const t = useTranslations()

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: open ? "1fr" : "0fr",
        transition: "0.2s ease",
        "& > *": {
          overflow: "hidden",
        },
      }}
    >
      <Accordion
        sx={{ p: 0, border: "none", boxShadow: "none" }}
        expanded={open}
        onChange={() => setOpen((o) => !o)}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              titleAccess={t(`actions.${open ? "close" : "open"}`)}
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
        <AccordionDetails sx={{ p: 0, pt: 2 }}>{children}</AccordionDetails>
      </Accordion>
    </Box>
  )
}

const AccordionWrapper: FC<AccordionWrapperProps> = ({ label, content }) => (
  <Box>
    {label ? <FormLabel sx={{ pb: 1 }}>{label}</FormLabel> : null}
    <Box>
      {content.map((item, i) => (
        <AccordionItem key={i} index={i} {...item} />
      ))}
    </Box>
  </Box>
)

export default AccordionWrapper
