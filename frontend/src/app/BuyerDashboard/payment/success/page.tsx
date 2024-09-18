
// 'use client';
// import React, { useEffect } from 'react'
// import { useSnackbar } from 'notistack'
// import { useRouter } from 'next/navigation'

// const Success = () => {
//   const { enqueueSnackbar } = useSnackbar();
//   const router = useRouter();

 

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     if (!token) {
//       enqueueSnackbar('User not authenticated', { variant: 'error' });
//       router.push('/login'); // Redirect to login if token is missing
//       return;
//     }

   
//   }, [enqueueSnackbar, router]);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold text-green-600">Payment Successful</h1>
//       <p>Your order has been placed, and your cart has been cleared.</p>
//     </div>
//   )
// }

// export default Success;


'use client'

import React, { useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'
import { CheckCircle, ShoppingBag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function Success() {
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      enqueueSnackbar('User not authenticated', { variant: 'error' })
      router.push('/login') // Redirect to login if token is missing
      return
    }
  }, [enqueueSnackbar, router])

  const handleContinueShopping = () => {
    router.push('/BuyerDashboard') // Assuming '/' is your main shopping page
  }

  const handleViewOrders = () => {
    router.push('/BuyerDashboard/orderStatus') // Assuming '/orders' is your orders page
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-8">
          Your order has been placed successfully. Thank you for your purchase!
        </p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleViewOrders}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
          >
           
            <ShoppingBag className="mr-2" />
            View My Orders
           
          </button>
         
          <button
            onClick={handleContinueShopping}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
          >
            <ArrowLeft className="mr-2" />
            Continue Shopping
          </button>
        </div>
        <p className="mt-8 text-sm text-gray-500">
          If you have any questions about your order, please contact our customer support.
        </p>
      </div>
    </div>
  )
}