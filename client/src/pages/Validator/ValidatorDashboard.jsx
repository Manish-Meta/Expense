import { use, useEffect, useState } from "react"
import { FileText, DollarSign, Clock, ShieldCheck, Download, Eye, IndianRupee, CircleCheck, AlertTriangle, XCircle } from "lucide-react"
import { StatCard } from "../../components/StatCard"
import Row from "../../components/Row"
import { Navigate, useNavigate, useParams } from "react-router-dom"

export default function ValidatorDashboard() {
  const navigate=useNavigate()
  const { id } = useParams()
  const [category, setCategory] = useState("All")
  const [employee, setEmployee] = useState("")
  const [sortBy, setSortBy] = useState("Date Submitted")
  const [minAmount, setMinAmount] = useState(0)
  const [maxAmount, setMaxAmount] = useState(100000)
  const [Req,setReq] = useState([])
  const [req_msg,setReqMsg] = useState("")
  const [selectedExpense,setSelectedExpense] = useState()
  const [Refresh, setRefresh] = useState(false)

  const pendingReq = ()=>{
    fetch(import.meta.env.VITE_BACKEND_URL+"expenses/show_pending",{
      method:'GET',
      credentials:'include'
    })
    .then((res) => res.json())
    .then((res)=> {
      setRefresh(true)
      setReq(res.data)
      setReqMsg(res.msg)
      setRefresh(false)
  })
    .catch(()=>{
      setRefresh(false)
      
    // setRefresh(false)
  })
  }
  useEffect (()=>{
    pendingReq();
    console.log(req_msg)
    console.log(req_msg)
  },[Refresh])

  // const requests = [
  //   {
  //     id: "VOU-2024-001",
  //     type: "Voucher",
  //     employee: "Sarah Johnson",
  //     dept: "Marketing",
  //     details: "Q1 Client Meeting Trip - New York",
  //     amount: " 1,247.25",
  //     date: "2024-01-15",
  //     priority: "Medium",
  //     compliance: "1 flag",
  //   },
  //   {
  //     id: "VOU-2024-002",
  //     type: "Voucher",
  //     employee: "Michael Chen",
  //     dept: "Engineering",
  //     details: "Tech Conference 2024 - Las Vegas",
  //     amount: " 2,150.75",
  //     date: "2024-01-14",
  //     priority: "High",
  //     compliance: "Clean",
  //   },
  //   {
  //     id: "VOU-2024-003",
  //     type: "Voucher",
  //     employee: "David Rodriguez",
  //     dept: "Sales",
  //     details: "Enterprise Client Visit - Singapore",
  //     amount: " 3,420.60",
  //     date: "2024-01-13",
  //     priority: "High",
  //     compliance: "Issues",
  //   },
  //   {
  //     id: "EXP-2024-004",
  //     type: "Expense",
  //     employee: "Emma Wilson",
  //     dept: "HR",
  //     details: "Recruitment Drive Expenses",
  //     amount: " 860.40",
  //     date: "2024-01-12",
  //     priority: "Medium",
  //     compliance: "Clean",
  //   },
  //   {
  //     id: "EXP-2024-005",
  //     type: "Expense",
  //     employee: "Raj Patel",
  //     dept: "Sales",
  //     details: "Client Visit - Mumbai",
  //     amount: " 15,420.00",
  //     date: "2024-01-11",
  //     priority: "High",
  //     compliance: "Clean",
  //   },
  //   {
  //     id: "EXP-2024-005",
  //     type: "Expense",
  //     employee: "Raj Patel",
  //     dept: "Sales",
  //     details: "Client Visit - Mumbai",
  //     amount: " 15,420.00",
  //     date: "2024-01-11",
  //     priority: "High",
  //     compliance: "Clean",
  //   },
  //   {
  //     id: "EXP-2024-005",
  //     type: "Expense",
  //     employee: "Raj Patel",
  //     dept: "Sales",
  //     details: "Client Visit - Mumbai",
  //     amount: " 15,420.00",
  //     date: "2024-01-11",
  //     priority: "High",
  //     compliance: "Clean",
  //   },
  //   {
  //     id: "EXP-2024-005",
  //     type: "Expense",
  //     employee: "Raj Patel",
  //     dept: "Sales",
  //     details: "Client Visit - Mumbai",
  //     amount: " 15,420.00",
  //     date: "2024-01-11",
  //     priority: "High",
  //     compliance: "Clean",
  //   },
  //   {
  //     id: "EXP-2024-005",
  //     type: "Expense",
  //     employee: "Raj Patel",
  //     dept: "Sales",
  //     details: "Client Visit - Mumbai",
  //     amount: " 15,420.00",
  //     date: "2024-01-11",
  //     priority: "High",
  //     compliance: "Clean",
  //   },
  //   {
  //     id: "EXP-2024-005",
  //     type: "Expense",
  //     employee: "Raj Patel",
  //     dept: "Sales",
  //     details: "Client Visit - Mumbai",
  //     amount: " 15,420.00",
  //     date: "2024-01-11",
  //     priority: "High",
  //     compliance: "Clean",
  //   },
  //   {
  //     id: "EXP-2024-005",
  //     type: "Expense",
  //     employee: "Raj Patel",
  //     dept: "Sales",
  //     details: "Client Visit - Mumbai",
  //     amount: " 15,420.00",
  //     date: "2024-01-11",
  //     priority: "High",
  //     compliance: "Clean",
  //   },
  //   {
  //     id: "EXP-2024-005",
  //     type: "Expense",
  //     employee: "Raj Patel",
  //     dept: "Sales",
  //     details: "Client Visit - Mumbai",
  //     amount: " 15,420.00",
  //     date: "2024-01-11",
  //     priority: "High",
  //     compliance: "Clean",
  //   },
  //   {
  //     id: "EXP-2024-005",
  //     type: "Expense",
  //     employee: "Raj Patel",
  //     dept: "Sales",
  //     details: "Client Visit - Mumbai",
  //     amount: " 15,420.00",
  //     date: "2024-01-11",
  //     priority: "High",
  //     compliance: "Clean",
  //   },
  //   {
  //     id: "EXP-2024-005",
  //     type: "Expense",
  //     employee: "Raj Patel",
  //     dept: "Sales",
  //     details: "Client Visit - Mumbai",
  //     amount: " 15,420.00",
  //     date: "2024-01-11",
  //     priority: "High",
  //     compliance: "Clean",
  //   },
  //   {
  //     id: "EXP-2024-005",
  //     type: "Expense",
  //     employee: "Raj Patel",
  //     dept: "Sales",
  //     details: "Client Visit - Mumbai",
  //     amount: " 15,420.00",
  //     date: "2024-01-11",
  //     priority: "High",
  //     compliance: "Clean",
  //   },
  //   {
  //     id: "EXP-2024-005",
  //     type: "Expense",
  //     employee: "Raj Patel",
  //     dept: "Sales",
  //     details: "Client Visit - Mumbai",
  //     amount: " 15,420.00",
  //     date: "2024-01-11",
  //     priority: "High",
  //     compliance: "Clean",
  //   },
  // ]
  const requests = []

  //styling

  const priorityStyles = {
  High: "bg-red-50 text-red-700 border border-red-200",
  Medium: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  Low: "bg-green-50 text-green-700 border border-green-200",
}

 const ComplianceStyles = {
 Clean: {
    className: "bg-green-50 text-green-700 border border-green-200",
    Icon: CircleCheck,
  },
  Compliant: {
    className: "bg-green-50 text-green-700 border border-green-200",
    Icon: CircleCheck,
  },
  Warning: {
    className: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    Icon: AlertTriangle,
  },
  Issue: {
    className: "bg-red-50 text-red-700 border border-red-200",
    Icon: XCircle,
  },
  
}

  console.log(Req)
  console.log(req_msg)
  
  const filteredRequests =Req&&Req
    .filter((req) => {
      if (category !== "All" && req.cat_name !== category) return false

      if (
        employee &&
        !req.employee.toLowerCase().includes(employee.toLowerCase())
      )
        return false

      const amountNumber = Number(req.amount?.replace(/[^0-9.]/, ""))
      if (amountNumber < minAmount || amountNumber > maxAmount) return false

      return true
    })
    .sort((a, b) => {
      if (sortBy === "Amount") {
        return (
          Number(b.amount.replace(/[^0-9.]/g, "")) -
          Number(a.amount.replace(/[^0-9.]/g, ""))
        )
      }
      return new Date(b.date) - new Date(a.date)
    })

  return (
  <div className="flex-1 bg-[#fefdfc] min-h-screen">
    <main className="px-6 py-5 space-y-8">

      {/* Header */}
      <section className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-gradient-to-r from-orange-50 to-white border border-orange-100 rounded-2xl px-6 py-5 shadow-sm">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Validator Dashboard
          </h1>
          <p className="text-xs text-orange-700 mt-1">
            Pre-validate employee expense requests before finance review
          </p>
        </div>

        <button className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-orange-200 bg-white hover:bg-orange-50 shadow-sm">
          <Download className="size-3" />
          This Month
        </button>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Filters */}
      <div className="bg-white border border-orange-100 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">
            Pending Requests
          </h2>
          <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
            {filteredRequests?.length} requests
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input text-xs"
          >
            <option>All</option>
            <option>Voucher</option>
            <option>Expense</option>
          </select>

          <input
            type="text"
            placeholder="Search employee..."
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            className="input text-xs"
          />

          <input
            type="date"
            className="input text-xs"
          />

          <div className="flex gap-2">
            <input
              type="number"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
              className="input text-xs"
            />
            <input
              type="number"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
              className="input text-xs"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input text-xs"
          >
            <option>Date Submitted</option>
            <option>Amount</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {filteredRequests == undefined ? (
        <div className="text-center text-sm font-medium text-gray-600 py-12">
          No Pending Expenses
        </div>
      ) : (
        <div className="bg-white border border-orange-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-orange-50">
                <tr className="text-gray-600 font-bold">
                  {[
                    "Expense ID",
                    "Category",
                    "Employee",
                    "Details",
                    "Amount",
                    "Date",
                    "Priority",
                    "Compliance",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 font-semibold text-left"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredRequests.map((e, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-gray-100 hover:bg-orange-50/40 transition"
                  >
                    <td className="px-4 py-2 text-gray-600">
                      {e.expense.exp_id}
                    </td>
                    <td className="px-4 py-2 font-medium">
                      {e.cat_name}
                    </td>
                    <td className="px-4 py-2">
                      <div>
                        <p className="font-bold">{e.emp_name}</p>
                        <p className="text-yellow-600">{e.dept_name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-gray-600 truncate max-w-[220px]">
                      {e.expense.business_purpose}
                    </td>
                    <td className="px-4 py-4 font-medium flex items-center gap-1">
                      <IndianRupee className="size-3" />
                      {e.expense.amount}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(e.expense.date).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-4 py-2">
                      <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium ${
                      priorityStyles[e.expense.priority]
                      }`}
                      >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {e.expense.priority}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                    {(() => {
                    const config =
                    ComplianceStyles[e.expense.compliance] || null

                    if (!config)
                    return (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] bg-gray-100 text-gray-600 border border-gray-200">
                    {e.expense.compliance}
                    </span>
                    )

                    const { Icon, className } = config

                    return (
                    <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium ${className}`}
                    >
                    <Icon size={14} />
                    {e.expense.compliance}
                    </span>
                    )
                    })()}
                    </td>

                    <td className="px-4 py-2">
                      <button className="flex font-semibold cursor-pointer border border-orange-300 p-2 rounded-xl items-center gap-1 hover:text-orange-500 bg-white"
                      onClick={() =>navigate(`/review/${e.expense.exp_id}`)}
                      >
                        <Eye className="size-4"/>
                        Review
                        
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  </div>
)

}
