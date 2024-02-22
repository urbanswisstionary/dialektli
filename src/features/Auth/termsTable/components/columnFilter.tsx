import { FC, useMemo } from "react"
import { Column } from "@tanstack/react-table"
import Autocomplete from "@mui/joy/Autocomplete"
import SelectLocationOption from "../../../../ui/Autocomplete/selectLocationOption"
import Flag from "@/ui/Flag"
import AutocompleteOption from "@mui/joy/AutocompleteOption"
import Typography from "@mui/joy/Typography"
import { useTranslation } from "next-i18next"

type ColumnFilterProps = {
  column: Column<any, unknown>
}

const ColumnFilter: FC<ColumnFilterProps> = ({ column }) => {
  const { t } = useTranslation("common")
  const columnFilterValue = (column.getFilterValue() ?? null) as string | null

  const { sortedUniqueValues, uniqueValuesSize } = useMemo(
    () => {
      const uniqueValues = column.getFacetedUniqueValues()
      return {
        uniqueValuesSize: uniqueValues.size,
        sortedUniqueValues: Array.from(uniqueValues.keys()).sort() as string[],
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [column.getFacetedUniqueValues()],
  )

  return (
    <Autocomplete
      options={sortedUniqueValues}
      value={columnFilterValue}
      placeholder={`(${uniqueValuesSize}) ${t(uniqueValuesSize === 1 ? "actions.option" : "actions.options")}`}
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
      slotProps={{
        listbox: { sx: { minWidth: "20ch" } },
      }}
      startDecorator={
        column.id === "canton" && columnFilterValue ? (
          <Flag mode={"canton"} code={columnFilterValue} />
        ) : null
      }
      renderOption={(optionProps, option) =>
        column.id === "canton" ? (
          <SelectLocationOption
            {...optionProps}
            mode="canton"
            label={option}
            flagCode={option.toLowerCase()}
          />
        ) : (
          <AutocompleteOption {...optionProps}>
            <Typography noWrap>{option}</Typography>
          </AutocompleteOption>
        )
      }
      disabled={uniqueValuesSize <= 1}
    />
  )
}

export default ColumnFilter
