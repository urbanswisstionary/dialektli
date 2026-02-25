"use client"

import type { FC, ReactNode } from "react"

import { Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

type ActionButtonProps = {
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  title?: string | null
}

type CardActionsType = {
  cancel?: ActionButtonProps
  save?: ActionButtonProps & { type?: "submit" }
  delete?: ActionButtonProps
}

interface CardWrapperProps {
  actions?: CardActionsType
  description?: string | null
  title?: string | null
  children?: ReactNode
}

const CardWrapper: FC<CardWrapperProps> = ({
  actions,
  children,
  description,
  title,
}) => {
  const t = useTranslations()

  return (
    <Card className="p-0">
      {title || description ? (
        <>
          <CardHeader className="p-4">
            {title ? <CardTitle>{title}</CardTitle> : null}
            {description ? (
              <CardDescription>{description}</CardDescription>
            ) : null}
          </CardHeader>
          <Separator />
        </>
      ) : null}
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">{children}</div>
      </CardContent>

      {actions ? (
        <>
          <Separator />
          <CardFooter className="flex items-center justify-between gap-2 p-4">
            <div>
              {actions.delete ? (
                <Button
                  size="sm"
                  variant="outline"
                  className="border-destructive text-destructive hover:bg-destructive/10"
                  disabled={actions.delete.disabled || actions.delete.loading}
                  onClick={() => {
                    if (actions.delete?.onClick) actions.delete.onClick()
                  }}
                >
                  {actions.delete.title ?? t("actions.delete")}
                  <Trash2 className="ml-1.5 h-4 w-4" />
                </Button>
              ) : null}
            </div>
            <div className="flex gap-2">
              {actions.cancel ? (
                <Button
                  size="sm"
                  variant="outline"
                  disabled={actions.cancel.disabled || actions.cancel.loading}
                  onClick={() => {
                    if (actions.cancel?.onClick) actions.cancel.onClick()
                  }}
                >
                  {actions.cancel.title ?? t("actions.cancel")}
                </Button>
              ) : null}
              {actions.save ? (
                <Button
                  size="sm"
                  disabled={actions.save.disabled || actions.save.loading}
                  type={actions.save.type}
                  onClick={() => {
                    if (
                      actions.save?.type !== "submit" &&
                      actions.save?.onClick
                    )
                      actions.save.onClick()
                  }}
                >
                  {actions.save.title ?? t("actions.submit")}
                </Button>
              ) : null}
            </div>
          </CardFooter>
        </>
      ) : null}
    </Card>
  )
}

export default CardWrapper
