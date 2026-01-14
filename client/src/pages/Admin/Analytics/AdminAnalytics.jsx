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
  Building2,
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


const kpis = [
  {
    title: "Total Spending",
    value: "$2.48M",
    trend: "+12.5%",
    subtitle: "vs previous period",
    icon: DollarSign,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    detail: "Total approved and reimbursed expenses",
  },
  {
    title: "Active Employees",
    value: "234",
    trend: "$10,592 avg",
    subtitle: "per employee",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    detail: "Employees submitting expenses",
  },
  {
    title: "Processing Time",
    value: "2.3",
    trend: "-0.8 days",
    subtitle: "avg days",
    icon: Clock,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    detail: "Average approval turnaround",
  },
  {
    title: "Compliance Rate",
    value: "94.2%",
    trend: "+2.1%",
    subtitle: "improvement",
    icon: ShieldCheck,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    detail: "Policy compliant expenses",
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

const departments = [
  {
    name: "Sales",
    employees: 89,
    spend: "$895K",
    budget: "94% of $950K",
    avg: "$10051",
    compliance: "92.1%",
    category: "Travel",
    color: "bg-blue-500",
  },
  {
    name: "Marketing",
    employees: 45,
    spend: "$568K",
    budget: "95% of $600K",
    avg: "$12620",
    compliance: "88.9%",
    category: "Events",
    color: "bg-green-500",
  },
  {
    name: "Engineering",
    employees: 78,
    spend: "$435K",
    budget: "87% of $500K",
    avg: "$5571",
    compliance: "96.2%",
    category: "Software",
    color: "bg-orange-500",
  },
  {
    name: "Operations",
    employees: 22,
    spend: "$581K",
    budget: "106% of $550K",
    avg: "$26428",
    compliance: "91.7%",
    category: "Travel",
    color: "bg-purple-500",
  },
]


const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central">
      <tspan x={x} dy="-0.2em" className="text-[11px] font-semibold">
        {(percent * 100).toFixed(1)}%
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

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon
          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredKpi(i)}
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
                {kpi.trend} {kpi.subtitle}
              </p>

              {hoveredKpi === i && (
                <div className="absolute inset-0 bg-white rounded-2xl shadow-xl flex items-center justify-center p-4 text-sm text-center z-10">
                  {kpi.detail}
                </div>
              )}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           
            <div className="bg-white rounded-2xl p-5 shadow">
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

            <div className="bg-white rounded-2xl p-5 shadow relative">
              <div className="flex items-center gap-2 mb-2">
                <PieIcon className="text-green-600" />
                <h3 className="font-semibold">Category Distribution</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="relative">
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        dataKey="percent"
                        innerRadius={55}
                        outerRadius={95}
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
                      <span className="text-xs font-medium">{c.name}</span>
                      <span className="text-xs font-semibold">{c.percent}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-orange-600" />
              <h3 className="font-semibold">Monthly Performance</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {monthlyData.map((m, i) => (
                <div key={i} className="rounded-2xl bg-purple-50 p-4">
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
            <div key={i} className="bg-white rounded-2xl p-6 shadow">
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
                  <p className="font-semibold">{d.avg}</p>
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
    </div>
  )
}
