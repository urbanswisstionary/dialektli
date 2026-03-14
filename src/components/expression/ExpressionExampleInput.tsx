"use client"

import isEqual from "lodash/isEqual"
import { Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRef, type FC, useState } from "react"

import SelectMultipleLocation from "@/components/ui/Autocomplete/SelectMultipleLocation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export const exampleMaxLength = 440

interface ExpressionExampleInputProps {
  exampleNumber?: number
  exampleDefinition?: string
  exampleCantons?: string[]
  onClose?: () => void
  onSave?: (_example: { definition: string; cantons: string[] }) => void
  onSaveLoading?: boolean
  disabled?: boolean
  className?: string
}

const ExpressionExampleInput: FC<ExpressionExampleInputProps> = ({
  exampleDefinition = "",
  exampleCantons = [],
  exampleNumber,
  onClose,
  onSave,
  onSaveLoading,
  disabled,
  className,
}) => {
  const t = useTranslations()
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [definition, setDefinition] = useState<string>(() => exampleDefinition)
  const [cantons, setCantons] = useState<string[]>(() => exampleCantons)

  const changesFound =
    definition.trim() !== exampleDefinition || !isEqual(cantons, exampleCantons)

  return (
    <div className={cn("flex flex-col gap-y-4", className)}>
      <SelectMultipleLocation
        mode="canton"
        value={cantons}
        onChange={(cantons) => setCantons(cantons ?? [])}
        groupOptions
      />

      <div className="flex flex-col gap-y-2">
        <div
          className="flex items-center justify-between"
          role="presentation"
          onClick={() => textareaRef.current?.focus()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") textareaRef.current?.focus()
          }}
        >
          <span
            className={cn(
              "text-sm",
              disabled ? "text-muted-foreground" : "text-foreground",
            )}
          >
            {exampleNumber}
          </span>
          <Button
            size="icon"
            variant="ghost"
            disabled={disabled}
            onClick={() => setDefinition("")}
            title={t("expression.editExpression.deleteExample")}
            onFocus={() => textareaRef.current?.focus()}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative">
          <Textarea
            ref={textareaRef}
            rows={3}
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            maxLength={exampleMaxLength}
            disabled={disabled}
            className="resize-y"
          />
          <span className="pointer-events-none absolute top-2 left-2 text-xs text-muted-foreground">
            {definition.length}/{exampleMaxLength}
          </span>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={onSaveLoading || !changesFound}
            onClick={() => {
              if (onSave)
                onSave({ definition: definition.trim(), cantons: cantons })
            }}
          >
            {t("actions.save")}
          </Button>
          <Button
            variant="outline"
            disabled={onSaveLoading || (!onClose && !changesFound)}
            onClick={() => {
              setDefinition(exampleDefinition)
              setCantons(exampleCantons)
              if (onClose && !changesFound) onClose()
              textareaRef.current?.blur()
            }}
          >
            {t(`actions.${onClose && !changesFound ? "close" : "cancel"}`)}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ExpressionExampleInput
