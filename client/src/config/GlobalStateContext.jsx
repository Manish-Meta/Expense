import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [selectedrole, setSelectedRole] = useState("admin" ||"");
  const [localSelectedRole, setLocalSelectedRole] = useState("");
  const [valid, setValid] = useState(false);
  const [userData, setUserData] = useState("");
 const [userLoggedIn, setUserLoggedIn] = useState(false);
const [authLoading, setAuthLoading] = useState(true);
const [SingleExpenseData, setSingleExpenseData] = useState(
          {
            exp_id: "",
            profile_id: "",
            amount: "",
            date: "",
            merchant: "",
            business_purpose: "",
            cat_name: "",
            advance_option: "",
            reciept: null,
            status: "",
            priority: "",
            compliance: "",
            next_level: "",
            created_at: "",
            updated_at: ""
          }

      )
const [closeEmailTab, setCloseEmailTab] = useState(false);
  const [editId, setEditId] = useState("");
 



     const check = async()=>{
    try{
       const url = fetch(`${import.meta.env.VITE_BACKEND_URL}user/profile?emp_status=${localStorage.getItem("rolee")}
 `, {
      method:'GET',
      credentials:'include'
    })
 
    const result = await url;
      if(result.status == 200){
   const data = await result.json();
   setUserLoggedIn(true)
   setAuthLoading(false)
  setUserData(data.data[0])
  setSelectedRole(data?.data[0]?.roles_name )
    }
    }

  catch(err){
     
      console.log(err)
    
  }
   
 
 
    }
 
 
useEffect(() => {
   
      check();
    
},[]);
 
useEffect(() => {
  if (userData) {
    console.log("User data updated:", userData);
  }
}, [userData]);
  return (
    <UserContext.Provider value={{userData,authLoading, setUserData, valid, setValid,userLoggedIn, setUserLoggedIn, localSelectedRole, setLocalSelectedRole,selectedrole, setSelectedRole,SingleExpenseData, setSingleExpenseData, closeEmailTab, setCloseEmailTab, editId, setEditId }}>
      {children}
    </UserContext.Provider>
  );
};  


const useGlobalContext =()=>{

    const dt = useContext(UserContext);
    return dt;
}
export default useGlobalContext;