import { useEffect, useState } from "react"

export default function ExpenseAproval({ exp_id,onClose }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}expenses/my_expense/${exp_id}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((res) => setData(res.data))
  }, [exp_id])

  if (!data) return <p className="p-6 text-sm">Loading...</p>

  const expenseObj = data.exp_detail?.[0]
  const expense = expenseObj?.expense
  const category = expenseObj?.category

  return (
    <div className="relative bg-secondary approvalScroll h-120 w-110 overflow-scroll rounded-xl">
    <div className=" p-3 text-sm">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-900">
          Expense Approval
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Expense ID{" "}
          <span className="ml-2 inline-flex items-center rounded-md bg-orange-100 text-orange-700 px-2 py-0.5 font-medium">
            {expense.exp_id}
          </span>
        </p>
      </div>

      {/* Content Grid */}
      <div className="max-w-5xl space-y-5 pb-6">

        {/* Expense Info */}
        <div className="bg-white border border-borderLine/30 rounded-2xl p-5 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">

            <Info label="Amount" value={`₹ ${expense.amount}`} bold />
            <Info label="Employee" value="Don" />
            <Info label="Department" value="Finance" />
            <Info label="Category" value={category.cat_name} />
            <Info label="Merchant" value={expense.merchant} />
            <Info label="Date Submitted" value={new Date(expense.created_at).toDateString()} />

            <div>
              <p className="text-gray-500">Priority</p>
              <span className="inline-flex mt-1 rounded-full bg-red-100 text-red-700 px-3 py-1 text-[11px] font-medium">
                {expense.priority}
              </span>
            </div>
          </div>
        </div>

        {/* Policy Alerts */}
        <div className="bg-white border border-orange-100 rounded-2xl p-5 shadow-sm">
          <h3 className="text-xs font-semibold text-gray-700 mb-2">
            Policy Alerts
          </h3>
          <p className="text-xs text-orange-600">
            High amount requiring approval
          </p>
        </div>

        {/* Description */}
        <div className="bg-white border border-orange-100 rounded-2xl p-5 shadow-sm">
          <h3 className="text-xs font-semibold text-gray-700 mb-2">
            Description
          </h3>
          <p className="text-xs text-gray-700">
            {expense.business_purpose}
          </p>

          {/* <h4 className="text-xs font-semibold text-gray-700 mt-4">
            Business Justification
          </h4>
          <p className="text-xs text-gray-600 mt-1">
            Client meeting for new product launch discussion with key stakeholders.
          </p> */}
        </div>
      </div>

      {/* Action Bar (component-scoped) */}
      <div className="sticky bottom-0 w-full left-0 right-0  bg-secondary px-3 py-2 ">
        <div className="max-w-5xl mx-auto flex justify-between gap-3 py-2">

          <button className="px-4 py-2 text-xs rounded-xl border border-orange-200 hover:bg-orange-50 transition">
            Request Information
          </button>

          <div className="flex gap-3">
            <button className="px-4  py-2 text-xs rounded-xl bg-red-100 text-red-700 hover:bg-red-200 transition">
              Reject
            </button>
            <button className="px-5 py-2 text-xs rounded-xl bg-green-500 text-white hover:bg-green-600 transition">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

/* Small helper */
const Info = ({ label, value, bold }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className={`mt-1 ${bold ? "font-semibold text-gray-900" : "text-gray-800"}`}>
      {value}
    </p>
  </div>
)
