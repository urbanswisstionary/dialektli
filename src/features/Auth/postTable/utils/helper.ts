import dayjs from "dayjs"
import { sortingFns, FilterFn, SortingFn } from "@tanstack/react-table"
import { rankItem, compareItems } from "@tanstack/match-sorter-utils"
import type { PostFragmentFragment } from "@@/generated/graphql"


export const formatDate = (d?: string | Date | null): string | null => {
  if (!d) return null
  const date = dayjs(d)
  return date.isValid() ? date.format("MMM D, YYYY") : "Invalid Date"
}

export const fuzzyFilter: FilterFn<PostFragmentFragment> = (
  row,
  columnId,
  value,
  addMeta,
) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({ itemRank })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

export const fuzzySort: SortingFn<PostFragmentFragment> = (
  rowA,
  rowB,
  columnId,
) => {
  let dir = 0

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId])
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!,
    )

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}
