import React, { useState } from 'react'
import EmployeeDashboard from '../pages/Employee/EmployeeDashboard'
import EmployeeReports from '../pages/Employee/EmployeeReports'
import ValidatorDashboard from '../pages/Validator/ValidatorDashboard'
import ValidatorReport from '../pages/Validator/ValidatorReport'
import { Navigate, Routes, Route } from 'react-router-dom'
import SubmitExpense from '../pages/Dashboard/SubmitExpense'
import AdminAnalytics from "../pages/Admin/Analytics/AdminAnalytics"
import AdminAudit from '../pages/Admin/Audit&Compliance/Audit'
import useGlobalContext from '../config/GlobalStateContext'
import AdminDashboard from '../pages/Admin/AdminDashboard'

const Routters = () => {
const {selectedrole, localSelectedRole} = useGlobalContext()

const dashboardConfig = {
  employee: {
    default: "dashboard",
    routes: [
      { path: "dashboard", label: "Dashboard", element: <EmployeeDashboard /> },
      { path: "expense", label: "Dashboard", element: <SubmitExpense /> },
      { path: "report", label: "Report", element: <EmployeeReports /> }
    ]
  },
  validator: {
    default: "dashboard",
    routes: [
      { path: "dashboard", label: "Dashboard", element: <ValidatorDashboard /> },
      { path: "history", label: "history", element: <ValidatorReport /> }
    ]
  },
 
   admin: {
  default: "dashboard",
  routes: [
     { path: "dashboard", label: "Dashboard", element: <AdminDashboard/> },
    { path: "analytics", label: "Analytics", element: <AdminAnalytics /> },
    { path: "audit", label: "Audit", element: <AdminAudit/> }
  ],
},
}

 const config = dashboardConfig[localSelectedRole || selectedrole];
  return (
    <Routes>
      <Route index element={<Navigate to={config&&config?.default} replace />} />
      {config?.routes.map((r) => (
        <Route key={r?.path} path={r?.path} element={r.element} />
      ))}
    </Routes>
  );
}
666
export default Routters