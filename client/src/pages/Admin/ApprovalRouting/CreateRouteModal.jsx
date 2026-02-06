import { X, Check } from "lucide-react";
import { useState } from "react";
import RouteBasics from "./steps/RouteBasics";
import ApprovalChain from "./steps/ApprovalChain";
import Review from "./steps/Review";


const steps = [
  { id: 1, label: "Routing Basics" },
  { id: 2, label: "Approval Chain" },
  { id: 3, label: "Review" },
];

export default function CreateRouteModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
  routeName: "",
  description: "",
  routeType: "department",
  department: "",
  amount: "",
  approvalStages: [
    {
      id: Date.now(),
      name: "Manager Approval",
      assignment: "By Hierarchy (Direct Manager)",
      sla: 2,
      required: true,
    },
  ],
});

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
    
      <div className="bg-white w-[900px] max-h-[90vh] rounded-xl shadow-lg flex flex-col">
        
      
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
          <h2 className="text-sm font-semibold">Create Approval Route</h2>
          <X
            size={18}
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={onClose}
          />
        </div>

      
        <div className="px-6 pt-4 shrink-0">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <div key={s.id} className="flex-1 flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold
                      ${
                        step > s.id
                          ? "bg-green-500 text-white"
                          : step === s.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                  >
                    {step > s.id ? <Check size={14} /> : s.id}
                  </div>
                  <span
                    className={`text-xs ${
                      step === s.id
                        ? "text-gray-900 font-medium"
                        : "text-gray-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>

                {index !== steps.length - 1 && (
                  <div className="flex-1 h-px bg-gray-200 mx-3" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 overflow-y-auto flex-1 text-xs">
          {step === 1 && (
            <RouteBasics data={formData} setData={setFormData} />
          )}
          {step === 2 && (
  <ApprovalChain data={formData} setData={setFormData} />
)}

          {step === 3 && <Review data={formData} />}

        </div>

       
        <div className="flex items-center justify-between px-6 py-4 border-t bg-white shrink-0">
          <button
            disabled={step === 1}
            onClick={() => setStep((s) => s - 1)}
            className="text-xs px-3 py-1.5 rounded-md border text-gray-600 disabled:opacity-40"
          >
            Back
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="text-xs px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
            >
              Next
            </button>
          ) : (
            <button
              className="text-xs px-4 py-1.5 rounded-md bg-green-600 hover:bg-green-700 text-white"
            >
              Create Route
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
