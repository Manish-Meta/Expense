import { DollarSign, LayoutDashboardIcon, PowerIcon, User2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useGlobalContext from '../config/GlobalStateContext';

const Sidebar = () => {
  const navigate = useNavigate();
      const getRole = localStorage.getItem("role");
   const {selectedrole, localSelectedRole,userData, setLocalSelectedRole, setLo} = useGlobalContext();
      const [isActive, setIsActive] = useState(selectedrole)

      // useEffect(()=>{

      //   setIsActive(lo)

      // },[localSelectedRole, selectedrole])

  const employee = [
    {
    nav : "Dashboard",
    link :"/dashboard"
  },
    {
    nav : "Expense Submit",
    link :"/expense"
  },
    {
    nav : "Report",
    link :"/report"
  },
  


]

 const validator = [
    {
    nav : "Dashboard",
    link :"/dashboard"
  },
    {
    nav : "validation history",
    link :"/history"
  }


]
 
 const admin = [
  {
    nav:"Analytics",
    link:"/analytics"
  },
    {
    nav : "Dashboard",
    link :"/dashboard"
  },
    {
    nav : "validation history",
    link :"/history"
  },
  {
    nav :"Approvals",
    link :"/approvals",
  },
  {
    nav : "Audit & Compliance",
    link : "/audit"
  },
  
  {
    nav:"Configuration",
    link:"/configuration"
  }


]

let selectedRoleFields;

switch (isActive || getRole ){
  case "employee":
    selectedRoleFields = employee;
    break;

  case "admin":
    selectedRoleFields = admin;
    break;

  case "validator":
    selectedRoleFields = validator;
    break;
}


function setterFunc (e){
  setIsActive(e);
  navigate("/dashboard")
  setLocalSelectedRole(e)
}

function logout(){
  fetch(`${import.meta.env.VITE_BACKEND_URL}user/logout`,
    {
      credentials:"include",
      method:"GET"
    }
  )
  .then((e)=> console.log(e.json()))
  .then((e)=> console.log(e))
  localStorage.clear("login")
  navigate('/')
}
 
  return (
     <aside className="hidden lg:flex flex-col w-[20vw] h-screen bg-orange-50 border-r border-[#d9770633]">

        {/* TOP */}
        <div className="p-3 space-y-4 border-b border-[#d9770633]">
          <div className="flex gap-2 items-center">
            <span className="bg-white rounded-full p-1 border border-orange-300">
              <DollarSign className="size-5" />
            </span>
            <div>
              <h1 className="font-bold text-xl">Expense Tracker</h1>
              <p className="text-xs text-gray-500">Enterprise Suite</p>
            </div>
          </div>

          <div className="bg-red rounded-2xl p-1 border border-orange-200">
           <div className="flex">
            {
              selectedrole == "employee" ?
              <div className={`${isActive == "employee" ?"active":""}  flex-1 rounded-xl h-20 flex flex-col items-center justify-center`} onClick={()=> setterFunc("employee")} >
              <User2 className="text-white size-5" />
              <p className="cursor-pointer text-white text-[10px] font-medium">Employee</p>
            </div>
            : selectedrole == "validator" ? ( 
              <>
              <div className={`${isActive == "employee" ?"active":""}  flex-1 rounded-xl h-20 flex flex-col items-center justify-center`} onClick={()=> setterFunc("employee")} >
              <User2 className="text-white size-5" />
              <p className="cursor-pointer text-white text-[10px] font-medium">Employee</p>
            </div>
             <div className={`${ isActive == "validator" ?"active":""} flex-1 rounded-xl h-20 flex flex-col items-center justify-center`}  onClick={()=> setterFunc("validator")} >
              <User2 className="text-black size-4" />
              <p className="cursor-pointer text-black text-[10px]" >Validator</p>
            </div>
              </>
            ): <>
             <div className={`${isActive == "employee" ?"active":""}  flex-1 rounded-xl h-20 flex flex-col items-center justify-center`} onClick={()=> setterFunc("employee")} >
              <User2 className="text-black size-5" />
              <p className="cursor-pointer text-black text-[10px] font-medium">Employee</p>
            </div>
             <div className={`${ isActive == "validator" ?"active":""} flex-1 rounded-xl  flex flex-col items-center justify-center`} onClick={()=> setterFunc("validator")} >
              <User2 className="text-black size-4" />
              <p className="cursor-pointer text-black text-[10px]" >Validator</p>
            </div>
           <div className={`${isActive == "admin" ?"active":""} flex-1 rounded-xl  flex flex-col items-center justify-center`}
          onClick={()=> setterFunc("admin")} >
              <User2 className="text-black size-4" />
              <p className="cursor-pointer text-black text-[10px]">Admin</p>
            </div></>
            }
           </div>
          </div>
        </div>

        {/* NAV Links */}
        <nav className="p-6 flex-1">
          <ul className="space-y-2 text-xs font-medium">
            {
              selectedRoleFields.map((e)=> <li onClick={()=> navigate(`${e.link}`)} className="text-xs  font-medium flex items-center gap-2 hover:bg-yellow-200 p-2 rounded-lg">
          <LayoutDashboardIcon className="size-4"/>
        {e.nav}</li>)
            }

        
          </ul>
        </nav>

        {/* BOTTOM */}
        <div className="p-6 border-t border-[#d9770633]">
          <div className="bg-white p-3 flex items-center gap-2 rounded-xl">
            <div className="bg-orange-300 rounded-full p-1">
              <User2 className="size-5 text-white" />
            </div>
            <div>
              <p className="text-xs">{userData?.emp?.full_name}</p>
              <p className="text-[10px]">{userData?.dept_name} • {userData?.roles_name}</p>
            </div>
          </div>

          <button className="mt-3 text-xs flex gap-2 items-center" onClick={logout}>
            <PowerIcon className="size-3" />
            Sign out
          </button>
        </div>
      </aside>

  )
}

export default Sidebar