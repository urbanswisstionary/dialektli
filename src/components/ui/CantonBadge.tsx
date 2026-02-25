import { memo } from "react"

import { Badge } from "@/components/ui/badge"
import Flag from "@/components/ui/Flag"
import { cn } from "@/lib/utils"

type CantonBadgeProps = {
  code: string
  name?: string
  variant?: "default" | "secondary" | "outline" | "destructive"
  className?: string
  onClick?: () => void
}

const CantonBadge = ({
  code,
  name,
  variant = "outline",
  className,
  onClick,
}: CantonBadgeProps) => {
  return (
    <Badge
      variant={variant}
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5",
        onClick &&
          "cursor-pointer transition-colors hover:bg-muted hover:text-foreground",
        className,
      )}
      onClick={onClick}
    >
      <Flag mode="canton" code={code} />
      <span className="font-semibold">{code}</span>
      {name && (
        <span className="font-normal text-muted-foreground">{name}</span>
      )}
    </Badge>
  )
}

export default memo(CantonBadge)
