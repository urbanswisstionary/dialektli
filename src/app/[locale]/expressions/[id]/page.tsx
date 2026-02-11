"use client"

import { useParams } from "next/navigation"
import { useExpression } from "@/hooks/useExpressions"
import { useMe } from "@/hooks/useUsers"
import Stack from "@mui/material/Stack"
import CircularProgress from "@mui/material/CircularProgress"
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
      <Stack alignItems="center" sx={{ my: 5 }}>
        <CircularProgress size={60} />
      </Stack>
    )
  }

  if (!expression) {
    return <>{t("noData")}</>
  }

  return <ExpressionCard expression={expression} disableActions={!me} />
}
