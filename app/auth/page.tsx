'use client'
import { axiosInstance } from '@/helper/api'
import { storesCookie } from '@/helper/client.cookkie'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useFormik } from "formik"
import * as Yup from 'yup'

const RegisterPage = () => {
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response: any = await axiosInstance.post('/register', {
          name: values.name,
          email: values.email,
          password: values.password,
        })

        storesCookie('token', response.data.token)
        storesCookie('role', response.data.role)

        toast(response.data.message || 'Registration successful', {
          containerId: 'toastRegister',
          type: 'success',
        })

        // Redirect setelah register
        setTimeout(() => router.replace('/'), 1000)

      } catch (error: any) {
        console.log(error)
        toast(error?.response?.data?.message || 'Something went wrong', {
          containerId: 'toastRegister',
          type: 'error',
        })
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <div className="w-dvh h-dvh flex justify-center items-center">
      <ToastContainer containerId={'toastRegister'} />
      <form onSubmit={formik.handleSubmit} className='w-5/6 md:w-1/2 border rounded-lg'>
        <div className='w-full bg-blue-600 text-white p-3'>
          Register
        </div>
        <div className='w-full p-5'>
          <div className='mb-3'>
            <span className='text-sm text-blue-600'>Name</span>
            <input
              type='text'
              id='name'
              {...formik.getFieldProps('name')}
              className='w-full p-2 border-2 rounded-md text-black'
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>

          <div className='mb-3'>
            <span className='text-sm text-blue-600'>Email</span>
            <input
              type='text'
              id='email'
              {...formik.getFieldProps('email')}
              className='w-full p-2 border-2 rounded-md text-black'
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className='mb-3'>
            <span className='text-sm text-blue-600'>Password</span>
            <input
              type='password'
              id='password'
              {...formik.getFieldProps('password')}
              className='w-full p-2 border-2 rounded-md text-black'
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            ) : null}
          </div>

          <button
            type='submit'
            disabled={formik.isSubmitting}
            className='w-full bg-green-600 text-white p-3 rounded-md px-4 py-2 hover:bg-green-700 disabled:opacity-50'
          >
            {formik.isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage
