// src/components/SettingsPage.jsx
import React from 'react';

const SettingsPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

      {/* Personal Information */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" placeholder="John Doe" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" placeholder="john@example.com" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input type="tel" placeholder="+91 9876543210" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Changes</button>
        </form>
      </section>

      {/* Security Settings */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Password</label>
            <input type="password" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input type="password" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input type="password" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <button type="submit" className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Update Password</button>
        </form>
      </section>

      {/* Address Book */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Address Book</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Street Address</label>
            <input type="text" placeholder="123 Main St" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input type="text" placeholder="Patna" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input type="text" placeholder="Bihar" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Postal Code</label>
              <input type="text" placeholder="800001" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <input type="text" placeholder="India" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>
          </div>
          <button type="submit" className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Add Address</button>
        </form>
      </section>

      {/* Payment Methods */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
            <input type="text" placeholder="John Doe" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Card Number</label>
            <input type="text" placeholder="1234 5678 9012 3456" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
              <input type="text" placeholder="MM/YY" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CVV</label>
              <input type="text" placeholder="123" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>
          </div>
          <button type="submit" className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Add Payment Method</button>
        </form>
      </section>

      {/* Notification Preferences */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
        <form className="space-y-4">
          <div className="flex items-center">
            <input type="checkbox" id="orderUpdates" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
            <label htmlFor="orderUpdates" className="ml-2 block text-sm text-gray-700">Order Updates</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="promotions" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
            <label htmlFor="promotions" className="ml-2 block text-sm text-gray-700">Promotions</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="newsletter" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
            <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">Newsletter</label>
          </div>
          <button type="submit" className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">Save Preferences</button>
        </form>
      </section>
    </div>
  );
};

export default SettingsPage;
