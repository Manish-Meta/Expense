import { ActivityIcon, CircleXIcon, Download, Edit3, Eye, RefreshCw, Search, Target, Timer, Zap } from 'lucide-react'
import React, { Activity, useEffect, useState } from 'react'
import { CardComp } from '../../Employee/EmployeeDashboard'
import { formatDateTime } from '../../../utils/dateFormater'
import ExpenseReview from '../../Validator/ExpenseReview'
import ExpenseAproval from './ExpenseAproval'

const Apporvals = () => {
const [Mypending,setMypending] = useState([])
const [openBox,setOpenBox] = useState(false)
const [id,setId] = useState()
const pending_approvals = () => {
  fetch(import.meta.env.VITE_BACKEND_URL+"expenses/admin_expense",
    {method:'GET',
      credentials:'include'
    }
  )
  .then((res)=> res.json())
  .then((res)=> {
    // setRefresh(true);
    setMypending(res.data)
    // setRefresh(false)
  })
  .catch(()=>{
    // setRefresh(false)
  })
}
useEffect(()=>{
  pending_approvals()
  // console.log(Mypending)
},[]
)
console.log(Mypending)

//open
function openAproval(exp_id){
  console.log(exp_id)
  setId(exp_id)
  setOpenBox(true)

}

  return (
    <div className='p-3 space-y-6'>

         <section className='  space-y-3 lg:space-y-0 bg-linear-to-r  borders  rounded-md  lg:flex items-center justify-between '>
             

                <div className="space-y-">
                    <h1 className='text-xl'>Approval Center</h1>
                    <p className='text-[12px] font- text-[#653600f2]'>Pre-validate employee expense requests before finance review</p>
                </div>
                 
                    {/* buttons for applies */}

                <div className="flex gap-2 items-center">
                    <p className='text-xs'>Auto-approval</p>
                    <button className='p-1 text-[10px] border bg-white border-[#d9770633] px-2  rounded-md flex items-center gap-2'><Download className='size-3'/> Export Queue</button>
                    
                </div>
            </section>

            {/* card section */}

         
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 '>
                 <CardComp Icons={Timer} title={"Pending Review"} count={4} inc={"$7472.67 total value"}/>
                 <CardComp Icons={ActivityIcon} title={"Processing Time"} count={2.4} inc={"15% faster"}/>
                 <CardComp Icons={Target} title={"Compliance Rate"} count={"94.2%"} inc={"2 SLA breaches"}/>
                 <CardComp Icons={Zap} title={"Auto-approved Today"} count={15} inc={"Low risk expenses"}/>
                           
            </div>
       



       {/* filter section */}

 <div className="w-full bg-white rounded-lg p-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6 border-[#d9770633]  border">
       
      {/* Left side - Search */}
      <div className="flex items-center w-full md:w-1/2 relative">
        <Search className="text-[#92400E] mr-2 absolute top-2 left-2" size={16} />
        <input
          type="text"
          placeholder="Search expenses, merchants..."
          className="w-full pl-7 py-2 text-xs border text-[#92400E] border-[#d9770633]  rounded px-2 focus:outline-none focus:ring focus:ring-[#92400E]"
        />
      </div>

      {/* Right side - Filters */}
      <div className="flex items-center w-full md:w-1/2">
        <div className="flex flex-wrap w-full  gap-3">
     
          
        <button className="active px-4 text-xs py-2 border-[#d9770633] rounded-md  border">
           All 6
        </button>
        <button className=" px-4 text-xs py-2 border-[#d9770633] rounded-md  border">
           Pending 4
        </button>
        <button className="px-4 text-xs py-2 border-[#d9770633] rounded-md  border">
           Flagged 1
        </button>
      
        <button className=" px-4 text-xs py-2 border-[#d9770633] rounded-md  border">
           Escalated 1
        </button>

        <button className=" px-4 text-xs py-2 bg-orange-50 border-[#d9770633] rounded-md  border">
           sort by
        </button>
      </div>
      

      </div>
    </div>



 {/*TABLE --- list of Submited Expense */}

    <section className='p-5 border border-[#d9770633] rounded-xl '>

<div className=" space-y-6 ">

<div className="flex items-center justify-between">
  <div className="flex items-center">
    <h3 className='font-medium'>Pending Requests</h3>
  </div>

   <div className="flex gap-2">
                    <button className='p-1 text-xs border bg-white border-[#d9770633]  rounded-md flex items-center gap-2'><Download className='size-3'/> Export</button>
                    <button className='p-1 text-xs border bg-white border-[#d9770633]    text-black flex items-center gap-2 rounded-md' ><RefreshCw className='size-3'/> Refresh</button>
                </div>
</div>

<div className="overflow-scroll border border-[#d9770633] rounded-xl">
<table className="w-full bg-white  border-[#d9770633] rounded-xl tbscroll">
  <thead>
    <tr className="bg-orange-50 text-left">
      <th className="px-4 py-2 text-xs font-semibold text-gray-600 ">ID</th>
      <th className="px-4 py-2 text-xs font-semibold text-gray-600">Type</th>
      <th className="px-4 py-2 text-xs font-semibold text-gray-600">Employee</th>
      <th className="px-4 py-2 text-xs font-semibold text-gray-600">Details</th>
      <th className="px-4 py-2 text-xs font-semibold text-gray-600">Amount</th>
      <th className="px-4 py-2 text-xs font-semibold text-gray-600">Date Submitted</th>
      <th className="px-4 py-2 text-xs font-semibold text-gray-600">Priority</th>
      <th className="px-4 py-2 text-xs font-semibold text-gray-600">Compliance</th>
      <th className="px-4 py-2 text-xs font-semibold text-gray-600">Actions</th>
    </tr>
  </thead>

 <tbody>
  {Mypending.map((e, idx) => (
    <tr
      key={idx}
      className={`hover:bg-gray-50 transition ${
        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
      }`}
    >
      {/* ID */}
      <td className="px-4 py-2 text-[10px] font-medium text-gray-600">
        {e?.expense?.exp_id}
      </td>

      {/* Type */}
      <td className="px-4 py-2 text-[10px] font-medium">
        {e?.cat_name}
      </td>

      {/* Employee */}
      <td className="px-4 py-2 text-[10px]">
        <div className="flex flex-col">
          <span className="font-medium">{e?.name}</span>
          <span className="text-gray-500">{e?.employee?.department}</span>
        </div>
      </td>

      {/* Details */}
      <td className="px-4 py-2 text-[10px] text-gray-700">
        {e.expense.business_purpose}
      </td>

      {/* Amount */}
      <td className="px-4 py-2 text-[10px] font-semibold text-black">
        ${e.expense.amount}
      </td>

      {/* Date Submitted */}
      <td className="px-4 py-2 text-[10px] text-gray-600">
        {formatDateTime(e.expense.created_at)}
      </td>

      {/* Priority */}
      <td className="px-4 py-2 text-[10px]">
        <span
          className={`px-2 py-1 rounded font-medium
            ${
              e.expense.priority === "High"
                ? "bg-red-100 text-red-700"
                : e.expense.priority === "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }`}
        >
          {e.expense.priority}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-2 text-[10px]">
        <span
          className={`px-2 py-1 rounded font-medium
            ${
              e.expense.compliance.toLocaleLowerCase() === "compliant"
                ? "bg-green-100 text-green-700"
                : e.expense.compliance.toLocaleLowerCase() === "not compliant"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
        >
          {e.expense.compliance}
        </span>
      </td>

      {/* Actions */}
      <td className='p-2'>
        <button 
        onClick={()=>openAproval(e.expense.exp_id)}
        className="px-4 rounded-md cursor-pointer py-2 p-2 border border-orange-300 text-xs flex gap-2 ">
          <Eye className="size-4  text-black" />
        Review
        </button>
        
      </td>
    </tr>
  ))}
</tbody>

</table>
</div>
</div>

    </section>
    {openBox && (
      <div className="fixed inset-0 z-50 w-full mx-auto bg-black/30 flex items-center justify-center">
    {/* Expense Page Container */}
    <div className="">
      <button
        onClick={() => setOpenBox(false)}
        className=" cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <CircleXIcon className='text-red-600 size-5'/>
      </button>
      <ExpenseAproval
      exp_id={id}
      onClose={() => setopenExpense(false)}
      />
      </div>
      </div>
    )}





    </div>
  )
}

export default Apporvals