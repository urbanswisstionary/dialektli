import { FC, useMemo, useState } from "react"
import Box from "@mui/joy/Box"
import Table from "@mui/joy/Table"
import Sheet from "@mui/joy/Sheet"
import Checkbox from "@mui/joy/Checkbox"
import RowMenu from "./components/rowMenu"
import type { ExpressionStatus } from "@/ui/ExpressionStatusChip"
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
import type {
  AdminExpressionFragmentFragment,
  // Language
} from "@@/generated/graphql"
import Divider from "@mui/joy/Divider"
import Pagination from "@/ui/Pagination"
import DebouncedInput from "../../../ui/debouncedInput"
import TableHead from "./components/tableHeader"
import TableBody from "./components/tableBody"
import { formatDate, fuzzyFilter, fuzzySort } from "./expressionsTable.utils"
import ExpressionStatusChip from "@/ui/ExpressionStatusChip"
import List from "@mui/joy/List"
import Typography from "@mui/joy/Typography"
import ExpressionsListItem from "./components/expressionsListItem"
import Flag from "@/ui/Flag"
import Stack from "@mui/joy/Stack"
import NewExpressionButton from "@/ui/NewExpressionButton"
import {
  AdminExpressionFragment,
  useAdminExpressionsQuery,
} from "@/hooks/useExpressions"
import { getFragmentData } from "@@/generated"
import CircularProgress from "@mui/joy/CircularProgress"
import { useTranslation } from "next-i18next"
import { useMe } from "@/hooks/useUsers"

const ExpressionsTable: FC = () => {
  const { t } = useTranslation("common")
  const { isAdmin } = useMe()
  const {
    data,
    previousData,
    loading: loadingAdminExpressionsQuery,
  } = useAdminExpressionsQuery()
  const expressions = useMemo(() => {
    const adminExpressions =
      data?.adminExpressions ?? previousData?.adminExpressions
    return [
      ...(getFragmentData(
        AdminExpressionFragment,
        adminExpressions?.expressions,
      ) ?? []),
    ]
  }, [data?.adminExpressions, previousData?.adminExpressions])

  const [globalFilter, setGlobalFilter] = useState("")
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns = useMemo<
    ColumnDef<AdminExpressionFragmentFragment, any>[]
  >(() => {
    const columns: ColumnDef<AdminExpressionFragmentFragment, any>[] = [
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
        header: t("expression.author"),
        accessorFn: ({ author }) => author?.name,
        cell: (info) => <Typography noWrap>{info.getValue()}</Typography>,
        footer: (props) => props.column.id,
        filterFn: "fuzzy",
        sortingFn: fuzzySort,
      },
      // {
      //   id: "language",
      //   header: t("expression.language"),
      //   accessorKey: "language",
      //   accessorFn: ({ language }) => language,
      //   cell: (info) => {
      //     const language = info.getValue<Language>()
      //     return (
      //       <Stack
      //         direction="row"
      //         gap={1}
      //         flexWrap="wrap"
      //         justifyContent="center"
      //       >
      //         <Flag mode="country" code={language} />
      //       </Stack>
      //     )
      //   },
      //   footer: (props) => props.column.id,
      //   filterFn: "fuzzy",
      //   sortingFn: fuzzySort,
      // },
      {
        id: "canton",
        header: t("expression.canton"),
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
        header: t("expression.title"),
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
        header: t("expression.status"),
        accessorFn: ({ published }) =>
          published ? "published" : "unpublished",
        cell: (info) => (
          <ExpressionStatusChip status={info.getValue<ExpressionStatus>()} />
        ),
        footer: (props) => props.column.id,
      },
      {
        id: "flagged",
        header: t("expression.flagged"),
        accessorFn: ({ flagged }) => (flagged.length ? "True" : "False"),
        cell: (info) => {
          const status = info.getValue<string>()
          return status === "True" ? (
            <ExpressionStatusChip status={"flagged"} />
          ) : (
            <></>
          )
        },
        footer: (props) => props.column.id,
      },
      {
        id: "updatedAt",
        header: t("expression.updatedAt"),
        accessorKey: "updatedAt",
        accessorFn: ({ updatedAt }) =>
          formatDate({ date: updatedAt, format: "DD. MMM YYYY H:mm" }),
        footer: (props) => props.column.id,
      },
      {
        id: "actions",
        header: "",
        footer: (props) => props.column.id,
        accessorFn: (expression) => expression,
        cell: (info) => (
          <RowMenu
            expression={info.getValue<AdminExpressionFragmentFragment>()}
          />
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
    data: expressions,
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
            onChange={(value) => setGlobalFilter(value)}
            placeholder={t("actions.search")}
            disabled={loadingAdminExpressionsQuery}
            size="lg"
          />
        </Box>
        <NewExpressionButton
          size="lg"
          disabled={loadingAdminExpressionsQuery}
        />
      </Stack>
      {loadingAdminExpressionsQuery ? (
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
              {rows.map(({ original: expression }) => (
                <ExpressionsListItem
                  key={expression.id}
                  expression={expression}
                />
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
          disabled={loadingAdminExpressionsQuery}
        />
      </Box>
    </Sheet>
  )
}

export default ExpressionsTable
