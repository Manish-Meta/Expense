import { ShieldCheck, FileText } from "lucide-react";
import { useState } from "react";

export default function PrivacyCompliance() {
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

  const [privacy, setPrivacy] = useState({
    minimization: true,
    consent: true,
    forget: true,
  });

  return (
    <div className="bg-white rounded-2xl p-6 shadow space-y-6">
      <h3 className="text-sm font-semibold">Privacy & Compliance</h3>

      <div className="space-y-4">
        <p className="text-xs font-semibold">Privacy Controls</p>

        {[
          {
            label: "Data minimization",
            desc: "Collect only necessary data",
            key: "minimization",
          },
          {
            label: "Consent management",
            desc: "Track user consent",
            key: "consent",
          },
          {
            label: "Right to be forgotten",
            desc: "Enable data deletion requests",
            key: "forget",
          },
        ].map((item) => (
          <div key={item.key} className="flex justify-between items-center">
            <div>
              <p className="text-xs font-medium">{item.label}</p>
              <p className="text-[11px] text-orange-600">{item.desc}</p>
            </div>
            <Toggle
              enabled={privacy[item.key]}
              onToggle={() =>
                setPrivacy({ ...privacy, [item.key]: !privacy[item.key] })
              }
            />
          </div>
        ))}
      </div>

      <div className="pt-4 border-t space-y-3">
        <p className="text-xs font-semibold">Compliance Standards</p>

        {[
          { title: "GDPR", desc: "General Data Protection Regulation", status: "Compliant" },
          { title: "SOX", desc: "Sarbanes-Oxley Act", status: "Compliant" },
          { title: "ISO 27001", desc: "Information Security Management", status: "In Progress" },
          { title: "CCPA", desc: "California Consumer Privacy Act", status: "Compliant" },
        ].map((item) => (
          <div
            key={item.title}
            className="hover:shadow-lg border rounded-xl px-4 py-3 flex justify-between items-center"
          >
            <div>
              <p className="text-xs font-medium">{item.title}</p>
              <p className="text-[11px] text-orange-600">{item.desc}</p>
            </div>
            <span
              className={`text-[11px] px-2 py-1 rounded-md
                ${
                  item.status === "Compliant"
                    ? "bg-orange-50 text-orange-600"
                    : "bg-yellow-50 text-yellow-600"
                }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t space-y-2">
        <p className="text-xs font-semibold">Data Processing</p>

        <button className="w-full flex items-center gap-2 border rounded-xl px-3 py-2 text-xs hover:bg-orange-50">
          <ShieldCheck size={14} />
          Generate Privacy Report
        </button>

        <button className="w-full flex items-center gap-2 border rounded-xl px-3 py-2 text-xs hover:bg-orange-50">
          <FileText size={14} />
          Data Processing Agreement
        </button>

        <button className="w-full flex items-center gap-2 border rounded-xl px-3 py-2 text-xs hover:bg-orange-50">
          <FileText size={14} />
          Privacy Policy Template
        </button>
      </div>
    </div>
  );
}
