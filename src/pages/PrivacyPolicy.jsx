import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

      <p className="text-gray-700 mb-4">
        This Privacy Policy describes how we collect, use, and protect your personal information
        when you visit or make a purchase from our website.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
        <p className="text-gray-700">
          We collect information you provide to us directly such as your name, email address,
          phone number, shipping address, billing information, and order details. We also
          automatically collect data such as your IP address, browser type, and browsing
          behavior on our website.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
        <p className="text-gray-700">
          Your information is used to process orders, deliver products, manage your account,
          send order updates, and improve our services. We may also send promotional emails
          if you opt-in.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Sharing Your Information</h2>
        <p className="text-gray-700">
          We do not sell your personal information. We may share your data with trusted
          third-party providers (like payment processors and shipping services) only
          when necessary to fulfill your order.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Security Measures</h2>
        <p className="text-gray-700">
          We use industry-standard security measures to protect your data, including SSL encryption
          and secure payment gateways. However, no online transaction is ever 100% secure.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
        <p className="text-gray-700">
          You have the right to access, update, or delete your personal information at any time.
          Contact our support team to make changes or submit privacy-related requests.
        </p>
      </section>

      <p className="text-sm text-gray-500 text-center mt-8">
        This policy may be updated periodically. Continued use of our website means you accept the latest version.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
