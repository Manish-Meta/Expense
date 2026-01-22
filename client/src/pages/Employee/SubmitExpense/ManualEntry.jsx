import { useEffect, useState } from "react"
import { validateExpense } from "../../../utils/expenseValidator"

export default function ManualEntry({ category, onDone }) {
  const [merchant, setMerchant] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")
  const [purpose, setPurpose] = useState("")

  useEffect(() => {
    const numericAmount = Number(amount)

    const valid =
      merchant &&
      date &&
      amount &&
      validateExpense(numericAmount, category).valid

    onDone(
      {
        amount: numericAmount,
        date, // yyyy-mm-dd
        merchant,
        business_purpose: purpose,
        category_id: category.category_id,
      },
      valid
    )
  }, [merchant, amount, date, purpose, category])

  return (
    <div className="bg-white border rounded-2xl p-8 space-y-6">
      <h3 className="text-xl font-semibold">Manual Entry</h3>

      {/* Amount + Date */}
      <div className="grid grid-cols-2 gap-6">
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

        <input
          type="date"
          className="input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Merchant */}
      <input
        className="input"
        placeholder="Merchant / Vendor *"
        value={merchant}
        onChange={(e) => setMerchant(e.target.value)}
      />

      {/* Category Info */}
      <div className="bg-orange-50 p-3 rounded-lg flex items-center gap-2">
        <span className="font-medium">{category.category}</span>
        {category.category_limit && (
          <span className="text-xs bg-white px-2 py-1 rounded-full">
            Limit: ₹ {category.category_limit}
          </span>
        )}
      </div>

      {/* Purpose */}
      <textarea
        rows={4}
        className="input"
        placeholder="Business purpose (optional)"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
      />
    </div>
  )
}
