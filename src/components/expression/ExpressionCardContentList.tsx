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
        "my-1 block border-b-2 border-border py-1 text-sm font-medium",
        disabled && "text-muted-foreground",
      )}
    >
      {label}
    </div>
    {children}
  </div>
)

export default ExpressionCardContentList
