"use client"

import type { FC } from "react"
import Flag from "@/components/ui/Flag"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import type { LocationOption } from "./helper"

interface SelectMultipleLocationTagProps {
  option: LocationOption
  mode: "canton" | "country"
  onRemove?: () => void
  className?: string
}

const SelectMultipleLocationTag: FC<SelectMultipleLocationTagProps> = ({
  option,
  mode,
  onRemove,
  className,
}) => (
  <Badge variant="secondary" className={className}>
    <span className="mr-1 flex h-4 w-4 items-center justify-center">
      <Flag mode={mode} code={option.code} />
    </span>
    {option.label}
    {onRemove ? (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onRemove()
        }}
        className="ml-1 rounded-full hover:bg-muted-foreground/20"
      >
        <X className="h-3 w-3" />
      </button>
    ) : null}
  </Badge>
)

export default SelectMultipleLocationTag
