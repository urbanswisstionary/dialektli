import { FC, useMemo, useState } from "react"
import Box from "@mui/joy/Box"
import Table from "@mui/joy/Table"
import Sheet from "@mui/joy/Sheet"
import Checkbox from "@mui/joy/Checkbox"
import RowMenu from "./components/rowMenu"
import type { TermStatus } from "@/ui/TermStatusChip"
import {
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
} from "@tanstack/react-table"
import type { AdminTermFragmentFragment } from "@@/generated/graphql"
import Divider from "@mui/joy/Divider"
import Pagination from "@/ui/Pagination"
import DebouncedInput from "./components/debouncedInput"
import TableHead from "./components/tableHeader"
import TableBody from "./components/tableBody"
import { formatDate, fuzzyFilter, fuzzySort } from "./termsTable.utils"
import TermStatusChip from "@/ui/TermStatusChip"
import List from "@mui/joy/List"
import Typography from "@mui/joy/Typography"
import TermsListItem from "./components/termsListItem"
import Flag from "@/ui/Flag"
import Stack from "@mui/joy/Stack"
import NewTermButton from "@/ui/NewTermButton"
import { AdminTermFragment, useAdminTermsQuery } from "@/hooks/useTerms"
import { getFragmentData } from "@@/generated"
import CircularProgress from "@mui/joy/CircularProgress"
import { useTranslation } from "next-i18next"
import { useMe } from "@/hooks/useMe"

const TermsTable: FC = () => {
  const { t } = useTranslation("common", { keyPrefix: "term" })
  const { isAdmin } = useMe()
  const {
    data,
    previousData,
    loading: loadingAdminTermsQuery,
  } = useAdminTermsQuery()
  const terms = useMemo(() => {
    const adminTerms = data?.adminTerms ?? previousData?.adminTerms
    return [...(getFragmentData(AdminTermFragment, adminTerms?.terms) ?? [])]
  }, [data?.adminTerms, previousData?.adminTerms])

  const [globalFilter, setGlobalFilter] = useState("")
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns = useMemo<ColumnDef<AdminTermFragmentFragment, any>[]>(() => {
    const columns: ColumnDef<AdminTermFragmentFragment, any>[] = [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected() ?? false}
            indeterminate={table.getIsSomePageRowsSelected() ?? false}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            sx={{ pb: 2 }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected() ?? false}
            disabled={!row.getCanSelect()}
            indeterminate={row.getIsSomeSelected() ?? false}
            onChange={row.getToggleSelectedHandler()}
            sx={{ p: 1 }}
          />
        ),
      },
      {
        id: "author",
        header: t("author"),
        accessorFn: ({ author }) => author?.name,
        cell: (info) => <Typography noWrap>{info.getValue()}</Typography>,
        footer: (props) => props.column.id,
        filterFn: "fuzzy",
        sortingFn: fuzzySort,
      },
      {
        header: t("canton"),
        accessorKey: "canton",
        accessorFn: ({ cantons }) => (cantons.length ? cantons : "N/A"),
        cell: (info) => {
          const cantons = info.getValue<string[] | "N/A">()
          return cantons === "N/A" ? null : (
            <Stack
              direction="row"
              gap={1}
              flexWrap="wrap"
              justifyContent="center"
            >
              {cantons.map((canton, i) => (
                <Flag key={i} mode="canton" code={canton} />
              ))}
            </Stack>
          )
        },
        footer: (props) => props.column.id,
        filterFn: "fuzzy",
        sortingFn: fuzzySort,
      },
      {
        header: t("title"),
        accessorKey: "title",
        cell: (info) => <Typography noWrap>{info.getValue()}</Typography>,
        footer: (props) => props.column.id,
        filterFn: "fuzzy",
        sortingFn: fuzzySort,
      },
      // {
      //   header: "Description",
      //   accessorKey: "content",
      //   cell: (info) => <Typography noWrap>{info.getValue()}</Typography>,
      //   footer: (props) => props.column.id,
      //   filterFn: "fuzzy",
      //   sortingFn: fuzzySort,
      // },
      {
        id: "status",
        header: t("status"),
        accessorFn: ({ published }) =>
          published ? "published" : "unpublished",
        cell: (info) => <TermStatusChip status={info.getValue<TermStatus>()} />,
        footer: (props) => props.column.id,
      },
      {
        id: "flagged",
        header: t("flagged"),
        accessorFn: ({ flagged }) => (flagged.length ? "True" : "False"),
        cell: (info) => {
          const status = info.getValue<string>()
          return status === "True" ? (
            <TermStatusChip status={"flagged"} />
          ) : (
            <></>
          )
        },
        footer: (props) => props.column.id,
      },
      {
        id: "updatedAt",
        header: t("updatedAt"),
        accessorKey: "updatedAt",
        accessorFn: ({ updatedAt }) =>
          formatDate({ date: updatedAt, format: "DD. MMM YYYY H:mm" }),
        footer: (props) => props.column.id,
      },
      {
        id: "actions",
        header: "",
        footer: (props) => props.column.id,
        accessorFn: (term) => term,
        cell: (info) => (
          <RowMenu term={info.getValue<AdminTermFragmentFragment>()} />
        ),
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableSorting: false,
      },
    ]

    return isAdmin
      ? columns
      : columns.filter((column) => column.id !== "author")
  }, [isAdmin, t])

  const table = useReactTable({
    data: terms,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rows = useMemo(() => table.getRowModel().rows, [table.getRowModel()])

  return (
    <Sheet variant="outlined" sx={{ minHeight: 0, borderRadius: "sm", py: 2 }}>
      <Stack direction="row" pb={3} gap={1} px={2}>
        <Box sx={{ flex: 1 }}>
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            placeholder="Search"
            disabled={loadingAdminTermsQuery}
          />
        </Box>
        <NewTermButton size="lg" disabled={loadingAdminTermsQuery} />
      </Stack>
      {loadingAdminTermsQuery ? (
        <Stack direction="row" justifyContent="center" my={5}>
          <CircularProgress size="lg" variant="soft" />
        </Stack>
      ) : (
        <>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Table
              aria-labelledby="tableTitle"
              stickyHeader
              hoverRow
              sx={{
                "--TableRow-hoverBackground":
                  "var(--joy-palette-background-level1)",
                "--TableCell-paddingY": "4px",
              }}
            >
              <TableHead headerGroups={table.getHeaderGroups()} />
              <TableBody rows={rows} />
            </Table>
          </Box>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <List
              size="sm"
              sx={{
                "--ListItem-paddingX": 0,
                "> *": {
                  "&:hover": {
                    background: "var(--joy-palette-background-level1)",
                  },
                  ":not(:last-of-type)": {
                    borderBottom: "solid 1px",
                    borderColor: "divider",
                  },
                  ":not(:first-of-type)": { pt: 2 },
                },
              }}
            >
              {rows.map(({ original: term }) => (
                <TermsListItem key={term.id} term={term} />
              ))}
            </List>
          </Box>
        </>
      )}
      <Divider sx={{ mb: 2 }} />
      <Box px={2}>
        <Pagination
          pageIndex={table.getState().pagination.pageIndex + 1}
          pageCount={table.getPageCount()}
          onPageChange={(page) => table.setPageIndex(page - 1)}
          pageSize={table.getState().pagination.pageSize}
          onPageSizeChange={table.setPageSize}
          disabled={loadingAdminTermsQuery}
        />
      </Box>
    </Sheet>
  )
}

export default TermsTable
