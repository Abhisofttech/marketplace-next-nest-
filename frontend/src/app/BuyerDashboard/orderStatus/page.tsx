// 'use client'

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// interface Product {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
// }

// interface Item {
//   product: Product;
//   quantity: number;
//   price: number;
// }

// interface Order {
//   _id: string;
//   status: string;
//   total: number;
//   items: Item[];
// }

// export default function OrderStatus() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();
//   const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

//   useEffect(() => {
//     if (token) {
//       axios
//         .get(`${process.env.NEXT_PUBLIC_BACKEND_URI}orders/order-status`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then(response => setOrders(response.data))
//         .catch(err => setError(err.message));
//     } else {
//       router.push('/login'); // Redirect to login if token is not found
//     }
//   }, [token, router]);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Order Status</h1>
//       {error && <p className="text-red-500">{error}</p>}
//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <ul>
//           {orders.map(order => (
//             <li key={order._id} className="border-b mb-4 pb-4">
//               <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
//               <p>Status: {order.status}</p>
//               <p>Total: ${order.total}</p>
//               <ul>
//                 {order.items.map(item => (
//                   <li key={item.product._id}>
//                     <p>Product: {item.product.name}</p>
//                     <p>Quantity: {item.quantity}</p>
//                     <p>Price: ${item.price}</p>
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }


'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Package, Clock, CheckCircle, XCircle, Loader, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'

interface Product {
  _id: string
  name: string
  description: string
  price: number
}

interface Item {
  product: Product
  quantity: number
  price: number
}

interface Order {
  _id: string
  status: string
  total: number
  items: Item[]
  createdAt: string // Assuming the API returns a date string
}

export default function OrderStatus() {
  const [orders, setOrders] = useState<Order[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [expandedOrders, setExpandedOrders] = useState<string[]>([])
  const router = useRouter()
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  useEffect(() => {
    if (token) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URI}orders/order-status`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          setOrders(response.data)
          setLoading(false)
        })
        .catch(err => {
          setError(err.message)
          setLoading(false)
        })
    } else {
      router.push('/login') // Redirect to login if token is not found
    }
  }, [token, router])

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case 'processing':
        return <Clock className="w-6 h-6 text-yellow-500" />
      case 'cancelled':
        return <XCircle className="w-6 h-6 text-red-500" />
      default:
        return <AlertCircle className="w-6 h-6 text-gray-500" />
    }
  }

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center">
          <Package className="mr-2 text-blue-600" />
          Order Status
        </h1>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
        {orders.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-gray-600">No orders found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order._id} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Order ID: {order._id}</h2>
                    <span className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      {getStatusIcon(order.status)}
                      <span className="ml-2 text-gray-700 capitalize">{order.status}</span>
                    </div>
                    <p className="text-lg font-bold text-blue-600">${order.total.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => toggleOrderExpansion(order._id)}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    {expandedOrders.includes(order._id) ? (
                      <>
                        Hide Details
                        <ChevronUp className="ml-1 w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Show Details
                        <ChevronDown className="ml-1 w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
                {expandedOrders.includes(order._id) && (
                  <div className="bg-gray-50 px-6 py-4">
                    <h3 className="text-lg font-semibold mb-2">Order Items</h3>
                    <ul className="divide-y divide-gray-200">
                      {order.items.map(item => (
                        <li key={item.product._id} className="py-4 flex justify-between">
                          <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-gray-600">{item.product.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${item.price.toFixed(2)}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}