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
      <div className="  border bg-orange-50 border-borderLine/30 rounded-xl p-5">
  
      <div className="flex justify-between mb-6">
        <h3 className="text-lg font-semibold">Create a Voucher</h3>
        <button className=" px-3 py-2 rounded-lg text-[10px] bg-primary text-white">
          Download Template
        </button>
      </div>

      <div className="bg-white border border-dashed border-borderLine rounded-2xl p-12 text-center ">
        <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-orange-100 mb-4">
          <FileStack className="text-orange-600" />
        </div>

        <h4 className="font-semibold text-sm">Upload Multiple Receipts</h4>
        <p className=" text-[10px]  mt-1">
          Upload up to 50 receipts
        </p>

        <label className="inline-block mt-6 text-xs cursor-pointer bg-orange-500 text-white px-6 py-2 rounded-lg text-sm">
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
