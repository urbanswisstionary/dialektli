/* eslint-disable @next/next/no-img-element */
import type { FC } from "react"
import { Box } from "@mui/joy"
import Button from "@/ui/Button"
import { useTranslation } from "next-i18next"
import ImageUploading, {
  ImageType,
  ImageListType,
} from "react-images-uploading"

import UploadFileIcon from "@mui/icons-material/UploadFile"
import DeleteIcon from "@mui/icons-material/Delete"

const imageMaxSize = 1.5 * 1024 * 1024 // 1.5MB

const ImageUploadInput: FC<{
  value: ImageType | undefined
  onChange: (_image: ImageType | undefined) => void
}> = ({ value, onChange }) => {
  const { t } = useTranslation("common")
  return (
    <ImageUploading
      value={value ? [value] : []}
      onChange={(imageList: ImageListType) => {
        const selectedImage = imageList[0]
        if (!selectedImage?.file) return

        if (selectedImage.file.size > imageMaxSize)
          return alert(t("errors.imageSizeExceeded"))

        onChange(selectedImage)
      }}
    >
      {({ imageList, onImageUpload }) => (
        <Box sx={{ position: "relative" }}>
          <Button
            role={undefined}
            tabIndex={-1}
            variant="outlined"
            color="neutral"
            endDecorator={imageList.length ? undefined : <UploadFileIcon />}
            onClick={onImageUpload}
            sx={{ minHeight: "3.125rem" }}
          >
            {imageList.length
              ? imageList.map((image, i) => (
                  <img key={i} src={image.dataURL} alt="" width="100" />
                ))
              : t("actions.selectImage")}
          </Button>
          {imageList.length ? (
            <DeleteIcon
              onClick={() => onChange(undefined)}
              sx={{
                position: "absolute",
                top: 5,
                right: 5,
                ml: 2.5,
                padding: "0.5rem",
                height: "2.5rem",
                width: "2.5rem",
                borderRadius: "var(--joy-radius-sm)",
                ":hover": {
                  background: "var(--joy-palette-background-level2)",
                  cursor: "pointer",
                },
              }}
            />
          ) : null}
        </Box>
      )}
    </ImageUploading>
  )
}

export default ImageUploadInput
