import { useEffect, useState } from "react";
import { Camera, PenLine, FileStack } from "lucide-react";
import Capture from "./Capture";
import ManualEntry from "./ManualEntry";
import CreateVoucher from "./CreateVoucher";
import useGlobalContext from "../../../config/GlobalStateContext";

const FORM_ID = "F_00001"; // Expense form id

export default function ExpenseTabs({ category, onNext, onBack }) {
  const [tab, setTab] = useState("capture");
  const [data, setData] = useState({});
  const [fields, setFields] = useState([]);
  const [loadingFields, setLoadingFields] = useState(false);

  const { valid, setValid } = useGlobalContext();

  useEffect(() => {
    if (!category?.category_id) return;

    setLoadingFields(true);
    setFields([]); // reset when category changes

    fetch(
      `${import.meta.env.VITE_BACKEND_URL}forms/${FORM_ID}/${category.category_id}/fields`,
      { credentials: "include" }
    )
      .then(res => res.json())
      .then(json => setFields(json.data || []))
      .catch(err => {
        console.error("Failed to load fields", err);
        setFields([]);
      })
      .finally(() => setLoadingFields(false));
  }, [category.category_id]);

  const handleDone = (payload, isValid) => {
    setData(payload);
    setValid(isValid);
  };

  return (
    <div className="p-3 space-y-4">
     
      <div className="flex gap-4 mb-6 items-center">
        <button
          onClick={onBack}
          className="text-xs font-medium bg-primary hover:bg-primary/50 p-1 px-2 rounded-md text-white"
        >
          / back
        </button>

        <div className="flex items-center gap-2 px-2 py-2 rounded-full text-xs">
          <category.Icon size={16} className="text-orange-600" />
          <span className="font-medium">{category.category}</span>
          {category.limit && (
            <span className="bg-white px-2 py-0.5 rounded-full text-xs">
              ₹ {category.limit}
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-orange-50 border rounded-xl p-1 mb-8">
        {[
          { id: "capture", label: "Capture", icon: Camera },
          { id: "manual", label: "Manual Entry", icon: PenLine },
          { id: "voucher", label: "Create a Voucher", icon: FileStack },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs
              ${
                tab === id
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:text-black"
              }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "capture" && (
        <Capture category={category} onDone={handleDone} />
      )}

      {tab === "manual" && (
        <ManualEntry
          category={category}
          fields={fields}
          loadingFields={loadingFields}
          onDone={handleDone}
        />
      )}

      {tab === "voucher" && (
        <CreateVoucher category={category} onDone={handleDone} />
      )}

      {/* Action */}
      <div className="mt-3">
        <button
          disabled={!valid}
          onClick={() => onNext(data)}
          className={`w-full text-sm py-3 rounded-xl font-medium
            ${
              valid
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "bg-orange-200 text-white cursor-not-allowed"
            }`}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
}
