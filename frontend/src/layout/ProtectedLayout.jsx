import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useMainContext } from '../context/MainContext'

const ProtectedLayout = () => {

    const {user} = useMainContext() 
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(()=>{
        if(!user){
            
            // return <Navigate to={'/login'} />
            navigate("/login")
        }else{
                setLoading(false)
        }
    },[user])
  
    if(loading){
        return <div>loading...</div>
    }

  return (
    <>
        <Outlet/>
    </>
  )
}

export default ProtectedLayout