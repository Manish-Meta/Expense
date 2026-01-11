import { Camera } from "lucide-react"
import { useState } from "react"
import Tesseract from "tesseract.js"
import { parseReceipt } from "../../../utils/ocrParser"

export default function Capture({ category, onDone }) {
  const [loading, setLoading] = useState(false)

  const handleFile = async (file) => {
    setLoading(true)

    const result = await Tesseract.recognize(file, "eng")
    const parsed = parseReceipt(result.data.text)

    onDone(
      {
        ...parsed,
        category,
        receipts: [file],
        mode: "capture",
      },
      Boolean(parsed.amount && parsed.date)
    )

    setLoading(false)
  }

  return (
    <div className="border-2 border-dashed border-orange-300 rounded-2xl p-12 text-center bg-orange-50">
      <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-orange-100 mb-4">
        <Camera className="text-orange-600" />
      </div>

      <h3 className="text-lg font-semibold">Capture Receipt</h3>
      <p className="text-sm text-orange-600 mt-1">
        Take a photo or upload an image for instant processing
      </p>

      <div className="mt-6 flex justify-center gap-4">
        <label className="cursor-pointer bg-orange-500 text-white px-5 py-2 rounded-lg text-sm">
          Upload File
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </label>

        <button className="border px-5 py-2 rounded-lg text-sm flex items-center gap-2">
          <Camera size={16} /> Take Photo
        </button>
      </div>

      {loading && (
        <p className="mt-4 text-sm text-orange-600">
          Reading receipt…
        </p>
      )}
    </div>
  )
}
