import { Album, ArrowUp, Calendar, CircleXIcon, DollarSign, Download, Edit2, Edit3, Eye, HdIcon, PlusCircle, Receipt, RefreshCw, Search, Ticket, TicketCheck, Timer, Clock, FileText } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useGlobalContext from '../../config/GlobalStateContext';
import ExpenseDetails from './ExpenseDetails';

const EmployeeDashboard = () => {
    const navigate=useNavigate()
    const statuses = [ "All Status", "Pending", "Approved", "Rejected", "Need Info", "Draft", "Processing", "Reimbursement", "Escalated", "Paid" ];
    const ctg =["All Categories", "Travel", "Meals & entertainment", "Transpotaion", "Accomendation","Offie Suplliers"];
    const [Refresh, setRefresh] = useState(false)
    const [openExpense, setopenExpense] = useState(false)
    const [myExpenseData, setMyExpenseData] = useState("")
    
    const [searchKeys , setSearchKeys ] = useState("")
    const [selectedCategory , setSelectedCategory ] = useState("")
    const [selectedStatus , setSelectedStatus ] = useState("")
    const {userData,SingleExpenseData, setSingleExpenseData} = useGlobalContext()

    // sample data
//     const expenses = [
//   {
//     date: "2026-01-02",
//     merchant: "Uber",
//     category: "Travel",
//     amount: "$25.00",
//     status: "Pending",
//     compliance: "Yes",
//     receipt: "Uploaded",
//     actions: "View",
//   },
//   {
//     date: "2026-01-03",
//     merchant: "Starbucks",
//     category: "Food",
//     amount: "$12.50",
//     status: "Approved",
//     compliance: "Yes",
//     receipt: "Uploaded",
//     actions: "View",
//   },
//   {
//     date: "2026-01-04",
//     merchant: "Amazon",
//     category: "Office Supplies",
//     amount: "$45.00",
//     status: "Rejected",
//     compliance: "No",
//     receipt: "Missing",
//     actions: "Resubmit",
//   },
//   {
//     date: "2026-01-05",
//     merchant: "Hilton Hotel",
//     category: "Accommodation",
//     amount: "$220.00",
//     status: "Processing",
//     compliance: "Yes",
//     receipt: "Uploaded",
//     actions: "View",
//   },
//   {
//     date: "2026-01-06",
//     merchant: "Dominos",
//     category: "Food",
//     amount: "$18.00",
//     status: "Paid",
//     compliance: "Yes",
//     receipt: "Uploaded",
//     actions: "View",
//   },
//   {
//     date: "2026-01-07",
//     merchant: "Indigo Airlines",
//     category: "Travel",
//     amount: "$150.00",
//     status: "Pending",
//     compliance: "Yes",
//     receipt: "Uploaded",
//     actions: "Approve",
//   },
//   {
//     date: "2026-01-08",
//     merchant: "Office Depot",
//     category: "Stationery",
//     amount: "$30.00",
//     status: "Approved",
//     compliance: "Yes",
//     receipt: "Uploaded",
//     actions: "View",
//   },
//   {
//     date: "2026-01-09",
//     merchant: "Ola Cabs",
//     category: "Travel",
//     amount: "$20.00",
//     status: "Escalated",
//     compliance: "No",
//     receipt: "Missing",
//     actions: "Review",
//   },
//   {
//     date: "2026-01-10",
//     merchant: "KFC",
//     category: "Food",
//     amount: "$22.00",
//     status: "Draft",
//     compliance: "No",
//     receipt: "Missing",
//     actions: "Edit",
//   },
//   {
//     date: "2026-01-11",
//     merchant: "Marriott",
//     category: "Accommodation",
//     amount: "$180.00",
//     status: "Paid",
//     compliance: "Yes",
//     receipt: "Uploaded",
//     actions: "View",
//   },
// ];


const ExpenseData = ()=>{

  let url = import.meta.env.VITE_BACKEND_URL+"expenses/my_expense"

  fetch(url, {
    method:"GET",
    credentials:"include"
  })
  .then((res)=> res.json())
  .then((res)=> {
    setRefresh(true);
    setMyExpenseData(res.data)
    setRefresh(false)
  })
  .catch(()=>{
    setRefresh(false)
  })

}


useEffect(()=>{
  ExpenseData();
  console.log(myExpenseData)
},[Refresh])





function dateFormater(date){

  const format = date.toString().slice(0,10)
  return format

}

function viewExpense(e_data,e){
  setopenExpense(true)
  setSingleExpenseData({
            exp_id: e_data.exp_id,
            profile_id: e_data.profile_id,
            amount: e_data.amount,
            date: e_data.date,
            merchant: e_data.merchant,
            business_purpose: e_data.business_purpose,
            cat_name: e.cat_name,
            advance_option: e_data?.advance_option,
            reciept: null,
            status: e_data.status,
            priority: e_data.priority,
            compliance: e_data.compliance,
            next_level: e_data.next_level,
            created_at: e_data.created_at,
            updated_at: e_data.updated_at
          }

  )
  console.log(SingleExpenseData)
}

const filteredData =
  myExpenseData&&myExpenseData?.filter((e) => {
    const exp = e.expense ?? {};

    return (
      
     
     (exp.exp_id?.toLowerCase().includes(searchKeys.toLowerCase())) ||
      (exp.merchant?.toLowerCase().includes(searchKeys.toLowerCase())) ||
       ( exp.status.toLowerCase() == (selectedStatus.toLowerCase()))
    );
  }) 
console.log(filteredData)
console.log(myExpenseData)


  return (
   <div className='p-3 space-y-4 '>
       <section className='py-7 space-y-7 lg:space-y-0 bg-linear-to-r  from-orange-50 via-50% to-white border-[#d9770633]  borders p-4 rounded-md  lg:flex items-center justify-between '>
                {/* icon */}
               
                 <div className="flex items-center gap-2">
                       <span className='  w-10 h-10 inline-flex items-center justify-center rounded-md p-1 bg-[#d97706] shadow-xl text-white'><DollarSign className='size-5'/> </span>


                <div className="space-y-">
                    <h1 className='font-semibold text-2xl'>Hi 👋, <span className='text-orange-600'>{userData?.profile?.full_name}</span></h1>
                    <p className='text-sm font-medium text-[#653600f2]'>Welcome to your expense dashboard • Wednesday, January 7, 2026</p>
                </div>
                 </div>
                    {/* buttons for applies */}

                <div className="flex gap-2">

                    <button className='p-1 text-xs border bg-white border-[#d9770633]  rounded-md flex items-center gap-2'><Calendar  className='size-3'/> This Month</button>
                    <button type="button" onClick={()=>navigate("/expense")} className='cursor-pointer p-2 text-xs  bg-[#d97706] text-white flex items-center gap-2 rounded-md' ><PlusCircle className='size-3'/> New Expense</button>
                </div>
            </section>

            {/* card sec */}

            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 '>
                 <CardComp Icons={Timer} title={"Pending Submissions"} bg={"green-100"} txt={"green-400"} count={1} inc={25.75}/> 
                 <CardComp Icons={DollarSign} title={"This Month Total"} bg={"red-100"} txt={"red-400"} count={9} inc={95.95}/> 
                 <CardComp Icons={Ticket} title={"Paid & Completed"} bg={"yellow-100"} txt={"yellow-400"} count={1} inc={205.85}/> 
                 <CardComp Icons={ArrowUp} title={"Escalated Items"} bg={"blue-100"} txt={"blue-400"} count={1} inc={875.00}/> 
                 
            </section>


{/* filter section */}

 <div className="w-full bg-white rounded-lg p-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6 border-[#d9770633]  border">
       
      {/* Left side - Search */}
      <div className="flex items-center w-full md:w-2/3 relative">
        <Search className="text-[#92400E] mr-2 absolute top-2 left-2" size={16} />
        <input
          type="text"
          onChange={(e)=> setSearchKeys(e.target.value)}
          placeholder="Search expenses, merchants..."
          className="w-full pl-7 py-2 text-xs border text-[#92400E] border-[#d9770633]  rounded px-2 focus:outline-none focus:ring focus:ring-[#92400E]"
        />
      </div>

      {/* Right side - Filters */}
      <div className="flex items-center w-full md:w-1/3">
        <div className="grid grid-cols-5 w-full  gap-3">
        {/* Status Filters */}
       
          <select className="px-3 col-span-2 py-1 rounded-md border border-[#d9770633]  bg-white  text-xs  focus:outline-none focus:ring focus:ring-[#92400E]" onChange={(e) => setSelectedStatus(e.target.value.toLowerCase())}>
            
            {
statuses?.map((e)=>(

                    <option value={e} key={e} className=' text-black'>{e }</option>
                ))
            }
            
          </select>
          

        {/* Categories Dropdown */}
        <select className="px-3 col-span-2 py-1 rounded-md border border-[#d9770633]  bg-white  text-xs  focus:outline-none focus:ring focus:ring-[#92400E]">
            
            {
ctg?.map((e)=>(

                    <option value={e} key={e} className=' text-black' onClick={()=> setSelectedCategory(e)}>{e }</option>
                ))
            }
            
          </select>
          
        {/* Filter Button */}
        <button className="grid col-span-1 px-4 text-xs py-2 border-[#d9770633] rounded-md  border">
           Filter
        </button>
      </div>

      </div>
    </div>

    {/*TABLE --- list of Submited Expense */}

    <section className='p-5 border border-[#d9770633] rounded-xl '>

<div className=" space-y-6 ">

<div className="flex items-center justify-between">
  <div className="flex items-center">
    <h3 className='font-medium'>Expense History {" "} ({myExpenseData&&myExpenseData.length})</h3>
  </div>

   <div className="flex gap-2">
                    <button className='p-1 text-xs border bg-white border-[#d9770633]  rounded-md flex items-center gap-2'><Download className='size-3'/> Export</button>
                    <button className='p-1 text-xs border bg-white border-[#d9770633]    text-black flex items-center gap-2 rounded-md' onClick={()=> setRefresh(true)} ><RefreshCw className={`size-3 ${Refresh && "animate-spin"}`}/> Refresh</button>
                </div>
</div>

{
!myExpenseData?<div className="items-center justify-items-center">
          <p className='font-bold text-md'>No Pending Expenses</p>
        </div>
:<div className="overflow-scroll border border-[#d9770633] rounded-xl">
<table className="w-full bg-white  border-[#d9770633] rounded-xl tbscroll">
  <thead>
    <tr className="bg-orange-50 text-left">
      <th className="px-4 py-2 text-xs font-semibold text-gray-600 ">Date</th>
      <th className="px-4 py-2 text-xs font-semibold text-gray-600">Merchant</th>
      <th className="px-4 py-2 text-xs font-semibold text-gray-600">Category</th>
      <th className="px-4 py-2 text-xs font-semibold text-gray-600">Amount</th>
      <th className="px-4 py-2 text-xs font-semibold text-gray-600">Status</th>
      <th className="px-4 py-2 text-xs font-semibold text-gray-600">Compliance</th>
      <th className="px-4 py-2 text-xs font-semibold text-gray-600">Receipt</th>
      <th className="px-4 py-2 text-xs font-semibold text-gray-600">Actions</th>
    </tr>
  </thead>
 {
 <tbody>
    { filteredData && filteredData?.map((e, idx) => (
      <tr
        key={idx}
        className={` hover:bg-gray-50 transition ${
          idx % 2 === 0 ? "bg-white" : "bg-gray-50"
        }`}
      >
       <td className='flex flex-col '>
         <span className="px-4  text-[11px] font-medium ">{dateFormater(e.expense.created_at)}</span>
        <span className="px-4  text-[10px] font-medium text-gray-500">{e.expense.exp_id}</span>
       </td>
        <td className="px-4 py-2 text-[11px] font-medium ">{e.expense.merchant}</td>
        <td className="px-4 py-2 text-[11px] font-medium ">{e.cat_name}</td>
        <td className="px-4 py-2 text-[11px]  font-bold text-black">₹ {e.expense.amount}</td>
        <td className="px-4 py-2 text-xs">
          <span
            className={`px-2 py-1 rounded text-[8px] font-medium
              ${
                (e.expense.status) == "paid"
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : e.expense.status.toLocaleLowerCase() == "pending"
                  ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                  : e.expense.status.toLocaleLowerCase() == "rejected"
                  ? "bg-red-100 text-red-700 border border-red-300"
                  : "bg-blue-100 text-blue-700 border border-blue-300"
              }`}
          >
            {e.expense.status}
          </span>
        </td>
        <td className="px-4 py-2 text-xs">
          <span
            className={`px-2 py-1 rounded text-[10px] font-medium ${
              e?.expense.compliance === "Compliant"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-500 border border-red-200"
            }`}
          >
          {e.expense.compliance}
          </span>
        </td>
        <td className="px-4 py-2 text-xs">{e?.expense.receipt == "Uploaded"? <TicketCheck className='size-4 text-green-600'/>:<CircleXIcon className='size-4 text-red-600'/>}</td>
        <td className="px-4 py-2 text-xs items-center flex cursor-pointer hover:underline justify-center  gap-2">
          <Eye onClick={()=>viewExpense(e.expense,e)}className='size-4 text-black'/>
          <Edit3 className='size-3 text-black'/>
        </td>
      </tr>
    ))}
  </tbody>
 }
</table>
</div>}
</div>

    </section>
    {openExpense && (
      <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
    {/* Expense Page Container */}
    <div className="w-full max-w-6xl h-[90vh] bg-[#fff7ed] rounded-2xl shadow-xl overflow-y-auto relative">
      <button
        onClick={() => setopenExpense(false)}
        className=" cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>

      {/* Expense Page */}
      <ExpenseDetails
        expense={SingleExpenseData}
        onClose={() => setopenExpense(false)}
      />
    </div>
  </div>
    )}



   </div>
  )
}

export default EmployeeDashboard


// card components

export const CardComp =({Icons, title, count, inc, bg, txt})=>{
    return (
        <div className='p-2 space-y-2  bg-white shadow rounded-xl border border-[#d9770633]'>
            <div className="p-3  flex justify-between">
                <div className="">
                    <h5 className='text-xs lg:text-md font-medium text-[#92400E] uppercase'>{title}</h5>
                    <p className='text-xl font-bold'>{count}</p>
                    <span className='text-[12px] text-[#b3693b] font-medium '>{inc}</span>
                </div>

                <div className={` bg-${[bg]} text-${[txt]}  border border-[#d9770633] text-amber-700 w-10 h-10 flex items-center justify-center rounded-md p-1`}>
                    <Icons className={`size-5 `}/>
                </div>
            </div>
            <div className="bg-orange-50 w-full rounded-full h-1 relative">
                <div className="bg-[#ff8234] rounded-full overflow-hidden w-24  h-full absolute top-0 left-0 "></div>
            </div>
        </div>
    )
}


