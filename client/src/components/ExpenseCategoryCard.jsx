import { FileWarning, Info } from "lucide-react";

export default function ExpenseCategoryCard({Icon, description ,limit,category,category_id,onSelect }) {
 
  return (
    <div
      onClick={() => onSelect({Icon, description ,limit,category,category_id, onSelect})}
      className="6
        group cursor-pointer rounded-2xl bg-white
        border border-orange-100
        p-6  transition-all duration-300
        hover:border-borderLine/30 hover:shadow-sm justify-between flex flex-col
      "
    >
  
      <div className="flex gap-3">
        <div className="  flex items-center justify-center">
        <Icon className="text-orange-500 " size={20} />
      </div>

 <div className="">
  
      <h3 className="text-sm font-semibold text-gray-800 group-hover:text-orange-600">
        {category}
      </h3>

  
      <p className="text-xs opacity-90 mt-1">
        {description}
      </p>

 </div>
      </div>
 
    
        <span className="inline-flex  w-fit items-center mt-4 text-[10px] font-medium border-red-100 bg-red-50 border px-2 text-red-500 py-1 rounded-md">
          <Info className="size-3 mr-1"/> limit :  ₹{limit}
        </span>

    </div>
  )
}
