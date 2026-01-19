
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
            <div className="h-full flex items-center justify-center text-gray-400">
              Chart goes here
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
