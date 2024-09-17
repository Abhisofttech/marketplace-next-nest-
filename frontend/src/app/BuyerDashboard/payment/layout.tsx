'use client';

import Link from 'next/link';
import { ReactNode } from 'react'; 

interface PaymentLayoutProps {
  children: ReactNode;
}

const PaymentLayout = ({ children }: PaymentLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
     
<Link href='/BuyerDashboard/cart'>Back to cart</Link>
      {/* Main content area */}
      <div className="pt-16"> {/* Adding padding to avoid overlap with fixed navbar */}
        <div className="max-w-7xl mx-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PaymentLayout;
