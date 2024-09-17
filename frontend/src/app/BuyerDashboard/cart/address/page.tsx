

'use client';
import React, { useState, useEffect } from 'react';
import ChangeAddress from '@/components/ChangeAddress';
import Link from 'next/link';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useSnackbar } from 'notistack';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  product: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
}

const CartAddress = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token'); // Get the token from storage
      console.log('Token:', token);

      // Fetch cart items from the backend
      const cartResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}cart/get-items`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const cartData = cartResponse.data;

      console.log('Cart Items from Backend:', cartData);

      // Fetch user address from the backend
      const addressResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}users/user-detail`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const address = addressResponse.data.address;

      console.log('User Address:', address);

      // Calculate the total price from the cart data
      const totalPrice = cartData.reduce(
        (acc: number, item: CartItem) => acc + item.product.price * item.quantity,
        0
      );

      // Make sure order is created and cart is cleared before proceeding to Stripe payment
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}orders/create-order-and-clear-cart`,
        { cartItems: cartData, totalPrice, address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      enqueueSnackbar('Order created and cart cleared successfully', { variant: 'success' });

      // Proceed with Stripe checkout session creation
      const stripe = await stripePromise;

      const checkoutSession = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}payment/checkout`, 
        { cartItems: cartData, totalPrice }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Redirect to Stripe Checkout
      await stripe?.redirectToCheckout({ sessionId: checkoutSession.data.id });
    } catch (error) {
      enqueueSnackbar('Failed to process payment', { variant: 'error' });
      console.error('Payment Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Link href="/BuyerDashboard/cart" className="text-blue-500">
        Back to cart
      </Link>
      <ChangeAddress />
      <button
        onClick={handlePayment}
        className={`mt-4 w-full py-2 text-white bg-blue-500 rounded ${loading && 'opacity-50 cursor-not-allowed'}`}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
};

export default CartAddress;

