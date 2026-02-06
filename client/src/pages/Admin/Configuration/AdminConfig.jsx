import {
  Bell,
  FileText,
  Building,
  Database,
  Download,
  Save,
  Settings2Icon,
  Shield,
  Upload,
  User,
  Workflow
} from "lucide-react";

import { useState } from "react";

import FormBuilder from "../FormBuilder/index";
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
  const [activeTab, setActiveTab] = useState("organization");

  const tabs = [
    { key: "organization", label: "Organization", icon: Building },
    { key: "workflow", label: "Workflow", icon: Workflow },
    { key: "notification", label: "Notifications", icon: Bell },
    { key: "security", label: "Security", icon: Shield },
    { key: "users", label: "Users", icon: User },
    { key: "data", label: "Data & Privacy", icon: Database },
    { key: "system", label: "System", icon: Settings2Icon },
    { key: "FormBuilder", label: "Form Builder", icon: FileText }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl px-5 font-bold text-gray-800">
            Configuration Center
          </h1>
          <p className="text-sm px-5 text-gray-500">
            Manage organization and system settings
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-2 text-xs font-medium border-2 cursor-pointer border-gray-200 rounded-md bg-white hover:bg-gray-100 flex items-center gap-2">
            <Upload size={14} />
            Import Config
          </button>

          <button className="px-3 py-2 text-xs font-medium border-2 cursor-pointer border-gray-200 rounded-md bg-white hover:bg-gray-100 flex items-center gap-2">
            <Download size={14} />
            Export Config
          </button>

          <button className="px-3 py-2 text-xs font-medium cursor-pointer rounded-md bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2">
            <Save size={14} />
            Save Changes
          </button>
        </div>
      </section>

      {/* Tabs */}
      <div className="rounded-xl w-fit bg-gray-50 px-5 border-gray-200">
        <div className="flex overflow-x-auto">

          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex flex-col items-center gap-1 px-7 py-3 cursor-pointer text-sm font-medium border-b-2 transition whitespace-nowrap
                ${
                  activeTab === tab.key
                    ? "border-indigo-600 text-indigo-600 bg-indigo-50"
                    : "border-transparent text-gray-600 hover:bg-gray-100"
                }`}
            >
              <tab.icon className="size-4" />
              <span className="text-xs">{tab.label}</span>
            </button>
          ))}

        </div>
      </div>

      {/* Content */}
      {activeTab === "FormBuilder" && <FormBuilder />}

      {activeTab === "organization" && <Organization />}

      {activeTab === "users" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <UserOverview />
          <BulkOperations />
          <DirectoryIntegration />
        </div>
      )}

      {activeTab === "security" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AuthAccess />
          <AccessControl />
        </div>
      )}

      {activeTab === "system" && <System />}
      {activeTab === "workflow" && <WorkFlows />}
      {activeTab === "notification" && <Notification />}

      {activeTab === "data" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DataRetentionBackup />
          <PrivacyCompliance />
        </div>
      )}
    </div>
  );
}
