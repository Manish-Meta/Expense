import { useState } from "react"
import {
  DollarSign,
  Users,
  Clock,
  ShieldCheck,
  Activity,
  PieChart as PieIcon,
  Calendar,
  BarChart3,
  RefreshCcw,
  Download,
  ChevronDown,
  Building2,
  Target,
  Globe,
  Gauge,
  Zap
} from "lucide-react"

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Sector,
} from "recharts"


function AnalyticsHubHeader() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow">
          <BarChart3 className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics Hub</h1>
          <p className="text-sm text-gray-500">
            Comprehensive expense analytics with predictive insights and optimization recommendations
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 ">
        <div className="relative hover:shadow-lg transition">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border shadow-sm hover:shadow transition text-sm"
          >
            Last 3 Months
            <ChevronDown size={16} />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border text-sm z-20">
              {["Last Month", "Last 3 Months", "Last 6 Months", "Last Year"].map(item => (
                <div
                  key={item}
                  className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border shadow-sm hover:shadow transition text-sm hover:shadow-lg transition">
          <RefreshCcw size={16} />
          Refresh
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow hover:opacity-90 transition text-sm hover:shadow-lg transition">
          <Download size={16} />
          Export Dashboard
        </button>
      </div>
    </div>
  )
}
const categoryInsights = [
  {
    key: "travel",
    name: "Travel",
    icon: "T",
    color: "bg-blue-500",
    spend: "$895K",
    share: "36.1%",
    avg: "$485.67",
    top: "Flights",
    compliance: "94.2%",
    trend: "+12.5%",
  },
  {
    key: "meals",
    name: "Meals & Entertainment",
    icon: "M",
    color: "bg-green-500",
    spend: "$568K",
    share: "22.9%",
    avg: "$89.45",
    top: "Client Dinners",
    compliance: "88.9%",
    trend: "+8.7%",
  },
  {
    key: "office",
    name: "Office Supplies",
    icon: "O",
    color: "bg-purple-500",
    spend: "$235K",
    share: "9.5%",
    avg: "$67.23",
    top: "Stationery",
    compliance: "96.7%",
    trend: "-12.3%",
  },
  {
    key: "software",
    name: "Software & Tools",
    icon: "S",
    color: "bg-blue-600",
    spend: "$346K",
    share: "13.9%",
    avg: "$299.99",
    top: "SaaS Subscriptions",
    compliance: "91.4%",
    trend: "+22.1%",
  },
  {
    key: "training",
    name: "Training",
    icon: "T",
    color: "bg-emerald-500",
    spend: "$189K",
    share: "7.6%",
    avg: "$1245.67",
    top: "Conferences",
    compliance: "89.3%",
    trend: "+18.9%",
  },
]

const topVendors = [
  { name: "United Airlines", icon: "U", color: "bg-blue-500", tx: 145, avg: "$1618.05", tag: "Travel", spend: "$235K" },
  { name: "Hilton Hotels", icon: "H", color: "bg-green-500", tx: 89, avg: "$2125.67", tag: "Travel", spend: "$189K" },
  { name: "AWS", icon: "A", color: "bg-purple-500", tx: 12, avg: "$13990.87", tag: "Software", spend: "$168K" },
  { name: "Microsoft", icon: "M", color: "bg-orange-500", tx: 234, avg: "$622.56", tag: "Software", spend: "$146K" },
  { name: "Uber", icon: "U", color: "bg-blue-600", tx: 567, avg: "$174.23", tag: "Transport", spend: "$99K" },
]

const performanceMetrics = [
  {
    title: "Processing Efficiency",
    value: "94.2%",
    target: "Target: 95%",
    change: "+2.1%",
    description: "Percentage of expenses processed within SLA",
    icon: Gauge,
    bg: "bg-blue-50",
    bar: "bg-orange-300",
    progress: 94.2,
  },
  {
    title: "Auto-Approval Rate",
    value: "67.8%",
    target: "Target: 70%",
    change: "+5.3%",
    description: "Low-risk expenses automatically approved",
    icon: Zap,
    bg: "bg-green-50",
    bar: "bg-orange-500",
    progress: 67.8,
  },
  {
    title: "Reimbursement Speed",
    value: "5.2 days",
    target: "Target: 5 days",
    change: "-0.8 days",
    negative: true,
    description: "Average time from approval to payment",
    icon: Clock,
    bg: "bg-yellow-50",
    bar: "bg-orange-500",
    progress: 84,
  },
  {
    title: "Policy Compliance",
    value: "91.7%",
    target: "Target: 95%",
    change: "+1.9%",
    description: "Expenses compliant with company policies",
    icon: ShieldCheck,
    bg: "bg-purple-50",
    bar: "bg-orange-500",
    progress: 91.7,
  },
]

const departments = [
  {
    name: "Sales",
    employees: 89,
    spend: "$895K",
    budget: "94% of $950K",
    avg: "$10,051",
    compliance: "92.1%",
    category: "Travel",
    color: "bg-blue-500",
  },
  {
    name: "Marketing",
    employees: 45,
    spend: "$568K",
    budget: "95% of $600K",
    avg: "$12,620",
    compliance: "88.9%",
    category: "Events",
    color: "bg-green-500",
  },
  {
    name: "Engineering",
    employees: 78,
    spend: "$435K",
    budget: "87% of $500K",
    avg: "$5,571",
    compliance: "96.2%",
    category: "Software",
    color: "bg-orange-500",
  },
  {
    name: "Operations",
    employees: 22,
    spend: "$581K",
    budget: "106% of $550K",
    avg: "$26,428",
    compliance: "91.7%",
    category: "Travel",
    color: "bg-purple-500",
  },
]

const kpis = [
  {
    title: "Total Spending",
    value: "$2.48M",
    trend: "+12.5%",
    subtitle: "vs previous period",
    icon: DollarSign,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    // detail: "Total approved and reimbursed expenses",
  },
  {
    title: "Active Employees",
    value: "234",
    trend: "$10,592 avg",
    subtitle: "per employee",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    // detail: "Employees submitting expenses",
  },
  {
    title: "Processing Time",
    value: "2.3",
    trend: "-0.8 days",
    subtitle: "avg days",
    icon: Clock,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    // detail: "Average approval turnaround",
  },
  {
    title: "Compliance Rate",
    value: "94.2%",
    trend: "+2.1%",
    subtitle: "improvement",
    icon: ShieldCheck,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    // detail: "Policy compliant expenses",
  },
]

const spendingTrend = [
  { month: "Aug", actual: 210, budget: 220, forecast: 215 },
  { month: "Sep", actual: 225, budget: 230, forecast: 228 },
  { month: "Oct", actual: 198, budget: 225, forecast: 205 },
  { month: "Nov", actual: 287, budget: 280, forecast: 285 },
  { month: "Dec", actual: 235, budget: 230, forecast: 238 },
  { month: "Jan", actual: 248, budget: 250, forecast: 245 },
]

const categoryData = [
  { name: "Travel & Transportation", amount: 895, percent: 36.1, color: "#3b82f6" },
  { name: "Meals & Entertainment", amount: 568, percent: 22.9, color: "#10b981" },
  { name: "Software & Tools", amount: 346, percent: 13.9, color: "#8b5cf6" },
  { name: "Office Supplies", amount: 235, percent: 9.5, color: "#f59e0b" },
  { name: "Training & Development", amount: 189, percent: 7.6, color: "#ef4444" },
  { name: "Marketing & Events", amount: 247, percent: 10, color: "#06b6d4" },
]

const monthlyData = [
  { month: "Sep 2024", spend: 199, budget: 220 },
  { month: "Oct 2024", spend: 235, budget: 230 },
  { month: "Nov 2024", spend: 198, budget: 225 },
  { month: "Dec 2024", spend: 287, budget: 280 },
  { month: "Jan 2024", spend: 248, budget: 250 },
]


const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central">
      <tspan x={x} dy="-0.2em" className="text-[11px] font-semibold">
        {(percent * 100/100).toFixed(1)}%
      </tspan>
      <tspan x={x} dy="1.2em" className="text-[9px]">
        {name.split("&")[0]}
      </tspan>
    </text>
  )
}


