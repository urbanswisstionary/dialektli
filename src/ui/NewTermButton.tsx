import type { FC } from "react"
import NextLink from "next/link"
import IconButton, { IconButtonProps } from "@mui/joy/IconButton"
import AddIcon from "@mui/icons-material/Add"
import JoyLink, { LinkProps } from "@mui/joy/Link"
import { useTranslation } from "next-i18next"
import { useMe } from "@/hooks/useUsers"

const NewTermButton: FC<
  Pick<IconButtonProps, "size"> & Pick<LinkProps, "sx"> & { disabled?: boolean }
> = ({ size = "sm", disabled, sx }) => {
  const { me } = useMe()
  const { t } = useTranslation("common", { keyPrefix: "newTermButton" })

  return (
    <JoyLink
      component={NextLink}
      href={!me ? "/account/signin" : "/term/new"}
      passHref
      disabled={disabled}
      sx={sx}
    >
      <IconButton
        sx={{ width: "100%" }}
        title={t("newTerm")}
        variant="solid"
        color="danger"
        size={size}
        disabled={disabled}
      >
        <AddIcon />
      </IconButton>
    </JoyLink>
  )
}

export default NewTermButton
