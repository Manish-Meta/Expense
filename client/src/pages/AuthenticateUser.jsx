import React, { useState } from "react";
import useGlobalContext from "../config/GlobalStateContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {selectedrole, setSelectedRole} = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
   
  };

  return (
    <div className="flex bg-orange-50 items-center justify-center min-h-screen w-screen ">
      <div className="w-full max-w-md rounded-lg  p-8 border border-orange-200 bg-[#ffffff]">
        <h2 className="text-2xl font-bold text-center mb-6 brnd ">{selectedrole}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
               ID
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border-orange-200 border 
                         rounded-md  focus:outline-none focus:ring-orange-500 
                         focus:border-[#92400E] text-sm"
              placeholder="Exp-7894-90"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border-orange-200 border 
                         rounded-md  focus:outline-none focus:ring-orange-500 
                         focus:border-[#92400E] text-sm"
              placeholder="••••••••"
              required
            />
          
          </div>

{/* Error message  */}
         {/* <div className="text-xs p-2  bg-red-50 px-2 w-full rounded-md border border-red-300 ">
               invaild employee id / password </div> */}

          {/* Submit */}
         <div className="w-full flex justify-center">
           <button
            type="submit"
            className="w-32 bg-orange-500 text-white hover:bg-orange-600  border   text-black py-2 px-4 rounded-md 
                      text-sm "
          >
            Login
          </button>
         </div>
          
        </form>
        

        {/* Extra links */}
        <p className="mt-6 text-center text-sm text-gray-600">
          forget password?{" "}
          
        </p>
      </div>
    </div>
  );
}
