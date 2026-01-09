import { Check } from "lucide-react"

export default function RoleCard({
  title,
  subtitle,
  description,
  features,
  user,
  icon,
  selected,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`
        relative cursor-pointer rounded-2xl border
        bg-white p-5 
        transition-all duration-300
        ${
          selected
            ? "border-orange-400 ring-2 ring-orange-200"
            : "border-orange-100 hover:border-orange-300 hover:shadow-md"
        }
      `}
    >
      {selected && (
        <div className="absolute top-4 right-4 bg-orange-500 text-white rounded-full p-1">
          <Check size={16} />
        </div>
      )}

      <div className="mb-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-orange-50 text-orange-600">
          {icon}
        </div>
      </div>

      <h3 className="text-sm font-semibold text-gray-900">
        {title}
      </h3>

      <p className="text-[10px] text-orange-600 mt-1">
        {subtitle}
      </p>

      <p className="text-[10px] text-gray-600 mt-4 leading-relaxed">
        {description}
      </p>

      <div className="mt-4">
        <p className="text-[10px] font-medium text-gray-900 mb-2">
          Key Features:
        </p>
        <ul className="space-y-2 text-sm text-gray-700">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-[10px]">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-xl bg-slate-50 p-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-semibold">
            {user.initials}
          </div>
          <div>
            <p className="text-xs font-medium text-gray-900">
              {user.name}
            </p>
            <p className="text-[10px] text-gray-500">
              {user.department}
            </p>
          </div>
        </div>

        <button className="text-xs px-3 py-1 rounded-md border border-orange-200 text-orange-600 hover:bg-orange-50">
         demo
        </button>
      </div>
    </div>
  )
}