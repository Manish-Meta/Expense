import React, { useEffect, useState } from "react";
import useGlobalContext from "../../config/GlobalStateContext";
import { useNavigate } from "react-router-dom";
import { Info, LockKeyhole, LogIn, ReceiptIndianRupee, ShieldCheck, User2Icon, UserCheck2, UserCheck2Icon } from "lucide-react";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [LoginLoading, setLoginLoading] = useState(false);
  const [ErrorCode, setErrorCode] = useState('');
  const { selectedrole,setSelectedRole, setUserData, userData ,setUserLoggedIn } = useGlobalContext();
  const navigate = useNavigate();

  // isActive
 
const APIs = import.meta.env.VITE_BACKEND_URL


  const handleSubmit = (e) => {
   localStorage.setItem("rolee", selectedrole)
    setLoginLoading(true)
    e.preventDefault();
    fetch(`${APIs}user/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        emp_id: email,
        password: password,
        emp_status: selectedrole,
      }),
    })
      .then((e2) => {
        if (e2.status == 200) {
          fetch(`${APIs}user/profile?emp_status=${selectedrole}`, {
          method:"GET",
          credentials:'include'})
          .then((e)=> e.json())
          .then((data)=>{console.log(data.data[0]), setUserData(data.data[0])})
          setUserLoggedIn(true)
          
          localStorage.setItem("login", true)
           setLoginLoading(false)
          
          navigate('/dashboard')
           }
        else if (e2.status == 400){
            setErrorCode("400")
        }
        else if (e2.status == 500){
            setErrorCode("500")
            console.log("Dispallllllll")
        }
           else{
             setLoginLoading(false)
            setError(true)
        }
      })
      .catch((e) => {
        setLoginLoading(false)
        setErrorCode(e.message)
         setLoginLoading(true)
      }
      
      )
      .finally(()=>{ 
        setTimeout(()=>{
          setErrorCode("")
        },3000)
        setLoginLoading(false)})
    
  };

  console.log(userData);


  const empData = [
    {
      icon:User2Icon,
      title:"Employee Portal",
      desc:"Expense Submitter"
    },
      {
      icon:UserCheck2,
      title:"Validator Portal",
      desc:"Pre-Validation & Review"
    },
      {
      icon:ShieldCheck,
      title:"Admin Dashboard",
      desc:"Management & Configuration "
    }
  ]
  
  // console.log(selectedrole)

  const matchedEmpData = empData.filter(e => (e?.title.toLocaleLowerCase()).includes(selectedrole?.toLowerCase()) )
const Icon = matchedEmpData[0]?.icon;

  return (
  <div className=" h-screen rounded-xl flex items-center justify-center ">
      <div className="lg:w-1/2 w-full h-full hidden  lg:flex bg-gradient-to-r from-orange-400 to-orange-600 p-7 justify-center items-center">


<div className="text-white space-y-4  max-w-2xl mx-auto">
   <div className=" pt-2  flex flex-col self-start ">
        <div className="flex items-center gap-2">
         <p className=" w-12 h-12 flex items-center justify-center rounded-xl bg-orange-500 text-white text-xl font-bold"> 
          <ReceiptIndianRupee className="
           size-8"/> </p>

         <div className="f">
           <h2 className="text-xl font-bold ">
          Xpenra
        </h2>
        <p className="text-xs">Expense suite</p>
        
         </div>
        </div>
        
        
      </div>

  <h5 className="text-4xl font-bold ">Streamline Your
Expense Management</h5>

<p className="font-bold opacity-80 text-white">Banking-grade expense platform with AI-powered validation, real-time approvals, and comprehensive compliance.</p>
</div>
    </div>
<div className="lg:w-1/2 w-full h-full pb-2  bg-orange-50/50   flex items-center flex-col">
{/* Header */}
<div className="mt-3 w-[350px] lg:w-[400px] rounded-xl overflow-hidden">
      <div className=" pt-2 pb-4 left-0 ">
        <div className="flex flex-col ">
        
         <h2 className="text-xl font-bold ">
          Welcome Back
        </h2>
        <p className="text-xs  text-gray-500 mt-1">
          Sign in as <span className="font-medium text-orange-600">{selectedrole}</span>
        </p>
        </div>
        
         </div>
        </div>
        


  <div className=" rounded-xl shadow gap-2 flex bg-white/70  justify-center overflow-hidden flex-col border border-borderLine/30 ">
  
       

      <div className="  rounded-2xl  w-[350px] sm:w-[400px]">
         
        {
          LoginLoading &&  <div className="loader"></div>
      
        }

         {/* tab */}

      <div className="grid grid-cols-3 place-items-center rounded-t-xl  gap-4 bg-gray-100">
  
<div className={`${selectedrole == "employee" ? "bg-white shadow border-b-2 rounded-tl-xl border-borderLine" :"bg-none"} flex items-center flex-col  w-full p-4`}
onClick={()=> setSelectedRole("employee")}>
          {/* icon */}
          <span className=""><User2Icon className="size-4"/></span>
          <p className="text-[10px] font-medium">Employee</p>
        </div>

<div className={`${selectedrole == "validator" ? "bg-white shadow border-b-2 border-borderLine" :"bg-none"} flex items-center flex-col  w-full p-4`}
onClick={()=> {
  setSelectedRole("validator")}}>
          {/* icon */}
          <span className=""><UserCheck2Icon className="size-4"/></span>
          <p className="text-[10px] font-medium">Validator</p>
        </div>


     
<div className={`${selectedrole == "admin" ? "bg-white border-b-2 shadow rounded-tr-xl border-borderLine" :"bg-none"} flex items-center flex-col  w-full p-4`}
onClick={()=> setSelectedRole("admin")}>
          {/* icon */}
          <span className=""><ShieldCheck className="size-4"/></span>
          <p className="text-[10px] font-medium">Admin</p>
        </div>


      </div>

 

  {/* hints */}


 <div className="p-2 my-3">
    <div className={`flex  w-full p-4 rounded-xl items-center gap-2 bg-orange-50/30 `}>
          {/* icon */}
          <span className="bg-orange-100 rounded-md p-3">{Icon && <Icon className="size-4"/>}</span> 
          <div className="flex flex-col gap-1">
            <p className="text-[12px] font-medium">{matchedEmpData[0]?.title}</p>
          <p className="text-[10px] font-medium">{matchedEmpData[0]?.desc}</p>
          </div>
          
        </div></div>
  
      {/* Form */}
      <form onSubmit={handleSubmit} className="px-4 pb-8 space-y-5">
        {/* Employee ID */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Employee ID
          </label>
          <div className="relative">
          <span className=" h-full p-2 roun-md absolute flex items-center justify-center top-0 left-2 "><User2Icon className="size-3"/></span>
          
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="EXP-7894-90"
            className="w-full rounded-lg pl-8 border border-gray-200 px-4 py-2.5 text-xs
                       focus:outline-none focus:ring-0.5 focus:ring-orange-400 focus:border-borderLine "
            required
          />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Password
          </label>
         <div className="relative">
          <span className=" h-full p-2 roun-md absolute flex items-center justify-center top-0 left-2 "><LockKeyhole className="size-3"/></span>
           <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full text-xs rounded-lg pl-8 border border-gray-200 px-4 py-2.5 
                       focus:outline-none focus:ring-0.5 focus:ring-orange-400 focus:border-borderLine"
            required
          />
         </div>
        </div>

        {/* Error */}
        {ErrorCode !="" && (
          <div className="text-sm text-red-600 bg-red-50 border border-borderLine rounded-lg px-3 py-2 flex items-center gap-2 transition-all">
             <Info className="size-4"/> {
              ErrorCode == "400" ? "Unauthorized Access": ErrorCode == "500" ?"Invaild Username / password": ErrorCode == "Failed to fetch"? "Unable to Fetch": "Invaild Username / password"
            }
          </div>
        )}

 <div className="flex justify-between">
       <div className="flex items-center">
            <input
            type="checkbox"
            id={"btn"}
            className=" text-gray-500 hover:text-orange-600 transition"
          />
          <label htmlFor="btn " className="text-xs text-gray-500">Remeber me</label>
         
            
       </div>
          
          <button
            type="button"
            className="text-xs text-gray-500 hover:text-orange-600 transition"
          >
            Forgot password?
          </button>
        </div>
        {/* Submit */}
        <button
          type="submit"
         disabled={LoginLoading}
          className="w-full mt-2 rounded-lg bg-primary  py-2.5 font-medium
                     text-white flex justify-center gap-4 text-xs hover:bg-primary/70 active:scale-[0.98] transition"
        >
           {!LoginLoading ? <p className="flex items-center gap-3"> <LogIn className="size-4"/> Sign In</p>: <div>signing....</div>}
        </button>

     
       
      </form>


    </div>
  </div></div>
  </div>
  

);

}
