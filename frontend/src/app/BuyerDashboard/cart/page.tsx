

// 'use client';

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useSnackbar } from 'notistack';
// import { useRouter } from 'next/navigation';

// interface CartItem {
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   imageUrl: string;
//   product: {
//     _id: string;
//     name: string;
//     price: number;
//     imageUrl: string;
//   };
// }

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const { enqueueSnackbar } = useSnackbar();
//   const router=useRouter()
  
//   useEffect(() => {
//     const token = localStorage.getItem('token'); // Get token from local storage
//     const fetchCartItems = async () => {
//       try {
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}cart/get-items`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCartItems(response.data);
//       } catch (error) {
//         enqueueSnackbar('Failed to fetch cart items', { variant: 'error' });
//       }
//     };

//     fetchCartItems();
//   }, [ enqueueSnackbar]);

//   // Calculate total price
//   useEffect(() => {
//     const calculateTotalPrice = () => {
//       const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
//       setTotalPrice(total);
//     };

//     calculateTotalPrice();
//   }, [cartItems ]);

//   // Handle remove item
//   const handleRemoveItem = async (itemId: string) => {
//     const token = localStorage.getItem('token');
//     try {
//       await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URI}cart/remove-item/${itemId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       enqueueSnackbar('Item removed successfully', { variant: 'success' });
//       // Update state after removing item
//       setCartItems((prevItems) => prevItems.filter((item) => item.product._id !== itemId));
//     } catch (error) {
//       enqueueSnackbar('Failed to remove item', { variant: 'error' });
//     }
//   };

//   // Handle quantity update
//   const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
//     const token = localStorage.getItem('token');
//     if (newQuantity < 1) {
//       enqueueSnackbar('Quantity cannot be less than 1', { variant: 'warning' });
//       return;
//     }
//     try {
//       await axios.patch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URI}cart/update-item/${itemId}`,
//         { quantity: newQuantity },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       enqueueSnackbar('Quantity updated successfully', { variant: 'success' });
//       // Update state after quantity update
//       setCartItems((prevItems) =>
//         prevItems.map((item) =>
//           item.product._id === itemId ? { ...item, quantity: newQuantity } : item
//         )
//       );
//     } catch (error) {
//       enqueueSnackbar('Failed to update quantity', { variant: 'error' });
//     }
//   };

//   const handleCheckout = () => {
//     router.push('/BuyerDashboard/cart/address')
//     // enqueueSnackbar('Proceeding to checkout...', { variant: 'info' });
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-100">
//       <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

//         {cartItems.length === 0 ? (
//           <p className="text-gray-600">Your cart is empty.</p>
//         ) : (
//           <div className="space-y-4">
//             {cartItems.map((item) => (
//               <div key={item._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
//                 <div className="flex items-center space-x-4">
//                   <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg" />
//                   <div>
//                     <h3 className="text-lg font-medium">{item.product.name}</h3>
//                     <p className="text-gray-600">${item.product.price}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <button
//                     onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
//                     className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
//                   >
//                     -
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button
//                     onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
//                     className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
//                   >
//                     +
//                   </button>
//                   <button
//                     onClick={() => handleRemoveItem(item.product._id)}
//                     className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}

//             <div className="mt-6 text-right">
//               <p className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</p>
//               <button
//                 onClick={handleCheckout}
//                 className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//               >
//                 Checkout
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartPage;



'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Minus, Plus, Trash2, CreditCard, Loader } from 'lucide-react'

interface CartItem {
  _id: string
  name: string
  price: number
  quantity: number
  imageUrl: string
  product: {
    _id: string
    name: string
    price: number
    imageUrl: string
  }
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [loading, setLoading] = useState(true)
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}cart/get-items`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setCartItems(response.data)
      } catch (error) {
        enqueueSnackbar('Failed to fetch cart items', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchCartItems()
  }, [enqueueSnackbar])

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
      setTotalPrice(total)
    }

    calculateTotalPrice()
  }, [cartItems])

  const handleRemoveItem = async (itemId: string) => {
    const token = localStorage.getItem('token')
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URI}cart/remove-item/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      enqueueSnackbar('Item removed successfully', { variant: 'success' })
      setCartItems((prevItems) => prevItems.filter((item) => item.product._id !== itemId))
    } catch (error) {
      enqueueSnackbar('Failed to remove item', { variant: 'error' })
    }
  }

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    const token = localStorage.getItem('token')
    if (newQuantity < 1) {
      enqueueSnackbar('Quantity cannot be less than 1', { variant: 'warning' })
      return
    }
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}cart/update-item/${itemId}`,
        { quantity: newQuantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      enqueueSnackbar('Quantity updated successfully', { variant: 'success' })
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product._id === itemId ? { ...item, quantity: newQuantity } : item
        )
      )
    } catch (error) {
      enqueueSnackbar('Failed to update quantity', { variant: 'error' })
    }
  }

  const handleCheckout = () => {
    router.push('/BuyerDashboard/cart/address')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-8 flex items-center">
          <ShoppingCart className="mr-2 text-indigo-600" />
          Your Cart
        </h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <p className="text-xl text-gray-600">Your cart is empty.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item._id} className="flex flex-col sm:flex-row items-center justify-between p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
                  <img src={item.product.imageUrl} alt={item.product.name} className="w-24 h-24 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6" />
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg font-semibold">{item.product.name}</h3>
                    <p className="text-indigo-600 font-bold">${item.product.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item.product._id)}
                    className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center bg-indigo-50 p-6 rounded-xl">
              <p className="text-2xl font-bold mb-4 sm:mb-0">Total: <span className="text-indigo-600">${totalPrice.toFixed(2)}</span></p>
              <button
                onClick={handleCheckout}
                className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center"
              >
                <CreditCard className="mr-2" />
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}