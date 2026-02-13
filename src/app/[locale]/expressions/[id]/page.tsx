"use client"

import { useParams } from "next/navigation"
import { useExpression } from "@/hooks/useExpressions"
import { useMe } from "@/hooks/useUsers"
import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"
import ExpressionCard from "@/components/expression/ExpressionCard"

export default function ExpressionDetailPage() {
  const t = useTranslations()
  const params = useParams()
  const expressionId = params.id as string

  const { me, loading: loadingMe } = useMe()
  const { data, loading: loadingExpression } = useExpression(
    expressionId,
    !expressionId,
  )

  const loading = loadingMe || loadingExpression
  const expression = data?.expression

  if (loading) {
    return (
      <div className="flex items-center justify-center my-10">
        <Loader2 className="h-15 w-15 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!expression) {
    return <>{t("noData")}</>
  }

  return <ExpressionCard expression={expression} disableActions={!me} />
}
