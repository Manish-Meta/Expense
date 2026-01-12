import { Camera } from "lucide-react"
import { useState } from "react"
import Tesseract from "tesseract.js"
import { parseReceipt } from "../../../utils/ocrParser"
import useGlobalContext from "../../../config/GlobalStateContext"
import { convertPdfToImage } from "../../../utils/pdftoimg"

export default function Capture({ category, onDone }) {
  const [loading, setLoading] = useState(false)
  const { valid, setValid } = useGlobalContext()
  const [file, setFile] = useState(null)
  const [isPdf, setIsPdf] = useState(false)
  const [message, setMessage] = useState("")

  const runOCR = async (inputFile) => {
    setLoading(true)
    setMessage("Reading receipt…")

    try {
      const {
        data: { text },
      } = await Tesseract.recognize(inputFile, "eng")

      console.log("OCR TEXT:", text)

      if (!text || !text.trim()) {
        setMessage("Unable to read receipt. Please try another image.")
        setLoading(false)
        return
      }

      const parsed = parseReceipt(text)
      console.log("PARSED:", parsed)

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
      setMessage("")
    } catch (err) {
      console.error("OCR failed:", err)
      setMessage("OCR failed. Please try manual entry.")
    }

    setLoading(false)
  }

 
  const handleFileUpload = async (uploaded) => {
    if (!uploaded) return

    setFile(uploaded)
    setIsPdf(uploaded.type === "application/pdf")

    if (uploaded.type === "application/pdf") {
      setMessage("PDF detected. Please convert it to image for OCR.")
      return
    }
    
    await runOCR(uploaded)
  }


  const handlePdfConvert = async () => {
    if (!file) return

    setLoading(true)
    setMessage("Converting PDF to image…")
    

    try {
      const imageFile = await convertPdfToImage(file)
      await runOCR(imageFile)
      setMessage("Converted to image and parsed successfully!Proceed to add expense...")
      
    } catch (err) {
      console.error("PDF conversion failed:", err)
      setMessage("Failed to convert PDF. Please upload image instead.")
      setLoading(false)
    }
  }

  return (
    <div className="border-2 border-dashed border-orange-300 rounded-2xl p-12 text-center bg-orange-50">
      <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-orange-100 mb-4">
        <Camera className="text-orange-600" />
      </div>

      <h3 className="text-lg font-semibold">Capture Receipt</h3>
      <p className="text-sm text-orange-600 mt-1">
        Upload an image or PDF to extract receipt details
      </p>

 
      <div className="mt-6 flex justify-center gap-4">
        <label className="cursor-pointer bg-orange-500 text-white px-5 py-2 rounded-lg text-sm">
          Upload File
          <input
            type="file"
            accept="image/*,.pdf"
            hidden
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />
        </label>

        <button
          disabled
          className="border px-5 py-2 rounded-lg text-sm flex items-center gap-2 opacity-50 cursor-not-allowed"
        >
          <Camera size={16} /> Take Photo
        </button>
      </div>

  
      {isPdf && !loading && (
        <div className="mt-6 bg-yellow-50 border border-yellow-300 p-4 rounded-xl">
          <p className="text-sm text-yellow-800">{message}</p>

          <button
            onClick={handlePdfConvert}
            className="mt-3 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm"
          >
            Convert PDF to Image & Parse
          </button>
        </div>
      )}

      {loading && (
        <p className="mt-4 text-sm text-orange-600">
          {message}
        </p>
      )}
    </div>
  )
}
