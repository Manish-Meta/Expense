import { Bell, Building, Database, Download, RefreshCcw, Save, Settings2Icon, Shield, Upload, User, Workflow } from "lucide-react";
import { useState } from "react";
import Organization from "./sub/Organization";
import UserOverview from "./sub/UserOverview";
import BulkOperations from "./sub/BulkOperations";
import AutoProvisioning from "./sub/AutoProvisioning";
import DirectoryIntegration from "./sub/DirectoryIntegration";
import AuthAccess from "./sub/AuthAccess";
import AccessControl from "./sub/AccessControl";
import DataRetentionBackup from "./sub/DataRetentionBackup";
import PrivacyCompliance from "./sub/PrivacyCompliance";
import System from "./sub/System";
import WorkFlows from "./sub/WorkFlows";
import Notification from "./sub/Notification";




export default function AdminConfig() {
    const [activeTab, setActiveTab] = useState("organization")
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
      {activeTab == "organization" && <Organization/>}
     {activeTab=="users" && <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <UserOverview />
  <BulkOperations />
  <DirectoryIntegration />
</div>}
      {activeTab=="security" && <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <AuthAccess />
  <AccessControl /> </div> } 
      {activeTab == "system" && <System/>}
      {activeTab == "workflow" && <WorkFlows/>}
      {activeTab == "notification" && <Notification/>}

       
    {activeTab=="data" && <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <DataRetentionBackup />
  <PrivacyCompliance />
</div>}
</div>
        
        );
}