import type { FC } from "react"
import Button from "@mui/joy/Button"
import Card from "@mui/joy/Card"
import IconButton from "@mui/joy/IconButton"
import LinearProgress from "@mui/joy/LinearProgress"
import Typography from "@mui/joy/Typography"
import Stack from "@mui/joy/Stack"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"

const PostCard: FC = () => (
  <Card
    invertedColors
    variant="soft"
    color="warning"
    size="sm"
    sx={{ boxShadow: "none" }}
  >
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography level="title-sm">Used space</Typography>
      <IconButton size="sm">
        <CloseRoundedIcon />
      </IconButton>
    </Stack>
    <Typography level="body-xs">
      Your team has used 80% of your available space. Need more?
    </Typography>
    <LinearProgress variant="outlined" value={80} determinate sx={{ my: 1 }} />
    <Button size="sm" variant="solid">
      Upgrade plan
    </Button>
  </Card>
)
export default PostCard
