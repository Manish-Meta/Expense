import { useState } from "react"
import { Camera, PenLine, FileStack } from "lucide-react"
import Capture from "./Capture"
import ManualEntry from "./ManualEntry"
import CreateVoucher from "./CreateVoucher"
import useGlobalContext from "../../../config/GlobalStateContext"


export default function ExpenseTabs({ category,onNext, onBack }) {
  const [tab, setTab] = useState("capture")
  const [data, setData] = useState({})
  const {valid, setValid} = useGlobalContext()

  console.log(category.category_id)
  const handleDone = (payload,isValid) => {
    setData(payload)
    setValid(isValid)
  }

  console.log(data)
  return (
    <div>
      {/* Back + Category pill */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="text-sm text-gray-600">
          ← Back to Categories
        </button>

        <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full text-sm">
          <category.Icon size={16} className="text-orange-600" />
          <span className="font-medium">{category.category}</span>
          {category.limit && (
            <span className="text-blue-600 bg-white px-2 py-0.5 rounded-full text-xs">
             ₹ {category.limit}
            </span>
          )}
        </div>
      </div>

      <h1 className="text-3xl font-semibold">Submit Expense</h1>
      <p className="text-orange-600 mb-6">
        Capture receipts and submit expenses quickly
      </p>

      {/* Tabs */}
      <div className="flex bg-orange-50 rounded-full p-1 mb-8">
        {[
          { id: "capture", label: "Capture", icon: Camera },
          { id: "manual", label: "Manual Entry", icon: PenLine },
          { id: "voucher", label: "Create a Voucher", icon: FileStack },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-full text-sm font-medium
              ${
                tab === id
                  ? "bg-white shadow text-black"
                  : "text-gray-600"
              }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "capture" && (
        <Capture category={category} onDone={handleDone} />
      )}

      {tab === "manual" && (
        <ManualEntry category={category} onDone={handleDone} />
      )}

      {tab === "voucher" && (
        <CreateVoucher category={category} onDone={handleDone} />
      )}

      {/* Action */}
      <div className="mt-8">
        <button
          disabled={!valid}
          onClick={() => onNext(data)}
          className={`w-full py-3 rounded-xl font-medium
            ${
              valid
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "bg-orange-200 text-white cursor-not-allowed"
            }`}
        >
          Add Expense
        </button>
      </div>
    </div>
  )
}
