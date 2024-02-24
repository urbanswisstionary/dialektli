/* eslint-disable @next/next/no-img-element */
import { Tooltip } from "@mui/joy"
import { memo, FC } from "react"
import { getOptions } from "./Autocomplete/helper"

export type FlagMode = "canton" | "country"
type FlagProps = {
  code: string
  mode: FlagMode
}

const Flag: FC<FlagProps> = ({ code, mode }) => {
  const flagLabel = getOptions(mode).find((o) => o.code === code)?.label ?? ""
  const src =
    mode === "country"
      ? `https://flagcdn.com/w20/${code?.toLowerCase()}.png`
      : code in cantonsFlags
        ? cantonsFlags[code as keyof typeof cantonsFlags]
        : "" //`/assets/cantons/${code?.toLowerCase()}.svg`

  const srcSet = `${src} 1x, ${src} 2x`
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

const cantonsFlags = {
  AG: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Wappen_Aargau_matt.svg",
  AI: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Wappen_Appenzell_Innerrhoden_matt.svg",
  AR: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Wappen_Appenzell_Ausserrhoden_matt.svg",
  BE: "https://upload.wikimedia.org/wikipedia/commons/4/47/Wappen_Bern_matt.svg",
  BL: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Coat_of_arms_of_Kanton_Basel-Landschaft.svg",
  BS: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Wappen_Basel-Stadt_matt.svg",
  FR: "https://upload.wikimedia.org/wikipedia/commons/0/01/Wappen_Freiburg_matt.svg",
  GE: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Wappen_Genf_matt.svg",
  GL: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Wappen_Glarus_matt.svg",
  GR: "https://upload.wikimedia.org/wikipedia/commons/1/19/Wappen_Graub%C3%BCnden_matt.svg",
  JU: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Wappen_Jura_matt.svg",
  LU: "https://upload.wikimedia.org/wikipedia/commons/6/66/Wappen_Luzern_matt.svg",
  NE: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Wappen_Neuenburg_matt.svg",
  NW: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Wappen_Nidwalden_matt.svg",
  OW: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Wappen_Obwalden_matt.svg",
  SG: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Coat_of_arms_of_canton_of_St._Gallen.svg",
  SH: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Wappen_Schaffhausen_matt.svg",
  SO: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Wappen_Solothurn_matt.svg",
  SZ: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Wappen_Schwyz_matt.svg",
  TG: "https://upload.wikimedia.org/wikipedia/commons/7/71/Wappen_Thurgau_matt.svg",
  TI: "https://upload.wikimedia.org/wikipedia/commons/8/87/Wappen_Tessin_matt.svg",
  UR: "https://upload.wikimedia.org/wikipedia/commons/1/10/Wappen_Uri_matt.svg",
  VD: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Wappen_Waadt_matt.svg",
  VS: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Wappen_Wallis_matt.svg",
  ZG: "https://upload.wikimedia.org/wikipedia/commons/3/31/Wappen_Zug_matt.svg",
  ZH: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Wappen_Z%C3%BCrich_matt.svg",
}
