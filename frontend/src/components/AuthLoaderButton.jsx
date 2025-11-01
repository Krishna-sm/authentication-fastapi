import React from 'react'
import { CgSpinner } from 'react-icons/cg'
import { FaArrowRight } from 'react-icons/fa'

const AuthLoaderButton = ({
    isLoading=false,
    text ,
    className=''
}) => {

    
  return (
    <button disabled={isLoading} className={'flex items-center justify-center bg-blue-600 disabled:bg-blue-900  w-full py-3 rounded cursor-pointer border-none text-white gap-x-2 outline-none disabled:cursor-no-drop'+className}>
        <span>{text}</span>
        { isLoading ?  <CgSpinner className='animate-spin text-xl text-white' />: <FaArrowRight/>}
    </button>
  )
}

export default AuthLoaderButton