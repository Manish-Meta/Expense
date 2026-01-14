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
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <BarChart3 className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Analytics Hub
          </h1>
          <p className="text-sm text-gray-500">
            Comprehensive expense analytics with predictive insights and optimization recommendations
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border shadow-sm hover:shadow transition text-sm"
          >
            Last 3 Months
            <ChevronDown size={16} />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border text-sm z-20">
              {["Last Month", "Last 3 Months", "Last 6 Months", "Last Year"].map((item) => (
                <div key={item} className="px-4 py-2 hover:bg-slate-100 cursor-pointer">
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border shadow-sm hover:shadow transition text-sm">
          <RefreshCcw size={16} />
          Refresh
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-xl
                           bg-gradient-to-r from-indigo-500 to-purple-600
                           text-white shadow hover:opacity-90 transition text-sm">
          <Download size={16} />
          Export Dashboard
        </button>
      </div>
    </div>
  )
}

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
  { month: "Sep 2024", spend: 199, budget: 220, expenses: 145, employees: 230 },
  { month: "Oct 2024", spend: 235, budget: 230, expenses: 167, employees: 232 },
  { month: "Nov 2024", spend: 198, budget: 225, expenses: 152, employees: 233 },
  { month: "Dec 2024", spend: 287, budget: 280, expenses: 189, employees: 234 },
  { month: "Jan 2024", spend: 248, budget: 250, expenses: 174, employees: 234 },
]



const renderPieLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, name,
}) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  const shortName = name.split("&")[0]

  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central">
      <tspan x={x} dy="-0.2em" className="text-[11px] font-semibold">
        {(percent * 100).toFixed(1)}%
      </tspan>
      <tspan x={x} dy="1.2em" className="text-[9px]">
        {shortName}
      </tspan>
    </text>
  )
}



export default function AdminAnalytics() {
  const [hoveredKpi, setHoveredKpi] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)

  return (
    <div className="p-6 bg-[#fffaf4] min-h-screen space-y-8">

      <AnalyticsHubHeader />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon
          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredKpi(i)}
              onMouseLeave={() => setHoveredKpi(null)}
              className="relative bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                </div>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${kpi.iconBg}`}>
                  <Icon className={kpi.iconColor} />
                </div>
              </div>

              <p className="text-xs mt-3 text-orange-600">
                {kpi.trend} {kpi.subtitle}
              </p>

              {hoveredKpi === i && (
                <div className="absolute inset-0 bg-white rounded-2xl shadow-xl flex items-center justify-center p-4 text-sm text-gray-700 text-center z-10">
                  {kpi.detail}
                </div>
              )}
            </div>
          )
        })}
      </div>

    
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl p-5 shadow hover:shadow-xl transition">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Activity className="text-indigo-600 size-4" />
            </div>
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

        <div className="bg-white rounded-2xl p-5 shadow hover:shadow-xl transition relative">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center">
              <PieIcon className="text-green-600 size-4" />
            </div>
            <h3 className="font-semibold">Category Distribution</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 items-center">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="percent"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={2}
                  label={renderPieLabel}
                  labelLine={false}
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

            <div className="space-y-2">
              {categoryData.map((c, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setActiveCategory(i)}
                  onMouseLeave={() => setActiveCategory(null)}
                  className="flex justify-between items-center px-3 py-2 rounded-xl bg-slate-50 hover:bg-white hover:shadow transition"
                >
                  <span className="text-xs font-medium">{c.name}</span>
                  <span className="text-xs font-semibold">{c.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

     
      <div className="bg-white rounded-2xl p-6 shadow hover:shadow-2xl transition">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
            <Calendar className="text-orange-600" />
          </div>
          <h3 className="font-semibold text-lg">Monthly Performance</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {monthlyData.map((m, i) => (
            <div key={i} className="rounded-2xl bg-purple-50 p-4 hover:shadow-lg transition">
              <p className="font-semibold">{m.month}</p>
              <p className="text-2xl font-bold text-green-600 mt-2">${m.spend}K</p>
              <p className="text-xs text-gray-500 mt-1">Budget ${m.budget}K</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
