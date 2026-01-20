import { ChevronDown, Check, Plus, Download } from "lucide-react";
import { useState } from "react";

export default function AccessControl() {
  const [sessionOpen, setSessionOpen] = useState(false);
  const [maxOpen, setMaxOpen] = useState(false);

  const [sessionTimeout, setSessionTimeout] = useState(8);
  const [maxSessions, setMaxSessions] = useState(3);

  const [deviceReg, setDeviceReg] = useState(false);
  const [ipRestrict, setIpRestrict] = useState(false);
  const [fieldEncrypt, setFieldEncrypt] = useState(true);
  const [auditLog, setAuditLog] = useState(true);

  const Toggle = ({ enabled, onClick }) => (
    <button
      onClick={onClick}
      className={`w-9 h-5 rounded-full p-[2px] transition ${
        enabled ? "bg-orange-500" : "bg-orange-300"
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow transition ${
          enabled ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow space-y-6">
      <h3 className="text-sm font-semibold">Access Control & Security</h3>

      <div className="space-y-3">
        <p className="text-xs font-semibold">Session Management</p>

        <div className="flex justify-between text-xs">
          <span>Session timeout (hours)</span>
          <button
            onClick={() => setSessionOpen(!sessionOpen)}
            className="bg-orange-50 px-3 py-1.5 rounded-lg flex gap-1"
          >
            {sessionTimeout}
            <ChevronDown size={12} />
          </button>
        </div>

        <div className="flex justify-between text-xs">
          <span>Max concurrent sessions</span>
          <button
            onClick={() => setMaxOpen(!maxOpen)}
            className="bg-orange-50 px-3 py-1.5 rounded-lg flex gap-1"
          >
            {maxSessions}
            <ChevronDown size={12} />
          </button>
        </div>

        <div className="flex justify-between text-xs">
          <span>Device registration</span>
          <Toggle enabled={deviceReg} onClick={() => setDeviceReg(!deviceReg)} />
        </div>
      </div>

     
      <div className="pt-3 border-t space-y-3">
        <p className="text-xs font-semibold">IP Allowlisting</p>

        <div className="flex justify-between text-xs">
          <span>Enable IP restrictions</span>
          <Toggle enabled={ipRestrict} onClick={() => setIpRestrict(!ipRestrict)} />
        </div>

        {["192.168.1.0/24", "10.0.0.0/8"].map((ip) => (
          <div key={ip} className="bg-orange-50 px-3 py-2 rounded-lg text-xs">
            {ip}
          </div>
        ))}

        <button className="flex items-center gap-2 border rounded-xl px-3 py-2 text-xs hover:bg-orange-50">
          <Plus size={14} />
          Add IP Range
        </button>
      </div>

     
      <div className="pt-3 border-t space-y-3">
        <p className="text-xs font-semibold">Data Protection</p>

        <div className="flex justify-between text-xs">
          <span>Field-level encryption</span>
          <Toggle enabled={fieldEncrypt} onClick={() => setFieldEncrypt(!fieldEncrypt)} />
        </div>
      </div>


      <div className="pt-3 border-t space-y-3">
        <p className="text-xs font-semibold">Audit & Compliance</p>

        <div className="flex justify-between text-xs">
          <span>Audit logging</span>
          <Toggle enabled={auditLog} onClick={() => setAuditLog(!auditLog)} />
        </div>

        <button className="w-full flex items-center justify-center gap-2 border rounded-xl py-2 text-xs hover:bg-orange-50">
          <Download size={14} />
          Export Audit Logs
        </button>
      </div>
    </div>
  );
}
