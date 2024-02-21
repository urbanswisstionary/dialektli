/* eslint-disable @next/next/no-img-element */
import { Tooltip } from "@mui/joy"
import { memo, FC } from "react"
import { getOptions } from "./selectLocation/helper"

const Flag: FC<{
  code: string
  mode: "canton" | "country"
}> = ({ code, mode }) => {
  const flagLabel = getOptions(mode).find((o) => o.code === code)?.label ?? ""
  return (
    <Tooltip title={flagLabel}>
      {mode === "country" ? (
        <img
          loading="lazy"
          width={20}
          srcSet={`https://flagcdn.com/w40/${code?.toLowerCase()}.png 2x`}
          src={`https://flagcdn.com/w20/${code?.toLowerCase()}.png`}
          alt={flagLabel}
        />
      ) : (
        <img
          loading="lazy"
          width={20}
          src={`/assets/cantons/${code?.toLowerCase()}.svg`}
          alt={flagLabel}
        />
      )}
    </Tooltip>
  )
}
export default memo(Flag)
