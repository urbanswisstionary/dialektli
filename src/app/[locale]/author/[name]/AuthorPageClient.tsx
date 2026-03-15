"use client"

import dynamic from "next/dynamic"

import { useExpressionsFilters } from "@/components/expression/ExpressionFilters"
import Breadcrumbs from "@/components/ui/Breadcrumbs"
import { useExpressionsQuery } from "@/hooks/useExpressions"
import { usePaginationState } from "@/hooks/usePaginationState"

const ExpressionFilters = dynamic(
  () => import("@/components/expression/ExpressionFilters"),
  {
    ssr: false,
    loading: () => null,
  },
)
const ExpressionCardsList = dynamic(
  () => import("@/components/expression/ExpressionCardsList"),
  {
    ssr: false,
    loading: () => null,
  },
)

type AuthorPageClientProps = {
  authorName: string
}
export default function AuthorPageClient({
  authorName,
}: AuthorPageClientProps) {
  const { q, canton, firstChar, language, sortByPopularity } =
    useExpressionsFilters()
  const { onDataCountChange, ...paginationProps } = usePaginationState()

  const {
    data,
    previousData,
    loading: loadingExpressionsQuery,
  } = useExpressionsQuery({
    authorName,
    offset: (paginationProps.pageIndex - 1) * paginationProps.pageSize,
    limit: paginationProps.pageSize,
    q,
    canton,
    firstChar,
    language,
    sortByPopularity,
  })

  const expressionsQuery =
    data?.expressionsQuery ?? previousData?.expressionsQuery
  onDataCountChange(expressionsQuery?.count)

  return (
    <div className="mt-4 mb-6 flex flex-col gap-6">
      <Breadcrumbs items={[{ label: authorName }]} />

      <ExpressionFilters loading={loadingExpressionsQuery} />
      <ExpressionCardsList
        expressions={expressionsQuery?.expressions}
        paginationProps={paginationProps}
        loading={loadingExpressionsQuery}
      />
    </div>
  )
}
