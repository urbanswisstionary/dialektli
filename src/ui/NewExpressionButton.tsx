import type { FC } from "react"
import NextLink from "next/link"
import IconButton, { IconButtonProps } from "@mui/joy/IconButton"
import AddIcon from "@mui/icons-material/Add"
import JoyLink, { LinkProps } from "@mui/joy/Link"
import { useTranslation } from "next-i18next"

const NewExpressionButton: FC<
  Pick<IconButtonProps, "size"> & Pick<LinkProps, "sx"> & { disabled?: boolean }
> = ({ size = "sm", disabled, sx }) => {
  const { t } = useTranslation("common", { keyPrefix: "newExpressionButton" })

  return (
    <JoyLink
      component={NextLink}
      href={"/expression/new"}
      passHref
      disabled={disabled}
      sx={sx}
    >
      <IconButton
        sx={{ width: "100%" }}
        title={t("newExpression")}
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

export default NewExpressionButton
