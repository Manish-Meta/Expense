import { useEffect, useState } from "react"
import { validateExpense } from "../../../utils/expenseValidator"
import DynamicForm from "../../../form/engine/DynamicForm";

export default function ManualEntry({ category, onDone, fields, onSubmit }) {
  const [merchant, setMerchant] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")
  const [purpose, setPurpose] = useState("")
  const [customFields, setCustomFields] = useState({})
  

 useEffect(() => {
  const numericAmount = Number(amount)
  const validLimit = validateExpense(numericAmount, category).valid

  const valid =
    merchant &&
    date &&
    amount &&
    validLimit

  onDone(
    {
      amount: numericAmount,
      date,
      merchant,
      business_purpose: purpose,
      category_id: category.category_id,
      custom_fields: customFields, 
    },
    valid
  )
}, [merchant, amount, date, purpose, customFields, category])


  return (
    <div className="bg-white border border-borderLine/60  shadow rounded-2xl p-4 space-y-6">
      <h3 className="text-sm font-semibold">Manual Entry</h3>
      { amount>category.limit &&(
            <span className="text-xs text-red-700 p-3 bg-red-300 px-2 py-1 rounded-full">
            Limit Exceeds : ₹ {category.limit}
          </span>
        )}

      {/* Amount + Date
      <div className="grid grid-cols-2 gap-3 w-full mt-3">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            ₹
          </span>
          <input
            className=" border w-full p-2 border-borderLine/30 rounded-lg  pl-6"
            placeholder="0.00"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value.replace(/[^0-9.]/g, ""))
            }
          />
          
        </div>

        <div className="w-full">
          <input
          type="date"
          className="border w-full h-full p-2 text-xs border-borderLine/30 rounded-lg pl-3"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        </div>
      </div> */}

      {/* Merchant */}
      <input
        className="border w-full p-2 border-borderLine/30 rounded-lg pl-7"
        placeholder="Merchant / Vendor *"
        value={merchant}
        onChange={(e) => setMerchant(e.target.value)}
      />

      {/* Category Info */}
      <div className="border p-2 border-borderLine/30 rounded-lg pl-7">
        <span className="font-medium text-xs">{category.category}</span>
        {category.limit && (
          <span className="ml-5 font-medium text-[10px] bg-yellow-100 border border-yellow-600 text-yellow-600 px-2 py-1 rounded-full">
            Limit: ₹ {category.limit}
          </span>
        )}
      </div>

      {/* Purpose */}
      <textarea
        rows={4}
        className="input"
        placeholder="Business purpose (optional)"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
      />
      {fields?.length > 0 && (
  <DynamicForm
    fields={fields}
    mode="entry"
    role="employee"
    values={customFields}
    onChange={setCustomFields}
  />
)}

    </div>
    
  )
}
