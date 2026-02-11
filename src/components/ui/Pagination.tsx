"use client"

import { FC } from "react"
import MuiPagination from "@mui/material/Pagination"
import Box from "@mui/material/Box"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"

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
  const theme = useTheme()
  const moreThanSm = useMediaQuery(theme.breakpoints.up("sm"))

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
      />
      {pageSize ? (
        <Select
          size="small"
          value={pageSize}
          onChange={(event) => {
            if (onPageSizeChange) onPageSizeChange(Number(event.target.value))
          }}
          disabled={disabled}
        >
          {pageSizeOptions.map((pageSizeOption) => (
            <MenuItem key={pageSizeOption} value={pageSizeOption}>
              {pageSizeOption}
            </MenuItem>
          ))}
        </Select>
      ) : null}
    </Box>
  )
}

export default Pagination
