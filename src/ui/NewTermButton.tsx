import type { FC } from "react"
import NextLink from "next/link"
import IconButton, { IconButtonProps } from "@mui/joy/IconButton"
import AddIcon from "@mui/icons-material/Add"
import JoyLink from "@mui/joy/Link"
import { useTranslation } from "next-i18next"

const NewTermButton: FC<
  Pick<IconButtonProps, "size"> & { disabled?: boolean }
> = ({ size = "sm", disabled }) => {
  const { t } = useTranslation("common", { keyPrefix: "newTermButton" })
  return (
    <JoyLink
      component={NextLink}
      href={"/term/new"}
      passHref
      disabled={disabled}
    >
      <IconButton
        title={t("newTerm")}
        variant="outlined"
        color="neutral"
        size={size}
        disabled={disabled}
      >
        <AddIcon />
      </IconButton>
    </JoyLink>
  )
}

export default NewTermButton
