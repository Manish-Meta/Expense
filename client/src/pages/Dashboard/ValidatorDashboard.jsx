import { Search, FileText, DollarSign, Clock, ShieldCheck } from "lucide-react"

import { StatCard } from "../../components/StatCard"
import Row from "../../components/Row"
import { useState } from "react"


export default function ValidatorDashboard() {
  const [search, setSearch] = useState("")
 
  const requests = [
    {
      id: "VOU-2024-001",
      type: "Voucher",
      employee: "Sarah Johnson",
      dept: "Marketing",
      details: "Client Meeting Trip - New York",
      amount: "$1,247.25",
      date: "Jan 15, 2024",
      priority: "Medium",
      compliance: "1 flag",
    },
    {
      id: "VOU-2024-002",
      type: "Voucher",
      employee: "Michael Chen",
      dept: "Engineering",
      details: "Tech Conference - Las Vegas",
      amount: "$2,150.75",
      date: "Jan 14, 2024",
      priority: "High",
      compliance: "Clean",
    },
    {
      id: "EXP-2024-003",
      type: "Expense",
      employee: "Raj Patel",
      dept: "Sales",
      details: "Client Visit - Mumbai",
      amount: "$15,420",
      date: "Jan 15, 2024",
      priority: "High",
      compliance: "Clean",
    },
  ]
 
  const filteredRequests = requests.filter((req) =>
    `${req.id} ${req.type} ${req.employee} ${req.dept} ${req.details} ${req.amount}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )
 
  return (
    <div className="flex-1 bg-[#fff7ed] min-h-screen">
      <div className="flex items-center justify-between px-9 py-5 border-b border-[#f3d7b6] bg-[#fff7ed]">
        <div className="relative w-[420px]">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search expenses, receipts, or ask AI..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#f3d7b6] bg-white text-sm focus:outline-none"
          />
        </div>
      </div>
 
      <main className="p-9">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Validator Dashboard
        </h1>
        <p className="text-orange-600 mb-8">
          Pre-validate employee expense requests before finance review
        </p>
 
        <div className="grid grid-cols-4 gap-8 mb-10">
          <StatCard
            icon={<FileText />}
            title="Total Pending Items"
            value="8"
            sub="3 vouchers, 5 expenses"
            footer="+3 from yesterday"
            color="orange"
          />
 
          <StatCard
            icon={<DollarSign />}
            title="Total Expenses"
            value="25"
            sub="Across all items"
            footer="+12 from yesterday"
            color="purple"
          />
 
          <StatCard
            icon={<Clock />}
            title="Average Review Time"
            value="2.8 hrs"
            sub="Target: < 4 hrs"
            footer="-0.6 hrs from last week"
            color="green"
          />
 
          <StatCard
            icon={<ShieldCheck />}
            title="Policy Compliance"
            value="50%"
            sub="Overall compliance rate"
            footer="+2.1% from last month"
            color="teal"
          />
        </div>
 
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Pending Requests
        </h2>
 
        <div className="bg-white rounded-xl border border-[#f3d7b6] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#fff7ed] text-gray-700">
              <tr>
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Type</th>
                <th className="px-6 py-4 text-left">Employee</th>
                <th className="px-6 py-4 text-left">Details</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Priority</th>
                <th className="px-6 py-4 text-left">Compliance</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>
 
            <tbody className="divide-y">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((req) => (
                  <Row
                    key={req.id}
                    {...req}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center py-8 text-gray-500"
                  >
                    No matching records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}