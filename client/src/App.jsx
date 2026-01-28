import React from "react"
import Layout from "./pages/Layout"
import AuthenticateUser from './pages/LoginPage/AuthenticateUser'
import RoleSelection from "./pages/RoleSelectionBoard"



import { Routes, Route, Navigate } from "react-router-dom"


import Routters from "./route/Routters"
import ProtectedRoute from "./route/ProtectedRoute"
import useGlobalContext from "./config/GlobalStateContext"
import PublicRoute from "./route/PublicRoute"
import NotFound from "./pages/NotFoundPage"
// import useGlobalContext from './config/GlobalStateContext'
 

 
const App = () => {
   const { userLoggedIn } = useGlobalContext();
   
 console.log(userLoggedIn)


  return (
    //  <Routes>
    //   <Route element={<PublicRoute/>}>
    //       <Route path="/" element={<AuthenticateUser/>} />
    //       </Route>
     
    //     <Route element={<ProtectedRoute/>} >
    // <Route path="/*" element={<Layout />}>
    //   <Route path="*" element={<Routters />} /> 
    //   </Route>
    //   </Route>

    //     </Routes>

   <Routes>
      <Route element={<PublicRoute/>}>
          <Route path="/" element={<AuthenticateUser/>} />
          </Route>
     
        {/* <Route element={<ProtectedRoute/>} > */}
    <Route path="/*" element={<Layout />}>
      <Route path="*" element={<Routters />} /> 
      </Route>
    

<Route path="*" element={<NotFound/>} />
        </Routes>
  ) 
}
 
export default App
 
 