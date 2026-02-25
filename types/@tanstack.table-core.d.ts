import { RankingInfo } from "@tanstack/match-sorter-utils"
import { FilterFn } from "@tanstack/react-table"

declare module "@tanstack/table-core" {
  export interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  export interface FilterMeta {
    itemRank: RankingInfo
  }
}
