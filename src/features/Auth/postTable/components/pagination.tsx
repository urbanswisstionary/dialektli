import { FC } from "react"
import Pagination from "@mui/material/Pagination"
import Box from "@mui/joy/Box"
import Select from "@mui/joy/Select"
import Option from "@mui/joy/Option"

type TablePaginationProps = {
  totalPages?: number
  currentPage?: number
  onChange?: (_page: number) => void
  itemsPerPage?: number
  onItemsPerPageChange?: (_itemsPerPage: number) => void
}

const itemsPerPageOptions = [5, 10, 20, 50]

const TablePagination: FC<TablePaginationProps> = ({
  totalPages = 1,
  currentPage = 1,
  onChange,
  itemsPerPage,
  onItemsPerPageChange,
}) => (
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
      boundaryCount={1}
      page={currentPage}
      onChange={(_event, value) => {
        if (onChange) onChange(value - 1)
      }}
      showFirstButton
      showLastButton
      siblingCount={1}
      disabled={totalPages <= 1}
    />
    {itemsPerPage ? (
      <Select
        size="sm"
        value={itemsPerPage}
        onChange={(_, value) => {
          if (onItemsPerPageChange && value) onItemsPerPageChange(value)
        }}
        disabled={totalPages <= 1}
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

export default TablePagination
