// pages/AdminDashboard/analytics/sales.tsx
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

// Register the components required for the chart
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const SalesAnalytics = () => {
  const [salesData, setSalesData] = useState<any[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}analytics/sales-data`); // Adjust API route accordingly
        setSalesData(data);
      } catch (error) {
        enqueueSnackbar('Failed to load sales data', { variant: 'error' });
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
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sales Analytics</h1>
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Sales Data</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month/Year</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Revenue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sales</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {salesData.map((item) => (
              <tr key={`${item._id.month}-${item._id.year}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{`${item._id.month}/${item._id.year}`}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.totalRevenue.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.totalSales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesAnalytics;
