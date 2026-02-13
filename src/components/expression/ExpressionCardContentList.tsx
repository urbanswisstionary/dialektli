"use client"

import type { FC, PropsWithChildren, ReactNode } from "react"
import { cn } from "@/lib/utils"

type ExpressionCardContentListProps = {
  label?: ReactNode
  disabled?: boolean
}

const ExpressionCardContentList: FC<
  PropsWithChildren<ExpressionCardContentListProps>
> = ({ label, disabled, children }) => (
  <div className="border-t border-border">
    <div
      className={cn(
        "border-b-2 border-border pb-1 mb-1 block font-medium text-sm",
        disabled && "text-muted-foreground",
      )}
    >
      {label}
    </div>
    {children}
  </div>
)

export default ExpressionCardContentList
