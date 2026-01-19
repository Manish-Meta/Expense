import { Bell, Building, Database, Download, RefreshCcw, Save, Settings2Icon, Shield, Upload, User, Workflow } from "lucide-react";
import { useState } from "react";




export default function AdminConfig() {
    const [activeTab, setActiveTab] = useState("violations")
    return (<div className='p-5 space-y-6'>
        <section className="flex lg:items-center lg:flex-row flex-col justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Configuration Center</h1>
            <p className="text-sm text-[#c2410c]">
           System Settings organization</p>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-2 text-[10px] font-medium border-[#d9770633]  border rounded-md  text-black flex items-center gap-2 bg-white">
            <Upload size={14}/> import config
            </button>
           
            <button className="px-3 py-2 text-[10px]  font-medium text-xs border-[#d9770633]  border rounded-md  text-black flex items-center gap-2 bg-white">
              <Download size={14} /> Export Config
            </button>
            <button className="px-3 py-2 text-[10px]  font-medium text-xs border-[#d9770633] bg-[#ffdbb3]  border rounded-md  text-black flex items-center gap-2 ">
              <Save size={14} /> Save Changes
            </button>
          </div>
        </section>

        <div className="bg-white rounded-2xl p-2 shadow flex gap-2">
        {[
          { key: "organization", label: "Organization", icon:Building},
          { key: "workflow", label: "Workflow", icon : Workflow },
          { key: "notification", label: "Notifications", icon : Bell},
          { key: "security", label: "Security" , icon : Shield },
          { key: "users", label: "Users" , icon: User},
          { key: "data", label: "Data & Privacy", icon: Database },
          { key: "system", label: "System", icon: Settings2Icon },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition cursor-pointer
              ${activeTab === tab.key
                ? "bg-orange-400 text-white shadow"
                : "text-gray-600 hover:bg-slate-100"}`}
          ><div className="flex flex-col items-center justify-center">
            {tab.icon && <tab.icon className="size-4"/>}
          
            <p className="text-xs">{tab.label}</p>
            </div>
          </button>
        ))}
      </div>
      {activeTab === "organization" && (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* LEFT COLUMN — Organization Profile */}
    <div className="bg-white rounded-2xl p-6 shadow space-y-6">
      <h2 className="text-sm font-semibold">Organization Profile</h2>

      {/* Company Logo */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-gray-600">Company Logo</p>

        <div className="h-[300px] border-2 border-dashed border-orange-200 rounded-xl bg-[#fffaf4] flex flex-col items-center justify-center text-center gap-2">
          <p className="text-xs text-gray-500">
            300px × 300px PNG or JPG
          </p>
          <button className="px-3 py-1.5 text-xs font-medium bg-orange-400 text-white rounded-md">
            Upload Logo
          </button>
        </div>
      </div>

      {/* Organization Form */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Organization Name"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-300"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Industry"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <input
            type="number"
            placeholder="Employee Count"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>

        <input
          type="text"
          placeholder="Business Address"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-300"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <input
            type="url"
            placeholder="Website URL"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
      </div>
    </div>

    {/* RIGHT COLUMN — Financial Configuration */}
    <div className="bg-white rounded-2xl p-6 shadow space-y-4">
      <h2 className="text-sm font-semibold">Financial Configuration</h2>

      <p className="text-xs text-gray-500">
        Configure budgets, expense limits, fiscal year, and accounting preferences.
      </p>

      <div className="h-[300px] border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-xs text-gray-400">
        Financial configuration settings will appear here
      </div>
    </div>
  </div>
)}

        </div>
        );
}