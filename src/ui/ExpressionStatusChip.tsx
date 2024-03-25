import type { FC } from "react"
import Chip from "@mui/joy/Chip"
import PublishedIcon from "@mui/icons-material/CheckCircleRounded"
import UnpublishedIcon from "@mui/icons-material/UnpublishedRounded"
import FlaggedIcon from "@mui/icons-material/FlagRounded"
import type { ColorPaletteProp } from "@mui/joy/styles"
import Box, { BoxProps } from "@mui/joy/Box"
import Typography from "@mui/joy/Typography"
import { Tooltip } from "@mui/joy"
import { useTranslation } from "next-i18next"

export type ExpressionStatus = "published" | "unpublished" | "flagged"

interface ExpressionStatusChipProps extends BoxProps {
  status: ExpressionStatus
}
const ExpressionStatusChip: FC<ExpressionStatusChipProps> = ({
  status,
  sx,
  ...props
}) => {
  const { t } = useTranslation("common", { keyPrefix: "expression" })

  return (
    <Tooltip title={t(status)}>
      <Box
        sx={[
          {
            display: "flex",
            justifyContent: "center",
            containerType: "inline-size",
            containerName: "status",
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...props}
      >
        <Chip
          variant="soft"
          size="sm"
          startDecorator={
            {
              published: <PublishedIcon />,
              unpublished: <UnpublishedIcon />,
              flagged: <FlaggedIcon />,
            }[status]
          }
          color={
            {
              published: "success",
              unpublished: "neutral",
              flagged: "danger",
            }[status] as ColorPaletteProp
          }
        >
          <Typography
            sx={{
              ["@container status (width < 100px)"]: { display: "none" },
            }}
          >
            {t(status)}
          </Typography>
        </Chip>
      </Box>
    </Tooltip>
  )
}

export default ExpressionStatusChip
