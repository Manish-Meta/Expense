import { useEffect, useState } from "react"
import Comments from "../../Employee/Comment"
import { CircleXIcon } from "lucide-react"

export default function ExpenseAproval({ exp_id, onClose }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}expenses/my_expense/${exp_id}`,
      { method: "GET", credentials: "include" }
    )
      .then((res) => res.json())
      .then((res) => setData(res.data))
  }, [exp_id])

  if (!data) return <p className="p-6 text-sm">Loading...</p>

  const expenseObj = data.exp_detail?.[0]
  const expense = expenseObj?.expense
  const category = expenseObj?.category

  return (
    <div className="relative bg-secondary h-140 overflow-y-scroll rounded-xl shadow-md">

      <div className="p-7 space-y-6 text-sm">

        {/* Header */}
        <div className="border-b border-orange-100 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Expense Approval
              </h1>

              <p className="text-xs text-gray-500 mt-1">
                Expense ID
                <span className="ml-2 rounded-md bg-orange-100 text-orange-700 px-2 py-0.5 font-medium">
                  {expense.exp_id}
                </span>
              </p>
            </div>

            <button
              className="text-gray-400 hover:text-red-600 transition"
              onClick={onClose}
            >
              <CircleXIcon className="size-5" />
            </button>
          </div>
        </div>

        {/* Expense Info */}
<div className="bg-white border border-orange-100 rounded-2xl shadow-sm">

  {/* Card Header */}
  <div className="px-6 pt-6 pb-4 border-b border-orange-50 flex justify-between items-start">

    <div>
      <h3 className="text-sm font-semibold text-gray-800">
        Expense Information
      </h3>
      <p className="text-[11px] text-gray-500 mt-1">
        Submitted on {new Date(expense.created_at).toDateString()}
      </p>
    </div>

    <span className="inline-flex rounded-full bg-red-100 text-red-700 px-3 py-1 text-[11px] font-medium">
      {expense.priority} Priority
    </span>
  </div>

  {/* Main Content */}
  <div className="p-6 space-y-6">

    {/* Amount Highlight */}
    <div>
      <p className="text-[11px] text-gray-500">Total Amount</p>
      <p className="text-3xl font-semibold text-gray-900 mt-1">
        ₹ {expense.amount}
      </p>
    </div>

    {/* Details Grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-6 text-xs">

      <Info label="Employee" value="Don" />
      <Info label="Department" value="Finance" />
      <Info label="Category" value={category.cat_name} />
      <Info label="Merchant" value={expense.merchant} />

    </div>

  </div>
</div>


        {/* Policy Alerts */}
        <div className="bg-white border border-orange-100 rounded-2xl p-4 shadow-sm space-y-2">
          <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
            Policy Alerts
          </h3>

          <p className="text-xs text-orange-600 font-medium">
            High amount requiring approval
          </p>
        </div>

        {/* Description */}
        <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm space-y-2">
          <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
            Description
          </h3>

          <p className="text-xs text-gray-700 leading-relaxed">
            {expense.business_purpose}
          </p>
        </div>

        {/* Comments */}
        <Comments
          com_data={data.comments}
          exp_id={expense.exp_id}
        />
      </div>

      {/* Action Bar */}
      <div className="sticky bottom-0 bg-secondary border-t border-orange-100 px-6 py-3">
        <div className="flex justify-between items-center">

          <button className="px-4 py-2 text-xs rounded-xl border border-orange-200 hover:bg-orange-50 transition">
            Request Information
          </button>

          <div className="flex gap-3">
            <button className="px-4 py-2 text-xs rounded-xl bg-red-100 text-red-700 hover:bg-red-200 transition">
              Reject
            </button>

            <button className="px-5 py-2 text-xs rounded-xl bg-green-500 text-white hover:bg-green-600 transition shadow-sm">
              Submit
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}

/* Info Helper */
const Info = ({ label, value, bold }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className={`mt-1 ${bold ? "font-semibold text-gray-900" : "text-gray-800"}`}>
      {value}
    </p>
  </div>
)
