import React, { useState } from "react";
import useGlobalContext from "../config/GlobalStateContext";
import { useNavigate } from "react-router-dom";
import { Check, Info } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [LoginLoading, setLoginLoading] = useState(false);
  const [seterror, setError] = useState(false);
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
           else{
             setLoginLoading(false)
            setError(true)
        }
      })
      .catch((e) => setLoginLoading(false))
  };

  console.log(userData);

  return (
  <div className="min-h-screen w-screen flex items-center justify-center bg-linear-to-br from-orange-50 via-white to-orange-100">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden">
      
      {/* Header */}
      <div className="px-8 pt-8 pb-6 flex flex-col self-center">
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
      <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-5">
        {/* Employee ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Employee ID
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="EXP-7894-90"
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm
                       focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            required
          />
        </div>

        {/* Error */}
        {seterror && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 flex items-center gap-2">
           <Info className="size-4"/> Invalid {selectedrole} ID or password
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
  </div>
);

}
