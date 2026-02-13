"use client"

import { useState, FC, useRef } from "react"
import { useRouter, usePathname } from "@/i18n/navigation"
import { useSearchParams } from "next/navigation"
import { setQueryOnPage } from "@/utils/setQueryOnPage"
import { useQuery } from "@apollo/client/react"
import { getFragmentData, graphql } from "@/generated"
import {
  ExpressionOptionFragmentFragment,
  ExpressionsQueryInput,
} from "@/generated/graphql"
import { useTranslations } from "next-intl"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

const ExpressionOptionFragment = graphql(/* GraphQL */ `
  fragment ExpressionOptionFragment on Expression {
    id
    title
  }
`)

const useSearchExpressionsQuery = (
  data: ExpressionsQueryInput,
  skip?: boolean,
) =>
  useQuery(
    graphql(/* GraphQL */ `
      query SearchExpression($data: ExpressionsQueryInput!) {
        expressionsQuery(data: $data) {
          expressions {
            ...ExpressionOptionFragment
          }
        }
      }
    `),
    { variables: { data }, skip },
  )

interface SearchExpressionsInputProps {
  label?: string
  helperText?: string
  additionalQueryInput?: Omit<ExpressionsQueryInput, "q" | "offset" | "limit">
  disabled?: boolean
  className?: string
}

const SearchExpressionsInput: FC<SearchExpressionsInputProps> = ({
  label,
  helperText,
  additionalQueryInput = {},
  disabled,
  className,
}) => {
  const t = useTranslations()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [q, setQ] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { data, previousData } = useSearchExpressionsQuery(
    { q, ...additionalQueryInput },
    !q,
  )
  const [selectedOption, setSelectedOption] =
    useState<ExpressionOptionFragmentFragment | null>(null)
  const options =
    getFragmentData(
      ExpressionOptionFragment,
      data?.expressionsQuery?.expressions ??
        previousData?.expressionsQuery?.expressions,
    ) ?? []

  const displayOptions = selectedOption
    ? options.find(({ id }) => id === selectedOption.id)
      ? options
      : [selectedOption, ...options]
    : options

  const groupedOptions = displayOptions.reduce(
    (acc, option) => {
      const key = option.title?.[0]?.toUpperCase() ?? ""
      if (!acc[key]) acc[key] = []
      acc[key].push(option)
      return acc
    },
    {} as Record<string, typeof displayOptions>,
  )

  const handleSelect = (option: ExpressionOptionFragmentFragment | null) => {
    setSelectedOption(option)
    setQueryOnPage(router, pathname, searchParams, {
      q: option?.title?.length ? option?.title : null,
    })
    setOpen(false)
  }

  return (
    <div className={cn("flex-1", className)} id="searchExpressions">
      {label ? (
        <label className="mb-1 block text-sm font-medium">{label}</label>
      ) : null}
      <Popover open={open && !!q} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={inputRef}
              placeholder={t("actions.search")}
              className="pl-8"
              disabled={disabled}
              onChange={(e) => {
                const value = e.target.value.trim()
                setQ(value || null)
                setSelectedOption(null)
                if (value) setOpen(true)
              }}
              onFocus={() => {
                if (q) setOpen(true)
              }}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="max-h-60 overflow-y-auto p-1" role="listbox">
            {Object.entries(groupedOptions).map(([letter, opts]) => (
              <div key={letter}>
                <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
                  {letter}
                </div>
                {opts.map((option) => (
                  <div
                    key={option.id}
                    role="option"
                    aria-selected={selectedOption?.id === option.id}
                    onClick={() => handleSelect(option)}
                    className={cn(
                      "cursor-pointer rounded-sm px-2 py-1.5 text-sm hover:bg-accent",
                      selectedOption?.id === option.id && "bg-accent",
                    )}
                  >
                    {option.title}
                  </div>
                ))}
              </div>
            ))}
            {displayOptions.length === 0 && q && (
              <p className="px-2 py-4 text-center text-sm text-muted-foreground">
                {t("noData")}
              </p>
            )}
          </div>
        </PopoverContent>
      </Popover>
      {helperText ? (
        <p className="mt-1 text-xs text-muted-foreground">{helperText}</p>
      ) : null}
    </div>
  )
}

export default SearchExpressionsInput
