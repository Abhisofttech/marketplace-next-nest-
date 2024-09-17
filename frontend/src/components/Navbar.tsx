'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Home, UserPlus, LogIn, Menu } from 'lucide-react'; // Importing icons

type NavLinkProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu

  return (
    <nav className="bg-gray-700 py-1 px-5 fixed w-full z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold tracking-tight hover:text-blue-200 transition duration-300">
          MarketPlace
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-1">
          <NavLink href="/" label="Home" icon={<Home className="mr-1" />} />
          <NavLink href="/signup" label="Sign Up" icon={<UserPlus className="mr-1" />} />
          <NavLink href="/signin" label="Sign In" icon={<LogIn className="mr-1" />} />
        </div>

        {/* Hamburger Menu Icon for Mobile View */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2">
          <NavLink href="/" label="Home" icon={<Home className="mr-1" />} />
          <NavLink href="/signup" label="Sign Up" icon={<UserPlus className="mr-1" />} />
          <NavLink href="/signin" label="Sign In" icon={<LogIn className="mr-1" />} />
        </div>
      )}
    </nav>
  );
};

// Use the NavLinkProps type for the NavLink component
const NavLink: React.FC<NavLinkProps> = ({ href, label, icon }) => (
  <Link href={href} className="flex items-center text-white px-4 py-1 rounded-full hover:bg-white hover:text-gray-700 transition duration-300 text-sm font-medium">
    {icon}
    {label}
  </Link>
);

export default Navbar;





