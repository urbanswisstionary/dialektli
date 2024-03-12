import type { FC } from "react"
import Typography from "@mui/joy/Typography"
import { companyName } from "@/config/constants"

type LogoProps = {
  size?: "sm" | "md" | "lg"
}
/**
 *
 * @param {object} props
 * @param {string} [props.size] ("sm" | "md" | "lg") The size of the logo. Defaults to "lg".
 *
 */
const Logo: FC<LogoProps> = ({ size = "lg" }) => (
  <Typography level={`title-${size}`} color="danger">
    {companyName}
  </Typography>
)

export default Logo
