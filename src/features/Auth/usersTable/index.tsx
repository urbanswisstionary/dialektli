import { FC, useMemo, useState } from "react"
import Box from "@mui/joy/Box"
import Table from "@mui/joy/Table"
import Sheet from "@mui/joy/Sheet"
import Checkbox from "@mui/joy/Checkbox"
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
import type { AdminUsersFragmentFragment, Role } from "@@/generated/graphql"
import Divider from "@mui/joy/Divider"
import Pagination from "@/ui/Pagination"
import DebouncedInput from "../../../ui/debouncedInput"
import TableHead from "./components/tableHeader"
import TableBody from "./components/tableBody"
import { fuzzyFilter, fuzzySort } from "./table.utils"
import TermStatusChip from "@/ui/TermStatusChip"
import Typography from "@mui/joy/Typography"
import Flag from "@/ui/Flag"
import Stack from "@mui/joy/Stack"
import NewTermButton from "@/ui/NewTermButton"
import { getFragmentData } from "@@/generated"
import CircularProgress from "@mui/joy/CircularProgress"
import { useTranslation } from "next-i18next"
import { useMe } from "@/hooks/useMe"
import { AdminUsersFragment, useAdminUsersQuery } from "@/hooks/useUsers"

const UsersTable: FC = () => {
  const { t } = useTranslation("common")
  const { isAdmin } = useMe()

  const {
    data,
    previousData,
    loading: loadingAdminUsersQuery,
  } = useAdminUsersQuery()

  const users = useMemo(() => {
    const adminUsers = data?.adminUsers ?? previousData?.adminUsers
    return [...(getFragmentData(AdminUsersFragment, adminUsers?.users) ?? [])]
  }, [data?.adminUsers, previousData?.adminUsers])

  const [globalFilter, setGlobalFilter] = useState("")
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns = useMemo<ColumnDef<AdminUsersFragmentFragment, any>[]>(() => {
    const columns: ColumnDef<AdminUsersFragmentFragment, any>[] = [
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
        id: "name",
        accessorKey: "name",
        header: t("auth.profile.name"),
        cell: (info) => <Typography noWrap>{info.getValue()}</Typography>,
        footer: (props) => props.column.id,
        filterFn: "fuzzy",
        sortingFn: fuzzySort,
      },
      {
        id: "email",
        accessorKey: "email",
        header: t("auth.profile.email"),
        cell: (info) => <Typography noWrap>{info.getValue()}</Typography>,
        footer: (props) => props.column.id,
        filterFn: "fuzzy",
        sortingFn: fuzzySort,
      },
      {
        id: "country",
        header: t("auth.profile.country"),
        accessorFn: ({ country }) => country ?? "",
        cell: (info) => {
          const country = info.getValue<string>()
          return (
            <Stack direction="row" justifyContent="center">
              {country.length ? <Flag mode="country" code={country} /> : "-"}
            </Stack>
          )
        },
        footer: (props) => props.column.id,
        filterFn: "fuzzy",
        sortingFn: fuzzySort,
      },
      {
        id: "canton",
        header: t("auth.profile.canton"),
        accessorFn: ({ canton }) => canton ?? "",
        cell: (info) => {
          const canton = info.getValue<string>()
          return (
            <Stack direction="row" justifyContent="center">
              {canton.length ? <Flag mode="canton" code={canton} /> : "-"}
            </Stack>
          )
        },
        footer: (props) => props.column.id,
        filterFn: "fuzzy",
        sortingFn: fuzzySort,
      },
      {
        id: "published",
        header: () => <TermStatusChip status="published" />,
        accessorFn: ({ publishedTermsCount }) => `${publishedTermsCount}`,
        cell: (info) => {
          return (
            <Stack direction="row" justifyContent="center">
              {info.getValue<string>()}
            </Stack>
          )
        },
        footer: (props) => props.column.id,
        enableColumnFilter: false,
      },
      {
        id: "unpublished",
        header: () => <TermStatusChip status="unpublished" />,
        accessorFn: ({ unpublishedTermsCount }) => `${unpublishedTermsCount}`,
        cell: (info) => {
          return (
            <Stack direction="row" justifyContent="center">
              {info.getValue<string>()}
            </Stack>
          )
        },
        footer: (props) => props.column.id,
        enableColumnFilter: false,
      },
      {
        id: "likes",
        header: "Likes",
        accessorFn: ({ likesCount }) => `${likesCount}`,
        cell: (info) => {
          return (
            <Stack direction="row" justifyContent="center">
              {info.getValue<string>()}
            </Stack>
          )
        },
        footer: (props) => props.column.id,
        enableColumnFilter: false,
      },
      {
        id: "dislikes",
        header: "Dislikes",
        accessorFn: ({ dislikesCount }) => `${dislikesCount}`,
        cell: (info) => {
          return (
            <Stack direction="row" justifyContent="center">
              {info.getValue<string>()}
            </Stack>
          )
        },
        footer: (props) => props.column.id,
        enableColumnFilter: false,
      },
      {
        id: "role",
        header: "Role",
        accessorKey: "role",
        cell: (info) => (
          <Stack direction="row" justifyContent="center">
            {info.getValue<Role>()}
          </Stack>
        ),
        footer: (props) => props.column.id,
        filterFn: "fuzzy",
        sortingFn: fuzzySort,
      },
    ]

    return isAdmin
      ? columns
      : columns.filter((column) => column.id !== "author")
  }, [isAdmin, t])

  const table = useReactTable({
    data: users,
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
            disabled={loadingAdminUsersQuery}
            size="lg"
          />
        </Box>
        <NewTermButton size="lg" disabled={loadingAdminUsersQuery} />
      </Stack>
      {loadingAdminUsersQuery ? (
        <Stack direction="row" justifyContent="center" my={5}>
          <CircularProgress size="lg" variant="soft" />
        </Stack>
      ) : (
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
      )}
      <Divider sx={{ mb: 2 }} />
      <Box px={2}>
        <Pagination
          pageIndex={table.getState().pagination.pageIndex + 1}
          pageCount={table.getPageCount()}
          onPageChange={(page) => table.setPageIndex(page - 1)}
          pageSize={table.getState().pagination.pageSize}
          onPageSizeChange={table.setPageSize}
          disabled={loadingAdminUsersQuery}
        />
      </Box>
    </Sheet>
  )
}

export default UsersTable
