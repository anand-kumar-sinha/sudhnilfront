import React from 'react'

const Category = () => {
  return (
    <div>
     <section class="py-12 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      
      <!-- Category Card -->
      <a href="/category/electronics" class="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition">
        <img src="/images/electronics.jpg" alt="Electronics" class="w-full h-40 object-cover">
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-800">Electronics</h3>
        </div>
      </a>

      <a href="/category/fashion" class="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition">
        <img src="/images/fashion.jpg" alt="Fashion" class="w-full h-40 object-cover">
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-800">Fashion</h3>
        </div>
      </a>

      <a href="/category/home" class="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition">
        <img src="/images/home.jpg" alt="Home & Furniture" class="w-full h-40 object-cover">
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-800">Home & Furniture</h3>
        </div>
      </a>

      <a href="/category/beauty" class="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition">
        <img src="/images/beauty.jpg" alt="Beauty & Health" class="w-full h-40 object-cover">
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-800">Beauty & Health</h3>
        </div>
      </a>

    </div>
  </div>
</section>
 
    </div>
  )
}

export default Category
