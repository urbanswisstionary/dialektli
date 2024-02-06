import { FC, useState, useEffect, PropsWithChildren } from "react"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import Divider from "@mui/joy/Divider"

import Stack from "@mui/joy/Stack"
import Typography from "@mui/joy/Typography"
import JoyCard from "@mui/joy/Card"
import CardActions from "@mui/joy/CardActions"
import CardOverflow from "@mui/joy/CardOverflow"

type ActionButtonProps = {
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
}

type CardProps = {
  actions?: {
    cancel?: ActionButtonProps
    save?: ActionButtonProps & { type?: "submit" }
  }
  description?: string
  title?: string
}
const Card: FC<PropsWithChildren<CardProps>> = ({
  actions,
  children,
  description,
  title,
}) => (
  <JoyCard>
    {title || description ? (
      <>
        <Box sx={{ mb: 1 }}>
          {title ? <Typography level="title-md">{title}</Typography> : null}
          {description ? (
            <Typography level="body-sm">{description}</Typography>
          ) : null}
        </Box>
        <Divider />
      </>
    ) : null}
    <Stack
      direction="column"
      spacing={2}
      sx={{ display: { xs: "flex" }, my: 1 }}
    >
      {children}
    </Stack>

    {actions ? (
      <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
        <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
          {actions.cancel ? (
            <Button
              size="sm"
              variant="outlined"
              color="neutral"
              disabled={actions.cancel.disabled}
              loading={actions.cancel.loading}
              onClick={() => {
                if (actions.cancel?.onClick) actions.cancel.onClick()
              }}
            >
              Cancel
            </Button>
          ) : null}
          {actions.save ? (
            <Button
              size="sm"
              variant="solid"
              disabled={actions.save.disabled}
              loading={actions.save.loading}
              type={actions.save.type}
              onAbort={() => {
                if (actions.save?.type !== "submit" && actions.save?.onClick)
                  actions.save.onClick()
              }}
            >
              Save
            </Button>
          ) : null}
        </CardActions>
      </CardOverflow>
    ) : null}
  </JoyCard>
)

export default Card
