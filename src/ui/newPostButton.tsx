import type { FC } from "react"
import Link from "next/link"
import IconButton from "@mui/joy/IconButton"
import AddIcon from "@mui/icons-material/Add"

const NewPostButton: FC = () => (
  <Link href={"/post/new"} passHref>
    <IconButton title="New Post" variant="outlined" color="neutral" size="sm">
      <AddIcon />
    </IconButton>
  </Link>
)

export default NewPostButton
