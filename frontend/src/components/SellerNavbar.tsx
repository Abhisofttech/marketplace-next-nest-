'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, Package, Settings, Box, PlusSquare, ShoppingCart, LogOut } from 'lucide-react'; // Importing icons

const SellerNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/signin'); // Redirect to login page after logout
  };

  return (
    <nav className="bg-gray-800 p-4 fixed w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">MarketPlace</div>
        
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/SellerDashboard" className="text-gray-300 hover:text-white flex items-center">
            <Home className="mr-1" /> Home
          </Link>

          {/* Products Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
              className="text-gray-300 hover:text-white flex items-center"
            >
              <Package className="mr-1" /> Products
            </button>
            {isProductDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                <Link href="/SellerDashboard/ShowProduct" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <Box className="inline-block mr-2" /> Show Products
                </Link>
                <Link href="/SellerDashboard/CreateProduct" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <PlusSquare className="inline-block mr-2" /> Create Product
                </Link>
                <Link href="/SellerDashboard/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <ShoppingCart className="inline-block mr-2" /> Orders
                </Link>
              </div>
            )}
          </div>

          {/* Settings Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSettingsDropdownOpen(!isSettingsDropdownOpen)}
              className="text-gray-300 hover:text-white flex items-center"
            >
              <Settings className="mr-1" /> Settings
            </button>
            {isSettingsDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                <Link href="/SellerDashboard/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Profile
                </Link>
                <Link href="/SellerDashboard/changepassword" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Change Password
                </Link>
                <Link href="/SellerDashboard/changeaddress" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Change Address
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="text-gray-300 hover:text-white bg-red-500 px-3 rounded-md py-1 flex items-center"
          >
            <LogOut className="mr-1" /> Logout
          </button>
        </div>

        {/* Hamburger menu for mobile view */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link href="/SellerDashboard" className="block text-gray-300 hover:text-white">
            <Home className="inline mr-2" /> Home
          </Link>

          {/* Products Dropdown for Mobile */}
          <div>
            <button
              onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
              className="block text-gray-300 hover:text-white"
            >
              <Package className="inline mr-2" /> Products
            </button>
            {isProductDropdownOpen && (
              <div className="pl-4 space-y-1">
                <Link href="/SellerDashboard/ShowProduct" className="block text-gray-300 hover:text-white">
                  Show Products
                </Link>
                <Link href="/SellerDashboard/CreateProduct" className="block text-gray-300 hover:text-white">
                  Create Product
                </Link>
                <Link href="/SellerDashboard/orders" className="block text-gray-300 hover:text-white">
                  Orders
                </Link>
              </div>
            )}
          </div>

          {/* Settings Dropdown for Mobile */}
          <div>
            <button
              onClick={() => setIsSettingsDropdownOpen(!isSettingsDropdownOpen)}
              className="block text-gray-300 hover:text-white"
            >
              <Settings className="inline mr-2" /> Settings
            </button>
            {isSettingsDropdownOpen && (
              <div className="pl-4 space-y-1">
                <Link href="/SellerDashboard/profile" className="block text-gray-300 hover:text-white">
                  Profile
                </Link>
                <Link href="/SellerDashboard/changepassword" className="block text-gray-300 hover:text-white">
                  Change Password
                </Link>
                <Link href="/SellerDashboard/changeaddress" className="block text-gray-300 hover:text-white">
                  Change Address
                </Link>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="block text-gray-300 hover:text-white"
          >
            <LogOut className="inline mr-2" /> Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default SellerNavbar;
