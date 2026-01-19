import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [selectedrole, setSelectedRole] = useState("");
  const [localSelectedRole, setLocalSelectedRole] = useState("");
  const [valid, setValid] = useState(false);
  const [userData, setUserData] = useState("");
 const [userLoggedIn, setUserLoggedIn] = useState(false);
const [authLoading, setAuthLoading] = useState(true);
 
//   console.log(selectedrole)


     const check = async()=>{
 
     const url = fetch("https://z6n0fcp0-5000.inc1.devtunnels.ms/user/profile", {
      credentials: "include",
    })
 
    const result = await url;
   
    if(result.status == 200){
   const data = await result.json();
   setUserLoggedIn(true)
   setAuthLoading(false)
  setUserData(data.data[0])
  setSelectedRole(data?.data[0]?.roles_name)
    }
   
 
 
    }
 
 
  useEffect(() => {
  check();
}, []);
 
useEffect(() => {
  if (userData) {
    console.log("User data updated:", userData);
  }
}, [userData]);
  return (
    <UserContext.Provider value={{userData,authLoading, setUserData, valid, setValid,userLoggedIn, setUserLoggedIn, localSelectedRole, setLocalSelectedRole,selectedrole, setSelectedRole }}>
      {children}
    </UserContext.Provider>
  );
};  


const useGlobalContext =()=>{

    const dt = useContext(UserContext);
    return dt;
}
export default useGlobalContext;