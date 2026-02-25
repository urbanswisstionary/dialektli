"use client"

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import { FC } from "react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface PaginationProps {
  pageIndex?: number
  pageCount?: number
  onPageChange?: (_page: number) => void
  pageSize?: number
  onPageSizeChange?: (_itemsPerPage: number) => void
  disabled?: boolean
}

const pageSizeOptions = [5, 10, 20, 50]

const Pagination: FC<PaginationProps> = ({
  pageCount = 1,
  pageIndex = 1,
  onPageChange,
  pageSize,
  onPageSizeChange,
  disabled,
}) => {
  const isDisabled = disabled ?? pageCount <= 1

  return (
    <div className="flex items-center justify-between overflow-hidden">
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="hidden h-8 w-8 sm:inline-flex"
          onClick={() => onPageChange?.(1)}
          disabled={isDisabled || pageIndex <= 1}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange?.(pageIndex - 1)}
          disabled={isDisabled || pageIndex <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="px-2 text-sm text-muted-foreground">
          {pageIndex} / {pageCount}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPageChange?.(pageIndex + 1)}
          disabled={isDisabled || pageIndex >= pageCount}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="hidden h-8 w-8 sm:inline-flex"
          onClick={() => onPageChange?.(pageCount)}
          disabled={isDisabled || pageIndex >= pageCount}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
      {pageSize ? (
        <Select
          value={String(pageSize)}
          onValueChange={(value) => onPageSizeChange?.(Number(value))}
          disabled={disabled}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((pageSizeOption) => (
              <SelectItem key={pageSizeOption} value={String(pageSizeOption)}>
                {pageSizeOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : null}
    </div>
  )
}

export default Pagination
