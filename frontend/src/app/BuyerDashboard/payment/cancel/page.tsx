'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { XCircle, RefreshCcw, ShoppingCart } from 'lucide-react'

export default function Cancel() {
  const router = useRouter()

  const handleReturnToCart = () => {
    router.push('/BuyerDashboard/cart') // Assuming '/cart' is your cart page
  }

  const handleContinueShopping = () => {
    router.push('/BuyerDashboard') // Assuming '/' is your main shopping page
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
        <p className="text-gray-600 mb-8">
          Your payment was cancelled. Don't worry, your cart items are still saved. 
          You can try again or continue shopping.
        </p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleReturnToCart}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
          >
            <RefreshCcw className="mr-2" />
            Return to Cart
          </button>
          <button
            onClick={handleContinueShopping}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
          >
            <ShoppingCart className="mr-2" />
            Continue Shopping
          </button>
        </div>
        <p className="mt-8 text-sm text-gray-500">
          If you experienced any issues during checkout, please contact our customer support.
        </p>
      </div>
    </div>
  )
}