/* eslint-disable @next/next/no-img-element */
import { Tooltip } from "@mui/joy"
import { memo, FC } from "react"
import { getOptions } from "./Autocomplete/helper"

const Flag: FC<{
  code: string
  mode: "canton" | "country"
}> = ({ code, mode }) => {
  const flagLabel = getOptions(mode).find((o) => o.code === code)?.label ?? ""
  const src =
    mode === "country"
      ? `https://flagcdn.com/w20/${code?.toLowerCase()}.png`
      : `/assets/cantons/${code?.toLowerCase()}.svg`

  const srcSet = `${src} 2x`
  return (
    <Tooltip title={flagLabel}>
      <img
        loading="lazy"
        src={src}
        srcSet={srcSet}
        alt={flagLabel}
        width={20}
        height={20}
        style={{ objectFit: "contain" }}
      />
    </Tooltip>
  )
}
export default memo(Flag)
