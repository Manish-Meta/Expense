import { useEffect, useState } from "react";
import { getAllCategories } from "../../../api/categoryApi";
import FormPreview from "./FormPreview";

export default function CategoryGrid({ onBack }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories
  useEffect(() => {
    getAllCategories()
      .then((res) => setCategories(res.data || []))
      .finally(() => setLoading(false));
  }, []);

 
  if (selectedCategory) {
    return (
      <FormPreview
        formId="F_00001"          
        category={selectedCategory}
        onBack={() => setSelectedCategory(null)}
      />
    );
  }

  if (loading) {
    return <p className="text-sm text-gray-500">Loading categories...</p>;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="text-sm text-red-500 hover:underline"
        >
          Back
        </button>
        <h2 className="text-lg font-semibold">Expense Categories</h2>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setSelectedCategory(cat)}
            className="bg-white cursor-pointer rounded-xl border border-orange-200 p-5 hover:shadow transition"
          >
            <div className="flex items-center gap-3">
              {/* Icon */}
              <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold">
                {cat.cat_name.charAt(0).toUpperCase()}
              </div>

              {/* Text */}
              <div>
                <p className="font-medium text-sm">{cat.cat_name}</p>
                <p className="text-xs text-gray-500">
                  Limit: ₹ {cat.limit}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
