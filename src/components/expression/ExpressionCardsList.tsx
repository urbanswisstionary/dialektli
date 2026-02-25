"use client"

import type { FC } from "react"

import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"

import ExpressionCard from "@/components/expression/ExpressionCard"
import Pagination, { PaginationProps } from "@/components/ui/Pagination"
import { FragmentType, getFragmentData } from "@/generated"
import { ExpressionFragment } from "@/hooks/useExpressions"
import { useMe } from "@/hooks/useUsers"
import { cn } from "@/lib/utils"

interface ExpressionsCardsListProps {
  paginationProps?: PaginationProps
  expressions?: FragmentType<typeof ExpressionFragment>[]
  loading?: boolean
  className?: string
}

const ExpressionsCardsList: FC<ExpressionsCardsListProps> = ({
  className,
  loading,
  ...props
}) => {
  const t = useTranslations()
  const { me } = useMe()
  const expressions =
    getFragmentData(ExpressionFragment, props.expressions) ?? []

  const pagination = (
    <Pagination disabled={loading} {...props.paginationProps} />
  )

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {pagination}
      {loading ? (
        <div className="flex justify-center my-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : expressions.length ? (
        expressions.map((expression) => (
          <ExpressionCard
            key={expression.id}
            expression={expression}
            disableActions={!me}
          />
        ))
      ) : (
        <div className="text-center text-muted-foreground">{t("noData")}</div>
      )}
      {pagination}
    </div>
  )
}

export default ExpressionsCardsList
