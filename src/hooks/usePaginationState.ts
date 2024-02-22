import { useState } from "react"

type PaginationState = {
  pageIndex: number
  pageSize: number
  pageCount: number
}
const defaultState: PaginationState = {
  pageIndex: 1,
  pageSize: 10,
  pageCount: 1,
}
export const usePaginationState = (
  initialState: Partial<PaginationState> = {},
) => {
  const [{ pageIndex, pageSize, pageCount }, setPagination] = useState(() => ({
    ...defaultState,
    ...initialState,
  }))

  return {
    pageIndex,
    onPageChange: (pageIndex: number) =>
      setPagination((prev) => ({ ...prev, pageIndex })),
    pageSize,
    onPageSizeChange: (pageSize: number) =>
      setPagination((prev) => ({ ...prev, pageSize })),
    pageCount,

    onDataCountChange: (dataCount?: number) => {
      const newPageCount = Math.max(1, Math.ceil((dataCount ?? 0) / pageSize))
      if (newPageCount !== pageCount)
        setPagination((prev) => ({ ...prev, pageCount: newPageCount }))
    },
  }
}
