import type { FC } from "react"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import Divider from "@mui/joy/Divider"

import Stack from "@mui/joy/Stack"
import Typography from "@mui/joy/Typography"
import JoyCard, { CardProps as JoyCardProps } from "@mui/joy/Card"
import CardActions from "@mui/joy/CardActions"
import CardOverflow from "@mui/joy/CardOverflow"
import { useTranslation } from "next-i18next"
import DeleteForever from "@mui/icons-material/DeleteForever"

type ActionButtonProps = {
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  title?: string | null
}
type CardActions = {
  cancel?: ActionButtonProps
  save?: ActionButtonProps & { type?: "submit" }
  delete?: ActionButtonProps
}

interface CardProps extends Omit<JoyCardProps, "title"> {
  actions?: CardActions
  description?: string | null
  title?: string | null
}
const Card: FC<CardProps> = ({
  actions,
  children,
  description,
  title,
  sx,
  ...joyCardProps
}) => {
  const { t } = useTranslation("common")

  return (
    <JoyCard
      sx={[{ padding: 0 }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...joyCardProps}
    >
      {title || description ? (
        <>
          <Box sx={{ mb: 1, p: 2 }}>
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
        sx={{ display: { xs: "flex" }, my: 1, px: 2 }}
      >
        {children}
      </Stack>

      {actions ? (
        <CardOverflow
          sx={{ borderTop: "1px solid", borderColor: "divider", p: 2 }}
        >
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",

              gap: 1,
              "> * ": { textTransform: "capitalize" },
            }}
          >
            <Box>
              {actions.delete ? (
                <Button
                  size="sm"
                  variant="outlined"
                  color="danger"
                  disabled={actions.delete.disabled}
                  loading={actions.delete.loading}
                  onClick={() => {
                    if (actions.delete?.onClick) actions.delete.onClick()
                  }}
                  endDecorator={<DeleteForever />}
                >
                  {actions.delete.title ?? t("actions.delete")}
                </Button>
              ) : null}
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
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
                  {actions.cancel.title ?? t("actions.cancel")}
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
                    if (
                      actions.save?.type !== "submit" &&
                      actions.save?.onClick
                    )
                      actions.save.onClick()
                  }}
                >
                  {actions.save.title ?? t("actions.submit")}
                </Button>
              ) : null}
            </Box>
          </CardActions>
        </CardOverflow>
      ) : null}
    </JoyCard>
  )
}

export default Card
