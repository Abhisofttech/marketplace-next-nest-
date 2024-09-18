
'use client';
import Footer from '@/components/Footer';
import SellerNavbar from '@/components/SellerNavbar';
import { ReactNode } from 'react'; 

interface SellerDashboardLayoutProps {
  children: ReactNode;
}

const SellerDashboardLayout = ({ children }: SellerDashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
     
      <SellerNavbar />

      {/* Main content area */}
      <div className="pt-16 min-h-screen"> {/* Adding padding to avoid overlap with fixed navbar */}
        <div className="max-w-7xl mx-auto p-4">
          {children}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default SellerDashboardLayout;
