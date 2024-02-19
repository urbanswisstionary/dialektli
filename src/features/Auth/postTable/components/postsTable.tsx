import { Dispatch, FC, SetStateAction, useMemo, useState } from "react"
import Box from "@mui/joy/Box"
import Table from "@mui/joy/Table"
import Sheet from "@mui/joy/Sheet"
import Checkbox from "@mui/joy/Checkbox"
import RowMenu from "./rowMenu"
import type { PostStatus } from "./postStatusChip"
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

import type { AdminPostFragmentFragment } from "@@/generated/graphql"

import Divider from "@mui/joy/Divider"
import TablePagination from "./pagination"

import DebouncedInput from "./debouncedInput"
import TableHead from "./tableHeader"
import TableBody from "./tableBody"
import { formatDate, fuzzyFilter, fuzzySort } from "../utils/helper"
import PostStatusChip from "./postStatusChip"

import List from "@mui/joy/List"
import Typography from "@mui/joy/Typography"

import PostListItem from "./postListItem"
import Flag from "@/ui/Flag"

type PostsTableProps = {
  posts: AdminPostFragmentFragment[]
  globalFilter: string
  setGlobalFilter: Dispatch<SetStateAction<string>>
}

const PostsTable: FC<PostsTableProps> = ({
  posts,
  globalFilter,
  setGlobalFilter,
}) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns = useMemo<ColumnDef<AdminPostFragmentFragment, any>[]>(
    () => [
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
        header: "Author's Name",
        accessorFn: ({ author }) => author?.name,
        cell: (info) => <Typography noWrap>{info.getValue()}</Typography>,
        footer: (props) => props.column.id,
        filterFn: "fuzzy",
        sortingFn: fuzzySort,
      },
      {
        header: "Canton",
        accessorKey: "canton",
        accessorFn: ({ canton }) => canton ?? "N/A",
        cell: (info) => {
          const canton = info.getValue<string>()
          return canton === "N/A" ? null : (
            <Box display="flex" justifyContent="center">
              <Flag mode="canton" code={canton.toLowerCase()} />
            </Box>
          )
        },
        footer: (props) => props.column.id,
        filterFn: "fuzzy",
        sortingFn: fuzzySort,
      },
      {
        header: "Entry",
        accessorKey: "title",
        cell: (info) => <Typography noWrap>{info.getValue()}</Typography>,
        footer: (props) => props.column.id,
        filterFn: "fuzzy",
        sortingFn: fuzzySort,
      },
      {
        header: "Description",
        accessorKey: "content",
        cell: (info) => <Typography noWrap>{info.getValue()}</Typography>,
        footer: (props) => props.column.id,
        filterFn: "fuzzy",
        sortingFn: fuzzySort,
      },
      {
        id: "status",
        header: "Status",
        accessorFn: ({ published }) =>
          published ? "published" : "unpublished",
        cell: (info) => <PostStatusChip status={info.getValue<PostStatus>()} />,
        footer: (props) => props.column.id,
      },
      {
        id: "flagged",
        header: "Flagged",
        accessorFn: ({ flagged }) => (flagged.length ? "True" : "False"),
        cell: (info) => {
          const status = info.getValue<string>()
          return status === "True" ? (
            <PostStatusChip status={"flagged"} />
          ) : (
            <></>
          )
        },
        footer: (props) => props.column.id,
      },
      {
        id: "updatedAt",
        header: "Last update",
        accessorKey: "updatedAt",
        accessorFn: ({ updatedAt }) =>
          formatDate({ date: updatedAt, format: "DD. MMM YYYY H:mm" }),
        footer: (props) => props.column.id,
      },
      {
        id: "actions",
        header: "",
        footer: (props) => props.column.id,
        accessorFn: (post) => post,
        cell: (info) => (
          <RowMenu post={info.getValue<AdminPostFragmentFragment>()} />
        ),
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableSorting: false,
      },
    ],
    [],
  )

  const table = useReactTable({
    data: posts,
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
    <Sheet sx={{ minHeight: 0, borderRadius: "sm", p: 2 }}>
      <Box pb={3}>
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Search all columns..."
        />
      </Box>
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
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
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <List
          size="sm"
          sx={{
            "--ListItem-paddingX": 0,
            "> *": {
              "&:hover": { background: "var(--joy-palette-background-level1)" },
              ":not(:last-of-type)": {
                borderBottom: "solid 1px",
                borderColor: "divider",
              },
              ":not(:first-of-type)": { pt: 2 },
            },
          }}
        >
          {rows.map(({ original: post }) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </List>
      </Box>
      <Divider sx={{ marginBottom: "2rem" }} />
      <TablePagination
        currentPage={table.getState().pagination.pageIndex + 1}
        totalPages={table.getPageCount()}
        onChange={(page) => table.setPageIndex(page - 1)}
        itemsPerPage={table.getState().pagination.pageSize}
        onItemsPerPageChange={table.setPageSize}
      />
    </Sheet>
  )
}

export default PostsTable
