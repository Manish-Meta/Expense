import { useState } from "react";
import {
  Upload,
  Download,
  Users,
  UserPlus,
  UserCheck,
  X,
  Plus,
} from "lucide-react";

export default function BulkOperations() {
  const [openDialog, setOpenDialog] = useState(null);

  const [sendWelcome, setSendWelcome] = useState(true);
  const [enableNotif, setEnableNotif] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    employeeId: "",
    department: "",
    reportingManager: "",
    monthlyLimit: "",
    validationScope: "",
    approvalLimit: "",
    priorityLevel: "",
  });

  const categories = [
    "Travel",
    "Meals",
    "Accommodation",
    "Office Supplies",
    "Training",
    "Medical",
  ];

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat)
        ? prev.filter((c) => c !== cat)
        : [...prev, cat]
    );
  };

 

  const handleSubmit = () => {
    let payload;

    if (openDialog === "employee") {
      payload = {
        emp_status: "employee",
        full_name: form.fullName,
        email: form.email,
        employeeId: form.employeeId,
        dept_id: form.department,
        reporting_manager: form.reportingManager,
        expense_limit: Number(form.expense_limit),
        allowed_cat: selectedCategories,
        welcome_email: sendWelcome,
      };
    }

    if (openDialog === "validator") {
      payload = {
        emp_status: "validator",
        full_name: form.fullName,
        email: form.email,
        emp_id: form.employeeId,
        dept_id: form.department,
        validator_scope: form.validationScope,
        approve_limit: Number(form.approve_limit),
        priority_level: form.priority_level,
        welcome_email: sendWelcome,
        notify: enableNotif,
      };
    }

    console.log("SUBMIT PAYLOAD");
    console.log(JSON.stringify(payload, null, 2));
  };

  return (
    <>
      
      <div className="bg-white rounded-2xl p-6 shadow space-y-6">
        <h3 className="text-xs font-semibold">Bulk Operations</h3>

        <div className="space-y-2">
          <ActionBtn icon={<Upload size={14} />} label="Import Users (CSV)" />
          <ActionBtn icon={<Download size={14} />} label="Export User List" />
          <ActionBtn icon={<Users size={14} />} label="Bulk Role Assignment" />
        </div>

        <div className="pt-4 border-t space-y-2">
          <p className="text-xs font-semibold">User Onboarding</p>

          <button
            onClick={() => setOpenDialog("employee")}
            className="cursor-pointer w-full flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-xl text-xs"
          >
            <UserPlus size={14} />
            Onboard New Employee
          </button>

          <button
            onClick={() => setOpenDialog("validator")}
            className="cursor-pointer w-full flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 px-3 py-2 rounded-xl text-xs"
          >
            <UserCheck size={14} />
            Onboard New Validator
          </button>
        </div>
      </div>

      {openDialog && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-[760px] rounded-2xl p-6 relative">
            <button
              onClick={() => setOpenDialog(null)}
              className="absolute top-4 right-4 text-gray-400"
            >
              <X size={18} />
            </button>

          
            <div className="flex items-center gap-2 mb-1">
              {openDialog === "employee" ? (
                <UserPlus className="text-blue-600" size={18} />
              ) : (
                <UserCheck className="text-green-600" size={18} />
              )}
              <h3 className="font-semibold">
                {openDialog === "employee"
                  ? "Onboard New Employee"
                  : "Onboard New Validator"}
              </h3>
            </div>

            <p className="text-xs text-orange-600 mb-6">
              {openDialog === "employee"
                ? "Create a new employee account with expense submission access and permissions."
                : "Create a new validator account with expense approval and validation permissions."}
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <Field
                label="Full Name *"
                onChange={(e) =>
                  setForm({ ...form, full_name: e.target.value })
                }
              />

              {openDialog === "employee" ? (
                <Select
                  label="Reporting Manager"
                  onChange={(e) =>
                    setForm({ ...form, reporting_manager: e.target.value })
                  }
                />
              ) : (
                <Select
                  label="Validation Scope"
                  onChange={(e) =>
                    setForm({ ...form, validator_scope: e.target.value })
                  }
                />
              )}

              <Field
                label="Email Address *"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <Field
                label={
                  openDialog === "employee"
                    ? "Monthly Expense Limit"
                    : "Approval Limit"
                }
                prefix="$"
                onChange={(e) =>
                  openDialog === "employee"
                    ? setForm({ ...form, expense_limit: e.target.value })
                    : setForm({ ...form, approve_limit: e.target.value })
                }
              />

              <Field
                label="Employee ID *"
                onChange={(e) =>
                  setForm({ ...form, emp_id: e.target.value })
                }
              />

              {openDialog === "validator" && (
                <Select
                  label="Priority Level"
                  onChange={(e) =>
                    setForm({ ...form, priority_level: e.target.value })
                  }
                />
              )}

              <Select
                label="Department *"
                onChange={(e) =>
                  setForm({ ...form, dept_id: e.target.value })
                }
              />

              {openDialog === "employee" && (
                <div>
                  <label className="font-medium block mb-1">
                    Allowed Categories
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => toggleCategory(cat)}
                        className={`px-3 py-1 rounded-full text-[11px] border
                          ${
                            selectedCategories.includes(cat)
                              ? "bg-orange-500 text-white border-orange-500"
                              : "bg-white border-orange-200"
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

  
            <div className="mt-5 space-y-2 text-xs">
              <Toggle
                label="Send welcome email"
                value={sendWelcome}
                setValue={setSendWelcome}
              />
              {openDialog === "validator" && (
                <Toggle
                  label="Enable notifications"
                  value={enableNotif}
                  setValue={setEnableNotif}
                />
              )}
            </div>

         
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpenDialog(null)}
                className="px-4 py-2 rounded-xl border text-xs"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className={`cursor-pointer px-5 py-2 rounded-xl text-xs text-white flex items-center gap-1
                  ${
                    openDialog === "employee"
                      ? "bg-blue-600"
                      : "bg-green-600"
                  }`}
              >
                <Plus size={14} />
                {openDialog === "employee"
                  ? "Create Employee Account"
                  : "Create Validator Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


const ActionBtn = ({ icon, label }) => (
  <button className="w-full flex items-center gap-2 border rounded-xl px-3 py-2 text-xs hover:bg-blue-50">
    {icon}
    {label}
  </button>
);

const Field = ({ label, prefix, onChange }) => (
  <div>
    <label className="font-medium block mb-1">{label}</label>
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          {prefix}
        </span>
      )}
      <input
        onChange={onChange}
        className={`w-full rounded-xl bg-orange-50 px-3 py-2 border border-orange-100 ${
          prefix ? "pl-7" : ""
        }`}
      />
    </div>
  </div>
);

const Select = ({ label, onChange }) => (
  <div>
    <label className="font-medium block mb-1">{label}</label>
    <select
      onChange={onChange}
      className="w-full rounded-xl bg-orange-50 px-3 py-2 border border-orange-100"
    >
      <option value="">Select</option>
      <option>Finance</option>
      <option>HR</option>
      <option>Engineering</option>
      <option>Operations</option>
    </select>
  </div>
);

const Toggle = ({ label, value, setValue }) => (
  <div className="flex items-center gap-3">
    <button
      onClick={() => setValue(!value)}
      className={`w-10 h-5 rounded-full p-[2px] transition ${
        value ? "bg-orange-500" : "bg-orange-200"
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full transition ${
          value ? "translate-x-5" : ""
        }`}
      />
    </button>
    <span>{label}</span>
  </div>
);
