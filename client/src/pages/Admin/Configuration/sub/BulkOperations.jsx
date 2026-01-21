import { useState } from "react";
import {
  Upload,
  Download,
  Users,
  UserPlus,
  X,
  Plus,
} from "lucide-react";

export default function BulkOperations() {
  const [openDialog, setOpenDialog] = useState(false);
  const [userType, setUserType] = useState("employee");

  const [sendWelcome, setSendWelcome] = useState(true);
  const [enableNotif, setEnableNotif] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    emp_id: "",
    dept_id: "",
    reporting_manager: "",
    expense_limit: "",
    validator_scope: "",
    approve_limit: "",
    priority_level: "",
  });

  const categories = [
    "Travel",
    "Meals",
    "Accommodation",
    "Office Supplies",
    "Training",
    "Medical",
    "All categories",
  ];

  const toggleCategory = (cat) => {
    const realCats = categories.filter((c) => c !== "All categories");

    if (cat === "All categories") {
      setSelectedCategories((prev) =>
        prev.length === realCats.length ? [] : realCats
      );
      return;
    }

    setSelectedCategories((prev) => {
      const updated = prev.includes(cat)
        ? prev.filter((c) => c !== cat)
        : [...prev, cat];

      return updated.length === realCats.length ? realCats : updated;
    });
  };

  const handleSubmit = async () => {
  const payload =
    userType === "employee"
      ? {
          emp_status: "employee",
          full_name: form.full_name,
          email: form.email,
          emp_id: form.emp_id,
          dept_id: form.dept_id,
          reporting_manager: form.reporting_manager,
          expense_limit: Number(form.expense_limit),
          allow_cat: selectedCategories,
          welcome_email: sendWelcome,
        }
      : {
          emp_status: "validator",
          emp_id: form.emp_id,
          dept_id: form.dept_id,
          validator_scope: form.validator_scope,
          approve_limit: Number(form.approve_limit),
          priority_level: form.priority_level,
          notify: enableNotif,
        };

  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}user/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.msg || "Signup failed");
      return;
    }

    alert("User created successfully");
    setOpenDialog(false);
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
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

        <div className="pt-4 border-t">
          <button
            onClick={() => setOpenDialog(true)}
            className="w-full flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-xl text-xs"
          >
            <UserPlus size={14} />
            Onboard User
          </button>
        </div>
      </div>

      {openDialog && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-[760px] rounded-2xl p-6 relative">
            <button
              onClick={() => setOpenDialog(false)}
              className="absolute top-4 right-4 text-gray-400"
            >
              <X size={18} />
            </button>

            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Onboard User</h3>

              <div className="flex items-center gap-2 text-xs">
                <span>Employee</span>
                <button
                  onClick={() =>
                    setUserType(
                      userType === "employee" ? "validator" : "employee"
                    )
                  }
                  className={`w-10 h-5 rounded-full p-[2px] transition ${
                    userType === "validator"
                      ? "bg-green-500"
                      : "bg-orange-500"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition ${
                      userType === "validator" ? "translate-x-5" : ""
                    }`}
                  />
                </button>
                <span>Validator</span>
              </div>
            </div>

            <p className="text-xs text-orange-600 mb-6">
              {userType === "employee"
                ? "Create a new employee account with expense submission access."
                : "Create a new validator account with approval permissions."}
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs">
              {userType === "employee" && (
                <Field
                  label="Full Name *"
                  onChange={(e) =>
                    setForm({ ...form, full_name: e.target.value })
                  }
                />
              )}

              {userType === "employee" ? (
                <Select
                  label="Reporting Manager"
                  onChange={(e) =>
                    setForm({ ...form, reporting_manager: e.target.value })
                  }
                />
              ) : (
                <Field
                  label="Employee ID *"
                  onChange={(e) =>
                    setForm({ ...form, emp_id: e.target.value })
                  }
                />
              )}

              {userType === "employee" && (
                <Field
                  label="Email Address *"
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              )}

              <Field
                label={
                  userType === "employee"
                    ? "Monthly Expense Limit"
                    : "Approval Limit"
                }
                prefix="$"
                onChange={(e) =>
                  userType === "employee"
                    ? setForm({ ...form, expense_limit: e.target.value })
                    : setForm({ ...form, approve_limit: e.target.value })
                }
              />

              {userType==="validator" && (<Select
                label="Validation Scope"
                onChange={(e) =>
                  setForm({ ...form, validator_scope: e.target.value })
                }
              />)}

              {userType === "validator" && (
                <Select
                  label="Priority Level"
                  onChange={(e) =>
                    setForm({ ...form, priority_level: e.target.value })
                  }
                />
              )}

              {userType === "employee" && (
                <Select
                  label="Department *"
                  onChange={(e) =>
                    setForm({ ...form, dept_id: e.target.value })
                  }
                />
              )}

              {userType === "employee" && (
                <div>
                  <label className="font-medium block mb-1">
                    Allowed Categories
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => {
                      const isActive =
                        cat === "All categories"
                          ? selectedCategories.length ===
                            categories.length - 1
                          : selectedCategories.includes(cat);

                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => toggleCategory(cat)}
                          className={`px-3 py-1 rounded-full text-[11px] border ${
                            isActive
                              ? "bg-orange-500 text-white border-orange-500"
                              : "bg-white border-orange-200"
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 space-y-2 text-xs">
              {userType === "employee" && (
                <Toggle
                  label="Send welcome email"
                  value={sendWelcome}
                  setValue={setSendWelcome}
                />
              )}

              {userType === "validator" && (
                <Toggle
                  label="Enable notifications"
                  value={enableNotif}
                  setValue={setEnableNotif}
                />
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpenDialog(false)}
                className="px-4 py-2 rounded-xl border text-xs"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className={`px-5 py-2 rounded-xl text-xs text-white flex items-center gap-1 ${
                  userType === "employee"
                    ? "bg-blue-600"
                    : "bg-green-600"
                }`}
              >
                <Plus size={14} />
                {userType === "employee"
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
      className={`w-10 h-5 rounded-full p-[2px] transition cursor-pointer ${
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
