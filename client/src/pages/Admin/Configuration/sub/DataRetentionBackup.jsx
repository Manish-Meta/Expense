import { Download } from "lucide-react";
import { useState } from "react";

export default function DataRetentionBackup() {
  const [backupEnabled, setBackupEnabled] = useState(true);

  const Toggle = ({ enabled, onToggle }) => (
    <button
      onClick={onToggle}
      className={`w-9 h-5 rounded-full p-[2px] flex items-center transition
        ${enabled ? "bg-orange-500" : "bg-orange-200 hover:bg-orange-300"}`}
    >
      <span
        className={`w-4 h-4 bg-white rounded-full shadow transition
          ${enabled ? "translate-x-4" : "translate-x-0"}`}
      />
    </button>
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow space-y-6">
      <h3 className="text-sm font-semibold">Data Retention & Backup</h3>

     
      <div className="space-y-3">
        <p className="text-xs font-semibold">Data Retention Policies</p>

        {[
          { title: "Expense Records", desc: "Legal requirement", years: "7 years" },
          { title: "User Activity Logs", desc: "Audit requirement", years: "2 years" },
          { title: "Receipt Images", desc: "Tax compliance", years: "7 years" },
          { title: "System Logs", desc: "Operational needs", years: "1 year" },
        ].map((item) => (
          <div
            key={item.title}
            className="hover:shadow-lg border rounded-xl px-4 py-3 flex justify-between items-center"
          >
            <div>
              <p className="text-xs font-medium">{item.title}</p>
              <p className="text-[11px] text-orange-600">{item.desc}</p>
            </div>
            <span className="text-[11px] bg-orange-50 text-orange-600 px-2 py-1 rounded-md">
              {item.years}
            </span>
          </div>
        ))}
      </div>

      
      <div className="pt-4 border-t space-y-4">
        <p className="text-xs font-semibold">Backup Configuration</p>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs font-medium">Automated backups</p>
            <p className="text-[11px] text-orange-600">
              Daily incremental backups
            </p>
          </div>
          <Toggle
            enabled={backupEnabled}
            onToggle={() => setBackupEnabled(!backupEnabled)}
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs">Backup frequency</span>
          <select className="text-xs border rounded-lg px-2 py-1 bg-orange-50">
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs">Backup retention</span>
          <select className="text-xs border rounded-lg px-2 py-1 bg-orange-50">
            <option>30 days</option>
            <option>90 days</option>
            <option>1 year</option>
          </select>
        </div>

        <button className="w-full flex items-center justify-center gap-2 border rounded-xl py-2 text-xs hover:bg-orange-50">
          <Download size={14} />
          Export Data Archive
        </button>
      </div>
    </div>
  );
}
