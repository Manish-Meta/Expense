import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Check, X, AlertTriangle } from "lucide-react"

/* ---------- Helpers ---------- */

const formatDateTime = (date) => {
  if (!date) return "-"
  const d = new Date(date)
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const StatusBadgeStyles = {
  Approved: "bg-green-100 text-green-700",
  Validated: "bg-blue-100 text-blue-700",
  "Needs-info": "bg-yellow-100 text-yellow-700",
  Rejected: "bg-red-100 text-red-700",
  Submited: "bg-gray-100 text-gray-600",
}

const PriorityStyles = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-orange-100 text-orange-700",
  Low: "bg-green-100 text-green-700",
}

/* ---------- Component ---------- */

export default function ExpenseReview() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}expenses/my_expense/${id}`,
      { credentials: "include" }
    )
      .then((res) => res.json())
      .then((res) => setData(res.data))
  }, [id])

  if (!data) {
    return <p className="p-6 text-sm">Loading expense...</p>
  }

  const expenseObj = data.exp_detail?.[0] || {}
  const expense = expenseObj.expense || {}
  const category = expenseObj.category || {}
  const timeline = data.status_detail || []

  const currentStatus = expense.status

  const getTimelineIcon = (status) => {
    if (status === "Rejected")
      return <X size={14} className="text-white" />
    if (status === "Needs-info")
      return <AlertTriangle size={14} className="text-white" />
    return <Check size={14} className="text-white" />
  }

  const getTimelineColor = (status) => {
    if (status === "Rejected") return "bg-red-500"
    if (status === "Needs-info") return "bg-yellow-400"
    return "bg-green-500"
  }

  return (
    <div className="p-6 space-y-6 text-sm bg-[#fefdfc] min-h-screen">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="text-orange-600 text-xs hover:underline"
      >
        ← Back to Requests
      </button>

      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold text-gray-800">
          Expense Review
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          ID: {expense.exp_id}
        </p>
      </div>

      {/* Employee Card */}
      <div className="bg-white border border-orange-100 rounded-xl p-4 flex justify-between items-center shadow-sm">
        <div>
          <p className="font-medium text-gray-800">
            {timeline[0].name}
          </p>
          <p className="text-xs text-gray-500">
            {category.cat_name}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Submitted {formatDateTime(expense.created_at)}
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-medium ${
              StatusBadgeStyles[currentStatus]
            }`}
          >
            {currentStatus}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-[11px] font-medium ${
              PriorityStyles[expense.priority]
            }`}
          >
            {expense.priority} Priority
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white border border-orange-100 rounded-xl p-5 shadow-sm">
        <h3 className="text-xs font-semibold text-gray-600 mb-4">
          Approval Timeline
        </h3>

        <div className="space-y-4">
          {timeline.map((item, idx) => {
            const s = item.status || {}

            return (
              <div key={idx} className="flex items-start gap-4">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center ${getTimelineColor(
                    s.status
                  )}`}
                >
                  {getTimelineIcon(s.status)}
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {s.status}
                  </p>

                  <p className="text-[11px] text-gray-500">
                    By {item.name}
                  </p>

                  {s.remark && (
                    <p className="text-xs text-orange-600 mt-1">
                      {s.remark}
                    </p>
                  )}

                  <p className="text-[11px] text-gray-400 mt-1">
                    {formatDateTime(s.created_at)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Expense Details */}
      <div className="bg-white border border-orange-100 rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="text-xs font-semibold text-gray-600">
          Expense Details
        </h3>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="text-gray-500">Category</p>
            <p className="font-medium text-gray-800">
              {category.cat_name}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Amount</p>
            <p className="font-semibold text-gray-800">
              ₹ {expense.amount}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Merchant</p>
            <p className="font-medium text-gray-800">
              {expense.merchant}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Date</p>
            <p className="font-medium text-gray-800">
              {formatDateTime(expense.date)}
            </p>
          </div>

          <div className="col-span-2">
            <p className="text-gray-500">Business Purpose</p>
            <p className="text-gray-800 mt-1">
              {expense.business_purpose}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between gap-3 pt-4">
        <button className="px-4 py-2 text-xs rounded-lg border border-orange-200 hover:bg-orange-50">
          Request Information
        </button>

        <div className="flex gap-3">
          <button className="px-4 py-2 text-xs rounded-lg bg-gray-100 hover:bg-gray-200">
            Escalate
          </button>

          <button className="px-4 py-2 text-xs rounded-lg bg-red-100 text-red-700 hover:bg-red-200">
            Reject
          </button>

          <button className="px-4 py-2 text-xs rounded-lg bg-green-500 text-white hover:bg-green-600">
            Approve
          </button>
        </div>
      </div>
    </div>
  )
}
