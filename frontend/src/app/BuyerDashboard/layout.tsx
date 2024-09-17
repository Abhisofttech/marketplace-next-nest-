'use client';
import BuyerNavbar from '@/components/BuyerNavbar';
import Footer from '@/components/Footer';
import { ReactNode } from 'react'; 

interface BuyerDashboardLayoutProps {
  children: ReactNode;
}

const BuyerDashboardLayout = ({ children }: BuyerDashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
     
      <BuyerNavbar />

      {/* Main content area */}
      <div className="pt-16"> {/* Adding padding to avoid overlap with fixed navbar */}
        <div className="max-w-7xl mx-auto p-4">
          {children}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default BuyerDashboardLayout;
