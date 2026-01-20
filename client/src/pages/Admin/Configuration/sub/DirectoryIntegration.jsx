import { RefreshCcw } from "lucide-react";
import { useState } from "react";

export default function DirectoryIntegration() {

  const [settings, setSettings] = useState({
    groupSync: true,
    photoSync: false,
    autoDeactivate: true,
  });

  const Toggle = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
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
    <div className="bg-white rounded-2xl p-6 shadow space-y-5">
      <h3 className="text-xs font-semibold">Directory Integration</h3>

   
      <div className="border rounded-xl p-4 space-y-1">
        <p className="text-xs font-medium">Active Directory</p>
        <p className="text-[11px] text-orange-600">Microsoft AD</p>

        <div className="pt-2 text-[11px] space-y-1">
          <div className="flex justify-between">
            <span className="text-orange-500">Last Sync</span>
            <span>2 hours ago</span>
          </div>
          <div className="flex justify-between">
            <span className="text-orange-500">Sync Schedule</span>
            <span>Every 4 hours</span>
          </div>
          <div className="flex justify-between">
            <span className="text-orange-500">Users Synced</span>
            <span>234</span>
          </div>
        </div>

        <button className="mt-3 w-full flex items-center justify-center gap-2 border rounded-xl py-2 text-xs hover:bg-blue-50 transition">
          <RefreshCcw size={14} />
          Sync Now
        </button>
      </div>

 
      <div className="pt-3 border-t space-y-3">

        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs font-medium">Group Synchronization</p>
            <p className="text-[11px] text-orange-600">
              Sync AD groups as departments
            </p>
          </div>
          <Toggle
            enabled={settings.groupSync}
            onChange={() =>
              setSettings({ ...settings, groupSync: !settings.groupSync })
            }
          />
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs font-medium">Photo Sync</p>
            <p className="text-[11px] text-orange-600">
              Import profile photos
            </p>
          </div>
          <Toggle
            enabled={settings.photoSync}
            onChange={() =>
              setSettings({ ...settings, photoSync: !settings.photoSync })
            }
          />
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs font-medium">Auto-deactivate</p>
            <p className="text-[11px] text-orange-600">
              When removed from AD
            </p>
          </div>
          <Toggle
            enabled={settings.autoDeactivate}
            onChange={() =>
              setSettings({
                ...settings,
                autoDeactivate: !settings.autoDeactivate,
              })
            }
          />
        </div>

      </div>
    </div>
  );
}
