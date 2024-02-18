import { FC, useMemo } from "react"
import { Column } from "@tanstack/react-table"
import Autocomplete from "@mui/joy/Autocomplete"

type ColumnFilterProps = {
  column: Column<any, unknown>
}

const ColumnFilter: FC<ColumnFilterProps> = ({ column }) => {
  const columnFilterValue = column.getFilterValue() ?? null

  const { sortedUniqueValues, uniqueValuesSize } = useMemo(
    () => {
      const uniqueValues = column.getFacetedUniqueValues()
      return {
        uniqueValuesSize: uniqueValues.size,
        sortedUniqueValues: Array.from(uniqueValues.keys()).sort(),
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [column.getFacetedUniqueValues()],
  )
  return (
    <Autocomplete
      options={sortedUniqueValues as string[]}
      value={columnFilterValue as string | null}
      placeholder={`Search ${uniqueValuesSize} ${column.id === "createdAt" || column.id === "updatedAt" ? "date" : column.id}${uniqueValuesSize > 1 ? "s" : ""}`}
      blurOnSelect
      clearOnEscape
      autoComplete
      onInputChange={(_, value) => column.setFilterValue(value?.trim())}
      selectOnFocus
      isOptionEqualToValue={(option, value) =>
        new RegExp(value, "gi").test(option)
      }
      variant="plain"
      sx={{ padding: "0 0.5rem" }}
      size="sm"
      slotProps={{ input: { sx: { maxWidth: "80%" } } }}
      disabled={uniqueValuesSize <= 1}
    />
  )
}

export default ColumnFilter
