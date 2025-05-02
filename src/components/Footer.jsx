import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white px-4 sm:px-10 pt-10 pb-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        
        {/* About */}
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="Logo" />
          <p className="text-sm text-gray-400">
            We’re your go-to destination for high-quality products with fast delivery, trusted service, and affordable prices.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h2 className="font-semibold mb-4 text-lg">Useful Links</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/collection" className="hover:text-white">Shop</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="font-semibold mb-4 text-lg">Customer Support</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Returns</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} YourStore. All rights reserved.
      </div>
    </div>

  )
}

export default Footer


