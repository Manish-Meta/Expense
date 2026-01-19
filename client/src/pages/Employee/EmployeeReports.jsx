
import { StatCard } from "../../components/StatCard";
import FilterBar from "../../components/FilterBar";
import { CardComp } from "./EmployeeDashboard";
import ReportCard from "../../components/ReportCard";
import PaymentRow from "../../components/PaymentRow";
import {
  DollarSign,
  Receipt,
  Target,
  Clock,
  Download,
  RefreshCw,
  Eye,
} from "lucide-react";
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


const EmployeeReports = () => {
  return (
    <div className="bg-[#fffaf4] p-6 space-y-6">

        {/* HEADER */}
        <section className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Personal Reports</h1>
            <p className="text-sm text-[#c2410c]">
              Analyze your expense patterns and track spending insights.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-2 text-sm rounded-md bg-orange-100 shadow">
              Last 3 Month
            </button>
            <button className="px-3 py-2 text-sm rounded-md bg-white border border-orange-200 flex items-center gap-2">
              <RefreshCw size={14} /> Refresh
            </button>
            <button className="px-4 py-2 text-sm rounded-md bg-[#d97706] text-white flex items-center gap-2">
              <Download size={14} /> Export Report
            </button>
          </div>
        </section>

        {/* STAT CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
          <ReportCard
            title="Total Spent"
            value="$8945.67"
            subtitle="+8.4% vs period"
            icon={DollarSign}
            iconColor="text-orange-500"
          />

          <ReportCard
            title="Total Expenses"
            value="45"
            subtitle="Avg: $198.79"
            icon={Receipt}
            iconColor="text-gray-400"
          />

          <ReportCard
            title="Budget Usage"
            value="74%"
            subtitle="$8945.67 of $3500.00"
            progress={74}
            icon={Target}
            iconColor="text-blue-500"
          />

          <ReportCard
            title="Avg Processing"
            value="2.3"
            subtitle="-0.7 days faster"
            icon={Clock}
            iconColor="text-purple-500"
          />
        </section>

        {/* TABS */}
        <div className="bg-orange-50 rounded-full p-1 flex justify-between text-sm font-medium">
          {["Overview", "Categories", "Trends", "Compliance"].map(tab => (
            <button
              key={tab}
              className="px-20 py-2 rounded-full bg-white shadow"
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CONTENT GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">

          {/* LEFT: CHART */}
          <div className="bg-white rounded-xl shadow p-5 h-[420px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Spending Timeline</h3>
              <button className="px-3 py-1 text-xs border border-orange-200 bg-white rounded-md flex items-center gap-2">
                <Eye size={14} /> Details
              </button>
            </div>

            {/* Chart placeholder */}
            <div className="flex justify-center items-center rounded-xl w-full">
                      
                   
                      <div className="w-full space-y-5">
                      {/* Organization Spending Trends */}
                      {/* <div className="bg-white rounded-2xl h-full p-5 w-full"> */}
                        {/* Header */}
                        <div className="flex items-center justify-between w-full mb-4">
            
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

          {/* RIGHT: PAYMENT METHODS */}
          <div className="bg-white rounded-xl shadow p-5 h-[420px]">
            <h3 className="font-semibold mb-4">Payment Methods</h3>

            <PaymentRow
              label="Personal Credit Card"
              amount="$5467.89"
              percent={61.1}
              tx="28 transactions"
            />

            <PaymentRow
              label="Corporate Card"
              amount="$2134.56"
              percent={23.9}
              tx="12 transactions"
            />
          </div>

        </section>
      </div>
  );
};

export default EmployeeReports;
