"use client"

import type { FC } from "react"

import ExpressionCard from "@/components/expression/ExpressionCard"
import ExpressionCardSkeleton from "@/components/expression/ExpressionCardSkeleton"
import Pagination, { PaginationProps } from "@/components/ui/Pagination"
import { FragmentType, getFragmentData } from "@/generated"
import { ExpressionFragment } from "@/hooks/useExpressions"
import { defaultState } from "@/hooks/usePaginationState"
import { useMe } from "@/hooks/useUsers"
import { cn } from "@/lib/utils"

import ExpressionCardNoData from "./ExpressionCardNoData"

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
        Array.from({
          length: props.paginationProps?.pageSize ?? defaultState.pageSize,
        }).map((_, i) => <ExpressionCardSkeleton key={i} />)
      ) : expressions.length ? (
        expressions.map((expression) => (
          <ExpressionCard
            key={expression.id}
            expression={expression}
            disableActions={!me}
          />
        ))
      ) : (
        <ExpressionCardNoData />
      )}
      {pagination}
    </div>
  )
}

export default ExpressionsCardsList
