'use client';
import BuyerNavbar from '@/components/BuyerNavbar';
import Footer from '@/components/Footer';
import { ReactNode } from 'react'; 

interface BuyerDashboardLayoutProps {
  children: ReactNode;
}

const BuyerDashboardLayout = ({ children }: BuyerDashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <BuyerNavbar  />

      {/* Main content area */}
      <div className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </div>
      
      <Footer  />
    </div>
  );
};

export default BuyerDashboardLayout;
