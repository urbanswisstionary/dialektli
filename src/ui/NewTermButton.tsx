import type { FC } from "react"
import NextLink from "next/link"
import IconButton, { IconButtonProps } from "@mui/joy/IconButton"
import AddIcon from "@mui/icons-material/Add"
import JoyLink from "@mui/joy/Link"
const NewTermButton: FC<
  Pick<IconButtonProps, "size"> & { disabled?: boolean }
> = ({ size = "sm", disabled }) => (
  <JoyLink component={NextLink} href={"/term/new"} passHref disabled={disabled}>
    <IconButton
      title="New Term"
      variant="outlined"
      color="neutral"
      size={size}
      disabled={disabled}
    >
      <AddIcon />
    </IconButton>
  </JoyLink>
)

export default NewTermButton
