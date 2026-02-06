export default function Review({ data }) {
  return (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold text-gray-900">
        Review Approval Route
      </h3>

   
      <div className="border rounded-lg p-4 space-y-3">
        <h4 className="text-xs font-semibold text-gray-800">
          Route Information
        </h4>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p className="text-gray-400">Route Name</p>
            <p className="text-gray-800">{data.routeName || "-"}</p>
          </div>

          <div>
            <p className="text-gray-400">Route Type</p>
            <p className="text-gray-800 capitalize">
              {data.routeType}-based
            </p>
          </div>

          <div className="col-span-2">
            <p className="text-gray-400">Description</p>
            <p className="text-gray-800">
              {data.description || "-"}
            </p>
          </div>
        </div>
      </div>

   
      <div className="border rounded-lg p-4 space-y-3">
        <h4 className="text-xs font-semibold text-gray-800">
          Applicability Configuration
        </h4>

        <div className="text-xs space-y-2">
          {data.routeType === "department" && (
            <div>
              <p className="text-gray-400">Department</p>
              <p className="text-gray-800">
                {data.department || "-"}
              </p>
            </div>
          )}

          {data.routeType === "amount" && (
            <div>
              <p className="text-gray-400">Amount Threshold</p>
              <p className="text-gray-800">
                {data.amount || "-"}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="border rounded-lg p-4 space-y-3">
        <h4 className="text-xs font-semibold text-gray-800">
          Approval Chain
        </h4>

        <div className="space-y-2">
          {data.approvalStages.map((stage, index) => (
            <div
              key={stage.id}
              className="flex justify-between items-center text-xs border-b last:border-b-0 pb-2"
            >
              <div>
                <p className="text-gray-800">
                  Stage {index + 1}: {stage.name}
                </p>
                <p className="text-gray-400">
                  {stage.assignment}
                </p>
              </div>

              <div className="text-gray-600">
                SLA: {stage.sla} days
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
