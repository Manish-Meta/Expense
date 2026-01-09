import { useState } from "react"
import { User, Shield, Settings } from "lucide-react"
import RoleCard from "../components/RoleCard"
import useGlobalContext from "../config/GlobalStateContext"
import { useNavigate } from "react-router-dom"

export default function RoleSelection() {
  const {selectedrole, setSelectedRole} = useGlobalContext()
  const navigate = useNavigate()


  const nextToLogin =()=>{
    navigate('/login')
   
  }
  return (
    <div className="bg-[#fff7ed] h-screen">
      <div className="max-w-6xl mx-auto p-6 ">

        <div className="text-center mb-10">
          <h1 className="text-md font-medium text-gray-900">
            Choose Your Interface
          </h1>
          <p className=" text-xs text-orange-400">
            Select your role to access the appropriate workspace
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 ">

          <RoleCard
            title="Employee Portal"
            subtitle="Expense Submitter Interface"
            description="Submit expenses, track approvals, and manage your personal expense reports with AI-powered assistance."
            features={[
              "Smart expense capture with OCR",
              "Real-time approval status",
              "Mobile-first experience",
              "+2 more features",
            ]}
            user={{
              name: "Sarah Johnson",
              department: "Marketing",
              initials: "SJ",
            }}
            icon={<User size={22} />}
            selected={selectedrole === "employee"}
            onClick={() => setSelectedRole("employee")}
          />

          <RoleCard
            title="Validator Dashboard"
            subtitle="Pre-Validation & Review Interface"
            description="Pre-validate employee expenses before finance review with comprehensive audit tools."
            features={[
              "Expense pre-validation workflows",
              "Policy compliance monitoring",
              "Audit trail management",
              "+2 more features",
            ]}
            user={{
              name: "David Martinez",
              department: "Operations",
              initials: "DM",
            }}
            icon={<Shield size={22} />}
            selected={selectedrole === "validator"}
            onClick={() => setSelectedRole("validator")}
          />

          <RoleCard
            title="Admin Dashboard"
            subtitle="Management & Configuration Interface"
            description="Comprehensive oversight of organizational expense management with advanced analytics."
            features={[
              "Advanced approval workflows",
              "AI-powered fraud detection",
              "Comprehensive analytics",
              "+2 more features",
            ]}
            user={{
              name: "Michael Chen",
              department: "Finance",
              initials: "MC",
            }}
            icon={<Settings size={22} />}
            selected={selectedrole === "admin"}
            onClick={() => setSelectedRole("admin")}
          />

        </div>

        <div className="mt-6 text-center">
          <button onClick={nextToLogin}
            disabled={!selectedrole}
            className={`
              px-6 py-3 rounded-xl text-xs font-medium transition
              ${
                selectedrole
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "bg-orange-200 text-white cursor-not-allowed"
              }
            `}
          >
            {selectedrole
              ? `Continue as ${selectedrole.charAt(0).toUpperCase() + selectedrole.slice(1)}`
              : "Select a Role to Continue"}
          </button>
        </div>

      </div>
    </div>
  )
}