import { useState, useEffect } from "react";
import {
  User,
  Search,
  ArrowUpRightFromSquare
} from "lucide-react";

import User_Info from "./userInfo";

export default function User_management() {
  const [roleTab, setRoleTab] = useState("Employees");
  const [statusTab, setStatusTab] = useState("Active");
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState();
  const [id, setID] = useState(0);
  const [openDetails, setOpenDetails] = useState(false);

  const EMP_ROLE = "R_111111";
  const VAL_ROLE = "R_111112";

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + "user/all_employees", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => setUserData(res.data));
  }, []);

  const filtered = userData?.filter((e) => {
    if (search &&
      !e.full_name.toLowerCase().includes(search.toLowerCase()))
      return false;

    if (roleTab === "Employees" && !e.roles.includes(EMP_ROLE))
      return false;

    if (roleTab === "Validators" && !e.roles.includes(VAL_ROLE))
      return false;

    if (statusTab === "Active" && !e.status) return false;
    if (statusTab === "Inactive" && e.status) return false;

    return true;
  });

  return (
    <div className="p-6 px-10 space-y-8 bg-gray-50 min-h-screen text-sm">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          User Management
        </h1>
        <p className="text-sm text-gray-500">
          Manage employees and access roles
        </p>
      </div>

      {/* Role Tabs */}
      <div className="flex gap-6 border-b border-gray-200">
        {["Employees", "Validators"].map((tab) => (
          <button
            key={tab}
            onClick={() => setRoleTab(tab)}
            className={`pb-3 text-sm font-medium border-b-2 transition
              ${
                roleTab === tab
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">

        {/* Status Tabs */}
        <div className="flex gap-2 bg-white border border-gray-200 p-1 rounded-md">
          {["Active", "Inactive"].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusTab(tab)}
              className={`px-3 py-1.5 text-xs rounded-md transition
                ${
                  statusTab === tab
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search user..."
            className="
              pl-8 pr-3 py-2
              border border-gray-200
              rounded-md text-xs
              focus:outline-none
              focus:ring-2 focus:ring-indigo-200
              w-56
              bg-white
            "
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            {/* Header */}
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left font-medium">User</th>
                <th className="px-4 py-3 text-left font-medium">Employee ID</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">Department</th>
                <th className="px-4 py-3 text-center font-medium">Actions</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {filtered?.map((emp) => (
                <tr
                  key={emp.profile_id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 flex items-center gap-3">

                    <div className="w-9 h-9 rounded-md bg-indigo-50 flex items-center justify-center">
                      <User size={16} className="text-indigo-600" />
                    </div>

                    <div>
                      <p className="font-medium text-gray-800">
                        {emp.full_name}
                      </p>

                      <div className="flex gap-1 mt-1">
                        {emp.roles.includes(EMP_ROLE) && (
                          <span className="px-2 py-0.5 text-[10px] rounded bg-blue-100 text-blue-700">
                            Employee
                          </span>
                        )}

                        {emp.roles.includes(VAL_ROLE) && (
                          <span className="px-2 py-0.5 text-[10px] rounded bg-purple-100 text-purple-700">
                            Validator
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-gray-600 font-medium">
                    {emp.profile_id}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {emp.email}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {emp.department}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => {
                        setOpenDetails(true);
                        setID(emp.profile_id);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-50 rounded-md"
                    >
                      View
                      <ArrowUpRightFromSquare size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-200 text-xs text-gray-500 flex justify-between">
          <span>{filtered?.length} users</span>
          <span>{statusTab} users list</span>
        </div>
      </div>

      {/* Details Modal */}
      {openDetails && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <User_Info
            id={id}
            onBack={() => setOpenDetails(false)}
          />
        </div>
      )}
    </div>
  );
}
