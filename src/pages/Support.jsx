import React, { useState } from "react";

const Support = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const faqs = [
    {
      question: "How long does it take for cement delivery?",
      answer: "Cement orders are typically delivered within 2-3 working days depending on location.",
    },
    {
      question: "Can I return unused bricks or TMT Bars?",
      answer: "Returns are accepted for full, undamaged units within 7 days of delivery.",
    },
    {
      question: "Do you offer bulk discounts on sand or TMT Bars?",
      answer: "Yes, bulk discounts apply automatically at checkout for orders over 5 tons or 100 TMT Bars.",
    },
    {
      question: "Is transport included in the price?",
      answer: "Transport charges are calculated at checkout based on your delivery address.",
    },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;

    // Validate phone number input: allow only numbers
    if (/[^0-9]/.test(value)) {
      setPhoneError("Only numbers are allowed.");
    } else {
      setPhoneError("");
    }

    // Update phone number, removing non-numeric characters
    setForm({ ...form, phone: value.replace(/[^0-9]/g, "") });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleNewResponse = () => {
    setForm({ name: "", email: "", phone: "", message: "" });
    setSubmitted(false);
    setEnded(false);
  };

  const handleEndSupport = () => {
    setEnded(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Support & Help</h1>

      {/* FAQs */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border p-4 rounded-lg bg-gray-50">
              <p className="font-medium text-gray-700">{faq.question}</p>
              <p className="text-sm text-gray-600 mt-1">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
        {ended ? (
          <div className="bg-gray-100 p-4 rounded-lg text-center text-gray-700">
            <p>Thank you! If you need help later, feel free to come back anytime. 😊</p>
          </div>
        ) : submitted ? (
          <div className="bg-green-100 p-4 rounded-lg text-green-700 space-y-4">
            <p>Your message has been submitted. We'll get back to you soon.</p>
            <div className="flex gap-4">
              <button
                onClick={handleNewResponse}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit Another Response
              </button>
              <button
                onClick={handleEndSupport}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                No, I don’t need more help
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-shadow duration-200 hover:shadow-lg focus:shadow-lg hover:shadow-blue-200 focus:shadow-blue-300"
            />
            
            {/* Email Input */}
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-shadow duration-200 hover:shadow-lg focus:shadow-lg hover:shadow-blue-200 focus:shadow-blue-300"
            />
            
            {/* Phone Input with Validation */}
            <input
              name="phone"
              type="text"
              placeholder="Contact Number"
              value={form.phone}
              onChange={handlePhoneChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-shadow duration-200 hover:shadow-lg focus:shadow-lg hover:shadow-blue-200 focus:shadow-blue-300"
            />
            {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
            
            {/* Message Input */}
            <textarea
              name="message"
              placeholder="How can we help you?"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-shadow duration-200 hover:shadow-lg focus:shadow-lg hover:shadow-blue-200 focus:shadow-blue-300"
            ></textarea>
            
            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default Support;
