import { FC } from "react"
import MuiPagination from "@mui/material/Pagination"
import Box from "@mui/joy/Box"
import Select from "@mui/joy/Select"
import Option from "@mui/joy/Option"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/joy"

export type PaginationProps = {
  pageIndex?: number
  pageCount?: number
  onPageChange?: (_page: number) => void
  pageSize?: number
  onPageSizeChange?: (_itemsPerPage: number) => void
  disabled?: boolean
}

const pageSizeOptions = [10, 20, 50]

const Pagination: FC<PaginationProps> = ({
  pageCount = 1,
  pageIndex = 1,
  onPageChange,
  pageSize,
  onPageSizeChange,
  disabled,
}) => {
  const moreThanSm = useMediaQuery(useTheme().breakpoints.up("sm"))

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      <MuiPagination
        count={pageCount}
        shape="rounded"
        variant="outlined"
        boundaryCount={moreThanSm ? 1 : 0}
        page={pageIndex}
        onChange={(_event, value) => {
          if (onPageChange) onPageChange(value)
        }}
        showFirstButton
        showLastButton
        siblingCount={moreThanSm ? 1 : 0}
        disabled={disabled ?? pageCount <= 1}
        sx={{
          ".MuiPaginationItem-root": {
            borderColor: "var(--joy-palette-neutral-outlinedBorder)",
            color:
              "var(--variant-plainColor, var(--joy-palette-neutral-plainColor, var(--joy-palette-neutral-700, #32383E)))",
          },
        }}
      />
      {pageSize ? (
        <Select
          size="sm"
          value={pageSize}
          onChange={(_, value) => {
            if (onPageSizeChange && value) onPageSizeChange(value)
          }}
          disabled={disabled}
        >
          {pageSizeOptions.map((pageSizeOption) => (
            <Option key={pageSizeOption} value={pageSizeOption}>
              {pageSizeOption}
            </Option>
          ))}
        </Select>
      ) : null}
    </Box>
  )
}

export default Pagination
