import { DollarSign, 
  LayoutDashboardIcon, //nav icons
  ReceiptIndianRupee,
  ChartColumnBig,
  History,
  CircleCheckBig,
  ShieldCheck,
  Settings2, 
  PowerIcon, 
  User, 
  User2, 
  ShieldUser, 
  UserCheck,
  Icon,} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useGlobalContext from '../config/GlobalStateContext';

const Sidebar = () => {
  const navigate = useNavigate();
      const getRole = localStorage.getItem("role");
   const {selectedrole, localSelectedRole,userData, setLocalSelectedRole, setUserData} = useGlobalContext();
      const [isActive, setIsActive] = useState(selectedrole)

      // useEffect(()=>{

      //   setIsActive(lo)

      // },[localSelectedRole, selectedrole])

  const employee = [
    {
    nav : "Dashboard",
    link :"/dashboard",
    Icon : LayoutDashboardIcon
  },
    {
    nav : "Expense Submit",
    link :"/expense",
    Icon : ReceiptIndianRupee
  },
    {
    nav : "Report",
    link :"/report",
    Icon : ChartColumnBig
  },
  


]

 const validator = [
    {
    nav : "Dashboard",
    link :"/dashboard",
    Icon : LayoutDashboardIcon
  },
    {
    nav : "validation history",
    link :"/history",
    Icon : History
  }


]
 
 const admin = [
  {
    nav : "Dashboard",
    link :"/dashboard",
    Icon : LayoutDashboardIcon
  },  
  {
    nav :"Approvals",
    link :"/approvals",
    Icon : CircleCheckBig
  },
  {
    nav : "Audit & Compliance",
    link : "/audit",
    Icon : ShieldCheck
  },

  {
    nav:"Analytics",
    link:"/analytics",
    Icon:ChartColumnBig
  },
  
  {
    nav:"Configuration",
    link:"/configuration",
    Icon : Settings2
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
  setUserData("")
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
              <div className={`${isActive == "employee" ?"active":""}  cursor-pointer flex-1 rounded-xl h-20 flex flex-col items-center justify-center`} onClick={()=> setterFunc("employee")} >
              <User className="text-black size-5" />
              <p className="cursor-pointer text-black text-[10px] font-medium">Employee</p>
            </div>
            : selectedrole == "validator" ? ( 
              <>
              <div className={`${isActive == "employee" ?"active":""} cursor-pointer flex-1 rounded-xl h-20 flex flex-col items-center justify-center`} onClick={()=> setterFunc("employee")} >
              <User className="text-black size-5" />
              <p className="cursor-pointer text-black text-[10px] font-medium">Employee</p>
            </div>
             <div className={`${ isActive == "validator" ?"active":""} cursor-pointer flex-1 rounded-xl  flex flex-col items-center justify-center`} onClick={()=> setterFunc("validator")} >
              <UserCheck className="text-black size-4" />
              <p className="cursor-pointer text-black text-[10px]" >Validator</p>
            </div>
              </>
            ): <>
             <div className={`${isActive == "employee" ?"active":""} cursor-pointer flex-1 rounded-xl h-20 flex flex-col items-center justify-center`} onClick={()=> setterFunc("employee")} >
              <User className="text-black size-5" />
              <p className="cursor-pointer text-black text-[10px] font-medium">Employee</p>
            </div>
             <div className={`${ isActive == "validator" ?"active":""} cursor-pointer flex-1 rounded-xl  flex flex-col items-center justify-center`} onClick={()=> setterFunc("validator")} >
              <UserCheck className="text-black size-4" />
              <p className="cursor-pointer text-black text-[10px]" >Validator</p>
            </div>
           <div className={`${isActive == "admin" ?"active":""} cursor-pointer flex-1 rounded-xl  flex flex-col items-center justify-center`}
          onClick={()=> setterFunc("admin")} >
              <ShieldUser className="text-black size-4" />
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
            selectedRoleFields.map((e) => {
              const Icon = e.Icon
              return (
                <li
                  key={e.link}
                  onClick={() => navigate(e.link)}
                  className="text-xs font-medium flex items-center gap-2 hover:bg-yellow-200 p-2 rounded-lg cursor-pointer"
                >
                  {Icon && <Icon className="size-4" />}
                  {e.nav}
                </li>
              )
            })
          }


        
          </ul>
        </nav>

        {/* BOTTOM */}
         <div className="mt-auto w-fill p-2 flex flex-col gap-2">
  {/* Profile Section - Centered Layout */}
  <div className="bg-white p-4 flex flex-row items-center gap-1 rounded-xl border border-gray-100">
    <div className="bg-orange-400 rounded-full p-3 shrink-0">
      <User2 className="size-5 text-white" />
    </div>
    <div className="text-center w-full">
      <p className="text-md font-semibold text-gray-800 truncate">
        {userData?.emp?.full_name}
      </p>
      <p className="text-[11px] font-semibold text-gray-400 truncate uppercase tracking-wider">
        {userData?.dept_name} • {userData?.roles_name}
      </p>
    </div>
  </div>
  <button 
    onClick={logout}
    className="group cursor-pointer flex items-center justify-center gap-2 w-full py-2.5 bg-white hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200"
  >
    <PowerIcon className="size-4" />
    <span className="text-sm font-semibold">Sign out</span>
  </button>
</div>
      </aside>

  )
}

export default Sidebar