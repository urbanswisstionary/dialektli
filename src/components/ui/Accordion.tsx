"use client"

import type { FC, PropsWithChildren } from "react"

import { ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"

import { cn } from "@/lib/utils"

type AccordionContent = PropsWithChildren<{
  label?: string
  expanded?: boolean
}>

type AccordionWrapperProps = { label?: string; content: AccordionContent[] }

const AccordionItem: FC<AccordionContent> = ({ children, label, expanded }) => {
  const [open, setOpen] = useState(expanded)
  const t = useTranslations()

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-sm hover:bg-accent"
        aria-expanded={open}
      >
        <span className="opacity-60">{label}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-label={t(`actions.${open ? "close" : "open"}`)}
        />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          {open && <div className="pt-2">{children}</div>}
        </div>
      </div>
    </div>
  )
}

const AccordionWrapper: FC<AccordionWrapperProps> = ({ label, content }) => (
  <div>
    {label ? (
      <label className="mb-1 block text-sm font-medium">{label}</label>
    ) : null}
    <div>
      {content.map((item, i) => (
        <AccordionItem key={i} {...item} />
      ))}
    </div>
  </div>
)

export default AccordionWrapper
