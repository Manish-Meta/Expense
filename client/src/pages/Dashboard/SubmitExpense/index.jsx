import { useState } from "react"
import StepProgress from "./StepProgress"
import CategorySelect from "./CategorySelect"
import ExpenseTabs from "./ExpenseTabs"
import ReviewSubmit from "./ReviewSubmit"

export default function SubmitExpense() {
  const [step, setStep] = useState(1)
  const [category, setCategory] = useState(null)
  const [expenseData, setExpenseData] = useState(null)

  return (
    <div className="p-8 bg-[#fff7ed] min-h-screen">
      <StepProgress step={step} />

      {step === 1 && (
        <CategorySelect
          onSelect={(cat) => {
            setCategory(cat)
            setStep(2)
          }}
        />
      )}

      {step === 2 && (
        <ExpenseTabs
          category={category}
          onBack={() => setStep(1)}
          onNext={(data) => {
            setExpenseData(data)
            setStep(3)
          }}
        />
      )}

      {step === 3 && (
        <ReviewSubmit
          category={category}
          data={expenseData}
          onBack={() => setStep(2)}
        />
      )}
    </div>
  )
}
