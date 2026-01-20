import { HeartPulse } from 'lucide-react'
import React from 'react'

const System = () => {
    return(
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* ================= LEFT COLUMN ================= */}
    <div className="bg-white rounded-2xl p-6 shadow space-y-6">
      <h2 className="text-sm font-semibold">Performance & Optimization</h2>

      {/* -------- Cache Configuration -------- */}
      <div className="space-y-4">
        <h3 className="text-xs font-semibold text-gray-700">
          Cache Configuration
        </h3>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-gray-700">
              Enable Caching
            </p>
            <p className="text-[11px] text-gray-500">
              Improve response times
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-orange-400 transition" />
            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-4" />
          </label>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-gray-600">
            Cache Duration (minutes)
          </label>
          <input
            type="number"
            defaultValue={60}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>

        <button className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium border border-orange-200 rounded-lg bg-orange-50 hover:bg-orange-100">
          Clear Cache
        </button>
      </div>

      {/* -------- Database Optimization -------- */}
      <div className="space-y-4 pt-4 border-t border-gray-100">
        <h3 className="text-xs font-semibold text-gray-700">
          Database Optimization
        </h3>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-gray-700">
              Auto-optimize Queries
            </p>
            <p className="text-[11px] text-gray-500">
              Automatically tune database performance
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-orange-400 transition" />
            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-4" />
          </label>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-gray-600">
            Maintenance Window
          </label>
          <input
            type="time"
            defaultValue="02:00"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
        </div>

        <button className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium border border-orange-200 rounded-lg bg-orange-50 hover:bg-orange-100">
          Optimize Now
        </button>
      </div>

      {/* -------- CDN & Load Balancing -------- */}
      <div className="space-y-4 pt-4 border-t border-gray-100">
        <h3 className="text-xs font-semibold text-gray-700">
          CDN & Load Balancing
        </h3>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-gray-700">
              Content Delivery Network
            </p>
            <p className="text-[11px] text-gray-500">
              Global content distribution
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-orange-400 transition" />
            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-4" />
          </label>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-gray-700">
              Load Balancing
            </p>
            <p className="text-[11px] text-gray-500">
              Distribute traffic across servers
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-9 h-5 bg-yellow-400 rounded-full peer-checked:bg-orange-400 transition" />
            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-4" />
          </label>
        </div>
      </div>

      {/* -------- System Health -------- */}
      <div className="pt-4 border-t border-gray-100">
        <div>
        <h3 className="text-xs p-2 items-center flex-col align-text-top font-semibold text-gray-700">
          <HeartPulse/>System Health
        </h3> 
        </div>
        
        <div className="bg-orange-50 rounded-xl p-4 flex justify-between text-center">
           
          <div>
            <p className="text-sm font-semibold">99.9%</p>
            <p className="text-[11px] text-gray-500">Uptime</p>
          </div>
          <div>
            <p className="text-sm font-semibold">245ms</p>
            <p className="text-[11px] text-gray-500">Response</p>
          </div>
          <div>
            <p className="text-sm font-semibold">0.2%</p>
            <p className="text-[11px] text-gray-500">Error Rate</p>
          </div>
        </div>
      </div>
    </div>

    {/* ================= RIGHT COLUMN ================= */}
    <div className="bg-white rounded-2xl p-6 shadow space-y-4">
      <h2 className="text-sm font-semibold">System Monitoring</h2>

      <div className="h-[420px] border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-xs text-gray-400">
        Monitoring charts, logs & alerts will appear here
      </div>
    </div>
  </div>
    )
}
export default System