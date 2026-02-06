import { Trash2, Plus } from "lucide-react";

const ASSIGNMENT_OPTIONS = [
  "By Role (Manager, Finance Head)",
  "By Hierarchy (Direct Manager)",
  "By Department (Dept Head)",
];

export default function ApprovalChain({ data, setData }) {
  const stages = data.approvalStages || [];

  const addStage = () => {
    const newStage = {
      id: Date.now(),
      name: `Stage ${stages.length + 1}`,
      assignment: ASSIGNMENT_OPTIONS[0],
      sla: 2,
      required: true,
    };

    setData({
      ...data,
      approvalStages: [...stages, newStage],
    });
  };

  const updateStage = (id, key, value) => {
    setData({
      ...data,
      approvalStages: stages.map((s) =>
        s.id === id ? { ...s, [key]: value } : s
      ),
    });
  };

  const deleteStage = (id) => {
    setData({
      ...data,
      approvalStages: stages.filter((s) => s.id !== id),
    });
  };

  return (
    <div className="space-y-5">
      <h3 className="text-sm font-semibold text-gray-900">
        Approval Chain Designer
      </h3>

      {stages.map((stage, index) => (
        <div
          key={stage.id}
          className="border rounded-lg p-4 bg-white space-y-4"
        >
        
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 text-xs flex items-center justify-center rounded-full bg-blue-600 text-white">
                {index + 1}
              </div>
              <span className="text-xs font-medium text-gray-800">
                {stage.name}
              </span>
              {stage.required && (
                <span className="text-[11px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                  Required
                </span>
              )}
            </div>

            <Trash2
              size={14}
              className="text-red-500 cursor-pointer"
              onClick={() => deleteStage(stage.id)}
            />
          </div>

        
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-600 block mb-1">
                Approver Assignment
              </label>
              <select
                className="w-full border rounded-md px-3 py-2 text-xs"
                value={stage.assignment}
                onChange={(e) =>
                  updateStage(stage.id, "assignment", e.target.value)
                }
              >
                {ASSIGNMENT_OPTIONS.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-600 block mb-1">
                SLA (Days)
              </label>
              <input
                type="number"
                min={1}
                className="w-full border rounded-md px-3 py-2 text-xs"
                value={stage.sla}
                onChange={(e) =>
                  updateStage(stage.id, "sla", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      ))}


      <button
        onClick={addStage}
        className="w-full border-dashed border-2 border-gray-300 rounded-lg py-2 text-xs flex items-center justify-center gap-2 text-gray-600 hover:border-blue-500 hover:text-blue-600"
      >
        <Plus size={14} /> Add Approval Stage
      </button>

      {stages.length > 0 && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <h4 className="text-xs font-semibold text-gray-800 mb-2">
            Stage Summary
          </h4>

          <div className="space-y-1 text-xs text-gray-600">
            {stages.map((s, i) => (
              <div key={s.id} className="flex justify-between">
                <span>
                  Stage {i + 1}: {s.name}
                </span>
                <span>
                  {s.assignment} • {s.sla} days
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
