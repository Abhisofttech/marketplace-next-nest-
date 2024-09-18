


// 'use client';

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useRouter } from 'next/navigation';
// import { useSnackbar } from 'notistack';
// import axios from 'axios';
// import Link from 'next/link';
// import { User, Mail, Lock, Phone, UserCircle } from 'lucide-react';
// import Navbar from '@/components/Navbar';

// // Validation schema
// const schema = yup.object().shape({
//   name: yup.string().required('Name is required'),
//   email: yup.string().email('Invalid email').required('Email is required'),
//   password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//   confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
//   phoneNumber: yup.string()
//     .matches(/^\d{10}$/, 'Phone number must be 10 digits')
//     .required('Phone number is required'),
//   role: yup.string().oneOf(['buyer', 'seller'], 'Role is required').required('Role is required'),
// });

// type FormData = yup.InferType<typeof schema>;

// export default function SignUp() {
//   const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
//     resolver: yupResolver(schema),
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();
//   const { enqueueSnackbar } = useSnackbar();

//   const onSubmit = async (data: FormData) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}auth/signup`, data);
//       if (response.status === 201) {
//         const { token } = response.data;
//         localStorage.setItem('token', token);
//         enqueueSnackbar('Registration successful!', { variant: 'success' });
//         router.push('/signin');
//       }
//     } catch (error: any) {
//       enqueueSnackbar(error.response?.data?.message || 'Sign-up failed. Please try again.', { variant: 'error' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen flex flex-col justify-center py-5 sm:px-6 lg:px-8 bg-signup-bg bg-cover bg-center">
//         <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//           <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg py-6 px-6 rounded-lg shadow-lg">
//             <div className="flex justify-center">
//               <UserCircle className="w-8 h-8 text-blue-500" />
//             </div>
//             <h2 className="mt-2 text-center text-2xl font-extrabold text-blue-600">Create Your Account</h2>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//                   <div className="mt-1 relative rounded-md shadow-sm">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <User className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       id="name"
//                       {...register('name')}
//                       className={`pl-10 block w-full pr-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
//                     />
//                   </div>
//                   {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
//                   <div className="mt-1 relative rounded-md shadow-sm">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Mail className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="email"
//                       id="email"
//                       {...register('email')}
//                       className={`pl-10 block w-full pr-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
//                     />
//                   </div>
//                   {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//                   <div className="mt-1 relative rounded-md shadow-sm">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="password"
//                       id="password"
//                       {...register('password')}
//                       className={`pl-10 block w-full pr-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
//                     />
//                   </div>
//                   {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
//                 </div>

//                 <div>
//                   <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
//                   <div className="mt-1 relative rounded-md shadow-sm">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="password"
//                       id="confirmPassword"
//                       {...register('confirmPassword')}
//                       className={`pl-10 block w-full pr-3 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
//                     />
//                   </div>
//                   {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
//                   <div className="mt-1 relative rounded-md shadow-sm">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Phone className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="tel"
//                       id="phoneNumber"
//                       {...register('phoneNumber')}
//                       className={`pl-10 block w-full pr-3 py-2 border ${errors.phoneNumber ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
//                     />
//                   </div>
//                   {errors.phoneNumber && <p className="mt-2 text-sm text-red-600">{errors.phoneNumber.message}</p>}
//                 </div>

//                 <div>
//                   <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
//                   <select
//                     id="role"
//                     {...register('role')}
//                     className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border ${errors.role ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md`}
//                   >
//                     <option value="">Select Role</option>
//                     <option value="buyer">Buyer</option>
//                     <option value="seller">Seller</option>
//                   </select>
//                   {errors.role && <p className="mt-2 text-sm text-red-600">{errors.role.message}</p>}
//                 </div>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 >
//                   {isLoading ? 'Signing up...' : 'Sign up'}
//                 </button>
//               </div>
//             </form>

//             <div className="mt-6">
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300" />
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-2 bg-white bg-opacity-80 text-gray-500">Already have an account?</span>
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <Link href="/signin" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-400 hover:bg-blue-500">
//                   Sign in
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import Link from 'next/link';
import { User, Mail, Lock, Phone, UserCircle, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
  phoneNumber: yup.string()
    .matches(/^\d{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  role: yup.string().oneOf(['buyer', 'seller'], 'Role is required').required('Role is required'),
});

type FormData = yup.InferType<typeof schema>;

export default function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}auth/signup`, data);
      if (response.status === 201) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        enqueueSnackbar('Registration successful!', { variant: 'success' });
        router.push('/signin');
      }
    } catch (error: any) {
      enqueueSnackbar(error.response?.data?.message || 'Sign-up failed. Please try again.', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="px-8 pt-8 pb-6">
            <div className="flex justify-center mb-6">
              <UserCircle className="w-16 h-10 text-blue-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Create Your Account</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      {...register('name')}
                      className={`pl-10 w-full px-4 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
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
                      type="password"
                      id="password"
                      {...register('password')}
                      className={`pl-10 w-full px-4 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      id="confirmPassword"
                      {...register('confirmPassword')}
                      className={`pl-10 w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>}
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      id="phoneNumber"
                      {...register('phoneNumber')}
                      className={`pl-10 w-full px-4 py-2 border ${errors.phoneNumber ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
                      placeholder="1234567890"
                    />
                  </div>
                  {errors.phoneNumber && <p className="mt-1 text-xs text-red-600">{errors.phoneNumber.message}</p>}
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    id="role"
                    {...register('role')}
                    className={`w-full px-4 py-2 border ${errors.role ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out`}
                  >
                    <option value="">Select Role</option>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                  </select>
                  {errors.role && <p className="mt-1 text-xs text-red-600">{errors.role.message}</p>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Signing up...' : 'Sign up'}
                  {!isLoading && <ChevronRight className="ml-2 h-4 w-4" />}
                </button>
              </div>
            </form>
          </div>
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-center text-gray-600">
              Already have an account?{' '}
              <Link href="/signin" className="font-medium text-blue-600 hover:text-blue-500 transition duration-150 ease-in-out">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}