import React from "react";

const ReturnPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Return & Refund Policy</h1>

      <p className="text-gray-700 mb-4">
        Thank you for shopping with us. If you are not completely satisfied with your purchase,
        we're here to help. Please review our return policy below.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Return Eligibility</h2>
        <p className="text-gray-700">
          You may return most new, unopened items within 7–14 days of delivery for a full refund or exchange.
          Products must be in their original packaging, unused, and in resalable condition.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Non-Returnable Items</h2>
        <p className="text-gray-700">
          Items such as gift cards, downloadable software, and perishable goods cannot be returned.
          Personalized or custom-made items may not be eligible unless defective or damaged.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Return Process</h2>
        <p className="text-gray-700">
          To initiate a return, please contact our support team with your order number and reason for return.
          You will receive return instructions and a shipping label if applicable.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Refunds</h2>
        <p className="text-gray-700">
          Once your return is received and inspected, we will notify you of the approval or rejection of your refund.
          If approved, the refund will be processed to your original payment method within 5–10 business days.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Shipping Costs</h2>
        <p className="text-gray-700">
          Return shipping costs are the responsibility of the customer unless the return is due to a defect or error
          on our part.
        </p>
      </section>

      <p className="text-sm text-gray-500 text-center mt-8">
        We reserve the right to modify this policy at any time. Last updated: May 2025.
      </p>
    </div>
  );
};

export default ReturnPolicy;
