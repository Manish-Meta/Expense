import React from 'react'
import { DollarSign, Shield, Calendar, User2, PowerOff, PowerIcon, LayoutDashboardIcon, BadgeIndianRupee, ChartSpline } from "lucide-react";
import EmployeeDashboard from './Dashboard/EmployeeDashboard';
import Navbar from '../components/Navbar';
import ValidatorDashboard from './Dashboard/ValidatorDashboard';
const Layout = () => {
  return (

   <div className="flex w-screen h-screen">

  {/* LEFT SIDEBAR */}
  <div className="lg:grid grid-rows-4 hidden border-collapse lg:w-[20vw]  sticky top-0 h-screen bg-orange-50">

    <div className="border p-6 row-span-2 border-[#d9770633]  space-y-3">
      {/* logo */}
      <div className="flex gap-2 items-center">
        <span className="bg-white rounded-full p-1 border border-orange-300">
          <DollarSign className="size-5" />
        </span>
        <div>
          <h1 className='font-bold text-xl'>Expense Tracker</h1>
          <p className="text-xs text-gray-500">Enterprise Suite</p>
        </div>
      </div>

      {/* user */}
      <div className="bg-white rounded-2xl p-1 border border-orange-200">
        <div className="bg-[#ff7f35] rounded-xl w-full h-20 flex flex-col items-center justify-center">
          <User2 className="text-white size-6" />
          <p className="text-white text-sm">Employee</p>
        </div>
      </div>
    </div>

    <div className="flex-1 p-6 row-span-2 border border-[#d9770633] ">
      {/* dynamic sidebar content */}
        <ul className="">
        <li className="text-xs  font-medium flex items-center gap-2 hover:bg-yellow-200 p-3 rounded-lg">
          <LayoutDashboardIcon className="size-4"/>
        Dashboard</li>
<li className="text-xs  font-medium flex items-center gap-2 hover:bg-yellow-200 p-3 rounded-lg"><BadgeIndianRupee  className="size-4"/> Submit</li> 
<li className="text-xs  font-medium flex items-center gap-2 hover:bg-yellow-200 p-3 rounded-lg"><ChartSpline  className="size-4"/> ExpenseReports</li>
      </ul>
    </div>

    <div className="p-6 row-span-1 flex flex-col items-center border border-[#d9770633]">
      <div className="bg-white p-3 px-8 flex items-center gap-2 rounded-xl">
        <div className="bg-orange-300 rounded-full p-1  ">
          <User2 className="size-5 text-white" />
        </div>
        <div className="flex flex-col">
            <p className="text-xs">Employee</p>
        <p className="text-[10px]">Marketing • employee </p>
        </div>
      </div>
      <button className="mt-2 text-xs flex gap-2 items-center"><PowerIcon className='size-3'/> Sign out</button>
    </div>

  </div>

  {/* RIGHT CONTENT */}
  <div className="w-full lg:w-[80vw] h-screen overflow-y-auto bg-white">
    <Navbar />
    <EmployeeDashboard />
    {/* <ValidatorDashboard/> */}


    {/* bottom section for navigate */}
  </div>

</div>

  )
}

export default Layout