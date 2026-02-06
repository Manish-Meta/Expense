import { useEffect, useState } from "react";

export default function RouteBasics({ data, setData }) {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/dept/all_dept", {
          credentials: "include",
        });
        const result = await res.json();
        setDepartments(result?.data || []);
      } catch (err) {
        console.error("Failed to fetch departments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="space-y-6 text-sm">

   
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Route Information
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Route Name <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full border rounded-md px-3 py-2 text-xs"
              placeholder="e.g. HR – Mobile Recharge Approval"
              value={data.routeName}
              onChange={(e) =>
                setData({ ...data, routeName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Description
            </label>
            <textarea
              className="w-full border rounded-md px-3 py-2 text-xs"
              rows={3}
              placeholder="Describe when this routing rule applies"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-700 block mb-2">
          Route Type
        </label>

        <div className="flex gap-4">
          {[
            { id: "department", label: "Department-based" },
            { id: "amount", label: "Amount-based" },
          ].map((type) => (
            <label
              key={type.id}
              className={`border rounded-lg px-4 py-2 cursor-pointer flex items-center gap-2 text-xs
                ${
                  data.routeType === type.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200"
                }`}
            >
              <input
                type="radio"
                name="routeType"
                checked={data.routeType === type.id}
                onChange={() =>
                  setData({ ...data, routeType: type.id })
                }
                className="accent-blue-600"
              />
              {type.label}
            </label>
          ))}
        </div>
      </div>

      <div className="border rounded-lg p-4 bg-gray-50 space-y-4">
        <h4 className="text-xs font-semibold text-gray-800">
          Applicability Configuration
        </h4>

     
        {data.routeType === "department" && (
          <div>
            <label className="text-xs text-gray-600 block mb-1">
              Department
            </label>

            <select
              className="w-full border rounded-md px-3 py-2 text-xs bg-white"
              value={data.department || ""}
              onChange={(e) =>
                setData({ ...data, department: e.target.value })
              }
            >
              <option value="" disabled>
                {loading ? "Loading departments..." : "Select department"}
              </option>

              {departments.map((dept) => (
                <option
                  key={dept.deptartment_id}
                  value={dept.deptartment_id}
                >
                  {dept.name}
                </option>
              ))}
            </select>

            <p className="text-[11px] text-gray-400 mt-1">
              Department list fetched from system configuration
            </p>
          </div>
        )}

     
        {data.routeType === "amount" && (
          <div>
            <label className="text-xs text-gray-600 block mb-1">
              Amount Threshold
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full border rounded-md px-3 py-2 text-xs"
              value={data.amount || ""}
              onChange={(e) =>
                setData({ ...data, amount: e.target.value })
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
