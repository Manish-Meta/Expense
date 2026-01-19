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
import AdminConfig from '../pages/Admin/Configuration/AdminConfig'
import NotFound from '../pages/NotFoundPage'
import Apporvals from '../pages/Admin/Apporvals/Apporvals'

const Routters = () => {
const {selectedrole, localSelectedRole} = useGlobalContext()

const dashboardConfig = {
  employee: {
    default: "dashboard",
    routes: [
      { path: "dashboard", label: "Dashboard", element: <EmployeeDashboard /> },
      { path: "expense", label: "Dashboard", element: <SubmitExpense /> },
      { path: "report", label: "Report", element: <EmployeeReports /> },
      { path: "*", label: "Report", element: <NotFound/> }
    ]
  },
  validator: {
    default: "dashboard",
    routes: [
      { path: "dashboard", label: "Dashboard", element: <ValidatorDashboard /> },
      { path: "history", label: "history", element: <ValidatorReport /> },
        { path: "*", label: "Report", element: <NotFound/> }
    ]
  },
 
   admin: {
  default: "dashboard",
  routes: [
     { path: "dashboard", label: "Dashboard", element: <AdminDashboard/> },
     { path: "approvals", label: "Dashboard", element: <Apporvals/> },
    { path: "analytics", label: "Analytics", element: <AdminAnalytics /> },
    { path: "audit", label: "Audit", element: <AdminAudit/> },
    { path: "configuration", label: "Configuration", element: <AdminConfig/>},
    { path: "audit", label: "Audit", element: <AdminAudit/> },
      { path: "*", label: "Report", element: <NotFound/> }
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