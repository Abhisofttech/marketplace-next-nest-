

"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ShowProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  
  useEffect(() => {
   
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}products/get-products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId: string) => {
    const token = localStorage.getItem('token'); 
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}cart/add-item`,
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      enqueueSnackbar('Item added to cart successfully!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to add item to cart', { variant: 'error' });
      console.error('Error adding item to cart', error);
    }
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any, i) => (
            <div key={i} className="border rounded-lg p-4">
              <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover mb-4 rounded" />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
              <button
                onClick={() => handleAddToCart(product._id)}
                className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowProduct;
