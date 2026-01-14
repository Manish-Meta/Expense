import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [selectedrole, setSelectedRole] = useState("admin");
  const [localSelectedRole, setLocalSelectedRole] = useState("");
  const [valid, setValid] = useState(false);
  return (
    <UserContext.Provider value={{valid, setValid, localSelectedRole, setLocalSelectedRole,selectedrole, setSelectedRole }}>
      {children}
    </UserContext.Provider>
  );
};  


const useGlobalContext =()=>{

    const dt = useContext(UserContext);
    return dt;
}
export default useGlobalContext;