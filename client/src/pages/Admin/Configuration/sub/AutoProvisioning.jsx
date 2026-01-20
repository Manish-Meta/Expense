import { UserPlus, ShieldCheck } from "lucide-react";

export default function AutoProvisioning() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow space-y-6">

      <h2 className="px-15 text-sm font-semibold text-slate-900">
        Auto-Provisioning
      </h2>

   
      <p className="text-xs text-gray-500">
        Automatically assign roles and permissions when users are added to the system.
      </p>

     
      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:shadow transition">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
            <UserPlus size={16} />
          </div>

          <div>
            <p className="text-sm font-medium">Auto-Create Employees</p>
            <p className="text-xs text-gray-500">
              Automatically onboard new employees with default roles
            </p>
          </div>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-orange-400 transition" />
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5" />
        </label>
      </div>

      
      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:shadow transition">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
            <ShieldCheck size={16} />
          </div>

          <div>
            <p className="text-sm font-medium">Auto-Assign Validators</p>
            <p className="text-xs text-gray-500">
              Assign validator roles based on department rules
            </p>
          </div>
        </div>

       
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-orange-400 transition" />
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5" />
        </label>
      </div>

    </div>
  );
}
