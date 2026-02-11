"use client"

import type { FC, PropsWithChildren } from "react"
import { useState } from "react"
import Box from "@mui/material/Box"

type TogglerProps = {
  defaultExpanded?: boolean
  renderToggle: (params: {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  }) => React.ReactNode
}

const Toggler: FC<PropsWithChildren<TogglerProps>> = ({
  children,
  defaultExpanded = false,
  renderToggle,
}) => {
  const [open, setOpen] = useState(defaultExpanded)
  return (
    <>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </>
  )
}
export default Toggler
