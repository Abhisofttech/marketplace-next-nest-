


// 'use client'

// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'
// import * as yup from 'yup'
// import { useRouter } from 'next/navigation'
// import { useSnackbar } from 'notistack'
// import axios from 'axios'
// import { useDispatch } from 'react-redux'
// import { login } from '../../redux/authSlice'
// import Navbar from '@/components/Navbar'
// import Link from 'next/link'
// import { Lock, Mail, UserCircle, Eye, EyeOff } from 'lucide-react'

// const schema = yup.object().shape({
//   email: yup.string().email('Invalid email').required('Email is required'),
//   password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
// })

// type FormData = yup.InferType<typeof schema>

// export default function SignIn() {
//   const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
//     resolver: yupResolver(schema),
//   })
//   const [isLoading, setIsLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const router = useRouter()
//   const dispatch = useDispatch()
//   const { enqueueSnackbar } = useSnackbar()

//   const onSubmit = async (data: FormData) => {
//     setIsLoading(true)
//     try {
//       const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}auth/signin`, data)
//       if (response.status === 201) {
//         const { token, user } = response.data
//         if (token) {
//           localStorage.setItem('token', token)
//         } else {
//           throw new Error('Token not found')
//         }
//         dispatch(login(user))
//         enqueueSnackbar('Sign-in successful!', { variant: 'success' })
//         router.push(user.role === 'buyer' ? '/BuyerDashboard' : user.role === 'seller' ? '/SellerDashboard' : '/AdminDashboard')
//       }
//     } catch (error: any) {
//       enqueueSnackbar(error.response?.data?.message || 'Sign-in failed. Please try again.', { variant: 'error' })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-100 to-indigo-100">
//         <div className="max-w-md w-full space-y-8">
//           <div className="bg-white shadow-2xl rounded-2xl p-8">
//             <div className="flex justify-center">
//               <UserCircle className="w-16 h-16 text-blue-500" />
//             </div>
//             <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign In</h2>
//             <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
//               <div className="rounded-md shadow-sm -space-y-px">
//                 <div>
//                   <label htmlFor="email" className="sr-only">Email address</label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Mail className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       id="email"
//                       type="email"
//                       {...register('email')}
//                       className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
//                         errors.email ? 'border-red-300' : 'border-gray-300'
//                       } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm pl-10`}
//                       placeholder="Email address"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label htmlFor="password" className="sr-only">Password</label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       id="password"
//                       type={showPassword ? 'text' : 'password'}
//                       {...register('password')}
//                       className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
//                         errors.password ? 'border-red-300' : 'border-gray-300'
//                       } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm pl-10 pr-10`}
//                       placeholder="Password"
//                     />
//                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="text-gray-400 hover:text-gray-500 focus:outline-none"
//                       >
//                         {showPassword ? (
//                           <EyeOff className="h-5 w-5" />
//                         ) : (
//                           <Eye className="h-5 w-5" />
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {(errors.email || errors.password) && (
//                 <div className="text-red-500 text-sm mt-2">
//                   {errors.email?.message || errors.password?.message}
//                 </div>
//               )}

//               <div>
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//                     isLoading ? 'opacity-50 cursor-not-allowed' : ''
//                   }`}
//                 >
//                   {isLoading ? (
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                   ) : (
//                     'Sign In'
//                   )}
//                 </button>
//               </div>
//             </form>

//             <div className="mt-6">
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300" />
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white text-gray-500">Or</span>
//                 </div>
//               </div>

//               <div className="mt-6 grid grid-cols-2 gap-3">
//                 <div>
//                   <Link href="/forgotpassword" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
//                     Forgot Password
//                   </Link>
//                 </div>
//                 <div>
//                   <Link href="/signup" className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
//                     Sign Up
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/authSlice'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { Lock, Mail, UserCircle, Eye, EyeOff } from 'lucide-react'

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
})

type FormData = yup.InferType<typeof schema>

export default function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}auth/signin`, data)
      if (response.status === 201) {
        const { token, user } = response.data
        if (token) {
          localStorage.setItem('token', token)
        } else {
          throw new Error('Token not found')
        }
        dispatch(login(user))
        enqueueSnackbar('Sign-in successful!', { variant: 'success' })
        router.push(user.role === 'buyer' ? '/BuyerDashboard' : user.role === 'seller' ? '/SellerDashboard' : '/AdminDashboard')
      }
    } catch (error: any) {
      enqueueSnackbar(error.response?.data?.message || 'Sign-in failed. Please try again.', { variant: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="px-8 pt-8 pb-6">
            <div className="flex justify-center mb-6">
              <UserCircle className="w-20 h-10 text-blue-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Welcome Back</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={`pl-10 w-full px-4 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    className={`pl-10 w-full px-4 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Link href="/forgotpassword" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition duration-150 ease-in-out">
                  Forgot Password
                </Link>
                <Link href="/signup" className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}