
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Lock, Mail, UserCircle } from 'lucide-react';

// Validation schema
const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

type FormData = yup.InferType<typeof schema>;

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}auth/signin`, data);
      if (response.status === 201) { // Changed to 200 for successful sign-in
        const { token, user } = response.data;
        if(token){
          console.log(token)
          localStorage.setItem('token', token);
        }else{
          throw new Error('Token not found')
        }
        dispatch(login(user));
        enqueueSnackbar('Sign-in successful!', { variant: 'success' });
        if(user.role =='buyer'){
          router.push('/BuyerDashboard');
                  }else if(user.role=='seller'){
                    router.push('/SellerDashboard');
                  }else if(user.role=='admin'){
                    router.push('/AdminDashboard');
                  }else{
                    router.push('/');
                  }
        // router.push('/dashboard'); // Adjust the redirect URL as needed
      }
    } catch (error: any) {
      console.error('Sign-in error:', error.response?.data?.message || error.message);
      enqueueSnackbar(error.response?.data?.message || 'Sign-in failed. Please try again.', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
      <div className="min-h-screen flex flex-col justify-center py-5 sm:px-6 lg:px-8 bg-signup-bg bg-cover bg-center">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white bg-opacity-40 backdrop-filter backdrop-blur-sm py-5 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="flex justify-center">
              {/* Replace with an appropriate icon for sign-in, if desired */}
              <UserCircle className="w-7 h-7 text-blue-400" />
            </div>
            <h2 className="mt-2 text-center text-2xl font-extrabold text-blue-400">Sign In</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className={`pl-10 block w-full pr-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  />
                </div>
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    {...register('password')}
                    className={`pl-10 block w-full pr-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  />
                </div>
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Loading...' : 'Sign In'}
                </button>
              </div>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2  bg-white text-gray-800">Forgot password ? <Link href='/forgotpassword' className='text-blue-800 underline'>Click</Link></span>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/signup" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-400 hover:bg-blue-500">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;




