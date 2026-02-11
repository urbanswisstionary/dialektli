"use client"

import type { FC } from "react"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"
import { useTranslations } from "next-intl"
import { SxProps, Theme } from "@mui/material/styles"
import { Link } from "@/i18n/navigation"

interface NewExpressionButtonProps {
  disabled?: boolean
  sx?: SxProps<Theme>
}

const NewExpressionButton: FC<NewExpressionButtonProps> = ({
  disabled,
  sx,
}) => {
  const t = useTranslations()

  return (
    <Button
      component={Link}
      href="/expressions/new"
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      disabled={disabled}
      aria-label={t("newExpressionButton.newExpression")}
      sx={{
        width: "100%",
        py: 1,
        ...sx,
      }}
    >
      {t("newExpressionButton.newExpression")}
    </Button>
  )
}

export default NewExpressionButton
