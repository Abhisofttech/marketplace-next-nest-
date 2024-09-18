'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, BarChart, User, Settings, Lock, MapPin, Package, PieChart, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AdminNavbar = () => {
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  
  const analyticsRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/signin'); // Redirect to login page after logout
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        analyticsRef.current && !analyticsRef.current.contains(event.target as Node) &&
        settingsRef.current && !settingsRef.current.contains(event.target as Node)
      ) {
        setIsAnalyticsOpen(false);
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleAnalytics = () => {
    setIsAnalyticsOpen((prev) => !prev);
    setIsSettingsOpen(false); // Close settings dropdown when opening analytics
  };

  const toggleSettings = () => {
    setIsSettingsOpen((prev) => !prev);
    setIsAnalyticsOpen(false); // Close analytics dropdown when opening settings
  };

  return (
    <nav className="bg-gray-800 p-4 fixed w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-lg font-bold">Admin</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {/* Analytics Dropdown */}
          <div className="relative" ref={analyticsRef}>
            <button
              onClick={toggleAnalytics}
              className="text-gray-300 hover:text-white flex items-center space-x-1"
            >
              <BarChart className="w-5 h-5" />
              <span>Analytics</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {isAnalyticsOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                <Link href="/AdminDashboard/analytics/sales" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  <PieChart className="w-4 h-4 mr-2 inline" /> Sales Analytics
                </Link>
                <Link href="/AdminDashboard/analytics/userbehavior" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  <User className="w-4 h-4 mr-2 inline" /> User Behavior Analytics
                </Link>
                <Link href="/AdminDashboard/analytics/inventory" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  <Package className="w-4 h-4 mr-2 inline" /> Inventory Management
                </Link>
              </div>
            )}
          </div>

          {/* Settings Dropdown */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={toggleSettings}
              className="text-gray-300 hover:text-white flex items-center space-x-1"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {isSettingsOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                <Link href="/AdminDashboard/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  <User className="w-4 h-4 mr-2 inline" /> Profile
                </Link>
                <Link href="/AdminDashboard/changepassword" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  <Lock className="w-4 h-4 mr-2 inline" /> Change Password
                </Link>
                <Link href="/AdminDashboard/changeaddress" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                  <MapPin className="w-4 h-4 mr-2 inline" /> Change Address
                </Link>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 text-gray-300 hover:text-white bg-red-500 px-3 py-1 rounded-md"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-300 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link href="/AdminDashboard/analytics/sales" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">
            <PieChart className="w-4 h-4 mr-2 inline" /> Sales Analytics
          </Link>
          <Link href="/AdminDashboard/analytics/userbehavior" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">
            <User className="w-4 h-4 mr-2 inline" /> User Behavior Analytics
          </Link>
          <Link href="/AdminDashboard/analytics/inventory" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">
            <Package className="w-4 h-4 mr-2 inline" /> Inventory Management
          </Link>
          <Link href="/AdminDashboard/profile" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">
            <User className="w-4 h-4 mr-2 inline" /> Profile
          </Link>
          <Link href="/AdminDashboard/changepassword" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">
            <Lock className="w-4 h-4 mr-2 inline" /> Change Password
          </Link>
          <Link href="/AdminDashboard/changeaddress" className="block px-4 py-2 text-gray-300 hover:bg-gray-700">
            <MapPin className="w-4 h-4 mr-2 inline" /> Change Address
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 text-gray-300 hover:text-white bg-red-500 px-3 py-1 rounded-md w-full justify-center"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
