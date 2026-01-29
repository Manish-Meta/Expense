import { Camera } from "lucide-react"
import { useState } from "react"
import Tesseract from "tesseract.js"
import { parseReceipt } from "../../../utils/ocrParser"
import { convertPdfToImage } from "../../../utils/pdftoimg"
import useGlobalContext from "../../../config/GlobalStateContext"


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
    <div className=" p-4 bg-orange-50 rounded-xl">
      <div className="border border-dashed border-borderLine/40 rounded-2xl p-6 text-center bg-secondary">
      <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-orange-50 border border-borderLine/30 mb-4">
        <Camera className="text-primary" />
      </div>

      <h3 className="text-sm font-semibold">Capture Receipt</h3>
      <p className="text-[10px]  mt-1">
        Upload a receipt for instant processing
      </p>

      <div className="mt-3 flex justify-center">
        <label className="cursor-pointer bg-primary text-white px-5 py-2 rounded-lg text-xs">
          Upload File
          <input
            type="file"
            accept="image/*,.pdf"
            hidden
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />
        </label>
      </div>

      <p className="mt-3 text-[10px] text-gray-500">
        * Allowed formats: png, jpg, jpeg, pdf *
      </p>

      {loading && (
        <p className="mt-4 text-sm text-orange-600">
          Reading receipt…
        </p>
      )}
    </div>
    </div>
  )
}
