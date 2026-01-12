import { Camera } from "lucide-react"
import { useState } from "react"
import Tesseract from "tesseract.js"
import { parseReceipt } from "../../../utils/ocrParser"
import useGlobalContext from "../../../config/GlobalStateContext"
import { convertPdfToImage } from "../../../utils/pdftoimg"

export default function Capture({ category, onDone }) {
  const [loading, setLoading] = useState(false)
  const { setValid } = useGlobalContext()

  const runOCR = async (inputFile) => {
    setLoading(true)

    try {
      const {
        data: { text },
      } = await Tesseract.recognize(inputFile, "eng")

      if (!text || !text.trim()) {
        setLoading(false)
        return
      }

      const parsed = parseReceipt(text)

      onDone(
        {
          ...parsed,
          category,
          receipts: [inputFile],
          mode: "capture",
        },
        Boolean(parsed.amount)
      )

      setValid(Boolean(parsed.amount))
    } catch (err) {
      console.error("OCR failed:", err)
    }

    setLoading(false)
  }

  const handleFileUpload = async (uploaded) => {
    if (!uploaded) return

    setLoading(true)

    try {
      
      if (uploaded.type === "application/pdf") {
        const imageFile = await convertPdfToImage(uploaded)
        await runOCR(imageFile)
      } else {
        await runOCR(uploaded)
      }
    } catch (err) {
      console.error("File processing failed:", err)
    }

    setLoading(false)
  }

  return (
    <div className="border-2 border-dashed border-orange-300 rounded-2xl p-12 text-center bg-orange-50">
      <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-orange-100 mb-4">
        <Camera className="text-orange-600" />
      </div>

      <h3 className="text-lg font-semibold">Capture Receipt</h3>
      <p className="text-sm text-orange-600 mt-1">
        Upload a receipt for instant processing
      </p>

      <div className="mt-6 flex justify-center">
        <label className="cursor-pointer bg-orange-500 text-white px-5 py-2 rounded-lg text-sm">
          Upload File
          <input
            type="file"
            accept="image/*,.pdf"
            hidden
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />
        </label>
      </div>

      <p className="mt-3 text-xs text-gray-500">
        Allowed formats: png, jpg, jpeg, pdf
      </p>

      {loading && (
        <p className="mt-4 text-sm text-orange-600">
          Reading receipt…
        </p>
      )}
    </div>
  )
}
