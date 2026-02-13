"use client"

import type { FC } from "react"
import Flag from "@/components/ui/Flag"
import { cn } from "@/lib/utils"

interface SelectLocationOptionProps {
  mode: "canton" | "country"
  label: string
  flagCode: string
  selected?: boolean
  onClick?: () => void
  className?: string
}

const SelectLocationOption: FC<SelectLocationOptionProps> = ({
  mode,
  label,
  flagCode,
  selected,
  onClick,
  className,
}) => (
  <div
    role="option"
    aria-selected={selected}
    onClick={onClick}
    className={cn(
      "flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent",
      selected && "bg-accent",
      className,
    )}
  >
    <div className="flex h-5 w-5 items-center justify-center">
      <Flag mode={mode} code={flagCode} />
    </div>
    {label}
  </div>
)

export default SelectLocationOption
