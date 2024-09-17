"use client";

import { useState } from 'react';
import Link from 'next/link';
import { User, Bell, Settings, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/path-to-avatar.jpg'
  });

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
        </div>
        <nav className="mt-6">
          <Link href="/dashboard" className="block py-2 px-4 text-gray-700 hover:bg-blue-500 hover:text-white">
            Overview
          </Link>
          <Link href="/dashboard/profile" className="block py-2 px-4 text-gray-700 hover:bg-blue-500 hover:text-white">
            Profile
          </Link>
          <Link href="/dashboard/settings" className="block py-2 px-4 text-gray-700 hover:bg-blue-500 hover:text-white">
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name}</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Bell size={24} />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Settings size={24} />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <LogOut size={24} />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Info Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
              Edit Profile
            </button>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <ul className="space-y-2">
              <li className="text-gray-600">Logged in 2 hours ago</li>
              <li className="text-gray-600">Updated profile yesterday</li>
              <li className="text-gray-600">Placed an order 3 days ago</li>
            </ul>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300">
                View Orders
              </button>
              <button className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition duration-300">
                Browse Products
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;