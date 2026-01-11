
import { expenseCategories } from "../../../data/expenseCategories"
import ExpenseCategoryCard from "../../../components/ExpenseCategoryCard"

export default function CategorySelect({ onSelect }) {
  return (
    <div>
  
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">
          Select Expense Category
        </h1>
        <p className="text-orange-600 mt-2 max-w-3xl">
          Please choose the category that best describes your business expense.
          Each category is configured with specific validation rules, approval
          workflows, and compliance requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {expenseCategories.map((cat) => (
          <ExpenseCategoryCard
            key={cat.id}
            category={cat}
            onSelect={onSelect}
          />
        ))}
      </div>

     
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-50 to-white p-8 border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Category Selection Guidelines
        </h3>

        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="font-medium text-orange-600">Tailored Forms</p>
            <p className="text-gray-600 mt-1">
              Each category unlocks specific input fields optimized for that
              expense type.
            </p>
          </div>

          <div>
            <p className="font-medium text-orange-600">Policy Compliance</p>
            <p className="text-gray-600 mt-1">
              Categories may enforce amount limits, approval rules, or location
              constraints.
            </p>
          </div>

          <div>
            <p className="font-medium text-orange-600">Unified Workflow</p>
            <p className="text-gray-600 mt-1">
              All expenses follow a consistent approval and audit process.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
