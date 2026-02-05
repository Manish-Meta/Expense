import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import useGlobalContext from '../config/GlobalStateContext'
import {
  Search,
  Bell,
  Menu,
  User2,
  DollarSign,
  CircleX,
  LogOut,
  User,
} from "lucide-react"
import { adminNavLink, employeeNavLink, validatorNavLink } from "../data/NavLinks"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const { userData, selectedrole, setUserData } = useGlobalContext()
  const navigate = useNavigate()
  const location = useLocation()

  const goTo = (path) => {
    navigate(path)
    setIsOpen(false)
  }

  const isActive = (path) => location.pathname === path

  let selectedRoleFields

  switch (selectedrole) {
    case "employee":
      selectedRoleFields = employeeNavLink
      break
    case "admin":
      selectedRoleFields = adminNavLink
      break
    case "validator":
      selectedRoleFields = validatorNavLink
      break
  }

  function logout() {
    fetch(`${import.meta.env.VITE_BACKEND_URL}user/logout`, {
      credentials: "include",
      method: "GET",
    })
      .then((e) => console.log(e.json()))
      .then((e) => console.log(e))
    setUserData("")
    navigate("/")
  }

  const currentPath = useLocation().pathname

  return (
    <>
      {/* TOP NAVBAR */}
      <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 px-6 h-14 flex items-center justify-between">

        {/* Search */}
        <div className="flex items-center w-full md:w-1/3 relative">
          <Search className="absolute left-3 text-gray-400" size={14} />

          <input
            type="text"
            placeholder="Search..."
            className="
              w-full pl-9 pr-3 py-1.5
              text-xs
              border border-gray-200
              rounded-md
              bg-gray-50
              focus:bg-white
              focus:outline-none
              focus:ring-1 focus:ring-gray-300
              transition
            "
          />
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-5 relative">

          {/* Notification */}
          <button className="p-2 rounded-md hover:bg-gray-100 transition">
            <Bell className="text-gray-600" size={16} />
          </button>

          {/* Profile */}
          <div className="relative">
            <div
              onClick={() => setProfileOpen(!profileOpen)}
              className="
                flex items-center gap-2 cursor-pointer
                px-2 py-1 rounded-md
                hover:bg-gray-100 transition
              "
            >
              <User2 size={16} className="text-gray-600" />

              <div className="leading-tight">
                <p className="text-xs font-medium text-indigo-600">
                  {userData?.profile?.full_name}
                </p>
                <p className="text-[11px] text-gray-600">
                  {userData?.roles_name}
                </p>
              </div>
            </div>

            {/* Dropdown */}
            <div
              className={`
                absolute right-0 mt-2 w-48
                bg-white border border-gray-200
                rounded-md shadow-sm
                transition-all duration-150 origin-top
                ${profileOpen
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-95 invisible"}
              `}
            >
              <button
                onClick={logout}
                className="
                  w-full flex items-center gap-2
                  px-3 py-2 text-xs text-gray-700
                  hover:bg-gray-50 transition cursor-pointer
                "
              >
                <LogOut size={14} />
                Logout
              </button>
              <button
                onClick={""}
                className="
                  w-full flex items-center gap-2
                  px-3 py-2 text-xs text-gray-700
                  hover:bg-gray-50 transition cursor-pointer
                "
              >
                <User size={14} />
                View Profile
              </button>
            </div>
          </div>

        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Menu
            size={22}
            className="cursor-pointer text-gray-700"
            onClick={() => setIsOpen(true)}
          />
        </div>

      </nav>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* MOBILE DRAWER */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3"
        >
          <CircleX className="text-gray-500" size={20} />
        </button>

        {/* Logo */}
        <div className="p-6 flex items-center gap-3 border-b border-gray-200">
          <span className="border border-gray-300 rounded-md p-2">
            <DollarSign size={18} />
          </span>

          <div>
            <h1 className="font-semibold text-base">
              Expense Tracker
            </h1>
            <p className="text-xs text-gray-400">
              Enterprise Suite
            </p>
          </div>
        </div>

        {/* MENU */}
        <ul className="px-4 py-4 space-y-1">
          {selectedRoleFields?.map((e) => (
            <li
              key={e.link}
              onClick={() => navigate(e.link)}
              className={`
                flex items-center gap-3
                px-3 py-2 text-xs
                rounded-md cursor-pointer transition
                ${currentPath === e.link
                  ? "bg-gray-100 font-medium"
                  : "hover:bg-gray-50"}
              `}
            >
              <e.Icon size={16} />
              {e.nav}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="absolute bottom-6 left-0 w-full px-4">
          <button
            onClick={logout}
            className="
              w-full flex items-center gap-2
              px-3 py-2 text-xs
              border border-gray-200
              rounded-md
              hover:bg-gray-50 transition
            "
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </div>
    </>
  )
}

export default Navbar
