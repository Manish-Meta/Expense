import React, { useEffect, useState } from "react";
import useGlobalContext from "../../config/GlobalStateContext";
import { useNavigate } from "react-router-dom";
import {
  Info,
  LockKeyhole,
  LogIn,
  ReceiptIndianRupee,
  ShieldCheck,
  User2Icon,
  UserCheck2,
  UserCheck2Icon,
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [LoginLoading, setLoginLoading] = useState(false);
  const [ErrorCode, setErrorCode] = useState("");
  const { selectedrole, setSelectedRole, setUserData, userData, setUserLoggedIn } =
    useGlobalContext();
  const navigate = useNavigate();

  const APIs = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = (e) => {
    localStorage.setItem("rolee", selectedrole);
    setLoginLoading(true);
    e.preventDefault();
    fetch(`${APIs}user/login`, {
      method: "POST",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        emp_id: email,
        password: password,
        emp_status: selectedrole,
      }),
    })
      .then((e2) => {
        if (e2.status == 200) {
          fetch(`${APIs}user/profile?emp_status=${selectedrole}`, {
            method: "GET",
            credentials: "include",
          })
            .then((e) => e.json())
            .then((data) => {
              console.log(data.data[0]), setUserData(data.data[0]);
            });
          setUserLoggedIn(true);

          localStorage.setItem("login", true);
          setLoginLoading(true);
          navigate("/dashboard");
        } else if (e2.status == 400) {
          setErrorCode("400");
        } else if (e2.status == 500) {
          setErrorCode("500");
        } else {
          setLoginLoading(false);
          setError(true);
        }
      })
      .catch((e) => {
        setLoginLoading(false);
        setErrorCode(e.message);
        setLoginLoading(true);
      })
      .finally(() => {
        setTimeout(() => {
          setErrorCode("");
        }, 3000);
        setLoginLoading(false);
      });
  };

  const empData = [
    { icon: User2Icon, title: "Employee Portal", desc: "Expense Submitter" },
    { icon: UserCheck2, title: "Validator Portal", desc: "Pre-Validation & Review" },
    { icon: ShieldCheck, title: "Admin Dashboard", desc: "Management & Configuration" },
  ];

  const matchedEmpData = empData.filter((e) =>
    e?.title.toLowerCase().includes(selectedrole?.toLowerCase())
  );

  const Icon = matchedEmpData[0]?.icon;

  return (
    <div className="h-screen flex">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-1/2 bg-indigo-600 text-white p-12 items-center">
        <div className="max-w-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 rounded-md">
              <ReceiptIndianRupee size={28} />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Xpenra</h2>
              <p className="text-xs text-gray-50 opacity-80">Enterprise Expense Suite</p>
            </div>
          </div>

          <h3 className="text-4xl font-bold leading-tight">
            Streamline Your Expense Management
          </h3>

          <p className="text-gray-50 opacity-80 text-sm">
            Banking-grade expense platform with AI-powered validation,
            real-time approvals, and enterprise compliance workflows.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md bg-white border-t-2 border-indigo-600 rounded-md shadow-lg">

          {/* HEADER */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Welcome back
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Sign in as{" "}
              <span className="font-medium text-indigo-600">
                {selectedrole}
              </span>
            </p>
          </div>

          {/* ROLE SELECTOR */}
          <div className="grid grid-cols-3 font-medium text-xs border-b border-gray-200 cursor-pointer">
            {["Employee", "Validator", "Admin"].map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role.toLowerCase())}
                className={`py-3 transition ${
                  selectedrole === role.toLocaleLowerCase()
                    ? "bg-indigo-100 border-b-2 border-indigo-600 text-indigo-600 font-semibold"
                    : "hover:bg-gray-50 text-gray-500"
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* ROLE INFO */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex gap-3 bg-gray-50 p-3 rounded-md">
              <div className="p-2 bg-white border rounded-md">
                {Icon && <Icon size={16} />}
              </div>
              <div>
                <p className="text-xs text-indigo-600 font-medium">
                  {matchedEmpData[0]?.title}
                </p>
                <p className="text-[11px] text-gray-500">
                  {matchedEmpData[0]?.desc}
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">

            {/* Employee ID */}
            <div>
              <label className="text-xs font-medium text-gray-600">
                Employee ID
              </label>
              <div className="relative mt-1">
                <User2Icon size={14} className="absolute left-3 top-3 text-gray-400"/>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EXP-7894-90"
                  className="w-full pl-9 py-2 border border-gray-200 rounded-md text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-medium text-gray-600">
                Password
              </label>
              <div className="relative mt-1">
                <LockKeyhole size={14} className="absolute left-3 top-3 text-gray-400"/>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 py-2 border border-gray-200 rounded-md text-xs focus:ring-1 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* ERROR */}
            {ErrorCode !== "" && (
              <div className="text-xs text-red-600 bg-red-50 border border-red-200 p-2 rounded-md flex gap-2 items-center">
                <Info size={14} />
                {ErrorCode == "400"
                  ? "Unauthorized Access"
                  : ErrorCode == "500"
                  ? "Invalid Username / password"
                  : "Unable to login"}
              </div>
            )}

            {/* ACTIONS */}
            <div className="flex justify-between text-xs text-gray-500">
              <label className="flex gap-2 items-center">
                <input type="checkbox" />
                Remember me
              </label>
              <button type="button" className="hover:text-indigo-600">
                Forgot password?
              </button>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={LoginLoading}
              className="w-full py-3 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-md flex justify-center gap-2 items-center transition"
            >
              {!LoginLoading ? (
                  <>
                    <LogIn size={14} /> Sign In
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    <span>Loading</span>
                  </div>
                )}

            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
