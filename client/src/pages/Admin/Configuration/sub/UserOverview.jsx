import { ArrowRight } from "lucide-react";

export default function UserOverview() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow space-y-5">
      <h3 className="text-xs font-semibold">User Overview</h3>

      <div className="bg-[#fff3e8] rounded-xl py-6 text-center">
        <p className="text-2xl font-bold text-orange-600">234</p>
        <p className="text-[11px] text-orange-600">Total Users</p>
      </div>

      
      <div className="grid grid-cols-2 text-center">
        <div className="opacity-40">
          <p className="text-lg font-semibold">228</p>
          <p className="text-[11px] text-orange-600">Active</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-black">6</p>
          <p className="text-[11px] text-orange-600">Pending</p>
        </div>
      </div>

      <div className="pt-3 border-t space-y-3">
        <p className="text-xs font-semibold">Role Distribution</p>

        {[
          { label: "Employees", value: 198 },
          { label: "Managers", value: 28 },
          { label: "Admins", value: 8 },
        ].map((r) => (
          <div
            key={r.label}
            className="flex justify-between items-center text-xs"
          >
            <span className="text-gray-600">{r.label}</span>

       
            <div className="flex items-center gap-2 text-orange-600 font-medium">
              <span>{r.value}</span>
              <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
