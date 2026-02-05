import { useEffect, useState } from "react";
import { ArrowLeft, Mail, User } from "lucide-react";
import { formatDateTime } from "../../../utils/dateFormater";

export default function User_Info({ id, onBack }) {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("Details");

  useEffect(() => {
    if (!id) return;

    fetch(
      `${import.meta.env.VITE_BACKEND_URL}user/employee_info/${id}`,
      { credentials: "include" }
    )
      .then((res) => res.json())
      .then((res) => setUser(res.data));
  }, [id]);

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="relative w-[900px] h-[560px] bg-gray-50 rounded-md flex flex-col p-6 overflow-hidden shadow-lg">

      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200">

        {/* User Info */}
        <div className="px-6 py-4 flex items-center gap-4">

          <button
            onClick={onBack}
            className="text-gray-500 hover:text-indigo-600"
          >
            <ArrowLeft size={22} />
          </button>

          <div className="w-12 h-12 rounded-md bg-indigo-50 flex items-center justify-center">
            <User size={22} className="text-indigo-600" />
          </div>

          <div className="flex-1">
            <h2 className="text-base font-semibold text-gray-800">
              {user.name}
            </h2>

            <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-600">

              <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 font-medium">
                Employee
              </span>

              <span className="px-2 py-0.5 rounded bg-gray-100 font-medium text-gray-700">
                {user.code}
              </span>

              <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                <Mail size={12} />
                {user.email}
              </span>

            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6">
          <div className="flex gap-6 border-b border-gray-200">

            {["Details", "Documents", "Expenses"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-3 text-sm font-medium border-b-2 transition
                  ${
                    tab === t
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-800"
                  }`}
              >
                {t}
              </button>
            ))}

          </div>
        </div>

      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">

        {tab === "Details" && (
          <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">

            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Basic Details
            </h3>

            <div className="grid grid-cols-2 gap-6 text-sm">

              <div>
                <p className="font-medium text-gray-700">Department</p>
                <p className="text-gray-500 mt-1">
                  {user.department || "-"}
                </p>
              </div>

              <div>
                <p className="font-medium text-gray-700">
                  Reporting Manager
                </p>
                <p className="text-gray-500 mt-1">
                  {user.reporting_manager || "-"}
                </p>
              </div>

              <div>
                <p className="font-medium text-gray-700">Created At</p>
                <p className="text-gray-500 mt-1">
                  {formatDateTime(Date(user.created_at))}
                </p>
              </div>

              <div>
                <p className="font-medium text-gray-700">Updated At</p>
                <p className="text-gray-500 mt-1">
                  {formatDateTime(Date(user.updated_at))}
                </p>
              </div>

              <div className="col-span-2">
                <p className="font-medium text-gray-700 mb-2">
                  Allowed Categories
                </p>

                <div className="flex flex-wrap gap-2">
                  {user.allowed_categories?.length ? (
                    user.allowed_categories.map((c, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded bg-indigo-50 text-indigo-700 text-xs font-medium"
                      >
                        {c}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">None</span>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {tab === "Documents" && (
          <div className="text-gray-500 text-sm">
            No documents yet.
          </div>
        )}

        {tab === "Expenses" && (
          <div className="text-gray-500 text-sm">
            No expenses loaded.
          </div>
        )}
      </div>
    </div>
  );
}
