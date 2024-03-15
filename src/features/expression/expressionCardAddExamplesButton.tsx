import type { FC } from "react"
import { useTranslation } from "next-i18next"
import Box, { BoxProps } from "@mui/joy/Box"
import JoyLink from "@mui/joy/Link"
import IconButton from "@mui/joy/IconButton"
import AddIcon from "@mui/icons-material/Add"

export type ExpressionCardAddExampleButtonProps = {
  type?: "iconButton" | "link"
  disabled?: boolean
  onClick: () => void
  loading?: boolean
  sx?: BoxProps["sx"]
}
const ExpressionCardAddExampleButton: FC<
  ExpressionCardAddExampleButtonProps
> = ({ disabled, onClick, loading, type, sx }) => {
  const { t } = useTranslation("common", { keyPrefix: "expression" })
  return (
    <Box
      sx={[
        { width: "100%", display: "flex" },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {type === "link" ? (
        <JoyLink
          component="button"
          level="title-sm"
          fontWeight={600}
          onClick={onClick}
          disabled={disabled || loading}
          title={t("editExpression.addExample")}
        >
          {t("suggestExample")}
        </JoyLink>
      ) : (
        <IconButton
          title={t("editExpression.addExample")}
          variant="outlined"
          color="neutral"
          size="md"
          disabled={disabled}
          loading={loading}
          onClick={onClick}
        >
          <AddIcon />
        </IconButton>
      )}
    </Box>
  )
}

export default ExpressionCardAddExampleButton
