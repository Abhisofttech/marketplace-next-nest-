// const Footer = () => {
//     return (
//       <footer className="bg-gray-800 text-white py-4 fixed bottom-0 w-full">
//         <div className="container mx-auto text-center">
//           <p>&copy; 2024 My E-Commerce. All rights reserved.</p>
//         </div>
//       </footer>
//     );
//   };
  
//   export default Footer;
  

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-4">
      <div className="container mx-auto text-center">
        <p className="text-sm md:text-base">
          &copy; 2024 My E-Commerce. All rights reserved.
        </p>
        <div className="mt-2 flex justify-center space-x-4">
          <a href="/about" className="hover:underline">
            About Us
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
