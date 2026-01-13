import React from "react"
import React from "react"
import Layout from "./pages/Layout"
import AuthenticateUser from './pages/AuthenticateUser'
import RoleSelection from "./pages/RoleSelectionBoard"



import { Routes, Route, Navigate } from "react-router-dom"


import Routters from "./route/Routters"
// import useGlobalContext from './config/GlobalStateContext'
 
 localStorage.setItem("login","false");
 
const getLoggedIn = localStorage.getItem("login");
 
 
localStorage.setItem("login", "false")
 
const App = () => {
  const [role, setRole] = useState("employee")
  const [role, setRole] = useState("employee")
  return (
     <Routes>
          <Route path="/" element={<RoleSelection/>}/>
          <Route path="/login" element={<AuthenticateUser/>} />
          <Route path="/*" element={<Layout />}>
            <Route path="*" element={<Routters />} />
          </Route>
        </Routes>
     <Routes>
          <Route path="/" element={<RoleSelection/>}/>
          <Route path="/login" element={<AuthenticateUser/>} />
          <Route path="/*" element={<Layout />}>
            <Route path="*" element={<Routters />} />
          </Route>
        </Routes>
  )
}
 
export default App
 
 