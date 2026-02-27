"use client"

import type { FC } from "react"

import { SearchX } from "lucide-react"
import { useTranslations } from "next-intl"

import ExpressionCard from "@/components/expression/ExpressionCard"
import ExpressionCardSkeleton from "@/components/expression/ExpressionCardSkeleton"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import Pagination, { PaginationProps } from "@/components/ui/Pagination"
import { FragmentType, getFragmentData } from "@/generated"
import { ExpressionFragment } from "@/hooks/useExpressions"
import { defaultState } from "@/hooks/usePaginationState"
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
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchX />
            </EmptyMedia>
            <EmptyTitle>{t("noData")}</EmptyTitle>
          </EmptyHeader>
        </Empty>
      )}
      {pagination}
    </div>
  )
}

export default ExpressionsCardsList
