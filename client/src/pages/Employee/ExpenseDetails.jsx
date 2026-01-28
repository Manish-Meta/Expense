import {
  Check,
  X,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  UserCheck,
} from "lucide-react"

/* ---------------- DATE FORMAT ---------------- */

const formatDate = (date) => {
  if (!date) return "-"

  const input = new Date(date)
  const today = new Date()

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

  const diffDays = Math.round(
    (todayDay - inputDay) / 86400000
  )

  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Yesterday"

  return inputDay.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

/* ---------------- STATUS CONFIG ---------------- */

export const StatusConfig = {
  Pending: {
    label: "Pending",
    class: "bg-yellow-100 text-yellow-700",
    icon: Clock,
  },
  Processing: {
    label: "Validated",
    class: "bg-green-100 text-green-700",
    icon: UserCheck,
  },
  Approved: {
    label: "Approved",
    class: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  Paid: {
    label: "Paid",
    class: "bg-emerald-100 text-emerald-700",
    icon: CheckCircle,
  },
  Rejected: {
    label: "Rejected",
    class: "bg-red-100 text-red-700",
    icon: XCircle,
  },
  "Needs-info": {
    label: "Needs Info",
    class: "bg-orange-100 text-orange-700",
    icon: Info,
  },
}

/* ---------------- TIMELINE CONFIG ---------------- */

const timelineSteps = ["Submission", "Validation", "Approval"]

const stepUI = {
  done: {
    circle: "bg-green-500 text-white",
    icon: Check,
  },
  pending: {
    circle: "bg-yellow-400 text-white",
    icon: Clock,
  },
  rejected: {
    circle: "bg-red-500 text-white",
    icon: X,
  },
  upcoming: {
    circle: "bg-gray-300 text-white",
    icon: null,
  },
}

export default function ExpenseDetails({ expense, onClose }) {
  /* ---------------- TIMELINE LOGIC ---------------- */

  const getTimelineState = (step) => {
    const status = expense.status

    if (status === "Rejected") {
      if (step === "Submission") return "done"
      if (step === "Validation") return "rejected"
      return "upcoming"
    }

    if (status === "Needs-info") {
      if (step === "Submission") return "done"
      if (step === "Validation") return "pending"
      return "upcoming"
    }
     if (status === "Processing") {
      if (step === "Submission") return "done"
      if (step === "Validation") return "done"
      if (step === "Approval") return "pending"
      return "upcoming"
    }
    if (status === "Pending") {
      if (step === "Submission") return "done"
      if (step === "Validated") return "pending"
      return "upcoming"
    }

    if (status === "Paid") return "done"

    const order = ["Submitted", "Validated", "Approved"]
    return order.indexOf(step) <= order.indexOf(status)
      ? "done"
      : "upcoming"
  }

  const statusCfg = StatusConfig[expense.status] || {}
  const StatusIcon = statusCfg.icon

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
          Expense #{expense.exp_id} • {statusCfg.label}
        </p>
      </div>

      {/* Status Badge */}
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium ${statusCfg.class}`}
      >
        {StatusIcon && <StatusIcon size={14} />}
        {statusCfg.label}
      </span>

      {/* Timeline */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-orange-100">
        <h3 className="text-xs font-semibold text-gray-600 mb-4">
          Approval Timeline
        </h3>

        <div className="relative flex justify-between items-center">
          {/* Base Line */}
          <div className="absolute left-0 right-0 top-3 h-[2px] bg-gray-200" />

          {timelineSteps.map((step) => {
            const state = getTimelineState(step)
            const Icon = stepUI[state].icon

            return (
              <div
                key={step}
                className="relative z-10 flex flex-col items-center w-1/3"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shadow-sm ${stepUI[state].circle}`}
                >
                  {Icon && <Icon size={14} />}
                </div>

                <p className="mt-2 text-[11px] font-medium text-gray-700">
                  {step}
                </p>

                <p className="text-[10px] text-gray-500">
                  {state !== "upcoming" && state == "done"
                    ? formatDate(
                        step === "Submitted"
                          ? expense.created_at
                          : expense.updated_at
                      )
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
              {statusCfg.label}
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
