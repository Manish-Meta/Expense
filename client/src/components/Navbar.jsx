import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import useGlobalContext from '../config/GlobalStateContext'
import {
  Search,
  Bell,
  Menu,
  User2,
  DollarSign,
  LayoutDashboardIcon,
  BadgeIndianRupee,
  ChartSpline,
  CircleX,
  PowerIcon,
} from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {userData} = useGlobalContext();
  const navigate = useNavigate()
  const location = useLocation()

  const goTo = (path) => {
    navigate(path)
    setIsOpen(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* TOP NAVBAR */}
      <nav className="w-full bg-white border-b border-[#d9770633] sticky top-0 z-50 px-4 py-2 flex items-center justify-between">
        {/* Search */}
        <div className="flex items-center w-full md:w-1/3 relative">
          <Search
            className="text-[#d97706] absolute top-2 left-2"
            size={16}
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-7 py-2 text-xs border border-[#d9770633] rounded focus:outline-none"
          />
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center space-x-4">
          <Bell className="text-gray-600 cursor-pointer" size={16} />
          <div className="flex items-center space-x-2 cursor-pointer">
            <User2 size={16} />
            <div>
              <p className="text-xs font-medium">{userData?.emp?.full_name}</p>
              <p className="text-[10px] text-orange-600">{userData?.roles_name}</p>
            </div>
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <Menu
            size={22}
            className="cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* MOBILE DRAWER */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3"
        >
          <CircleX className="text-red-400" size={20} />
        </button>

        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <span className="border border-orange-300 rounded-full p-2">
            <DollarSign />
          </span>
          <div>
            <h1 className="font-bold text-lg">Expense Tracker</h1>
            <p className="text-xs text-gray-500">Enterprise Suite</p>
          </div>
        </div>

        {/* MENU */}
        <ul className="px-4 space-y-2">
          <li
            onClick={() => goTo("/employee")}
            className={`flex items-center gap-2 p-3 text-xs font-medium rounded-lg cursor-pointer
              ${
                isActive("/employee")
                  ? "bg-orange-100 text-orange-700"
                  : "hover:bg-yellow-200"
              }`}
          >
            <LayoutDashboardIcon size={16} />
            Dashboard
          </li>

          <li
            onClick={() => goTo("/employee/submit")}
            className={`flex items-center gap-2 p-3 text-xs font-medium rounded-lg cursor-pointer
              ${
                isActive("/employee/submit")
                  ? "bg-orange-100 text-orange-700"
                  : "hover:bg-yellow-200"
              }`}
          >
            <BadgeIndianRupee size={16} />
            Submit Expense
          </li>

          <li
            className="flex items-center gap-2 p-3 text-xs font-medium rounded-lg hover:bg-yellow-200 cursor-pointer"
          >
            <ChartSpline size={16} />
            Expense Reports
          </li>
        </ul>

        {/* USER FOOTER */}
        <div className="absolute bottom-6 left-0 w-full px-4">
          <div className="bg-gray-100 p-3 rounded-xl flex items-center gap-3">
            <div className="bg-orange-400 p-2 rounded-full">
              <User2 className="text-white" size={16} />
            </div>
            <div>
              <p className="text-xs font-medium">Employee</p>
              <p className="text-[10px]">Marketing • employee</p>
            </div>
          </div>

          <button className="mt-3 text-xs flex items-center gap-2 mx-auto">
            <PowerIcon size={14} />
            Sign out
          </button>
        </div>
      </div>
    </>
  )
}

export default Navbar
