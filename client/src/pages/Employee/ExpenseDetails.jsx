import { Check } from "lucide-react"

const formatDate = (date) => {
  if (!date) return "-"

  const input = new Date(date)
  const today = new Date()

  // Normalize BOTH to midnight (local calendar day)
  const inputDay = new Date(
    input.getFullYear(),
    input.getMonth(),
    input.getDate()
  )

  const todayDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  )

  const diffDays =
    Math.round((todayDay - inputDay) / 86400000)

  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Yesterday"

  return inputDay.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}


export default function ExpenseDetails({ expense, onClose }) {
  const statusOrder = ["Submitted", "Validated", "Approved"]
  const currentIndex = statusOrder.indexOf(expense.status)

  const getStepState = (index) => {
    if (index < currentIndex) return "done"
    if (index === currentIndex) return "active"
    return "upcoming"
  }

  return (
    <div className="p-6 space-y-6 text-sm">

      {/* Back */}
      <button
        onClick={onClose}
        className="text-orange-600 hover:underline text-xs"
      >
        ← Back to Dashboard
      </button>

      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold text-gray-800">
          Expense Details
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Expense #{expense.exp_id} • {expense.status}
        </p>
      </div>

      {/* Status Badge */}
      <span
        className={`inline-flex px-3 py-1 rounded-full text-[11px] font-medium
          ${
            expense.status === "Approved"
              ? "bg-green-100 text-2xl text-green-700"
              : expense.status === "Validated"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-600"
          }`}
      >
        {expense.status}
      </span>

      {/* Timeline */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-orange-100">
        <h3 className="text-xs font-semibold text-gray-600 mb-4">
          Approval Timeline
        </h3>

        <div className="relative flex justify-between items-center">
          {/* Line */}
          <div className="absolute left-0 right-0 top-3 h-[2px] bg-gray-200">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-orange-400"
              style={{
                width: `${(currentIndex / 2) * 100}%`,
              }}
            />
          </div>

          {statusOrder.map((step, i) => {
            const state = getStepState(i)

            return (
              <div
                key={step}
                className="relative z-10 flex flex-col items-center w-1/3"
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs
                    ${
                      state === "done"
                        ? "bg-green-500 text-white"
                        : state === "active"
                        ? "bg-yellow-400 text-white"
                        : "bg-gray-300 text-white"
                    }`}
                >
                  {state === "done" && <Check size={14} />}
                </div>

                <p className="mt-2 text-[11px] font-medium text-gray-700">
                  {step}
                </p>

                <p className="text-[10px] text-gray-500">
                  {i === 0
                    ? formatDate(expense.created_at)
                    : i <= currentIndex
                    ? formatDate(expense.updated_at)
                    : ""}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Expense Info */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-orange-100 space-y-4">
        <h3 className="text-xs font-semibold text-gray-600">
          Expense Information
        </h3>

        <div className="flex justify-between items-start">
          <div>
            <p className="text-2xl font-semibold text-gray-800">
              ₹{expense.amount}
            </p>
            <p className="text-xs text-green-600">
              {expense.status}
            </p>
          </div>

          <div className="text-right text-xs text-gray-500">
            <p>{expense.cat_name}</p>
            <p>{formatDate(expense.date)}</p>
          </div>
        </div>

        <div className="pt-3 border-t border-orange-100">
          <p className="font-medium text-gray-800">
            {expense.merchant}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {expense.business_purpose}
          </p>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-orange-100 text-[11px] text-gray-500">
          <div>
            Priority: <span className="text-gray-700">{expense.priority}</span>
          </div>
          <div>
            Compliance: <span className="text-gray-700">{expense.compliance}</span>
          </div>
          <div>
            Advance: <span className="text-gray-700">{expense.advance_option}</span>
          </div>
          <div>
            Next Level: <span className="text-gray-700">{expense.next_level}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
