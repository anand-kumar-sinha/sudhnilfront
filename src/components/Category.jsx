import React from 'react';

const Category = () => {
  return (
    <div>
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">

            {/* Category Card */}
            <a href="/category/electronics" className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition">
              <img src="/images/electronics.jpg" alt="Electronics" className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">Electronics</h3>
              </div>
            </a>

            <a href="/category/fashion" className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition">
              <img src="/images/fashion.jpg" alt="Fashion" className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">Fashion</h3>
              </div>
            </a>

            <a href="/category/home" className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition">
              <img src="/images/home.jpg" alt="Home & Furniture" className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">Home & Furniture</h3>
              </div>
            </a>

            <a href="/category/beauty" className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition">
              <img src="/images/beauty.jpg" alt="Beauty & Health" className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">Beauty & Health</h3>
              </div>
            </a>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Category;
