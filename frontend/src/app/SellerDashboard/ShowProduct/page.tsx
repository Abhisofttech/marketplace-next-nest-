
'use client';
// pages/SellerDashboard/products.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader } from 'lucide-react'; // Import the loading icon
import { useSnackbar } from 'notistack'; // Import notistack for notifications
import { useRouter } from 'next/navigation'; // For navigation

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
}

const ShowProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}products/seller-product`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        enqueueSnackbar('Failed to fetch products', { variant: 'error' });
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token, enqueueSnackbar]);

  const handleDelete = async (productId: string) => {
    if (!token) return;

    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URI}products/delete-product/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        enqueueSnackbar('Product deleted successfully', { variant: 'success' });
        setProducts(products.filter((product) => product._id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
        enqueueSnackbar('Failed to delete product', { variant: 'error' });
      }
    }
  };

  const handleUpdate = (productId: string) => {
    router.push(`updateProduct/${productId}`); // Redirect to update page
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin h-10 w-10 text-gray-500" />
        <span className="ml-2 text-gray-500">Loading products...</span>
      </div>
    );
  }
console.log(products)
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Stock</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr key={product._id} className="border-t border-gray-300">
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">${product.price.toFixed(2)}</td>
                <td className="px-4 h-10">
                  <img src={product.imageUrl} className="w-10 h-10" alt={product.name} />
                </td>
                <td className="px-4 py-2">{product.stock}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleUpdate(product._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowProducts;
