import { createContext, useContext, useState } from "react";
const noteContext =createContext()

const ContextProvider = ({children})=>{
    const [user , setUser]=useState(null);

    const login=(resposeData)=>{
        localStorage.setItem('token',resposeData.token)
        setUser(resposeData.user)
        console.log(resposeData.user)

    }
    return(
        <noteContext.Provider value={{user, login}}>
              {children }
        </noteContext.Provider>
    )
}

export const useAuth = ()=> useContext(noteContext);
export default ContextProvider;