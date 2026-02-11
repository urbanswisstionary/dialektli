"use client"

import type { FC, ReactNode } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import MuiCard, { CardProps as MuiCardProps } from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import { useTranslations } from "next-intl"
import DeleteForever from "@mui/icons-material/DeleteForever"

type ActionButtonProps = {
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  title?: string | null
}

type CardActionsType = {
  cancel?: ActionButtonProps
  save?: ActionButtonProps & { type?: "submit" }
  delete?: ActionButtonProps
}

interface CardProps extends Omit<MuiCardProps, "title"> {
  actions?: CardActionsType
  description?: string | null
  title?: string | null
  children?: ReactNode
}

const Card: FC<CardProps> = ({
  actions,
  children,
  description,
  title,
  sx,
  ...cardProps
}) => {
  const t = useTranslations()

  return (
    <MuiCard
      sx={[{ padding: 0 }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...cardProps}
    >
      {title || description ? (
        <>
          <Box sx={{ mb: 1, p: 2 }}>
            {title ? <Typography variant="h6">{title}</Typography> : null}
            {description ? (
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            ) : null}
          </Box>
          <Divider />
        </>
      ) : null}
      <CardContent>
        <Stack direction="column" spacing={2}>
          {children}
        </Stack>
      </CardContent>

      {actions ? (
        <>
          <Divider />
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              gap: 1,
            }}
          >
            <Box>
              {actions.delete ? (
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  disabled={actions.delete.disabled || actions.delete.loading}
                  onClick={() => {
                    if (actions.delete?.onClick) actions.delete.onClick()
                  }}
                  endIcon={<DeleteForever />}
                  sx={{ textTransform: "capitalize" }}
                >
                  {actions.delete.title ?? t("actions.delete")}
                </Button>
              ) : null}
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              {actions.cancel ? (
                <Button
                  size="small"
                  variant="outlined"
                  disabled={actions.cancel.disabled || actions.cancel.loading}
                  onClick={() => {
                    if (actions.cancel?.onClick) actions.cancel.onClick()
                  }}
                  sx={{ textTransform: "capitalize" }}
                >
                  {actions.cancel.title ?? t("actions.cancel")}
                </Button>
              ) : null}
              {actions.save ? (
                <Button
                  size="small"
                  variant="contained"
                  disabled={actions.save.disabled || actions.save.loading}
                  type={actions.save.type}
                  onClick={() => {
                    if (
                      actions.save?.type !== "submit" &&
                      actions.save?.onClick
                    )
                      actions.save.onClick()
                  }}
                  sx={{ textTransform: "capitalize" }}
                >
                  {actions.save.title ?? t("actions.submit")}
                </Button>
              ) : null}
            </Box>
          </CardActions>
        </>
      ) : null}
    </MuiCard>
  )
}

export default Card
