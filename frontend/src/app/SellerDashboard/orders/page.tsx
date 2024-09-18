

// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSnackbar } from 'notistack';

// interface Order {
//   _id: string;
//   user: { email: string };
//   items: { product: { name: string }; quantity: number; price: number }[];
//   total: number;
//   status: string;
// }

// export default function SellerOrders() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
//   const { enqueueSnackbar } = useSnackbar();
  
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setLoading(true);
//       axios
//         .get(`${process.env.NEXT_PUBLIC_BACKEND_URI}orders/seller-orders`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((response) => setOrders(response.data))
//         .catch((err) => setError(err.message))
//         .finally(() => setLoading(false));
//     } else {
//       enqueueSnackbar('Please log in to view orders', { variant: 'error' });
//     }
//   }, [ enqueueSnackbar]);

//   const updateOrderStatus = (orderId: string, status: string) => {
//     const token = localStorage.getItem('token');
//     setUpdatingStatus(orderId); // Set the order that is being updated
//     axios
//       .put(
//         `${process.env.NEXT_PUBLIC_BACKEND_URI}orders/update-status/${orderId}`,
//         { status },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then(() => {
//         enqueueSnackbar('Order status updated successfully', { variant: 'success' });
//         setOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order._id === orderId ? { ...order, status } : order
//           )
//         );
//       })
//       .catch((err) => enqueueSnackbar('Failed to update status', { variant: 'error' }))
//       .finally(() => setUpdatingStatus(null)); // Reset the loading state after updating
//   };

//   if (loading) {
//     return <p>Loading orders...</p>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Seller Orders</h1>
//       {error && <p className="text-red-500">{error}</p>}
//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <table className="min-w-full bg-white border">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 border">User Email</th>
//               <th className="px-4 py-2 border">Products</th>
//               <th className="px-4 py-2 border">Total Price</th>
//               <th className="px-4 py-2 border">Status</th>
//               <th className="px-4 py-2 border">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id}>
//                 <td className="px-4 py-2 border">{order.user.email}</td>
//                 <td className="px-4 py-2 border">
//                   {order.items.map((item, idx) => (
//                     <div key={idx}>
//                       {item.product.name} (x{item.quantity})
//                     </div>
//                   ))}
//                 </td>
//                 <td className="px-4 py-2 border">${order.total}</td>
//                 <td className="px-4 py-2 border">{order.status}</td>
//                 <td className="px-4 py-2 border">
//                   {updatingStatus === order._id ? (
//                     <p>Updating...</p>
//                   ) : (
//                     <select
//                       value={order.status}
//                       onChange={(e) => updateOrderStatus(order._id, e.target.value)}
//                       className="p-2 border rounded"
//                     >
//                       <option value="processing">Processing</option>
//                       <option value="shipped">Shipped</option>
//                       <option value="delivered">Delivered</option>
//                     </select>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Package, Loader, ChevronDown, Mail,  Truck, IndianRupee } from 'lucide-react';

interface Order {
  _id: string;
  user: { email: string };
  items: { product: { name: string }; quantity: number; price: number }[];
  total: number;
  status: string;
}

export default function SellerOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoading(true);
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URI}orders/seller-orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setOrders(response.data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      enqueueSnackbar('Please log in to view orders', { variant: 'error' });
    }
  }, [enqueueSnackbar]);

  const updateOrderStatus = (orderId: string, status: string) => {
    const token = localStorage.getItem('token');
    setUpdatingStatus(orderId);
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}orders/update-status/${orderId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        enqueueSnackbar('Order status updated successfully', { variant: 'success' });
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status } : order
          )
        );
      })
      .catch((err) => enqueueSnackbar('Failed to update status', { variant: 'error' }))
      .finally(() => setUpdatingStatus(null));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Loader className="animate-spin h-12 w-12 text-blue-600" />
        <span className="ml-3 text-xl font-semibold text-gray-700">Loading orders...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <Package className="mr-2" /> Seller Orders
        </h1>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p>{error}</p>
          </div>
        )}
        {orders.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-gray-700 text-lg">No orders found.</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Products
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Mail className="flex-shrink-0 h-5 w-5 text-gray-400 mr-2" />
                          <div className="text-sm font-medium text-gray-900">{order.user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="mb-1">
                              {item.product.name} (x{item.quantity})
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <IndianRupee className="flex-shrink-0 h-5 w-5 text-gray-400 mr-1" />
                          {order.total.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {updatingStatus === order._id ? (
                          <div className="flex items-center">
                            <Loader className="animate-spin h-5 w-5 text-blue-600 mr-2" />
                            <span>Updating...</span>
                          </div>
                        ) : (
                          <div className="relative">
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                            >
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <ChevronDown className="h-4 w-4" />
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}