export function StatCard({ icon, title, value, sub, footer, color }) {
  const colorMap = {
    orange: "bg-orange-100 text-orange-600",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
    teal: "bg-teal-100 text-teal-600",
  }

  return (
    <div className="bg-white rounded-2xl border border-[#f3d7b6] p-6">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
        {icon}
      </div>

      <p className="text-orange-700 font-medium mt-5">{title}</p>
      <h2 className="text-3xl font-bold text-gray-900 mt-2">{value}</h2>
      <p className="text-sm text-gray-600 mt-1">{sub}</p>

      <p className="text-sm text-green-600 mt-3">{footer}</p>
    </div>
  )
}