
// 'use client';
// // pages/SellerDashboard/products.tsx
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Loader } from 'lucide-react'; // Import the loading icon
// import { useSnackbar } from 'notistack'; // Import notistack for notifications
// import { useRouter } from 'next/navigation'; // For navigation

// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   stock: number;
//   category: string;
//   imageUrl: string;
// }

// const ShowProducts = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const { enqueueSnackbar } = useSnackbar();
//   const router = useRouter();
  
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}products/seller-product`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProducts(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         enqueueSnackbar('Failed to fetch products', { variant: 'error' });
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [ enqueueSnackbar]);

//   const handleDelete = async (productId: string) => {
    
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     if (confirm('Are you sure you want to delete this product?')) {
//       try {
//         await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URI}products/delete-product/${productId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         enqueueSnackbar('Product deleted successfully', { variant: 'success' });
//         setProducts(products.filter((product) => product._id !== productId));
//       } catch (error) {
//         console.error('Error deleting product:', error);
//         enqueueSnackbar('Failed to delete product', { variant: 'error' });
//       }
//     }
//   };

//   const handleUpdate = (productId: string) => {
//     router.push(`updateProduct/${productId}`); // Redirect to update page
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader className="animate-spin h-10 w-10 text-gray-500" />
//         <span className="ml-2 text-gray-500">Loading products...</span>
//       </div>
//     );
//   }
// console.log(products)
//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Products</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="px-4 py-2 text-left">ID</th>
//               <th className="px-4 py-2 text-left">Name</th>
//               <th className="px-4 py-2 text-left">Price</th>
//               <th className="px-4 py-2 text-left">Image</th>
//               <th className="px-4 py-2 text-left">Stock</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product, i) => (
//               <tr key={product._id} className="border-t border-gray-300">
//                 <td className="px-4 py-2">{i + 1}</td>
//                 <td className="px-4 py-2">{product.name}</td>
//                 <td className="px-4 py-2">${product.price.toFixed(2)}</td>
//                 <td className="px-4 h-10">
//                   <img src={product.imageUrl} className="w-10 h-10" alt={product.name} />
//                 </td>
//                 <td className="px-4 py-2">{product.stock}</td>
//                 <td className="px-4 py-2">
//                   <button
//                     onClick={() => handleUpdate(product._id)}
//                     className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mr-2"
//                   >
//                     Update
//                   </button>
//                   <button
//                     onClick={() => handleDelete(product._id)}
//                     className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ShowProducts;


'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader, Trash2, Edit2, Package } from 'lucide-react';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';

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
  
  useEffect(() => {
    const token = localStorage.getItem('token');
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
  }, [enqueueSnackbar]);

  const handleDelete = async (productId: string) => {
    const token = localStorage.getItem('token');
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
    router.push(`updateProduct/${productId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-blue-500 mx-auto" />
          <span className="mt-4 block text-gray-600">Loading products...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center">
          <Package className="mr-2" /> Your Products
        </h1>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-left">Image</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Price</th>
                  <th className="py-3 px-6 text-left">Stock</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {products.map((product, i) => (
                  <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-100 transition duration-300">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{i + 1}</td>
                    <td className="py-3 px-6 text-left">
                      <img src={product.imageUrl} className="w-12 h-12 rounded-full object-cover" alt={product.name} />
                    </td>
                    <td className="py-3 px-6 text-left">{product.name}</td>
                    <td className="py-3 px-6 text-left">${product.price.toFixed(2)}</td>
                    <td className="py-3 px-6 text-left">{product.stock}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <button
                          onClick={() => handleUpdate(product._id)}
                          className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition duration-300 mr-2"
                          aria-label="Update product"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition duration-300"
                          aria-label="Delete product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProducts;