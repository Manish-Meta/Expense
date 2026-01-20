// components/DepartmentCard.jsx
import React from "react";

const DepartmentCard = ({
  name,
  employees,
  spent,
  budget,
  usagePercent,
  compliance,
  violations,
  highlight = false,
}) => {
  return (
    <div
      className={`rounded-xl  p-6 bg-white border  border-[#f3d7b6]
      `}
    >
      <div className="flex justify-between items-start">
        {/* Left */}
        <div>
          <h3 className="text-md font-semibold text-gray-900">
            {name}
          </h3>
          <p className="text-xs text-orange-600 mt-1">
            {employees} employees
          </p>
        </div>

        {/* Right */}
        <div className="text-right">
          <p className="text-md font-semibold text-gray-900">
            ${spent.toLocaleString()}
          </p>
          <p className="text-xs text-orange-600">
            of ${budget.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Budget Usage */}
      <div className="mt-2">
        <div className="flex gap-16 text-sm mb-1">
          <span className="text-gray-700 text-xs font-medium">Budget Usage</span>
          <span className="text-orange-600 text-xs font-medium">{usagePercent}%</span>
        </div>

        <div className="w-56 h-2 bg-orange-100 rounded-full">
          <div
            className="h-2 bg-orange-500 rounded-full"
            style={{ width: `${usagePercent}%` }}
          />
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-2 gap-6 mt-2">
        <div>
          <p className="text-xs font-medium text-gray-900">Compliance</p>
          <p className="text-sm font-semibold text-gray-900">
            {compliance}%
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-gray-900">Violations</p>
          <p
            className={`text-sm font-semibold ${
              violations > 0 ? "text-red-500" : "text-gray-900"
            }`}
          >
            {violations}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
