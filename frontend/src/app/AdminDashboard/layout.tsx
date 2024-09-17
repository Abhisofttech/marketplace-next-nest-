
'use client';
import Footer from '@/components/Footer';
import AdminNavbar from '@/components/AdminNavbar';
import { ReactNode } from 'react'; 

interface SellerDashboardLayoutProps {
  children: ReactNode;
}

const SellerDashboardLayout = ({ children }: SellerDashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
     
      <AdminNavbar />

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

export default SellerDashboardLayout;
