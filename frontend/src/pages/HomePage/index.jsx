import React from 'react'
import { useMainContext } from '../../context/MainContext'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const {user} = useMainContext()
  return (
    <>
          <div className="min-h-[60vh] flex justify-center items-center">
            <div className="py-10 px-5 lg:w-1/2 w-[96%] bg-black/90 rounded ">
              <h3 className="text-white text-4xl font-bold">Name: {user.name}</h3>
              <h3 className="text-white text-4xl font-bold">Email: {user.email}</h3>
              <h3 className="text-white text-4xl font-bold">Address: {user.address}</h3>
              <h3 className="text-white text-4xl font-bold">Mobile: {user.mobile}</h3>
             <div className="py-10">
               <Link to={'/profile'} className='px-6 py-2 bg-blue-700 text-white rounded border-none outline-none'>
              Update</Link>
             </div>
            </div>
          </div>
    </>
  )
}

export default HomePage