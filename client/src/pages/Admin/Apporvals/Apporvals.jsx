import {
  ActivityIcon,
  Download,
  Eye,
  IndianRupee,
  RefreshCw,
  Search,
  Target,
  Timer,
  Zap,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { CardComp } from "../../Employee/EmployeeDashboard";
import { formatDateTime } from "../../../utils/dateFormater";
import ExpenseAproval from "./ExpenseAproval";

const Apporvals = () => {
  const [Mypending, setMypending] = useState([]);
  const [openBox, setOpenBox] = useState(false);
  const [id, setId] = useState();

  const pending_approvals = () => {
    fetch(import.meta.env.VITE_BACKEND_URL + "expenses/admin_expense", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => setMypending(res.data));
  };

  useEffect(() => {
    pending_approvals();
  }, []);

  function openAproval(exp_id) {
    setId(exp_id);
    setOpenBox(true);
  }

  return (
    <div className="p-6 px-10 space-y-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <section className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Approval Center
          </h1>
          <p className="text-sm text-gray-500">
            Review employee expenses before finance approval
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Auto approval</span>

          <button className="px-3 py-2 text-xs border border-gray-200 bg-white rounded-md flex items-center gap-2 hover:bg-gray-100">
            <Download size={14} />
            Export Queue
          </button>
        </div>
      </section>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardComp Icons={Timer} title="Pending Review" count={4} inc="$7472 total value" />
        <CardComp Icons={ActivityIcon} title="Processing Time" count={2.4} inc="15% faster" />
        <CardComp Icons={Target} title="Compliance Rate" count="94.2%" inc="2 SLA breaches" />
        <CardComp Icons={Zap} title="Auto-approved Today" count={15} inc="Low risk expenses" />
      </div>

      {/* Filters */}
      <div className="w-full bg-white border border-gray-200 rounded-md p-4 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Search */}
        <div className="relative w-full md:w-1/2">
          <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            placeholder="Search expenses or employees..."
            className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button className="px-3 py-1.5 text-xs border border-gray-200 rounded-md hover:bg-gray-100">
            All 6
          </button>
          <button className="px-3 py-1.5 text-xs border border-gray-200 rounded-md hover:bg-gray-100">
            Pending 4
          </button>
          <button className="px-3 py-1.5 text-xs border border-gray-200 rounded-md hover:bg-gray-100">
            Flagged 1
          </button>
          <button className="px-3 py-1.5 text-xs border border-gray-200 rounded-md hover:bg-gray-100">
            Escalated 1
          </button>
          <button className="px-3 py-1.5 text-xs border border-gray-200 rounded-md hover:bg-gray-100">
            Sort By
          </button>
        </div>
      </div>

      {/* Table Section */}
      <section className="bg-white border border-gray-200 rounded-md shadow-sm">

        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h3 className="font-medium text-gray-700">Pending Requests</h3>

          <div className="flex gap-2">
            <button className="px-3 py-2 text-xs border border-gray-200 rounded-md flex items-center gap-2 hover:bg-gray-100">
              <Download size={14} />
              Export
            </button>

            <button
              onClick={pending_approvals}
              className="px-3 py-2 text-xs border border-gray-200 rounded-md flex items-center gap-2 hover:bg-gray-100"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
          </div>
        </div>

        <div className="overflow-auto">
          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left font-medium">ID</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Employee</th>
                <th className="px-4 py-3 text-left font-medium">Details</th>
                <th className="px-4 py-3 text-left font-medium">Amount</th>
                <th className="px-4 py-3 text-left font-medium">Submitted</th>
                <th className="px-4 py-3 text-left font-medium">Priority</th>
                <th className="px-4 py-3 text-left font-medium">Compliance</th>
                <th className="px-4 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {Mypending?.map((e, idx) => (
                <tr
                  key={idx}
                  className={`border-t border-gray-100 hover:bg-gray-50 ${
                    idx % 2 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-3 text-xs font-medium text-gray-600">
                    {e?.expense?.exp_id}
                  </td>

                  <td className="px-4 py-3 text-xs">{e?.cat_name}</td>

                  <td className="px-4 py-3 text-xs">
                    <div>
                      <div className="font-medium">{e?.name}</div>
                      <div className="text-gray-500">
                        {e?.employee?.department}
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-xs text-gray-600">
                    {e.expense.business_purpose}
                  </td>

                  <td className="px-4 py-3 flex items-center text-sm font-semibold">
                    <IndianRupee size={14} />
                    {e.expense.amount}
                  </td>

                  <td className="px-4 py-3 text-xs text-gray-600">
                    {formatDateTime(e.expense.created_at)}
                  </td>

                  <td className="px-4 py-3 text-xs">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium
                        ${
                          e.expense.priority === "High"
                            ? "bg-red-100 text-red-700"
                            : e.expense.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                    >
                      {e.expense.priority}
                    </span>
                  </td>

                  <td className="px-1 py-3">
                    <span
                      className={`px-3 py-1 rounded text-[10px] font-medium
                        ${
                          e.expense.compliance.toLowerCase() === "compliant"
                            ? "bg-green-100 text-green-700"
                            : e.expense.compliance.toLowerCase() === "not compliant"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {e.expense.compliance}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => openAproval(e.expense.exp_id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-50 rounded-md"
                    >
                      <Eye size={14} />
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </section>

      {/* Modal */}
      {openBox && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <ExpenseAproval
            exp_id={id}
            onClose={() => setOpenBox(false)}
          />
        </div>
      )}

    </div>
  );
};

export default Apporvals;
