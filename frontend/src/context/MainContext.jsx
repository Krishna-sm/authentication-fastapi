import React, { createContext, useContext, useEffect, useState } from 'react'
import { axiosClient } from '../utils/axiosClient'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const mainContext = createContext()



export const useMainContext = ()=> useContext(mainContext)

export const MainContextProvider = ({children}) => {
    const navigate = useNavigate()

    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState(null)
    const fetchProfile=async()=>{
        try {
            const token = localStorage.getItem("token") || ""
            if(!token) return
            setLoading(true)
            const response = await axiosClient.get("/auth/profile",{
                headers:{
                    'Authorization':'Bearer '+ token
                }
            })
            const data = await response.data 
            setUser(data);
            
            
        } catch (error) {
            
        }finally{
            setLoading(false)
        }
    }


const LogoutHandler=()=>{
    localStorage.removeItem("token")
    toast.success("logout Success")
    setUser(null)
navigate("/login")
}

    useEffect(()=>{
        fetchProfile()
    },[])

    if(loading){
        return <div>loading....</div>
    }

  return (
    <mainContext.Provider value={{fetchProfile,user,LogoutHandler}}>{children}</mainContext.Provider>
  )
}

export default MainContextProvider