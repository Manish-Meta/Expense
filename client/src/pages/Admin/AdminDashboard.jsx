import { BoltIcon, ChartColumnIncreasing, ClockIcon, CreditCardIcon, CurrencyIcon, Download, EyeIcon, FileExclamationPoint, LucideRepeat, RefreshCcw, Repeat, Settings2Icon, ShieldCheckIcon } from 'lucide-react'
import React from 'react'
import DepartmentCard from '../../components/DepartmentCardAdmin';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"
import { MoreHorizontal } from "lucide-react"

const spendingData = [
  { month: "Aug", actual: 210, budget: 220, forecast: 215 },
  { month: "Sep", actual: 225, budget: 230, forecast: 228 },
  { month: "Oct", actual: 198, budget: 225, forecast: 205 },
  { month: "Nov", actual: 287, budget: 280, forecast: 285 },
  { month: "Dec", actual: 235, budget: 230, forecast: 238 },
  { month: "Jan", actual: 248, budget: 250, forecast: 245 },
  { month: "Feb", actual: 260, budget: 255, forecast: 258 },
  { month: "Mar", actual: 272, budget: 265, forecast: 270 },
]



const AdminDashboard = () => {
    const departments = [
    {
      name: "Sales",
      employees: 45,
      spent: 89450,
      budget: 95000,
      usagePercent: 94,
      compliance: 92.3,
      violations: 3,
    },
    {
      name: "Marketing",
      employees: 23,
      spent: 67890,
      budget: 70000,
      usagePercent: 97,
      compliance: 88.7,
      violations: 5,
    },
    {
      name: "Engineering",
      employees: 78,
      spent: 45670,
      budget: 55000,
      usagePercent: 83,
      compliance: 95.1,
      violations: 1,
      highlight: true,
    },
    {
      name: "Operations",
      employees: 34,
      spent: 34560,
      budget: 40000,
      usagePercent: 86,
      compliance: 91.2,
      violations: 2,
    },
  ];

const insights = [
    {
      title: "Cost Savings Opportunity",
      description:
        "Switch to Vendor B for travel bookings to save $15,000 annually",
      confidence: 89,
      impact: "$15,000/year",
    },
    {
      title: "Spending Spike Alert",
      description:
        "Marketing department showing 35% increase in Q4 spending",
      confidence: 94,
      impact: "Budget variance",
    },
    {
      title: "Potential Duplicate Expenses",
      description:
        "3 similar transactions detected across multiple departments",
      confidence: 91,
      impact: "$2,340",
    },
  ];



  return (
    <div className='p-5 space-y-6'>
        <section className="flex lg:items-center lg:flex-row flex-col justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
            <p className="text-sm text-[#c2410c]">
           Comprehensive oversight of organizational expense management and compliance. </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-2 text-[10px] font-medium border-[#d9770633]  border rounded-md  text-black flex items-center gap-2 bg-white">
            <RefreshCcw size={14}/> Refresh data
            </button>
           
            <button className="px-3 py-2 text-[10px]  font-medium text-xs border-[#d9770633]  border rounded-md  text-black flex items-center gap-2 bg-white">
              <Download size={14} /> Export Report
            </button>
            <button className="px-3 py-2 text-[10px]  font-medium text-xs border-[#d9770633] bg-[#ffdbb3]  border rounded-md  text-black flex items-center gap-2 ">
              <Settings2Icon size={14} /> Configure
            </button>
          </div>
        </section>


        {/* Stat card sections */}

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        icon={<CurrencyIcon className="h-5 w-5 text-orange-500" />}
        value="$247,850"
        title="Total Monthly Spend"
        subtitle="+12.5% vs last month"
        footer="Target: $275,000"
      />

      <StatCard
        icon={<ClockIcon className="h-5 w-5 text-gray-700" />}
        value="28"
        title="Pending Approvals"
        subtitle="-15% vs last week"
        footer="8 urgent • Avg: 2.3 days"
        trend={{ type: "down", value: "↓" }}
      />

      <StatCard
        icon={<FileExclamationPoint className="h-5 w-5 text-red-500" />}
        value="12"
        title="Policy Violations"
        subtitle="+3 this month"
        footer="8 resolved this month"
      />

      <StatCard
        icon={<BoltIcon className="h-5 w-5 text-gray-400" />}
        value="94.2%"
        title="Processing Efficiency"
        subtitle="+2.8% vs last month"
      />

      <StatCard
        icon={<CreditCardIcon className="h-5 w-5 text-blue-500" />}
        value="$89,450"
        title="Reimbursement Queue"
        subtitle="-18% pending payout"
      />

      <StatCard
        icon={<ShieldCheckIcon className="h-5 w-5 text-purple-500" />}
        value="87.5%"
        title="Compliance Score"
        subtitle="+1.2% audit ready"
      />
    </div>


    {/* third section */}

    <section className='grid lg:grid-cols-5 gap-4 '>

      <div className="lg:col-span-3 space-y-5">

        {/* report analtics */}
        <div className="flex justify-center items-center rounded-xl w-full">
          
       
          <div className="w-full space-y-5">
          {/* Organization Spending Trends */}
          <div className="bg-white rounded-2xl p-5 shadow w-full">
            {/* Header */}
            <div className="flex items-center justify-between w-full mb-4">
              <div>
                <h3 className="text-sm font-semibold">
                  Organization Spending Trends
                </h3>
                <p className="text-xs text-gray-500">This Month</p>
              </div>

              <button className="text-xs text-gray-500 hover:text-gray-700">
                Details
              </button>
            </div>

            {/* Legend */}
            <div className="flex gap-4 text-xs mb-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                Actual Spending
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Budget
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                AI Forecast
              </span>
            </div>

            {/* Chart Container (KEY FIX) */}
            <div className="w-full h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={spendingData}>
                  <defs>
                  <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                      fontSize: "12px",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#ef9a24"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="budget"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    strokeDasharray="5 5"
                  />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        </div>

        <div className="bg-white rounded-xl border border-orange-200 p-4">
          <div className="flex justify-between items-center py-6 px-2 ">
            <h1 className='text-sm font-medium'>Department Performance</h1>
            <p className='text-xs text-orange-800/60'>View detailed analytics</p>
          </div>



   <div className="space-y-6">
      {departments.map((dept) => (
        <DepartmentCard key={dept.name} {...dept} />
      ))}
    </div>
  


        </div>

      </div>


{/* right side content  */}
      <div className="lg:col-span-2 space-y-5 ">

{/* Live Feed */}

 <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 space-y-4">
    
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-orange-500 text-lg">⚡</span>
          <h3 className="font-semibold text-gray-900">
            Live Feed
          </h3>
        </div>

        <span className=" bg-orange-100  px-2 py-1 rounded-full">
          <EyeIcon className='size-4'/>
        </span>
      </div>

      {/* Insight Cards */}
      <div className="space-y-4">
        {insights.map((item, index) => (
          <InsightCard key={index} {...item} />
        ))}
      </div>
    </div>



        {/* insight */}
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 space-y-4">
    
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-orange-500 text-lg">⚡</span>
          <h3 className="font-semibold text-gray-900">
            AI Insights
          </h3>
        </div>

        <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
          {insights.length} insights
        </span>
      </div>

      {/* Insight Cards */}
      <div className="space-y-4">
        {insights.map((item, index) => (
          <InsightCard key={index} {...item} />
        ))}
      </div>
    </div>
  


  {/* Quick Section */}


<div className="border border-orange-300 rounded-xl p-5">


  <p>Quick Actions</p>


  <div className="flex gap-4  flex-col items-start p-3">
    {
      ["Review", "Audit Compliance", "Generate Report", "Process Reimbursments"]
      .map((e)=> <button className='text-xs font-medium'>{e}</button>)
    }
  </div>


</div>


      </div>

    </section>


    </div>
  )
}

export default AdminDashboard



//StatCard for ADMIN component

const StatCard = ({
  icon,
  title,
  value,
  subtitle,
  footer,
  trend,
}) => {
  return (
    <div className="bg-white rounded-xl p-2  border border-gray-200  transition">
      <div className="flex items-center justify-between">
        <div className="p-3 rounded-lg  bg-gray-100">
          {icon}
        </div>
        {trend && (
          <span
            className={`text-sm font-medium ${
              trend.type === "down"
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>

      <div className=" p-3">
        <h3 className="text-xl font-semibold text-gray-900">
          {value}
        </h3>
        <p className="text-xs text-orange-600 mt-1">
          {title}
        </p>
        {subtitle && (
          <p className="text-xs font-medium text-gray-600 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {footer && (
        <div className="mt-4 text-xs text-blue-800 ">
          {footer}
        </div>
      )}
    </div>
  );
};


// insight card component

const InsightCard = ({
  title,
  description,
  confidence,
  impact,
}) => {
  return (
    <div className="bg-white border border-orange-100 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-sm text-gray-900">
          {title}
        </h4>
        <span className="text-xs text-gray-400">
          {confidence}% confidence
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-orange-600 leading-relaxed">
        {description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-xs font-medium text-gray-900">
          Impact: <span className="font-semibold">{impact}</span>
        </p>

        <button className="flex text-xs items-center gap-1 text-sm font-medium text-orange-600 hover:underline">
          Take Action
          <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  );
};





