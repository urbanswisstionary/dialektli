/**
 * Compresses an image file to base64 format with a maximum size of 200x200px
 * and 80% quality. This function runs client-side only.
 *
 * @param file - The image file to compress
 * @returns Promise<string> - Base64 data URL of the compressed image
 */
export async function compressImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onerror = () => {
      reject(new Error("Failed to read file"))
    }

    reader.onload = (e) => {
      const img = new Image()

      img.onerror = () => {
        reject(new Error("Failed to load image"))
      }

      img.onload = () => {
        const canvas = document.createElement("canvas")
        const MAX_SIZE = 200
        let width = img.width
        let height = img.height

        // Calculate new dimensions while maintaining aspect ratio
        if (width > height && width > MAX_SIZE) {
          height *= MAX_SIZE / width
          width = MAX_SIZE
        } else if (height > MAX_SIZE) {
          width *= MAX_SIZE / height
          height = MAX_SIZE
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext("2d")
        if (!ctx) {
          reject(new Error("Failed to get canvas context"))
          return
        }

        ctx.drawImage(img, 0, 0, width, height)

        // Convert to base64 with 80% quality (0.8)
        resolve(canvas.toDataURL("image/jpeg", 0.8))
      }

      img.src = e.target?.result as string
    }

    reader.readAsDataURL(file)
  })
}
