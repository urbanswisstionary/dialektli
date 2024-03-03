import type { FC } from "react"
import Typography from "@mui/joy/Typography"

type LogoProps = {
  size?: "sm" | "md" | "lg"
}
/**
 *
 * @param {string} size - The size of the logo. Defaults to "lg".
 */
const Logo: FC<LogoProps> = ({ size = "lg" }) => (
  <Typography level={`title-${size}`}>Dialektli</Typography>
)

export default Logo
