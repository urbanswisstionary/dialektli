/* eslint-disable @next/next/no-img-element */
import { memo, FC } from "react"
import { getOptions } from "./Autocomplete/helper"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
        ? // ? cantonsFlags[code as keyof typeof cantonsFlags]
          `/assets/cantons/${code}.svg`
        : ""

  const srcSet = `${src} 1x, ${src} 2x`
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <img
            loading="lazy"
            src={src}
            srcSet={srcSet}
            alt={flagLabel}
            width={20}
            height={20}
            className="object-contain"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{flagLabel}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export default memo(Flag)

const cantonsFlags = {
  AG: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Flag_of_Canton_of_Aargau.svg/250px-Flag_of_Canton_of_Aargau.svg.png",
  AI: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Canton_of_Appenzell_Innerrhoden.svg/250px-Flag_of_Canton_of_Appenzell_Innerrhoden.svg.png",
  AR: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Flag_of_Canton_of_Appenzell_Ausserrhoden.svg/250px-Flag_of_Canton_of_Appenzell_Ausserrhoden.svg.png",
  BE: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Flag_of_Canton_of_Bern.svg/250px-Flag_of_Canton_of_Bern.svg.png",
  BL: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Flag_of_Canton_of_Basel-Landschaft.svg/250px-Flag_of_Canton_of_Basel-Landschaft.svg.png",
  BS: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Flag_of_Canton_of_Basel.svg/250px-Flag_of_Canton_of_Basel.svg.png",
  FR: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_Canton_of_Fribourg.svg/250px-Flag_of_Canton_of_Fribourg.svg.png",
  GE: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Canton_of_Geneva.svg/250px-Flag_of_Canton_of_Geneva.svg.png",
  GL: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Flag_of_Canton_of_Glarus.svg/250px-Flag_of_Canton_of_Glarus.svg.png",
  GR: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_Canton_of_Graub%C3%BCnden.svg/250px-Flag_of_Canton_of_Graub%C3%BCnden.svg.png",
  JU: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Flag_of_Canton_of_Jura.svg/250px-Flag_of_Canton_of_Jura.svg.png",
  LU: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Flag_of_Canton_of_Lucerne.svg/250px-Flag_of_Canton_of_Lucerne.svg.png",
  NE: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Flag_of_Canton_of_Neuch%C3%A2tel.svg/250px-Flag_of_Canton_of_Neuch%C3%A2tel.svg.png",
  NW: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Flag_of_Canton_of_Nidwalden.svg/250px-Flag_of_Canton_of_Nidwalden.svg.png",
  OW: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Flag_of_Canton_of_Obwalden.svg/250px-Flag_of_Canton_of_Obwalden.svg.png",
  SG: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Flag_of_Canton_of_Sankt_Gallen.svg/250px-Flag_of_Canton_of_Sankt_Gallen.svg.png",
  SH: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Flag_of_Canton_of_Schaffhausen.svg/250px-Flag_of_Canton_of_Schaffhausen.svg.png",
  SO: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Flag_of_Canton_of_Solothurn.svg/250px-Flag_of_Canton_of_Solothurn.svg.png",
  SZ: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Flag_of_Canton_of_Schwyz.svg/250px-Flag_of_Canton_of_Schwyz.svg.png",
  TG: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Flag_of_Canton_of_Thurgau.svg/250px-Flag_of_Canton_of_Thurgau.svg.png",
  TI: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Flag_of_Canton_of_Ticino.svg/250px-Flag_of_Canton_of_Ticino.svg.png",
  UR: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Canton_of_Uri.svg/250px-Flag_of_Canton_of_Uri.svg.png",
  VD: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Flag_of_Canton_of_Vaud.svg/250px-Flag_of_Canton_of_Vaud.svg.png",
  VS: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Flag_of_Canton_of_Valais.svg/250px-Flag_of_Canton_of_Valais.svg.png",
  ZG: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Flag_of_Canton_of_Zug.svg/250px-Flag_of_Canton_of_Zug.svg.png",
  ZH: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Canton_of_Z%C3%BCrich.svg/250px-Flag_of_Canton_of_Z%C3%BCrich.svg.png",
}
