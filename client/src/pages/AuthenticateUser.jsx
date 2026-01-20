import React, { useState } from "react";
import useGlobalContext from "../config/GlobalStateContext";
import { useNavigate } from "react-router-dom";
import { Check, Info } from "lucide-react";
import im from '../assets/loginbg.jpg'

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [LoginLoading, setLoginLoading] = useState(false);
  const [ErrorCode, setErrorCode] = useState('');
  const { selectedrole, setUserData, userData, setUserLoggedIn } =
    useGlobalContext();
  const navigate = useNavigate();
const APIs = import.meta.env.VITE_BACKEND_URL


  const handleSubmit = (e) => {
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
          fetch(`${APIs}user/profile`, {
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
      .catch((e) => setLoginLoading(false))
  };

  console.log(userData);

  return (
  <div className=" h-screen w-screen  p-2 rounded-xl flex items-center justify-center ">
  <div className="border border-orange-100 w-[800px] p-3 rounded-xl gap-2 flex">
      <div className="w-full lg:w-2/5 max-w-md bg-white rounded-2xl  overflow-hidden">
      
      {/* Header */}
      <div className="px-4 pt-8 pb-6 flex flex-col self-center">
        <div className="flex items-center gap-2">
         <p className=" w-12 h-12 flex items-center justify-center rounded-xl bg-orange-100 text-orange-600 text-xl font-bold"> EF</p>

         <div className="f">
           <h2 className="text-xl  text-gray-900">
          ExpenseFlow
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Sign in as <span className="font-medium text-orange-600">{selectedrole}</span>
        </p>
         </div>
        </div>
        
        
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-2 pb-8 space-y-5">
        {/* Employee ID */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Employee ID
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="EXP-7894-90"
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-xs
                       focus:outline-none focus:ring-0.5 focus:ring-orange-400 focus:border-orange-400"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full text-xs rounded-lg border border-gray-200 px-4 py-2.5 
                       focus:outline-none focus:ring-0.5 focus:ring-orange-400 focus:border-orange-400"
            required
          />
        </div>

        {/* Error */}
        {ErrorCode !="" && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 flex items-center gap-2">
             <Info className="size-4"/> {
              ErrorCode == "400" ? "Unauthorized Access": ErrorCode == "500" ?"Invaild Username / password":"Invaild Username / password"
            }
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-2 rounded-lg bg-orange-500 py-2.5 font-medium
                     text-white flex justify-center gap-4 text-xs hover:bg-orange-600 active:scale-[0.98] transition"
        >
          Sign In  {LoginLoading && <div className="custom-loader"></div>}
        </button>

        {/* Footer */}
        <div className="text-center">
          <button
            type="button"
            className="text-sm text-gray-500 hover:text-orange-600 transition"
          >
            Forgot password?
          </button>
        </div>
      </form>
    </div>
    <div className="lg:w-2/3 hidden  lg:flex ">
      <img src={"https://www.accountable.eu/wp-content/uploads/2024/08/e-invoicing_feature_expenses_mobile_en.webp"} alt="" className="w-full h-full object-cover rounded-xl "/>
    </div>
  </div>
  </div>
);

}
