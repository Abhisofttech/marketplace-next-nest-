// 'use client'
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// interface Product {
//   _id: string;
//   name: string;
//   stock: number;
//   seller: {
//     name: string;
//     email:string;
//   };
// }

// const InventoryManagement = () => {
//   const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);

//   // Function to fetch low stock products
//   const getLowStockProducts = async () => {
//     try {
//       const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}analytics/stock`);
//       if (response.data && response.data.stockProducts) {
//         return response.data.stockProducts;

//       } else {
//         console.error('No stock products found in response');
//         return []; // Return an empty array to avoid breaking the UI
//       }
//     } catch (error) {
//       console.error('Error fetching low stock products', error);
//       throw error;
//     }
//   };

//   useEffect(() => {
//     const fetchLowStockProducts = async () => {
//       try {
//         const products = await getLowStockProducts();
//         console.log(products)
//         setLowStockProducts(products);
//       } catch (error) {
//         console.error('Failed to load products', error);
//       }
//     };
//     fetchLowStockProducts();
//   }, []);

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <h1 className="text-2xl font-semibold mb-4">Low Stock Products</h1>
//       <div className="grid grid-cols-1 gap-4">
//         {lowStockProducts.length > 0 ? (
//           lowStockProducts.map((product) => (
//             <div
//               key={product._id}
//               className={`border p-4 rounded-lg ${
//                 product.stock < 10 ? 'border-red-500' : 'border-gray-300'
//               }`}
//             >
//               <h2 className="text-lg font-bold">{product.name}</h2>
//               <p>Seller: {product.seller.name}</p>
//               <p>Seller Email: {product.seller.email}</p>
//               <p>
//                 Stock: <span>{product.stock}</span>
//               </p>
//               {product.stock < 10 && (
//                 <p className="text-red-500 font-bold">Understock Alert!</p>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No low stock products found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InventoryManagement;

'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Package, AlertTriangle, Loader, Mail, User, Box } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  stock: number;
  seller: {
    name: string;
    email: string;
  };
}

const InventoryManagement = () => {
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getLowStockProducts = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}analytics/stock`);
      if (response.data && response.data.stockProducts) {
        return response.data.stockProducts;
      } else {
        console.error('No stock products found in response');
        return [];
      }
    } catch (error) {
      console.error('Error fetching low stock products', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchLowStockProducts = async () => {
      try {
        setLoading(true);
        const products = await getLowStockProducts();
        setLowStockProducts(products);
      } catch (error) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchLowStockProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Loader className="animate-spin h-12 w-12 text-blue-600" />
        <span className="ml-3 text-xl font-semibold text-gray-700">Loading inventory data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <Package className="mr-2" /> Low Stock Products
        </h1>
        {lowStockProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lowStockProducts.map((product) => (
              <div
                key={product._id}
                className={`bg-white overflow-hidden shadow-md rounded-lg ${
                  product.stock < 10 ? 'border-2 border-red-500' : ''
                }`}
              >
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                  <div className="flex items-center text-gray-600 mb-2">
                    <User className="h-5 w-5 mr-2" />
                    <span>{product.seller.name}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Mail className="h-5 w-5 mr-2" />
                    <span>{product.seller.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Box className="h-5 w-5 mr-2" />
                    <span className="font-medium">Stock: {product.stock}</span>
                  </div>
                  {product.stock < 10 && (
                    <div className="mt-4 flex items-center text-red-600">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      <span className="font-bold">Understock Alert!</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600">No low stock products found.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryManagement;