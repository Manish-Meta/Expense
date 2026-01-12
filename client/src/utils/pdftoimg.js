import * as pdfjsLib from "pdfjs-dist"
import pdfWorker from "pdfjs-dist/build/pdf.worker?url"

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker

export async function convertPdfToImage(file) {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

  const page = await pdf.getPage(1)

  const viewport = page.getViewport({ scale: 2 })
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")

  canvas.width = viewport.width
  canvas.height = viewport.height

  await page.render({ canvasContext: context, viewport }).promise

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const imageFile = new File([blob], "receipt.png", {
        type: "image/png",
      })
      resolve(imageFile)
    })
  })
}
