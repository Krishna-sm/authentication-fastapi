import React, { useState } from 'react'
import  {FaEye,FaEyeSlash} from 'react-icons/fa'
import AuthLoaderButton from '../../components/AuthLoaderButton'
import {Formik,Form,ErrorMessage, Field} from 'formik'
import * as yup from 'yup'
import { axiosClient } from '../../utils/axiosClient'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { useMainContext } from '../../context/MainContext'
const RegisterPage = () => {
  const {fetchProfile}= useMainContext()
  const navigate = useNavigate()

  const [isHide,setisHide] = useState(true)
  const [loading,setLoading] = useState(false)
  const validationSchema = yup.object({
    name:yup.string().required("Name is Required"),
    email:yup.string().email("Email must be valid").required("Email is Required"),
    password:yup.string().required("password is Required")
  })

  const initialValues = {
    name:'',
    email:'',
    password:''
  }

  const onSubmitHandler =async(values,helpers)=>{
    try {
      setLoading(true)
     

      const response  = await axiosClient.post("/auth/register",values)
      const data = await response.data 
      // console.log(data);
      toast.success(data.msg)

      localStorage.setItem("token",data.token)
      await fetchProfile()
      navigate("/")

      helpers.resetForm()
    } catch (error) {
      toast.error(error.response.data.detail || error.message)
      
    }finally{
      setLoading(false)
    }
  }
 
  return (
  
          <>
                  <div className="min-h-[80vh] flex justify-center items-center">
                  <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmitHandler}>
                    <Form className='w-[96%] mx-auto py-10 px-8 bg-black/80 lg:w-1/2 border border-gray-500 rounded-2xl shadow'>
                          <div className="mb-3">
                            <label htmlFor="name">Name <span className="text-red-500">*</span></label>
                            <Field autoComplete="off" name="name" id='name' type="text" className="w-full py-3 px-4 rounded border outline-none transition-all duration-300 border-gray-400 focus:ring-1" placeholder='Enter Your Name' />
                            <ErrorMessage name='name' className='text-red-500' component={'p'} />
                          </div>

                           <div className="mb-3">
                            <label htmlFor="email">Email <span className="text-red-500">*</span></label>
                            <Field autoComplete="off" name="email" id='email' type="email" className="w-full py-3 px-4 rounded border outline-none transition-all duration-300 border-gray-400 focus:ring-1" placeholder='Enter Your Email' />
                            <ErrorMessage name='email' className='text-red-500' component={'p'} />

                          </div>

                           <div className="mb-3">
                            <label htmlFor="password">Password <span className="text-red-500">*</span></label>
                            <div className=" rounded border outline-none transition-all duration-300 border-gray-400 focus:ring-1 flex justify-between px-4 align-center" >

                            <Field autoComplete="off" name="password" id='password' type={isHide? "password":"text" }className="w-full py-3 outline-none border-none " placeholder='Enter Your Password' />
                            <button onClick={()=>setisHide(!isHide)} type='button' className='text-2xl'>
                              {
                                isHide ? <FaEye/>: <FaEyeSlash/>
                              }
                            </button>
                            </div>
                            <ErrorMessage name='password' className='text-red-500' component={'p'} />

                          </div>

                          <div className="mb-3">
                            <AuthLoaderButton isLoading={loading} text={'Register'} />
                          </div>
                          <div className="mb-3">
                            <p className="text-end">
                              Already Have An Account ? <Link className='text-blue-500 font-bold' to={'/login'}>Login</Link>
                            </p>
                          </div>

                          

                    </Form>
                    </Formik>
                  </div>
          
          </>

  )
}

export default RegisterPage