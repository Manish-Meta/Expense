import {
  DollarSign,
  User2,
  LogOut,
  LucideReceiptIndianRupee,
  LucideIndianRupee,
  AudioWaveformIcon,
  BadgeIndianRupee,
} from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useGlobalContext from "../config/GlobalStateContext";
import {
  adminNavLink,
  employeeNavLink,
  validatorNavLink,
} from "../data/NavLinks";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    selectedrole,
    userData,
    setUserData,
  } = useGlobalContext();

  const [isActive, setIsActive] = useState(location.pathname);

  let selectedRoleFields;

  switch (selectedrole) {
    case "employee":
      selectedRoleFields = employeeNavLink;
      break;
    case "admin":
      selectedRoleFields = adminNavLink;
      
      break;
    case "validator":
      selectedRoleFields = validatorNavLink;
      break;
  }

  function changeRoute(elink) {
    setIsActive(elink);
    navigate(elink);
  }

  function logout() {
    fetch(`${import.meta.env.VITE_BACKEND_URL}user/logout`, {
      credentials: "include",
      method: "GET",
    });

    localStorage.clear("login");
    setUserData("");
    navigate("/");
  }

  return (
    <aside className="hidden lg:flex flex-col w-[260px] h-screen bg-white border-r border-gray-200">

      {/* ---------- Logo ---------- */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 border border-gray-200 rounded-md">
            <BadgeIndianRupee  className="size-7 text-gray-700" />
          </div>

          <div>
            <h1 className="text-md font-bold text-indigo-800">
              Xpenra
            </h1>
            <p className="text-[11px] text-gray-400">
              Enterprise Suite
            </p>
          </div>
        </div>
      </div>

      {/* ---------- Navigation ---------- */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1 text-xs">

          {selectedRoleFields &&
            selectedRoleFields.map((e) => {
              const Icon = e.Icon;
              const active = isActive === e.link;

              return (
                <li
                  key={e.link}
                  onClick={() => changeRoute(e.link)}
                  className={`group relative flex items-center gap-3 px-3 py-2 cursor-pointer rounded-md transition-all
                    ${
                      active
                        ? "bg-indigo-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50"
                    }
                  `}
                >
                  {/* Active Indicator */}
                  {active && (
                    <span className="absolute left-0 top-0 h-full w-[3px] bg-indigo-600 rounded-r-sm" />
                  )}

                  {Icon && (
                    <Icon
                      className={`size-4 ${
                        active
                          ? "text-gray-900"
                          : "text-gray-500 group-hover:text-gray-700"
                      }`}
                    />
                  )}

                  <span className="font-medium">{e.nav}</span>
                </li>
              );
            })}
        </ul>
      </nav>

      {/* ---------- User Footer ---------- */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-gray-200 flex items-center justify-center">
              <User2 className="size-4 text-gray-600" />
            </div>

            <div className="leading-tight">
              <p className="text-xs font-medium text-indigo-600">
                {userData?.profile?.full_name}
              </p>

              <p className="text-[11px] text-gray-500">
                {userData?.dept_name} • {userData?.roles_name}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-2 rounded-md hover:bg-gray-100 transition"
          >
            <LogOut className="size-4 text-gray-500 cursor-pointer hover:text-indigo-600" />
          </button>

        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
