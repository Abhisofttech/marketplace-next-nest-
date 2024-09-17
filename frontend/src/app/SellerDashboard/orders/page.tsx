

'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

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
  }, [ enqueueSnackbar]);

  const updateOrderStatus = (orderId: string, status: string) => {
    const token = localStorage.getItem('token');
    setUpdatingStatus(orderId); // Set the order that is being updated
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
      .finally(() => setUpdatingStatus(null)); // Reset the loading state after updating
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Seller Orders</h1>
      {error && <p className="text-red-500">{error}</p>}
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">User Email</th>
              <th className="px-4 py-2 border">Products</th>
              <th className="px-4 py-2 border">Total Price</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="px-4 py-2 border">{order.user.email}</td>
                <td className="px-4 py-2 border">
                  {order.items.map((item, idx) => (
                    <div key={idx}>
                      {item.product.name} (x{item.quantity})
                    </div>
                  ))}
                </td>
                <td className="px-4 py-2 border">${order.total}</td>
                <td className="px-4 py-2 border">{order.status}</td>
                <td className="px-4 py-2 border">
                  {updatingStatus === order._id ? (
                    <p>Updating...</p>
                  ) : (
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      className="p-2 border rounded"
                    >
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
