import { useEffect, useState } from "react"
import { validateExpense } from "../../../utils/expenseValidator"
import { toISODate, fromISODate } from "../../../utils/dateUtils"

export default function ReviewSubmit({ category, data, onBack }) {
  const [merchant, setMerchant] = useState(data?.merchant || "")
  const [amount, setAmount] = useState(data?.amount || "") 
  const [date, setDate] = useState(data?.date || "")
  const [purpose, setPurpose] = useState(data?.purpose || "")
  const [error, setError] = useState("")
  useEffect(() => {
    if (!merchant || !amount || !date) {
      setError("Please fill all required fields")
      return
    }

    const numericAmount = Number(amount)
    const validation = validateExpense(numericAmount, category)

    if (!validation.valid) {
      setError(validation.message)
      return
    }

    setError("")
  }, [merchant, amount, date, category])

  const handleSubmit = () => {
    if (error) return

    const finalExpense = {
      merchant,
      amount, 
      date,
      purpose,
      category,
      receipts: data?.receipts || [],
      mode: data?.mode,
    }

    console.log("Final expense submitted:", finalExpense)
    alert("Expense submitted (frontend only)")
  }

  return (
    <div className="max-w-xl bg-white p-8 rounded-2xl border border-orange-200">
      <button
        onClick={onBack}
        className="text-sm text-orange-600 mb-4"
      >
        ← Back
      </button>

      <h2 className="text-xl font-semibold mb-6">
        Review & Edit Expense
      </h2>

      <div className="space-y-4">
    Merchant Name:
        <input
          className="input"
          placeholder="Merchant / Vendor *"
          value={merchant}
          onChange={(e) => setMerchant(e.target.value)}
        />

      Amount:
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            ₹
          </span>
          <input
            className="input pl-7"
            placeholder="0.00"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value.replace(/[^0-9.]/g, ""))
            }
          />
        </div>
      Date: 
        <input
      type="date"
      className="input"
      value={toISODate(date)}        
      onChange={(e) =>
        setDate(fromISODate(e.target.value)) 
          }
          />

       
        <div className="bg-orange-50 p-3 rounded-lg flex items-center gap-2">
          <span className="font-medium">{category?.title}</span>
          {category?.limitText && (
            <span className="text-xs bg-white px-2 py-1 rounded-full">
              {category.limitText}
            </span>
          )}
        </div>

        <textarea
          rows={3}
          className="input"
          placeholder="Business purpose (optional)"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />

        <p className="text-sm text-gray-600">
          Receipts uploaded: {data?.receipts?.length || 0}
        </p>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!!error}
        className={`mt-6 w-full px-6 py-3 rounded-xl font-medium
          ${
            error
              ? "bg-orange-200 text-white cursor-not-allowed"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
      >
        Submit Expense
      </button>
    </div>
  )
}
