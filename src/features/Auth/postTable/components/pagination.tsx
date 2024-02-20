import { FC } from "react"
import Pagination from "@mui/material/Pagination"
import Box from "@mui/joy/Box"
import Select from "@mui/joy/Select"
import Option from "@mui/joy/Option"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/joy"

type TablePaginationProps = {
  totalPages?: number
  currentPage?: number
  onChange?: (_page: number) => void
  itemsPerPage?: number
  onItemsPerPageChange?: (_itemsPerPage: number) => void
}

const itemsPerPageOptions = [10, 20, 50]

const TablePagination: FC<TablePaginationProps> = ({
  totalPages = 1,
  currentPage = 1,
  onChange,
  itemsPerPage,
  onItemsPerPageChange,
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
      <Pagination
        count={totalPages}
        shape="rounded"
        variant="outlined"
        boundaryCount={moreThanSm ? 1 : 0}
        page={currentPage}
        onChange={(_event, value) => {
          if (onChange) onChange(value)
        }}
        showFirstButton
        showLastButton
        siblingCount={moreThanSm ? 1 : 0}
        disabled={totalPages <= 1}
        sx={{
          ".MuiPaginationItem-root": {
            borderColor: "var(--joy-palette-neutral-outlinedBorder)",
            color:
              "var(--variant-plainColor, var(--joy-palette-neutral-plainColor, var(--joy-palette-neutral-700, #32383E)))",
          },
        }}
      />
      {itemsPerPage ? (
        <Select
          size="sm"
          value={itemsPerPage}
          onChange={(_, value) => {
            if (onItemsPerPageChange && value) onItemsPerPageChange(value)
          }}
        >
          {itemsPerPageOptions.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      ) : null}
    </Box>
  )
}

export default TablePagination
