import type { FC } from "react"
import { flexRender, Row } from "@tanstack/react-table"

const TableBody: FC<{ rows: Row<any>[] }> = ({ rows }) => (
  <tbody>
    {rows.map((row) => (
      <tr key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
)

export default TableBody
