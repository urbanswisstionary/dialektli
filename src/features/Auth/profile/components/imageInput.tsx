/* eslint-disable @next/next/no-img-element */
import { FC } from "react"
import { AspectRatio } from "@mui/joy"

const ImageInput: FC<{
  value: string | null | undefined
}> = ({ value }) => {
  return (
    <AspectRatio
      ratio="1"
      maxHeight={108}
      sx={{ flex: 1, minWidth: 108, borderRadius: "100%" }}
    >
      {value ? <img src={value} loading="lazy" alt="me" /> : <>no image</>}
    </AspectRatio>
  )
}

export default ImageInput
