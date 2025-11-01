import React, { useState } from 'react'
import  {FaEye,FaEyeSlash} from 'react-icons/fa'
import AuthLoaderButton from '../../components/AuthLoaderButton'
import {Formik,Form,ErrorMessage, Field} from 'formik'
import * as yup from 'yup'
import { axiosClient } from '../../utils/axiosClient'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { useMainContext } from '../../context/MainContext'
const ProfilePage = () => {
 
  const [loading,setLoading] = useState(false)
  const {fetchProfile,user} = useMainContext()
  const navigate = useNavigate()
  const validationSchema = yup.object({
    name:yup.string().required("Name is Required"),
    address:yup.string().optional(),
    mobile:yup.string().optional(),
  })

  const initialValues = {
   name:user.name || '',
   address:user.address ||'',
   mobile:user.mobile || ''
  }

  const onSubmitHandler =async(values,helpers)=>{
    try {
      setLoading(true)
     

      const response  = await axiosClient.put("/auth/profile",values,{
        headers:{
            'Authorization':'Bearer '+ localStorage.getItem("token")
        }
      })
      const data = await response.data 
      // console.log(data);
      toast.success(data.msg) 

      await fetchProfile()
      navigate("/") 
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
                            <label htmlFor="address">Address <span className="text-red-500">*</span></label>
                            <Field as="textarea" rows={3} autoComplete="off" name="address" id='address' type="text" className="w-full py-3 px-4 rounded border outline-none transition-all duration-300 border-gray-400 focus:ring-1" placeholder='Enter Your Address' />
                            <ErrorMessage name='address' className='text-red-500' component={'p'} />

                          </div>
                           
                               <div className="mb-3">
                            <label htmlFor="mobile">Mobile <span className="text-red-500">*</span></label>
                            <Field onInput={(e)=>{
                                e.target.value = e.target.value.replace(/[a-zA-Z]/g,"")
                            }} autoComplete="off" name="mobile" id='mobile' type="text" className="w-full py-3 px-4 rounded border outline-none transition-all duration-300 border-gray-400 focus:ring-1" placeholder='Enter Your Mobile' />
                            <ErrorMessage name='mobile' className='text-red-500' component={'p'} />

                          </div>

                          <div className="mb-3">
                            <AuthLoaderButton isLoading={loading} text={'Update'} />
                          </div>
                         

                          

                    </Form>
                    </Formik>
                  </div>
          
          </>

  )
}

export default ProfilePage