import { FileStack } from "lucide-react"
import { useState } from "react"

export default function CreateVoucher({ category, onDone }) {
  const [files, setFiles] = useState([])

  const handleUpload = (e) => {
    const uploaded = [...files, ...Array.from(e.target.files)]
    setFiles(uploaded)

    onDone(
      { receipts: uploaded, category, mode: "voucher" },
      uploaded.length > 0
    )
  }

  return (
    <div className="bg-white border rounded-2xl p-8">
      <div className="flex justify-between mb-6">
        <h3 className="text-xl font-semibold">Create a Voucher</h3>
        <button className="border px-4 py-2 rounded-lg text-sm">
          Download Template
        </button>
      </div>

      <div className="border-2 border-dashed border-orange-300 rounded-2xl p-12 text-center bg-orange-50">
        <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-orange-100 mb-4">
          <FileStack className="text-orange-600" />
        </div>

        <h4 className="font-semibold">Upload Multiple Receipts</h4>
        <p className="text-sm text-orange-600 mt-1">
          Upload up to 50 receipts
        </p>

        <label className="inline-block mt-6 cursor-pointer bg-orange-500 text-white px-6 py-2 rounded-lg text-sm">
          Choose Files
          <input
            type="file"
            multiple
            hidden
            onChange={handleUpload}
          />
        </label>
      </div>
    </div>
  )
}
