import type { FC } from "react"
import Typography from "@mui/joy/Typography"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import { flexRender, HeaderGroup } from "@tanstack/react-table"
import ColumnFilter from "./columnFilter"

const narrowColumns = ["select", "actions"]

const TableHead: FC<{ headerGroups: HeaderGroup<any>[] }> = ({
  headerGroups,
}) => (
  <thead>
    {headerGroups.map((headerGroup) => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <th
            key={header.id}
            colSpan={header.colSpan}
            style={
              narrowColumns.includes(header.id) ? { width: "3rem" } : undefined
            }
          >
            {header.isPlaceholder ? null : (
              <>
                <Typography
                  component={header.id === "select" ? "div" : "p"}
                  level="title-md"
                  sx={
                    header.column.getCanSort()
                      ? {
                          cursor: "pointer",
                          userSelect: "none",
                          paddingLeft: "0.5rem",
                        }
                      : {}
                  }
                  onClick={header.column.getToggleSortingHandler()}
                  endDecorator={
                    <ArrowDropDownIcon
                      sx={[
                        { transition: "transform 0.2s ease" },
                        {
                          asc: { transform: "initial" },
                          desc: { transform: "rotate(180deg)" },
                        }[header.column.getIsSorted() as string] ?? {
                          display: "none",
                        },
                      ]}
                    />
                  }
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </Typography>
                {header.column.getCanFilter() ? (
                  <ColumnFilter column={header.column} />
                ) : null}
              </>
            )}
          </th>
        ))}
      </tr>
    ))}
  </thead>
)

export default TableHead
