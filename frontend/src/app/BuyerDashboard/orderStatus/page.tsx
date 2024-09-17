'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
}

interface Item {
  product: Product;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  status: string;
  total: number;
  items: Item[];
}

export default function OrderStatus() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (token) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URI}orders/order-status`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => setOrders(response.data))
        .catch(err => setError(err.message));
    } else {
      router.push('/login'); // Redirect to login if token is not found
    }
  }, [token, router]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Status</h1>
      {error && <p className="text-red-500">{error}</p>}
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order._id} className="border-b mb-4 pb-4">
              <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
              <p>Status: {order.status}</p>
              <p>Total: ${order.total}</p>
              <ul>
                {order.items.map(item => (
                  <li key={item.product._id}>
                    <p>Product: {item.product.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
