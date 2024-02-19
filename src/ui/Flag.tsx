/* eslint-disable @next/next/no-img-element */
import type { FC } from "react"

const Flag: FC<{ code: string; mode: "canton" | "country" }> = ({
  code,
  mode,
}) =>
  mode === "country" ? (
    <img
      loading="lazy"
      width={20}
      srcSet={`https://flagcdn.com/w40/${code}.png 2x`}
      src={`https://flagcdn.com/w20/${code}.png`}
      alt=""
    />
  ) : (
    <img loading="lazy" width={20} src={`/assets/cantons/${code}.svg`} alt="" />
  )

export default Flag
