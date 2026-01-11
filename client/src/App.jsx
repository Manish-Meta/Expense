import AuthenticateUser from "./pages/AuthenticateUser"
import SubmitExpense from "./pages/Dashboard/SubmitExpense"
import EmployeeDashboard from "./pages/Dashboard/EmployeeDashboard"
import Layout from "./pages/Layout"
import RoleSelection from "./pages/RoleSelectionBoard"

import { Routes, Route, Navigate } from "react-router-dom"

localStorage.setItem("login", "false")

const App = () => {
  return (
    <Routes>
     
      <Route path="/" element={<RoleSelection />} />

   
      <Route path="/login" element={<AuthenticateUser />} />

     
      <Route path="/employee" element={<Layout />}>
        <Route index element={<EmployeeDashboard />} />
        <Route path="submit" element={<SubmitExpense />} />
      </Route>

    
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
