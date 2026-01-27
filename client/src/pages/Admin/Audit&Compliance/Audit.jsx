import React, { useEffect, useState } from "react"
import {
  ShieldCheck,
  AlertTriangle,
  FileSearch,
  Activity,
  RefreshCw,
  Download,
  PlayCircle,
  Badge,
  CircleCheck,
  CircleX,
  Pencil,
  Trash2,
} from "lucide-react"




/* =======================
   KPI CONFIG
======================= */
const auditKpis = [
  {
    title: "Overall Compliance",
    value: "87.5%",
    subtitle: "Excellent rating",
    icon: ShieldCheck,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    detail: "Overall adherence to company and regulatory policies",
  },
  {
    title: "Fraud Detection",
    value: "12",
    subtitle: "active cases",
    trend: "-23% vs last month",
    icon: AlertTriangle,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    detail: "Currently investigated fraud-related expense cases",
  },
  {
    title: "Audit Readiness",
    value: "91.8%",
    subtitle: "Next audit: 2024-04-15",
    icon: FileSearch,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    detail: "Preparedness score for upcoming audits",
  },
  {
    title: "Risk Exposure",
    value: "Medium",
    subtitle: "Regulatory compliance: 89.3%",
    icon: Activity,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    detail: "Current organizational risk exposure level",
  },
]

/* =======================
   POLICY VIOLATIONS
======================= */
const policyViolations = [
  {
    name: "Expense Limits",
    severity: "Medium",
    count: 23,
    change: "-15.2%",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    name: "Missing Receipts",
    severity: "Low",
    count: 18,
    change: "+8.7%",
    color: "bg-green-100 text-green-700",
  },
  {
    name: "Late Submissions",
    severity: "Low",
    count: 31,
    change: "-22.1%",
    color: "bg-green-100 text-green-700",
  },
  {
    name: "Duplicate Claims",
    severity: "High",
    count: 7,
    change: "+16.7%",
    color: "bg-red-100 text-red-700",
  },
  {
    name: "Invalid Categories",
    severity: "Medium",
    count: 14,
    change: "-5.3%",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    name: "Approval Bypasses",
    severity: "Critical",
    count: 3,
    change: "0.0%",
    color: "bg-purple-100 text-purple-700",
  },
]

const complianceChecks = [
  {
    name: "SOX Compliance",
    status: "Compliant",
    score: 96.2,
    lastCheck: "2024-01-10",
    issues: 0,
    description: "Sarbanes-Oxley financial controls and documentation",
    statusColor: "bg-green-100 text-green-700",
    barColor: "bg-green-500",
  },
  {
    name: "GDPR Privacy",
    status: "Compliant",
    score: 94.8,
    lastCheck: "2024-01-08",
    issues: 2,
    description: "Data protection and privacy compliance for EU employees",
    statusColor: "bg-green-100 text-green-700",
    barColor: "bg-green-500",
  },
  {
    name: "Tax Regulations",
    status: "Minor Issues",
    score: 89.1,
    lastCheck: "2024-01-07",
    issues: 5,
    description: "Multi-jurisdiction tax compliance and reporting",
    statusColor: "bg-yellow-100 text-yellow-700",
    barColor: "bg-yellow-500",
  },
  {
    name: "Industry Standards",
    status: "Compliant",
    score: 91.7,
    lastCheck: "2024-01-09",
    issues: 1,
    description: "Sector-specific compliance requirements and best practices",
    statusColor: "bg-green-100 text-green-700",
    barColor: "bg-green-500",
  },
]

const auditTrail = [
  {
    user: "Michael Chen",
    risk: "Low Risk",
    riskColor: "bg-green-100 text-green-700",
    description: "Approved 15 expenses totaling $8,450",
    date: "1/15/2024, 10:30:00 AM",
    ip: "192.168.1.100",
    action: "bulk_approval",
  },
  {
    user: "System Admin",
    risk: "Medium Risk",
    riskColor: "bg-yellow-100 text-yellow-700",
    description: "Updated meal expense limit from $75 to $80",
    date: "1/15/2024, 9:45:00 AM",
    ip: "Internal System",
    action: "policy_update",
  },
  {
    user: "Sarah Wilson",
    risk: "High Risk",
    riskColor: "bg-red-100 text-red-700",
    description: "Started fraud investigation INV-2024-001",
    date: "1/15/2024, 8:20:00 AM",
    ip: "192.168.1.105",
    action: "investigation_created",
  },
]




