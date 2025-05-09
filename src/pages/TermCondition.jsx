import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Basic Rights</h2>
        <p className="text-gray-700">
          As a user of our e-commerce platform, you have the right to a safe, secure,
          and transparent shopping experience. You are entitled to clear product
          information, secure payment processing, timely delivery, and customer support.
          We are committed to protecting your personal data in compliance with data
          protection laws and will never share your information without your consent.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Basic Responsibilities</h2>
        <p className="text-gray-700">
          By using this platform, you agree to provide accurate account and payment
          information, respect the rights of other users, and refrain from fraudulent or
          illegal activity. You are responsible for maintaining the confidentiality of
          your login credentials and for all activities under your account. We reserve
          the right to suspend or terminate accounts that violate these responsibilities.
        </p>
      </section>

      <p className="text-sm text-gray-500 text-center mt-8">
        By continuing to use this website, you agree to abide by these terms and conditions.
      </p>
    </div>
  );
};

export default TermsAndConditions;
