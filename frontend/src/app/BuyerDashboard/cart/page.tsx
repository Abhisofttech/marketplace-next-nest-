

'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';

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

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const router=useRouter()
  
  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from local storage
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}cart/get-items`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data);
      } catch (error) {
        enqueueSnackbar('Failed to fetch cart items', { variant: 'error' });
      }
    };

    fetchCartItems();
  }, [ enqueueSnackbar]);

  // Calculate total price
  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cartItems ]);

  // Handle remove item
  const handleRemoveItem = async (itemId: string) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URI}cart/remove-item/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      enqueueSnackbar('Item removed successfully', { variant: 'success' });
      // Update state after removing item
      setCartItems((prevItems) => prevItems.filter((item) => item.product._id !== itemId));
    } catch (error) {
      enqueueSnackbar('Failed to remove item', { variant: 'error' });
    }
  };

  // Handle quantity update
  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    const token = localStorage.getItem('token');
    if (newQuantity < 1) {
      enqueueSnackbar('Quantity cannot be less than 1', { variant: 'warning' });
      return;
    }
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}cart/update-item/${itemId}`,
        { quantity: newQuantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      enqueueSnackbar('Quantity updated successfully', { variant: 'success' });
      // Update state after quantity update
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product._id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      enqueueSnackbar('Failed to update quantity', { variant: 'error' });
    }
  };

  const handleCheckout = () => {
    router.push('/BuyerDashboard/cart/address')
    // enqueueSnackbar('Proceeding to checkout...', { variant: 'info' });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div>
                    <h3 className="text-lg font-medium">{item.product.name}</h3>
                    <p className="text-gray-600">${item.product.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                    className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                    className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item.product._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 text-right">
              <p className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</p>
              <button
                onClick={handleCheckout}
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
