// components/BuyerNavbar.tsx

'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, ShoppingCart, Settings, List, LogOut } from 'lucide-react'; // Importing icons

const BuyerNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOrderDropdownOpen, setIsOrderDropdownOpen] = useState(false);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  const router = useRouter();

  const orderDropdownRef = useRef<HTMLDivElement>(null);
  const settingsDropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/signin'); // Redirect to login page after logout
  };

  // Function to handle clicks outside of dropdowns
  const handleClickOutside = (event: MouseEvent) => {
    if (
      orderDropdownRef.current && !orderDropdownRef.current.contains(event.target as Node) &&
      settingsDropdownRef.current && !settingsDropdownRef.current.contains(event.target as Node)
    ) {
      setIsOrderDropdownOpen(false);
      setIsSettingsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleOrderDropdown = () => {
    setIsOrderDropdownOpen((prev) => !prev);
    setIsSettingsDropdownOpen(false); // Close settings dropdown when opening orders
  };

  const toggleSettingsDropdown = () => {
    setIsSettingsDropdownOpen((prev) => !prev);
    setIsOrderDropdownOpen(false); // Close orders dropdown when opening settings
  };

  return (
    <nav className="bg-gray-800 p-4 fixed w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">MarketPlace</div>
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/BuyerDashboard" className="text-gray-300 hover:text-white flex items-center">
            <Home className="mr-1" /> Home
          </Link>
          <Link href="/BuyerDashboard/cart" className="text-gray-300 hover:text-white flex items-center">
            <ShoppingCart className="mr-1" /> Cart
          </Link>

          {/* Orders Dropdown */}
          <div className="relative" ref={orderDropdownRef}>
            <button
              onClick={toggleOrderDropdown}
              className="text-gray-300 hover:text-white flex items-center"
            >
              <List className="mr-1" /> Orders
            </button>
            {isOrderDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                <Link href="/BuyerDashboard/orderStatus" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Order Status
                </Link>
                <Link href="/BuyerDashboard/orderHistory" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Order History
                </Link>
              </div>
            )}
          </div>

          {/* Settings Dropdown */}
          <div className="relative" ref={settingsDropdownRef}>
            <button
              onClick={toggleSettingsDropdown}
              className="text-gray-300 hover:text-white flex items-center"
            >
              <Settings className="mr-1" /> Settings
            </button>
            {isSettingsDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                <Link href="/BuyerDashboard/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Profile
                </Link>
                <Link href="/BuyerDashboard/changepassword" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Change Password
                </Link>
                <Link href="/BuyerDashboard/changeaddress" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
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
          <Link href="/BuyerDashboard" className="block text-gray-300 hover:text-white">
            <Home className="inline mr-2" /> Home
          </Link>
          <Link href="/BuyerDashboard/cart" className="block text-gray-300 hover:text-white">
            <ShoppingCart className="inline mr-2" /> Cart
          </Link>

          {/* Orders Dropdown for Mobile */}
          <div>
            <button
              onClick={toggleOrderDropdown}
              className="block text-gray-300 hover:text-white"
            >
              <List className="inline mr-2" /> Orders
            </button>
            {isOrderDropdownOpen && (
              <div className="pl-4 space-y-1">
                <Link href="/BuyerDashboard/orderStatus" className="block text-gray-300 hover:text-white">
                  Order Status
                </Link>
                <Link href="/BuyerDashboard/orderHistory" className="block text-gray-300 hover:text-white">
                  Order History
                </Link>
              </div>
            )}
          </div>

          {/* Settings Dropdown for Mobile */}
          <div>
            <button
              onClick={toggleSettingsDropdown}
              className="block text-gray-300 hover:text-white"
            >
              <Settings className="inline mr-2" /> Settings
            </button>
            {isSettingsDropdownOpen && (
              <div className="pl-4 space-y-1">
                <Link href="/BuyerDashboard/profile" className="block text-gray-300 hover:text-white">
                  Profile
                </Link>
                <Link href="/BuyerDashboard/changepassword" className="block text-gray-300 hover:text-white">
                  Change Password
                </Link>
                <Link href="/BuyerDashboard/changeaddress" className="block text-gray-300 hover:text-white">
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

export default BuyerNavbar;

