// 'use client';

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSnackbar } from 'notistack';

// interface Product {
//   _id: string;
//   name: string;
//   views: number;
// }

// interface CartData {
//   _id: string;
//   cartCount: number;
// }

// interface AnalyticsData {
//   success: boolean;
//   mostViewedProducts: Product[];
//   abandonedCarts: CartData[];
//   conversionRate: string;
// }

// const UserBehaviorAnalytics: React.FC = () => {
//   const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
//   const { enqueueSnackbar } = useSnackbar();

//   useEffect(() => {
//     const fetchAnalyticsData = async () => {
//       try {
//         const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}analytics/user-behavior`);
//         if (data.success) {
//           setAnalyticsData(data);
//         } else {
//           enqueueSnackbar('Failed to fetch analytics data', { variant: 'error' });
//         }
//       } catch (error) {
//         enqueueSnackbar('Error fetching analytics data', { variant: 'error' });
//       }
//     };

//     fetchAnalyticsData();
//   }, [enqueueSnackbar]);

//   if (!analyticsData) {
//     return <div className="text-center">Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">User Behavior Analytics</h1>

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Most Viewed Products</h2>
//         <ul className="list-disc pl-5">
//           {analyticsData.mostViewedProducts.map((product) => (
//             <li key={product._id} className="mb-2">
//               <span className="font-medium">{product.name}</span> - {product.views} views
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Abandoned Carts</h2>
//         <ul className="list-disc pl-5">
//           {analyticsData.abandonedCarts.map((cart) => (
//             <li key={cart._id} className="mb-2">
//               <span className="font-medium">User ID: {cart._id}</span> - {cart.cartCount} carts
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <h2 className="text-xl font-semibold mb-2">Conversion Rate</h2>
//         <p className="font-medium text-lg">{analyticsData.conversionRate}%</p>
//       </div>
//     </div>
//   );
// };

// export default UserBehaviorAnalytics;


'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Eye, ShoppingCart, TrendingUp, Loader, AlertCircle } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Product {
  _id: string;
  name: string;
  views: number;
}

interface CartData {
  _id: string;
  cartCount: number;
}

interface AnalyticsData {
  success: boolean;
  mostViewedProducts: Product[];
  abandonedCarts: CartData[];
  conversionRate: string;
}

const UserBehaviorAnalytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}analytics/user-behavior`);
        if (data.success) {
          setAnalyticsData(data);
        } else {
          setError('Failed to fetch analytics data');
          enqueueSnackbar('Failed to fetch analytics data', { variant: 'error' });
        }
      } catch (error) {
        setError('Error fetching analytics data');
        enqueueSnackbar('Error fetching analytics data', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [enqueueSnackbar]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Loader className="animate-spin h-12 w-12 text-blue-600" />
        <span className="ml-3 text-xl font-semibold text-gray-700">Loading analytics data...</span>
      </div>
    );
  }

  if (error || !analyticsData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error || 'Failed to load analytics data'}</p>
        </div>
      </div>
    );
  }

  const mostViewedProductsData = {
    labels: analyticsData.mostViewedProducts.map(product => product.name),
    datasets: [
      {
        label: 'Views',
        data: analyticsData.mostViewedProducts.map(product => product.views),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const abandonedCartsData = {
    labels: analyticsData.abandonedCarts.map(cart => cart.cartCount),
    datasets: [
      {
        label: 'Abandoned Carts',
        data: analyticsData.abandonedCarts.map(cart => cart.cartCount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <TrendingUp className="mr-2" /> User Behavior Analytics
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Eye className="mr-2 text-blue-500" /> Most Viewed Products
            </h2>
            <Bar
              data={mostViewedProductsData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Product Views',
                  },
                },
              }}
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <ShoppingCart className="mr-2 text-red-500" /> Abandoned Carts
            </h2>
            <Doughnut
              data={abandonedCartsData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: true,
                    text: 'Abandoned Carts by User',
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="mr-2 text-green-500" /> Conversion Rate
          </h2>
          <div className="flex items-center justify-center">
            <div className="text-5xl font-bold text-green-600">{analyticsData.conversionRate}%</div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Most Viewed Products (Details)</h2>
            <ul className="space-y-2">
              {analyticsData.mostViewedProducts.map((product) => (
                <li key={product._id} className="flex justify-between items-center">
                  <span className="font-medium">{product.name}</span>
                  <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded-full text-sm">
                    {product.views} views
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Abandoned Carts (Details)</h2>
            <ul className="space-y-2">
              {analyticsData.abandonedCarts.map((cart) => (
                <li key={cart._id} className="flex justify-between items-center">
                  <span className="font-medium">User ID: {cart._id}</span>
                  <span className="bg-red-100 text-red-800 py-1 px-2 rounded-full text-sm">
                    {cart.cartCount} carts
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBehaviorAnalytics;