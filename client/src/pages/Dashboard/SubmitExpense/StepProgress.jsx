export default function StepProgress({ step }) {
  const steps = ["Category", "Details", "Review"]

  return (
    <div className="flex items-center gap-4 mb-6">
      {steps.map((label, i) => {
        const idx = i + 1
        const active = step >= idx
        return (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold
                ${active ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-600"}`}
            >
              {idx}
            </div>
            <span className={`text-sm ${active ? "text-orange-600" : "text-gray-400"}`}>
              {label}
            </span>
            {idx < steps.length && <div className="w-10 h-px bg-orange-200 mx-2" />}
          </div>
        )
      })}
    </div>
  )
}
