import AuthenticateUser from "./pages/AuthenticateUser"
import SubmitExpense from "./pages/Dashboard/SubmitExpense"
import EmployeeDashboard from "./pages/Dashboard/EmployeeDashboard"
import Layout from "./pages/Layout"
import RoleSelection from "./pages/RoleSelectionBoard"

<<<<<<< HEAD
import { Routes, Route, Navigate } from "react-router-dom"
=======
import Layout from './pages/Layout'
import RoleSelection from './pages/RoleSelectionBoard'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import EmployeeReports from './pages/reports/EmployeeReports'
// import useGlobalContext from './config/GlobalStateContext'

 localStorage.setItem("login","false");

const getLoggedIn = localStorage.getItem("login");
>>>>>>> 336f38e098347c378a49421247da3b036c3b5a30

localStorage.setItem("login", "false")

const App = () => {
  return (
    <Routes>
<<<<<<< HEAD
     
      <Route path="/" element={<RoleSelection />} />

   
      <Route path="/login" element={<AuthenticateUser />} />

     
      <Route path="/employee" element={<Layout />}>
        <Route index element={<EmployeeDashboard />} />
        <Route path="submit" element={<SubmitExpense />} />
      </Route>

=======
      <Route path="/" element={<RoleSelection/>}/>
      <Route path="/login" element={<AuthenticateUser/>}/>
      <Route path="/employee" element={<Layout/>}/>
      <Route path="/employee/reports" element={<EmployeeReports/>}/>
>>>>>>> 336f38e098347c378a49421247da3b036c3b5a30
    
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
