import { createContext, useEffect, useMemo, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user,setUser] = useState(()=>{
        const storedUser = localStorage.getItem("user");
        return storedUser? JSON.parse(storedUser) : null;
    });
    useEffect(()=>{
        if(user){
            localStorage.setItem("user",JSON.stringify(user));
        }else{
            localStorage.removeItem("user");
        }
    },[user]);
    const value  = useMemo(()=>({user,setUser}),[user,setUser]);
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
