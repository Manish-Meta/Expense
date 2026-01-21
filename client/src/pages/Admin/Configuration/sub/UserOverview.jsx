import { ArrowRight } from "lucide-react";
import {useState,useEffect} from "react";
export default function UserOverview() {
  const[overview,setOverview]=useState(null)
  useEffect(()=>{
    fetch(`${import.meta.env.VITE_BACKEND_URL}user/overview`,{
      method:"GET",

    })
    .then(res=>res.json())
    .then(data=>{
      setOverview(data)
    })
  },[])
  if(!overview){
    return null
  }
  return (
    <div className="bg-white rounded-2xl p-6 shadow space-y-5">
      <h3 className="text-xs font-semibold">User Overview</h3>

      <div className="bg-[#fff3e8] rounded-xl py-6 text-center">
        <p className="text-2xl font-bold text-orange-600">{overview.total_users}</p>
        <p className="text-[11px] text-orange-600">Total Users</p>
      </div>

      
      <div className="grid grid-cols-2 text-center">
        <div className="opacity-40">
          <p className="text-lg font-semibold">{overview.active_users}</p>
          <p className="text-[11px] text-orange-600">Active</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-black">{overview.pending_users}</p>
          <p className="text-[11px] text-orange-600">Pending</p>
        </div>
      </div>

      <div className="pt-3 border-t space-y-3">
        <p className="text-xs font-semibold">Role Distribution</p>

        {overview?.role_distribution?.map((r) => (
          <div
            key={r.role_name}
            className="flex justify-between items-center text-xs"
          >
            <span className="text-gray-600">{r.role_name}</span>

       
            <div className="flex items-center gap-2 text-orange-600 font-medium">
              <span>{r.count}</span>
              <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
