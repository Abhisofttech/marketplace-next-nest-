// // pages/AdminDashboard/analytics/sales.tsx
// 'use client'

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSnackbar } from 'notistack';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   Title,
//   Tooltip,
//   Legend,
//   BarElement,
//   CategoryScale,
//   LinearScale,
// } from 'chart.js';

// // Register the components required for the chart
// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// const SalesAnalytics = () => {
//   const [salesData, setSalesData] = useState<any[]>([]);
//   const { enqueueSnackbar } = useSnackbar();

//   useEffect(() => {
//     const fetchSalesData = async () => {
//       try {
//         const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}analytics/sales-data`); // Adjust API route accordingly
//         setSalesData(data);
//       } catch (error) {
//         enqueueSnackbar('Failed to load sales data', { variant: 'error' });
//       }
//     };

//     fetchSalesData();
//   }, [enqueueSnackbar]);

//   const chartData = {
//     labels: salesData.map((item) => `${item._id.month}/${item._id.year}`),
//     datasets: [
//       {
//         label: 'Total Revenue',
//         data: salesData.map((item) => item.totalRevenue),
//         backgroundColor: 'rgba(255, 99, 132, 0.6)',
//       },
     
//     ],
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Sales Analytics</h1>
//       <div className="bg-white p-4 rounded-lg shadow-md mb-6">
//         <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
//       </div>
      
//       <div className="bg-white p-4 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4">Sales Data</h2>
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month/Year</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Revenue</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sales</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {salesData.map((item) => (
//               <tr key={`${item._id.month}-${item._id.year}`}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{`${item._id.month}/${item._id.year}`}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.totalRevenue.toFixed(2)}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.totalSales}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default SalesAnalytics;


'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { TrendingUp, DollarSign, ShoppingCart, Loader, AlertCircle, IndianRupee } from 'lucide-react';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const SalesAnalytics = () => {
  const [salesData, setSalesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}analytics/sales-data`);
        setSalesData(data);
      } catch (error) {
        setError('Failed to load sales data');
        enqueueSnackbar('Failed to load sales data', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, [enqueueSnackbar]);

  const chartData = {
    labels: salesData.map((item) => `${item._id.month}/${item._id.year}`),
    datasets: [
      {
        label: 'Total Revenue',
        data: salesData.map((item) => item.totalRevenue),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions:any = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Sales Revenue',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Revenue ($)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Month/Year',
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Loader className="animate-spin h-12 w-12 text-blue-600" />
        <span className="ml-3 text-xl font-semibold text-gray-700">Loading sales data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
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
          <TrendingUp className="mr-2" /> Sales Analytics
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
              <IndianRupee className="mr-2 text-green-500" /> Total Revenue
            </h2>
            <p className="text-3xl font-bold text-gray-900">
            ₹{salesData.reduce((sum, item) => sum + item.totalRevenue, 0).toFixed(2)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
              <ShoppingCart className="mr-2 text-blue-500" /> Total Sales
            </h2>
            <p className="text-3xl font-bold text-gray-900">
              {salesData.reduce((sum, item) => sum + item.totalSales, 0)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
              <TrendingUp className="mr-2 text-purple-500" /> Average Revenue
            </h2>
            <p className="text-3xl font-bold text-gray-900">
            ₹{(salesData.reduce((sum, item) => sum + item.totalRevenue, 0) / salesData.length).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <Bar data={chartData} options={chartOptions} />
          
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Data</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month/Year</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Revenue</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sales</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {salesData.map((item) => (
                  <tr key={`${item._id.month}-${item._id.year}`} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{`${item._id.month}/${item._id.year}`}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{item.totalRevenue.toFixed(0)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.totalSales}</td>
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

export default SalesAnalytics;