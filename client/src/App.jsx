import AuthenticateUser from "./pages/AuthenticateUser"
import SubmitExpense from "./pages/Dashboard/SubmitExpense"
import EmployeeDashboard from "./pages/Dashboard/EmployeeDashboard"
import Layout from "./pages/Layout"



import { Routes, Route, Navigate } from "react-router-dom"


import RoleSelection from './pages/RoleSelectionBoard'

import EmployeeReports from './pages/reports/EmployeeReports'
// import useGlobalContext from './config/GlobalStateContext'

 localStorage.setItem("login","false");

const getLoggedIn = localStorage.getItem("login");


localStorage.setItem("login", "false")

const App = () => {
  return (
    <Routes>

     
      <Route path="/" element={<RoleSelection />} />

   
      <Route path="/login" element={<AuthenticateUser />} />

     
      <Route path="/employee" element={<Layout />}>
        <Route index element={<EmployeeDashboard />} />
        <Route path="submit" element={<SubmitExpense />} />
        <Route path="reports" element={<EmployeeReports/>}/>
      </Route>

=======
      <Route path="/" element={<RoleSelection/>}/>
      <Route path="/login" element={<AuthenticateUser/>}/>
      <Route path="/employee" element={<Layout/>}/>
      {/* <Route path="/employee/reports" element={<EmployeeReports/>}/> */}

    
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
