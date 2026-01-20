import React from 'react'

const Organization = () => {
  return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* LEFT COLUMN — Organization Profile */}
    <div className="bg-white rounded-2xl p-6 shadow space-y-6">
      <h2 className="text-sm font-semibold">Organization Profile</h2>

      {/* Company Logo */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-gray-600">Company Logo</p>

        <div className="h-[350px] border-2 border-dashed border-orange-200 rounded-xl bg-[#fffaf4] flex flex-col items-center justify-center text-center gap-2">
          <p className="text-xs text-gray-500">
            300px × 300px PNG or JPG
          </p>
          <button className="px-3 py-1.5 text-xs font-medium bg-orange-400 text-white rounded-md">
            Upload Logo
          </button>
        </div>
      </div>

      {/* Organization Form */}
      <div className="space-y-3">
        <div className='space-y-4'>
          <label className="text-xs font-semibold">Organization Name</label>
        <input
          type="text"
          placeholder="Organization Name"
          className="w-full rounded-lg border mt-2 bg-orange-50  border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        </div>

        <div className="grid grid-cols-2 w-full gap-3">
          <div>
            <label className="text-xs font-semibold">Industry</label>
          <input
            type="text"
            placeholder="Industry"
            className="w-full rounded-lg bg-orange-50 border mt-2 border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          </div>
          <div>
            <label className="text-xs font-semibold">Employee Count</label>
          <input
            type="number"
            placeholder="Employee Count"
            className="w-full rounded-lg bg-orange-50 border mt-2 border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          </div>
        </div>
          <div>
            <label className="text-xs font-semibold">Primary Buisness address</label>
        <input
          type="text"
          placeholder="Business Address"
          className="w-full rounded-lg border mt-2 bg-orange-50  border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        </div>

        <div className="grid grid-cols-2 gap-3">

          <div>
             <label className="text-xs font-semibold">Phone Number</label>
            <input
            type="tel"
            placeholder="Phone Number"
            className="w-full rounded-lg border mt-2 bg-orange-50  border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          </div>
          <div>
            <label className="text-xs font-semibold">Employee Count</label>

            <input
            type="url"
            placeholder="Website URL"
            className="w-full rounded-lg border mt-2 bg-orange-50  border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          </div>
        </div>
      </div>
    </div>

    {/* RIGHT COLUMN — Financial Configuration */}
    <div className="bg-white rounded-2xl p-6 shadow space-y-4">
      <h2 className="text-sm font-semibold">Financial Configuration</h2>

      <div className="bg-white rounded-2xl p-6 space-y-6">
  {/* Heading */}
  <h2 className="text-sm font-semibold">Financial Configuration</h2>

  {/* ================= Currency Settings ================= */}
  <div className="space-y-4">
    <h3 className="text-xs font-semibold text-gray-700">
      Currency Settings
    </h3>

    {/* Default Currency */}
    <div className="space-y-1">
      <label className="text-xs text-gray-600">Default Currency</label>
      <select className="w-full rounded-lg border bg-orange-50  border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-300">
        <option>USD</option>
        <option>EUR</option>
        <option>INR</option>
      </select>
    </div>

    {/* Multicurrency Toggle */}
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-medium text-gray-700">
          Multicurrency Support
        </p>
        <p className="text-[11px] text-gray-500">
          Allow expenses in multiple currencies
        </p>
      </div>

      <label className="relative inline-flex cursor-pointer items-center">
        <input type="checkbox" className="sr-only peer" />
        <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-orange-400 transition" />
        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-4" />
      </label>
    </div>
  </div>

  {/* ================= Exchange Rate ================= */}
  <div className="space-y-4 pt-4 border-t border-gray-100">
    <h3 className="text-xs font-semibold text-gray-700">
      Exchange Rate Settings
    </h3>

    {/* Provider */}
    <div className="space-y-1">
      <label className="text-xs text-gray-600">
        Exchange Rate Provider
      </label>
      <select className="w-full rounded-lg border  bg-orange-50  border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-300">
        <option>XE Currency</option>
        <option>CurrencyLayer</option>
        <option>Fixer.io</option>
      </select>
    </div>

    {/* Auto Update Toggle */}
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-medium text-gray-700">
          Auto Update Rates
        </p>
        <p className="text-[11px] text-gray-500">
          Update exchange rates daily
        </p>
      </div>

      <label className="relative inline-flex cursor-pointer items-center">
        <input type="checkbox" className="sr-only peer" />
        <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-orange-400 transition" />
        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-4" />
      </label>
    </div>
  </div>

  {/* ================= Financial Year ================= */}
  <div className="space-y-4 pt-4 border-t border-gray-100">
    <h3 className="text-xs font-semibold text-gray-700">
      Financial Year Settings
    </h3>

    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1">
        <label className="text-xs text-gray-600">Start Month</label>
        <select className="w-full rounded-lg border  bg-orange-50  border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-300">
          <option>January</option>
          <option>April</option>
          <option>July</option>
          <option>October</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-xs text-gray-600">Current FY</label>
        <input
          type="text"
          value="2024"
          disabled
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs bg-gray-50 text-gray-500"
        />
      </div>
    </div>

          <p className="text-[11px] text-gray-500">
            Start month applies to all quarters
          </p>
        </div>

        {/* ================= Tax Configuration ================= */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h3 className="text-xs font-semibold text-gray-700">
            Tax Configuration
          </h3>

          <div className="space-y-1">
            <label className="text-xs text-gray-600">
              Tax Jurisdiction
            </label>
            <select className="w-full rounded-lg border bg-orange-50  border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-300">
              <option>United States</option>
              <option>European Union</option>
              <option>India</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-600">
              Tax Calculation Method
            </label>
            <select className="w-full rounded-lg border bg-orange-50  border-gray-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-300">
              <option>Tax Inclusive</option>
              <option>Tax Exclusive</option>
            </select>
          </div>
        </div>
        </div>

    </div>
  </div>
  )
}

export default Organization