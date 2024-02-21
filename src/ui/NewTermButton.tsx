import type { FC } from "react"
import Link from "next/link"
import IconButton, { IconButtonProps } from "@mui/joy/IconButton"
import AddIcon from "@mui/icons-material/Add"

const NewTermButton: FC<Pick<IconButtonProps, "size">> = ({ size = "sm" }) => (
  <Link href={"/term/new"} passHref>
    <IconButton title="New Term" variant="outlined" color="neutral" size={size}>
      <AddIcon />
    </IconButton>
  </Link>
)

export default NewTermButton
