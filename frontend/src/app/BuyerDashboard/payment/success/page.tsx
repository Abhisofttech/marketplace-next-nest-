
'use client';
import React, { useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'

const Success = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

 

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      enqueueSnackbar('User not authenticated', { variant: 'error' });
      router.push('/login'); // Redirect to login if token is missing
      return;
    }

   
  }, [enqueueSnackbar, router]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful</h1>
      <p>Your order has been placed, and your cart has been cleared.</p>
    </div>
  )
}

export default Success;
