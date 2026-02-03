import { FileText } from "lucide-react";
import { useState } from "react";
import CategoryGrid from "./CategoryGrid";

export default function ExpenseForms() {
  const [openCategories, setOpenCategories] = useState(false);

  if (openCategories) {
    return <CategoryGrid onBack={() => setOpenCategories(false)} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        onClick={() => setOpenCategories(true)}
        className="cursor-pointer bg-white rounded-2xl shadow border p-6 hover:shadow-lg transition"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center">
            <FileText size={18} />
          </div>
          <div>
            <h3 className="font-semibold text-sm">EXPENSE FORM</h3>
            <p className="text-xs text-gray-500">
              Customize expense forms for each category
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
