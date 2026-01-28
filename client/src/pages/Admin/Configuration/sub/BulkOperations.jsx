import { useState } from "react";
import {
  Upload,
  Download,
  Users,
  UserPlus,
  X,
  Plus,
  Mail
} from "lucide-react";

export default function BulkOperations() {
  const [dbCategories, setDbCategories] = useState([]);
  const [generatedEmpId, setGeneratedEmpId] = useState("");
  const [empSearch, setEmpSearch] = useState("");
const [empOptions, setEmpOptions] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [userType, setUserType] = useState("employee");

  const [sendWelcome, setSendWelcome] = useState(true);
  const [enableNotif, setEnableNotif] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectPayload,setSelectPayload] = useState([])

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

 
 const searchEmpIds = async (val) => {
  setEmpSearch(val);

 if (val.length < 2) {
 setEmpOptions([]);
 return;
 }

  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}user/search-emp-id?q=${val}`,
    { credentials: "include" }
  );

if (!res.ok) return;

  const data = await res.json();
  setEmpOptions(data);
};
  const toggleCategory = (catId) => {
  setSelectedCategories((prev) =>
    prev.includes(catId)
      ? prev.filter((c) => c !== catId)
      : [...prev, catId]
      
  );
  console.log(selectedCategories)
};


  const fetchEmpId = async () => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}user/generate_id`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await res.json();

    if (res.ok) {
      setGeneratedEmpId(data.emp_id);
      setForm((prev) => ({ ...prev, emp_id: data.emp_id }));
    }
  } catch (err) {
    console.error("Failed to generate emp id", err);
  }
};



  const handleImportCSV = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    await fetch(`${import.meta.env.VITE_BACKEND_URL}user/import-csv`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    alert("Users imported successfully");
  };

  const handleExportCSV = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}user/export-csv`,
      { credentials: "include" }
    );

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
  };
  function add_category(cat_id){
    if(selectPayload.includes(cat_id)){
      let value=selectPayload.filter(res=>res!=cat_id)
      setSelectPayload(value)
      console.log(selectPayload)
    }else{
      selectPayload.push(cat_id)
      console.log(selectPayload)
    }
  }
  const handleBulkRoleAssign = async () => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}user/bulk-role`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        emp_ids: ["EMP001", "EMP002"],
        role_name: "manager",
      }),
    });

    alert("Bulk role assigned");
  };
  const fetchCategories = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}category/all_category`,
    { credentials: "include" }
  );
  if (!res.ok) return;

  const data = await res.json();
  const cats = data.data || [];

  setDbCategories(cats);
  setSelectedCategories(cats.map(cat => cat.cat_id)); 
};
  const handleSendBulkInvites = async () => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}user/send-invites`, {
      method: "POST",
      credentials: "include",
    });

    alert("Invites sent");
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
            allow_cat: selectPayload,
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

      console.log(payload)

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}user/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      alert("Signup failed");
      return;
    }

    alert("User created successfully");
    setOpenDialog(false);
  };

  return (
    <>
   
      <div className="bg-white rounded-2xl p-6 shadow space-y-6">
        <h3 className="text-xs font-semibold">Bulk Operations</h3>

        <input
          type="file"
          hidden
          accept=".csv"
          id="csvUpload"
          onChange={(e) => handleImportCSV(e.target.files[0])}
        />

        <div className="space-y-2">
          <ActionBtn
            icon={<Upload size={14} />}
            label="Import Users (CSV)"
            onClick={() => document.getElementById("csvUpload").click()}
          />

          <ActionBtn
            icon={<Download size={14} />}
            label="Export User List"
            onClick={handleExportCSV}
          />

          <ActionBtn
            icon={<Users size={14} />}
            label="Bulk Role Assignment"
            onClick={handleBulkRoleAssign}
          />

          <ActionBtn
            icon={<Mail size={14} />}
            label="Send Bulk Invites"
            onClick={handleSendBulkInvites}
          />
        </div>

        <div className="pt-4 border-t">
          <button
            onClick={() => {
          setOpenDialog(true);
            if (userType === "employee") {fetchEmpId();
            fetchCategories();
            }
              }}

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
 onClick={() => {
  setUserType(userType === "employee" ? "validator" : "employee");
  setEmpSearch("");          
  setEmpOptions([]);         
  setGeneratedEmpId("");   
  setSelectedCategories([]);  
  setForm((p) => ({ ...p, emp_id: "" }));
}}
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

            {/* FORM */}
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
  <Field
    label="Employee ID (Auto-generated)"
    value={generatedEmpId}
    disabled
  />
) : (
  <div className="relative">
    <Field
      label="Employee ID *"
      value={empSearch}
      onChange={(e) => searchEmpIds(e.target.value)}
      readOnly={!!form.emp_id}
    />

    {empOptions.length > 0 && (
      <div className="absolute z-50 w-full bg-white border rounded-xl mt-1 max-h-40 overflow-auto">
        {empOptions.map((e) => (
          <div
            key={e.emp_id}
            onClick={() => {
              setEmpSearch(e.emp_id);
              setForm((p) => ({ ...p, emp_id: e.emp_id }));
              setEmpOptions([]);
            }}
            className="px-3 py-2 text-xs cursor-pointer hover:bg-orange-100"
          >
            {e.emp_id}
          </div>
        ))}
      </div>
    )}
  </div>
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

              {userType === "validator" && (
                <SelectedDept
                  label="Validation Scope"
                  onChange={(e) =>
                    setForm({ ...form, validator_scope: e.target.value })
                  }
                />
              )}

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
                  <button
  type="button"
  onClick={() =>
    setSelectedCategories(
      selectedCategories.length === dbCategories.length
        ? []
        : dbCategories.map((cat) => cat.cat_id)
    )
  }
  className={`px-3 py-1 rounded-full text-[11px] border ${
    selectedCategories.length === dbCategories.length
      ? "bg-orange-500 text-white border-orange-500 mb-2"
      : "bg-white border-orange-200 mb-1"
  }`}
>
  All Categories
</button>
                  <div className="flex flex-wrap gap-2">
              {Array.isArray(dbCategories) &&
  dbCategories.map((cat) => {
    const name = cat.cat_name;
    const id=cat.cat_id;
    const isActive = selectedCategories.includes(id);

    return (
      <button
        key={cat.id}
        type="button"
        onClick={() => add_category(cat.id)}
        className={`px-3 py-1 rounded-full text-[11px] border ${
          isActive
            ? "bg-orange-500 text-white border-orange-500"
            : "bg-white border-orange-200"
        }`}
      >
        {name}
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



const ActionBtn = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-2 border rounded-xl px-3 py-2 text-xs hover:bg-blue-50"
  >
    {icon}
    {label}
  </button>
);

const Field = ({ label, prefix, onChange, value, disabled,readOnly }) => (
  <div>
    <label className="font-medium block mb-1">{label}</label>
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          {prefix}
        </span>
      )}
      <input
        value={value}
        disabled={disabled}
        readOnly={readOnly}
        onChange={onChange}
        className={`w-full rounded-xl bg-orange-50 px-3 py-2 border border-orange-100 ${
          prefix ? "pl-7" : ""
        } ${disabled ? "cursor-not-allowed opacity-70" : ""}`}
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
const SelectedDept = ({ label, onChange }) => (
  <div>
    <label className="font-medium block mb-1">{label}</label>
    <select
      onChange={onChange}
      className="w-full rounded-xl bg-orange-50 px-3 py-2 border border-orange-100"
    >
      <option value="">Select</option>
      <option>All Departments</option>
      <option>Own Departments Only</option>
      <option>Assigned Teams</option>
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
