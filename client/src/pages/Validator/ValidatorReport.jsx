import React from "react";
import {

  Download,
  RefreshCw,
  Eye,
  GitGraph,
  Search,
  Timer,
  IndianRupee,
  ChartColumnIncreasing,
  ChartColumn,
  CheckCircle2,
  HandCoins,
} from "lucide-react";

const ValidatorReport = () => {


const tableData = [
  {
    "RequestID": "REQ-001",
    "Employee": "E1023",
    "Category": "Travel",
    "Amount": 2500,
    "ValidationDate": "2025-12-01",
    "Outcome": "Approved",
    "ProcessingTime": 2
  },
  {
    "RequestID": "REQ-002",
    "Employee": "E1045",
    "Category": "Medical",
    "Amount": 4800,
    "ValidationDate": "2025-12-02",
    "Outcome": "Approved",
    "ProcessingTime": 3
  },
  {
    "RequestID": "REQ-003",
    "Employee": "E1098",
    "Category": "Food",
    "Amount": 1200,
    "ValidationDate": "2025-12-03",
    "Outcome": "Rejected",
    "ProcessingTime": 1
  },
  {
    "RequestID": "REQ-004",
    "Employee": "E1102",
    "Category": "Travel",
    "Amount": 3200,
    "ValidationDate": "2025-12-04",
    "Outcome": "Approved",
    "ProcessingTime": 4
  },
  {
    "RequestID": "REQ-005",
    "Employee": "E1134",
    "Category": "Training",
    "Amount": 6500,
    "ValidationDate": "2025-12-05",
    "Outcome": "Pending",
    "ProcessingTime": 5
  },
  {
    "RequestID": "REQ-006",
    "Employee": "E1156",
    "Category": "Medical",
    "Amount": 2100,
    "ValidationDate": "2025-12-06",
    "Outcome": "Approved",
    "ProcessingTime": 2
  },
  {
    "RequestID": "REQ-007",
    "Employee": "E1180",
    "Category": "Food",
    "Amount": 900,
    "ValidationDate": "2025-12-07",
    "Outcome": "Approved",
    "ProcessingTime": 1
  },
  {
    "RequestID": "REQ-008",
    "Employee": "E1201",
    "Category": "Travel",
    "Amount": 5400,
    "ValidationDate": "2025-12-08",
    "Outcome": "Rejected",
    "ProcessingTime": 3
  },
  {
    "RequestID": "REQ-009",
    "Employee": "E1225",
    "Category": "Training",
    "Amount": 7200,
    "ValidationDate": "2025-12-09",
    "Outcome": "Approved",
    "ProcessingTime": 6
  },
  {
    "RequestID": "REQ-010",
    "Employee": "E1250",
    "Category": "Medical",
    "Amount": 3600,
    "ValidationDate": "2025-12-10",
    "Outcome": "Pending",
    "ProcessingTime": 4
  },
  {
    "RequestID": "REQ-011",
    "Employee": "E1278",
    "Category": "Food",
    "Amount": 1500,
    "ValidationDate": "2025-12-11",
    "Outcome": "Approved",
    "ProcessingTime": 2
  },
  {
    "RequestID": "REQ-012",
    "Employee": "E1300",
    "Category": "Travel",
    "Amount": 4100,
    "ValidationDate": "2025-12-12",
    "Outcome": "Approved",
    "ProcessingTime": 3
  },
  {
    "RequestID": "REQ-013",
    "Employee": "E1324",
    "Category": "Training",
    "Amount": 8000,
    "ValidationDate": "2025-12-13",
    "Outcome": "Rejected",
    "ProcessingTime": 5
  },
  {
    "RequestID": "REQ-014",
    "Employee": "E1356",
    "Category": "Medical",
    "Amount": 2750,
    "ValidationDate": "2025-12-14",
    "Outcome": "Approved",
    "ProcessingTime": 2
  },
  {
    "RequestID": "REQ-015",
    "Employee": "E1389",
    "Category": "Food",
    "Amount": 1100,
    "ValidationDate": "2025-12-15",
    "Outcome": "Pending",
    "ProcessingTime": 1
  }
]

const Outcome = ["All Outcomes", "Validated", "Rejected", "Escalated"];
const Category = ["All Categories", "Travel", "Meals & Entertainment", "Office Supplies", "Vendor Payments"];


// stat cards

const StCard = ({Icon, title, values})=>{
  return(
     <div className="bg-white border-orange-200 flex items-center gap-6 rounded-xl border p-6">
            <div className="">
              {/* icon */}
             <div className="bg-orange-100 border border-orange-200 rounded-xl p-3"> <Icon className="size-5"/></div>
            </div>

            <div className="">
              <p>{title}</p>
              <p>{values}</p>
            </div>
          </div>
  )
}


  return (
    <div className="bg-[#fefdfc] px-6 py-5 space-y-8">

        {/* HEADER */}
        <section className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-gradient-to-r from-orange-50 to-white border border-orange-100 rounded-2xl px-6 py-5 shadow-sm">
          <div>
            <h1 className="text-xl font-semibold">Validation History</h1>
            <p className="text-sm text-[#c2410c]">
            Review your past validation decisions and performance metrics </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-xs border-[#d9770633]  border rounded-md  text-black flex items-center gap-2 bg-white">
            <ChartColumnIncreasing size={14}/>  View Analytics
            </button>
           
            <button className="px-4 py-2 text-xs border-[#d9770633]  border rounded-md  text-black flex items-center gap-2 bg-white">
              <Download size={14} /> Export History
            </button>
          </div>
        </section>

  <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
         <StCard title={"Total Validations"} values={"6"} 
         Icon={ChartColumn} />
         <StCard title={"Validation Rate"} values={"66.7%"} 
         Icon={CheckCircle2}/>
         <StCard title={"Avg Processing Time"} values={"1.8h"} 
         Icon={Timer}/>
         <StCard title={"Total Amount"} values={"$10,550"} 
         Icon={HandCoins}/>
        </section>
    

    {/* Filter section */}

       <div className="w-full bg-white rounded-lg p-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6 border-[#d9770633]  border">
       
      {/* Left side - Search */}
      <div className="flex items-center w-full md:w-2/3 relative">
        <Search className="text-[#92400E] mr-2 absolute top-2 left-2" size={16} />
        <input
          type="text"
          placeholder="Search expenses, merchants..."
          className="w-full pl-7 py-2 text-xs border text-[#92400E] border-[#d9770633]  rounded px-2 focus:outline-none focus:ring focus:ring-[#92400E]"
        />
      </div>

      {/* Right side - Filters */}
      <div className="flex items-center w-full md:w-1/3">
        <div className="grid grid-cols-5 w-full  gap-3">
        {/* Status Filters */}
       
          <select className="px-3 col-span-2 py-1 rounded-md border border-[#d9770633]  bg-white  text-xs  focus:outline-none focus:ring focus:ring-[#92400E]">
            
            {
Outcome.map((e)=>(

                    <option value={e} key={e} className=' text-black'>{e }</option>
                ))
            }
            
          </select>
          

        {/* Categories Dropdown */}
        <select className="px-3 col-span-2 py-1 rounded-md border border-[#d9770633]  bg-white  text-xs  focus:outline-none focus:ring focus:ring-[#92400E]"> 
            {
Category.map((e)=>(

                    <option value={e} key={e} className=' text-black'>{e }</option>
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


      {/* Validation History */}

      
       <section className='p-5 border bg-white border-[#d9770633] rounded-xl '>

<div className=" space-y-6 ">

<div className="flex items-center justify-between">
  <div className="flex items-center">
    <h3 className='font-medium'>Validation History {'(10)'}</h3>
  </div>

   <div className="flex gap-2">
                    <button className='p-1 text-[9px] border bg-green-100 border-green-600   text-green-600   rounded-md flex items-center gap-1'><Download className='size-3'/> Validated</button>
                    <button className='p-1 text-[9px] text-xs border bg-red-100 border-red-600   text-red-600 flex items-center gap-2 rounded-md' ><RefreshCw className='size-3'/> Rejected</button>
                    <button className='p-1 text-[9px] text-xs border bg-blue-100 border-blue-600   text-blue-600 flex items-center gap-2 rounded-md' ><RefreshCw className='size-3'/> Escalated</button>
                </div>
</div>

<div className="overflow-scroll border border-[#d9770633] rounded-xl">
<table className="w-full inset-1 bg-white  border-[#d9770633] rounded-xl tbscroll">
  <thead>
    <tr className="bg-orange-50 text-left">
      <th className="px-4 py-2 text-xs font-semibold text-gray-600 ">Request ID</th>
      <th className="px-4 py-2 text-xs font-semibold text-gray-600">	Employee</th>
      <th className="px-4 py-2 text-xs font-semibold text-gray-600">Category</th>
      <th className="px-4 py-2 text-xs font-semibold text-gray-600">Amount</th>
      <th className="px-4 py-2 text-xs font-semibold text-gray-600">Validation Date</th>
      <th className="px-4 py-2 text-xs font-semibold text-gray-600">Outcomes</th>
      <th className="px-4 py-2 text-xs font-semibold text-gray-600">Processing Time</th>
      <th className="px-4 py-2 text-xs font-semibold text-gray-600">Actions</th>
    </tr>
  </thead>

  <tbody>
    {tableData.map((e, idx) => (
      <tr
        key={idx}
        className={` hover:bg-gray-50 transition ${
          idx % 2 === 0 ? "bg-white" : "bg-gray-50"
        }`}
      >
        <td className="px-4 py-2 text-[10px] font-medium text-gray-600">{e.RequestID}</td>
        <td className="px-4 py-2 text-xs text-[10px] font-medium ">{e.Employee}</td>
        <td className="px-4 py-2 text-xs text-[10px]">{e.Category}</td>
        <td className="px-4 py-2 text-xs font-medium text-black">
          <p className="flex gap-1 items-center"><IndianRupee className="size-3"/> <span>{e.Amount}</span></p>
        </td>
        {/* <td className="px-4 py-2 text-xs">
          <span
            className={`px-2 py-1 rounded text-[8px] font-medium
              ${
                e.status === "Paid"
                  ? "bg-green-100 text-green-700"
                  : e.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : e.status === "Rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}
          >
            {e.status}
          </span>
        </td> */}
        <td className="px-4 py-2 text-xs">
          {e.ValidationDate}
        </td>

        <td className="px-4 py-2 text-xs">
          <span
            className={`px-2 py-1 rounded text-[10px] font-medium ${
              e.Outcome === "Validated"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-500"
            }`}
          >
            {e.Outcome}
          </span>
        </td>
        <td className="px-4 py-2 text-[11px]  items-center">
          
          <p className="flex gap-2  items-center"><Timer className='size-3 text-orange-800/60'/>  
          <span className="font-medium">{e.ProcessingTime }h</span></p></td>

        <td className="px-4 py-2 text-xs cursor-pointer hover:underline flex  gap-2">
          <Eye className='size-4 text-black'/>
          Details
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>
</div>

    </section>
      </div>
  );
};


export default ValidatorReport