export default function AdminAudit() {
  const [hoveredKpi, setHoveredKpi] = useState(null)
  const [activeTab, setActiveTab] = useState("violations")
  const [openAddCategory, setOpenAddCategory] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
const [selectedCategory, setSelectedCategory] = useState(null)

  const [categoryForm, setCategoryForm] = useState({
  id:"",
  cat_name: "",
  limit: 0,
  description: "",
  rec_req: false,
  is_active: false,
})


const handleAddCategory = async () => {
  console.log(categoryForm)
  const res = await fetch(import.meta.env.VITE_BACKEND_URL+"category/new_category" , {
    method:"POST",
    credentials:'include',
    headers:{
       "Content-Type": "application/json"
    },
    body:JSON.stringify(categoryForm)
    
  })
   if (!res.ok) {
      throw new Error("Failed to add category");
    }
  setOpenAddCategory(false);
//   setCategoryForm({
//   cat_name: "",
//   limit: 0,
//   description: "",
//   rec_req: false,
//   is_active: false,
// })
}

const handleUpdateCategory = async () => {
  console.log(categoryForm)
  const res = await fetch(import.meta.env.VITE_BACKEND_URL+`category/update_category/${categoryForm.id}` , {
    method:"PATCH",
    credentials:'include',
    headers:{
       "Content-Type": "application/json"
    },
    body:JSON.stringify(categoryForm)
    
  })
   if (!res.ok) {
      throw new Error("Failed to Update category");
    }
  setOpenAddCategory(false);
  
}

function handleDeleteCategory(ID){
  console.log(ID)
  setOpenAddCategory(false)
  fetch(import.meta.env.VITE_BACKEND_URL+`category/delete_category/${ID}` , {
    method:'delete',
    credentials:'include'

  })
}

function openAdd(){
  setOpenAddCategory(true)
  setIsEditMode(false)
  setCategoryForm("")
}


const [loading, setLoading] = useState(false)

const [CategoryData, setCategoryData] = useState([]);
useEffect(()=>{
 
  fetch(import.meta.env.VITE_BACKEND_URL+"category/all_category",{
    method:"GET",
    credentials:'include',
  })
  .then((res)=> res.json())
  .then((res)=> setCategoryData(res.data))
 
},[])
  console.log(CategoryData);


  return (
    <div className="p-6 bg-[#fffaf4] space-y-8">

      {/* =======================
          HEADER
      ======================= */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">Audit & Compliance Center</h1>
          <p className="text-sm text-gray-600">
            Monitor compliance, investigate fraud, and maintain audit readiness.
          </p>
        </div>
        <div className="flex items-center gap-2">
            <button className="px-3 py-2 text-[10px] font-medium border-[#d9770633]  border rounded-md  text-black flex items-center gap-2 bg-white">
            <RefreshCw size={14}/> Refresh data
            </button>
           
            <button className="px-3 py-2 text-[10px]  font-medium text-xs border-[#d9770633]  border rounded-md  text-black flex items-center gap-2 bg-white">
              <Download size={14} /> Export Audit Report
            </button>
            <button className="px-3 py-2 text-[10px]  font-medium text-xs border-[#d9770633] bg-[#ffdbb3]  border rounded-md  text-black flex items-center gap-2 ">
              <PlayCircle size={14} /> Run Compliance Check
            </button>
          </div>
      </div>

      {/* =======================
          KPI CARDS
      ======================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {auditKpis.map((kpi, i) => {
          const Icon = kpi.icon
          return (
            <div
              key={i}
              // onMouseEnter={() => setHoveredKpi(i)}
              onMouseLeave={() => setHoveredKpi(null)}
              className="relative bg-white rounded-2xl p-5 shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                </div>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${kpi.iconBg}`}>
                  <Icon className={kpi.iconColor} />
                </div>
              </div>

              <p className="text-xs mt-3 text-orange-600">
                {kpi.trend || kpi.subtitle}
              </p>
            </div>
          )
        })}
      </div>

      {/* =======================
          TABS
      ======================= */}
      <div className="bg-white rounded-2xl p-2 shadow flex gap-2">
        {[
          { key: "violations", label: "Policy Violations" },
          { key: "checks", label: "Compliance Checks" },
          { key: "trail", label: "Audit Trail" },
          { key: "management", label: "Policy Management" },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition cursor-pointer
              ${activeTab === tab.key
                ? "bg-orange-400 text-white shadow"
                : "text-gray-600 hover:bg-slate-100"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* =======================
          POLICY VIOLATIONS
      ======================= */}
      {activeTab === "violations" && (
        <div className="bg-white rounded-2xl p-6 shadow space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">Violation Trends</h3>
            <span className="text-sm text-gray-500">Last 30 days</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {policyViolations.map((v, i) => (
              <div
                key={i}
                className="rounded-2xl border border-orange-200 shadow p-5 hover:shadow transition space-y-3"
              >
                <div className="flex justify-between items-center">
                  <p className="font-medium">{v.name}</p>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${v.color}`}>
                    {v.severity}
                  </span>
                </div>

                <p className="text-3xl font-bold">{v.count}</p>

                <p className="text-xs text-gray-500">
                  {v.change} vs previous period
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
            {activeTab === "checks" && (
        <div className="bg-gray-50 rounded-2xl p-6 shadow space-y-6">
            <h3 className="font-semibold text-lg">Compliance Checks</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complianceChecks.map((item, i) => (
                <div
                key={i}
                className="bg-white shadow rounded-2xl p-5 space-y-4 hover:shadow transition"
                >
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                    <p className="font-medium">{item.name}</p>
                    <span
                        className={`inline-block mt-1 px-2 py-1 text-xs rounded ${item.statusColor}`}
                    >
                        {item.status}
                    </span>
                    </div>

                    <div className="text-right">
                    <p className="text-sm text-gray-500">Compliance Score</p>
                    <p className="text-xl font-bold">{item.score}%</p>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                    className={`h-2 rounded-full ${item.barColor}`}
                    style={{ width: `${item.score}%` }}
                    />
                </div>

                {/* Meta */}
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Last Check: {item.lastCheck}</span>
                    <span>Issues: {item.issues}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-500">{item.description}</p>

                {/* Action */}
                <button className="text-sm font-medium text-indigo-600 hover:underline">
                    View Details
                </button>
                </div>
            ))}
            </div>
        </div>
        )}

            {activeTab === "trail" && (
    <div className="bg-white rounded-2xl p-6 shadow space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="font-semibold text-lg">System Activity Log</h3>

        <div className="flex gap-3">
            <input
            type="text"
            placeholder="Search audit trail..."
            className="bg-orange-100 rounded-xl px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="px-5 py-1 border border-orange-300 rounded-md text-sm font-medium hover:bg-indigo-200">
            Export
            </button>
        </div>
        </div>

        {/* List */}
        <div className="divide-y space-y-3">
        {auditTrail.map((item, i) => (
            <div
            key={i}
            className="py-5 flex rounded-xl shadow border border-orange-400 p-2 flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
            <div className="space-y-1">
                <div className="flex items-center gap-3">
                <p className="font-medium">{item.user}</p>
                <span
                    className={`px-2 py-1 text-xs rounded ${item.riskColor}`}
                >
                    {item.risk}
                </span>
                </div>

                <p className="text-sm text-gray-600">{item.description}</p>

                <div className="text-xs text-gray-500 flex flex-wrap gap-4">
                <span>{item.date}</span>
                <span>IP: {item.ip}</span>
                <span>Action: {item.action}</span>
                </div>
            </div>
            </div>
        ))}
        </div>
    </div>
    )}
    {activeTab === "management" && (
  <div className="bg-white rounded-2xl p-6 shadow space-y-6">
    {/* Header */}
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-lg">Policy Configuration</h3>
    </div>

    {/* Expense Categories */}
    <div className="space-y-3 w-100">
      <div className="flex justify-between items-center">
      <p className="text-sm font-medium text-gray-700">
        Expense Categories
      </p>
      {/* Add Category Button */}
      <button onClick={() => openAdd()}
      className=" cursor-pointer mt-2 px-4 py-2 text-xs font-medium border border-orange-300 rounded-lg bg-white hover:bg-orange-50">
        + Add New Category
      </button>
      </div>

      {/* Category List */}
      <div className="max-h-[320px] w-100 overflow-y-auto space-y-3 pr-1">
            {CategoryData?.map((cat) => (
          <div
          key={cat.id}
          className="flex flex-col gap-2 p-4 rounded-xl border border-orange-200 bg-orange-50 hover:bg-orange-100 transition"
          >
          {/* Top row */}
          <div className="flex items-center justify-between">
          {/* Left: status + name */}
          <div className="flex items-center gap-2">
            <span
              className={`p-1 rounded-full ${
                cat.is_active ? "bg-green-400" : "bg-red-300"
              }`}
            >
              {cat.is_active ? (
                <CircleCheck size={11} className="text-white" />
              ) : (
                <CircleX size={11} className="text-white" />
              )}
            </span>

            <p className="text-sm font-medium capitalize">
              {cat.cat_name}
            </p>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            <button 
                onClick={() => {
              setIsEditMode(true)
              // setSelectedCategory(cat)
              setCategoryForm({
              id:cat.id,
              cat_name: cat.cat_name,
              limit: cat.limit,
              description: cat.description,
              rec_req: cat.rec_req,
              is_active: cat.is_active,
              })
              setOpenAddCategory(true)
              }}
            className="p-1.5 rounded-md hover:bg-orange-200">
              <Pencil size={14} />
            </button>
          </div>
          </div>

          {/* Description */}
          <p className="ml-2 text-xs text-gray-500 pl-6">
          {cat.description}
          </p>
          </div>
          ))}

        
      </div>

      
    </div>
  </div>
)}



    {openAddCategory && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">{isEditMode ? "Edit Expense Category" : "Add Expense Category"}</h4>
        <button
          onClick={() => setOpenAddCategory(false)}
          className="text-gray-400 cursor-pointer hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-medium">Category Name</label>
          <input
            type="text"
            placeholder="e.g. Travel & Transportation"
            value={isEditMode?categoryForm.cat_name:""}
            onChange={(e) => setCategoryForm({ ...categoryForm, cat_name: e.target.value })}
            className="w-full rounded-lg border bg-orange-50 border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium">Limit</label>
          <input
            type="number"
            placeholder="5000"
            value={categoryForm.limit}
            onChange={(e) => setCategoryForm({ ...categoryForm, limit: e.target.value })}
            className="w-full rounded-lg border bg-orange-50 border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-medium">Description</label>
          <input
            type='text'
            value={categoryForm.description}
            onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
            placeholder="Optional description"
            className="w-full bg-orange-50 rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium">
              Recipt Required
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer"
            checked={categoryForm.rec_req} 
            onChange={(e) => setCategoryForm({ ...categoryForm, rec_req: e.target.checked })}
            />
            <div className="w-9 h-5 bg-yellow-400 rounded-full peer-checked:bg-orange-400 transition" />
            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-4" />
          </label>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium">
              Active
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" 
            checked={categoryForm.is_active}
            onChange={(e) => setCategoryForm({ ...categoryForm, is_active: e.target.checked })}
            />
            <div className="w-9 h-5 bg-yellow-400 rounded-full peer-checked:bg-orange-400 transition" />
            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-4" />
          </label>
        </div>

        
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
        <button
          onClick={() => setOpenAddCategory(false)}
          className="px-4 py-2 text-xs rounded-lg shadow cursor-pointer border border-orange-100 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button 
        onClick={isEditMode ? handleUpdateCategory : handleAddCategory}
        className="px-4 py-2 cursor-pointer shadow text-xs rounded-lg bg-orange-400 text-white hover:bg-orange-500">
           {isEditMode ? "Update Category" : "Add Category"}
        </button>
        {isEditMode? <button onClick={()=> handleDeleteCategory(categoryForm.id)} className="p-1.5 bg-red-500 cursor-pointer border-2 border-red-800 text-xs flex items-center gap-1 rounded-md hover:bg-red-800 text-white">
              Delete Category<Trash2 size={14} />
            </button>:<></>}
      </div>
    </div>
  </div>
)}

    </div>
  )
  
}
