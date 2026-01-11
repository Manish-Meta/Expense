export default function ExpenseCategoryCard({ category, onSelect }) {
  const Icon = category.icon

  return (
    <div
      onClick={() => onSelect(category)}
      className="
        group cursor-pointer rounded-2xl bg-white
        border border-orange-100
        p-6 transition-all duration-300
        hover:border-orange-400 hover:shadow-lg
      "
    >
  
      <div className="w-12 h-12 mb-4 rounded-xl bg-orange-50 flex items-center justify-center">
        <Icon className="text-orange-500" size={22} />
      </div>

 
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600">
        {category.title}
      </h3>

  
      <p className="text-sm text-orange-600 mt-1">
        {category.description}
      </p>

 
      {category.limitText && (
        <span className="inline-block mt-4 text-xs font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          {category.limitText}
        </span>
      )}
    </div>
  )
}
