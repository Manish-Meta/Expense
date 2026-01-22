import { useState } from "react"

export default function ReviewSubmit({ data, onBack }) {
  const [form, setForm] = useState({
    amount: data.amount,
    date: data.date,
    merchant: data.merchant,
    business_purpose: data.business_purpose,
    category_id: data.category_id,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    setError("")
    setLoading(true)

    try {
      const res = await fetch(
 
        import.meta.env.VITE_BACKEND_URL + "expenses/new_expense  ",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      )

      if (!res.ok) throw new Error("Failed to submit expense")

      alert("Expense submitted successfully")
    } catch (err) {
      setError("Something went wrong. Please try again.")
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl bg-white p-8 rounded-2xl border border-orange-200">
      <button onClick={onBack} className="text-sm text-orange-600 mb-4">
        ← Back
      </button>

      <h2 className="text-xl font-semibold mb-6">
        Review & Submit Expense
      </h2>

      <div className="space-y-4">
        <input
          className="input"
          placeholder="Merchant"
          value={form.merchant}
          onChange={(e) =>
            setForm({ ...form, merchant: e.target.value })
          }
        />

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            ₹
          </span>
          <input
            className="input pl-7"
            placeholder="0.00"
            value={form.amount}
            onChange={(e) =>
              setForm({
                ...form,
                amount: e.target.value.replace(/[^0-9.]/g, ""),
              })
            }
          />
        </div>

        <input
          type="date"
          className="input"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <textarea
          rows={3}
          className="input"
          placeholder="Business purpose"
          value={form.business_purpose}
          onChange={(e) =>
            setForm({ ...form, business_purpose: e.target.value })
          }
        />

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`mt-6 w-full px-6 py-3 rounded-xl font-medium ${
          loading
            ? "bg-orange-200 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600 text-white"
        }`}
      >
        {loading ? "Submitting..." : "Submit Expense"}
      </button>
    </div>
  )
}
