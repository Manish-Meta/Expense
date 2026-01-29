
import { useEffect, useState } from "react";
import { Car, CarIcon, Droplet, FileText, Globe, GraduationCap, Hamburger, Home, ListCollapse, MapPin, Plane, Smartphone, Users, Users2 } from "lucide-react";
import ExpenseCategoryCard from '../../../components/ExpenseCategoryCard'
import ReflectionCard from "../../../components/loading/ReflectionCard";

const iconMap = [{
    icon: Plane,
    keywords: [
      "travel",
      "domestic travel",
      "international travel",
      "flight",
      "airfare",
      "trip",
      "journey",
      "tour",
    ],
  },
  {
    icon: Hamburger,
    keywords: [
      "food",
      "meal",
      "meals",
      "lunch",
      "dinner",
      "breakfast",
      "snacks",
      "restaurant",
    ],
  },
  {
    icon: Home,
    keywords: [
      "accommodation",
      "hotel",
      "stay",
      "lodging",
      "housing",
      "guest house",
    ],
  },
  {
    icon: CarIcon,
    keywords: [
      "conveyance",
      "transport",
      "transportation",
      "cab",
      "taxi",
      "uber",
      "car",
      "vehicle",
      "fuel",
      "commute",
    ],
  },
  {
    icon: GraduationCap,
    keywords: [
      "learning",
      "training",
      "traning", // typo-safe
      "education",
      "course",
      "certification",
      "workshop",
      "seminar",
    ],
  },
  {
    icon: Smartphone,
    keywords: [
      "internet",
      "mobile",
      "phone",
      "data",
      "wifi",
      "broadband",
      "telecom",
      "relocation",
    ],
  },
  {
    icon: Users2,
    keywords: [
      "team",
      "employees",
      "staff",
      "members",
      "workforce",
      "group",
    ],
  },
];
export default function CategorySelect({ onSelect }) {
  const [CategoryData, setCategoryData] = useState([]);
useEffect(()=>{
  
  fetch(import.meta.env.VITE_BACKEND_URL+"category/user_category",{
    credentials:'include'
  })
  .then((res)=> res.json())
  .then((res)=> setCategoryData(res.data))

},[])
  console.log(CategoryData);


// matching icons function
  const Ic = (name) => {
  const category = name.toLowerCase();

  const match = iconMap.find(({ keywords }) =>
    keywords.some((keyword) => category.includes(keyword))
  );

  return match ? match.icon:ListCollapse; // fallback icon
};


  return (
    <div>
  
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Select Expense Category
        </h1>
        <p className="max-w-3xl  mt-2">
          Please choose the category that best describes your business expense.
          Each category is configured with specific validation rules, approval
          workflows, and compliance requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CategoryData?.map((cat) => (
          <ExpenseCategoryCard
            key={cat.category_id}
Icon={Ic(cat?.category)}
description={cat.description}
limit={cat.category_limit}
category={cat.category}
onSelect={onSelect}
category_id = {cat.category_id}
          />
        ))
      
      }
      </div>

     
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-50 to-white p-5 border border-blue-100">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Category Selection Guidelines
        </h3>

        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="font-medium text-sm text-orange-600">Tailored Forms</p>
            <p className="text-gray-600  text-xs mt-1">
              Each category unlocks specific input fields optimized for that
              expense type.
            </p>
          </div>

          <div>
            <p className="font-medium text-sm text-orange-600">Policy Compliance</p>
            <p className="text-gray-600 text-xs mt-1">
              Categories may enforce amount limits, approval rules, or location
              constraints.
            </p>
          </div>

          <div>
            <p className="font-medium text-sm text-orange-600">Unified Workflow</p>
            <p className="text-gray-600 text-xs mt-1">
              All expenses follow a consistent approval and audit process.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
