import { Plus } from "lucide-react";
import { useState } from "react";
import CreateRouteModal from "./CreateRouteModal";

export default function ApprovalRouting() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center mb-6 ml-2">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 mt-4">
            Approval Routing Configuration
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Configure approval workflows and routing rules
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center cursor-pointer gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-md"
        >
          <Plus size={14} />
          Create New Route
        </button>
      </div>

      {open && <CreateRouteModal onClose={() => setOpen(false)} />}
    </>
  );
}
