"use client"

import type { FC } from "react"

import { SearchX } from "lucide-react"
import { useTranslations } from "next-intl"

import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

interface ExpressionCardNoDataProps {
  className?: string
}

const ExpressionCardNoData: FC<ExpressionCardNoDataProps> = ({ className }) => {
  const t = useTranslations()

  return (
    <Empty className={className}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchX />
        </EmptyMedia>
        <EmptyTitle>{t("noData")}</EmptyTitle>
      </EmptyHeader>
    </Empty>
  )
}

export default ExpressionCardNoData