export default function AdminAnalytics() {
  const [hoveredKpi, setHoveredKpi] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="p-6 bg-[#fffaf4] min-h-screen space-y-8">
      <AnalyticsHubHeader />

  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => {
  const Icon = kpi.icon
  return (
    <div
      key={i}
      className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition"
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
        {kpi.trend} {kpi.subtitle}
      </p>
    </div>
  )
})}

      </div>

      
      <div className="bg-white rounded-2xl p-2 shadow flex gap-2">
        {["overview", "departments", "categories", "performance", "predictions"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition
              ${activeTab === tab
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow"
                : "text-gray-600 hover:bg-slate-100"}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
  {activeTab === "overview" && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
           
            <div className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="text-indigo-600" />
                <h3 className="font-semibold">Spending Trends</h3>
              </div>

              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={spendingTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="actual" stroke="#f97316" strokeWidth={3} />
                  <Line dataKey="budget" stroke="#3b82f6" />
                  <Line dataKey="forecast" stroke="#10b981" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow relative hover:shadow-lg transition">
              <div className="flex items-center gap-2 mb-2 hover:shadow-lg transition">
                <PieIcon className="text-green-600" />
                <h3 className="font-semibold">Category Distribution</h3>
              </div>

              <div className="grid grid-cols-2 gap-1 items-center">
                <div className="relative">
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        dataKey="percent"
                        innerRadius={55}
                        outerRadius={105}
                  
                        label={renderPieLabel}
                        activeIndex={activeCategory}
                        activeShape={(p) => <Sector {...p} outerRadius={p.outerRadius + 6} />}
                        onMouseEnter={(_, i) => setActiveCategory(i)}
                        onMouseLeave={() => setActiveCategory(null)}
                      >
                        {categoryData.map((c, i) => (
                          <Cell key={i} fill={c.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  {activeCategory !== null && (
                    <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-4 w-56 text-sm">
                      <p className="font-semibold">{categoryData[activeCategory].name}</p>
                      <p>Amount: <b>${categoryData[activeCategory].amount}K</b></p>
                      <p>Share: <b>{categoryData[activeCategory].percent}%</b></p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {categoryData.map((c, i) => (
                    <div
                      key={i}
                      onMouseEnter={() => setActiveCategory(i)}
                      onMouseLeave={() => setActiveCategory(null)}
                      className="flex justify-between items-center px-3 py-2 rounded-xl bg-slate-50 hover:bg-white hover:shadow"
                    >
                     <div className="flex items-center gap-2">
    <span
      className="w-2.5 h-2.5 rounded-full"
      style={{ backgroundColor: c.color }}
    />
    <span className="text-xs font-medium">{c.name}</span>
  </div>

  <span className="text-xs font-semibold" style={{ color: c.color }}>
    {c.percent}%
  </span>
        </div>
))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-orange-600" />
              <h3 className="font-semibold">Monthly Performance</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 ">
              {monthlyData.map((m, i) => (
                <div key={i} className="rounded-2xl bg-purple-50 p-4 hover:shadow transition">
                  <p className="font-semibold">{m.month}</p>
                  <p className="text-2xl font-bold text-green-600">${m.spend}K</p>
                  <p className="text-xs text-gray-500">Budget ${m.budget}K</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      
      {activeTab === "departments" && (
        <div className="space-y-6">
          {departments.map((d, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${d.color}`}>
                    <Building2 className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">{d.name}</p>
                    <p className="text-xs text-gray-500">{d.employees} employees</p>
                  </div>
                </div>
                <p className="text-2xl font-bold">{d.spend}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <p className="text-xs text-blue-600">Budget Usage</p>
                  <p className="text-sm font-semibold">{d.budget}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <p className="text-xs text-green-600">Avg/Employee</p>
                  <p className="font-semibold">
                    {d.avg}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl">
                  <p className="text-xs text-purple-600">Compliance</p>
                  <p className="font-semibold">{d.compliance}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl">
                  <p className="text-xs text-orange-600">Top Category</p>
                  <p className="font-semibold">{d.category}</p>
                </div>
              </div>

              <button className="mt-4 w-full border rounded-xl py-2 text-sm hover:bg-slate-50">
                View Detailed Analytics
              </button>
            </div>
          ))}
        </div>
      )}
      {activeTab === "categories" && (
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

   <div className="bg-white rounded-2xl p-6 shadow space-y-6 hover:shadow-lg transition">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center">
          <Globe size={20} />
        </div>
        <h3 className="text-lg font-semibold">Top Vendors</h3>
      </div>

      <div className="space-y-4">
        {topVendors.map(v => (
          <div
            key={v.name}
            className="bg-blue-50/60 rounded-2xl p-4 flex justify-between items-center hover:shadow transition"
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full text-white flex items-center justify-center ${v.color}`}>
                {v.icon}
              </div>
              <div>
                <p className="font-semibold">{v.name}</p>
                <p className="text-xs text-gray-500">
                  {v.tx} transactions · Avg {v.avg}
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-200 text-xs">
                    {v.tag}
                  </span>
                </p>
              </div>
            </div>
            <p className="font-bold text-lg">{v.spend}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="bg-white rounded-2xl p-6 shadow space-y-6 hover:shadow-lg transition">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
          <Target size={22} />
        </div>
        <h3 className="text-lg font-semibold">Category Insights</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categoryInsights.map(c => (
          <div
            key={c.key}
            className="bg-blue-50/60 rounded-2xl p-5 hover:shadow-lg transition"
          >
           
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg text-white flex items-center justify-center ${c.color}`}>
                  {c.icon}
                </div>
                <p className="font-semibold">{c.name}</p>
              </div>
              <p className="font-bold text-lg">{c.spend}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white rounded-xl p-3">
                <p className="text-gray-500 text-xs">Share</p>
                <p className="font-semibold">{c.share}</p>
              </div>
              <div className="bg-white rounded-xl p-3">
                <p className="text-gray-500 text-xs">Avg Amount</p>
                <p className="font-semibold">{c.avg}</p>
              </div>
              <div className="bg-white rounded-xl p-3">
                <p className="text-gray-500 text-xs">Top Expense</p>
                <p className="font-semibold">{c.top}</p>
              </div>
              <div className="bg-white rounded-xl p-3">
                <p className="text-gray-500 text-xs">Compliance</p>
                <p className="font-semibold">{c.compliance}</p>
              </div>
            </div>

        
            <div className="mt-4">
              <div className="h-2 rounded-full bg-orange-100 overflow-hidden">
                <div className="h-full bg-orange-500 w-1/3" />
              </div>
              <div className={`mt-2 inline-block px-3 py-1 rounded-full text-xs
                ${c.trend.startsWith("-")
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"}`}>
                {c.trend}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    
    
  </div>
)}
{activeTab === "performance" && (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {performanceMetrics.map((item, i) => {
      const Icon = item.icon

      return (
        <div
          key={i}
          className={`rounded-2xl p-6 shadow-lg ${item.bg} hover:shadow-xl transition`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-slate-900">
              {item.title}
            </h3>

            <span
              className={`text-sm px-3 py-1 rounded-full font-semibold
                ${item.negative
                  ? "bg-red-100 text-red-400"
                  : "bg-green-100 text-green-400"
                }`}
            >
              {item.change}
            </span>
          </div>

          <div className="flex justify-between items-end mb-3">
            <p className="text-1xl font-bold text-slate-900">
              {item.value}
            </p>

            <span className="text-sm px-3 py-1 rounded-full bg-white shadow">
              {item.target}
            </span>
          </div>

     
          <div className="w-full h-3 bg-white rounded-full overflow-hidden mb-4">
            <div
              className={`h-full rounded-full ${item.bar}`}
              style={{ width: `${item.progress}%` }}
            />
          </div>

         
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Icon className="text-gray-400" size={18} />
            <span>{item.description}</span>
          </div>
        </div>
      )
    })}
  </div>
)}


    </div>
  )
}
