import { useEffect, useState } from "react"

export default function ExpenseCategories({ onSelect }) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}category`)
      .then(res => res.json())
      .then(res => setCategories(res.data))
  }, [])

  return (
    <div className="grid grid-cols-3 gap-4">
      {categories.map(cat => (
        <div
          key={cat.category_id}
          onClick={() => onSelect(cat)}
          className="bg-white p-4 rounded-xl cursor-pointer shadow"
        >
          <h4 className="font-medium">{cat.category}</h4>
        </div>
      ))}
    </div>
  )
}
