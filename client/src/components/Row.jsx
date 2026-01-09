export default function Row({
  id,
  type,
  employee,
  dept,
  details,
  amount,
  date,
  priority,
  compliance
}) {
  return (
    <tr className="hover:bg-[#fffaf4]">
      <td className="px-6 py-4 font-medium">{id}</td>

      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            type === 'Voucher'
              ? 'bg-purple-100 text-purple-700'
              : 'bg-blue-100 text-blue-700'
          }`}
        >
          {type}
        </span>
      </td>

      <td className="px-6 py-4">
        <p className="font-medium">{employee}</p>
        <p className="text-xs text-gray-500">{dept}</p>
      </td>

      <td className="px-6 py-4 text-gray-700">{details}</td>

      <td className="px-6 py-4 font-medium">{amount}</td>

      <td className="px-6 py-4">{date}</td>

      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            priority === 'High'
              ? 'bg-red-100 text-red-600'
              : 'bg-blue-100 text-blue-600'
          }`}
        >
          {priority}
        </span>
      </td>

      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            compliance === 'Clean'
              ? 'bg-green-100 text-green-600'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {compliance}
        </span>
      </td>

      <td className="px-6 py-4">
        <button className="px-4 py-2 border rounded-lg text-orange-600 border-orange-300 hover:bg-orange-50">
          Review
        </button>
      </td>
    </tr>
  )
}