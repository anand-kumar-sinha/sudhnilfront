import React, { useContext, useRef, useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import SearchProductCard from "../components/SearchProductCard";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const LIMIT = 10;

const Search = () => {
  const { setLoading, backandUrl } = useContext(ShopContext);
  const debounceRef = useRef(null);

  // State management
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState("default");

  // Fetch products with proper pagination
  const fetchProducts = async (searchKey, pageNum, isNewSearch = false) => {
    if (!searchKey.trim()) {
      setProducts([]);
      setHasMore(false);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(
        `${backandUrl}/api/product/search?key=${encodeURIComponent(searchKey)}&page=${pageNum}`
      );

      if (res.data.success) {
        setTotalPages(res.data.totalPages);
        const newProducts = res.data.products;
        
        setProducts(prev => 
          isNewSearch ? newProducts : [...prev, ...newProducts]
        );
        
        // Update hasMore based on current page vs total pages
        const moreAvailable = pageNum < res.data.totalPages;
        setHasMore(moreAvailable);
        
        if (isNewSearch) {
          setPage(2); // Reset to page 2 for new searches
        } else {
          setPage(prev => prev + 1);
        }
        
        console.log('Fetched:', {
          page: pageNum,
          received: newProducts.length,
          totalPages: res.data.totalPages,
          hasMore: moreAvailable
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search handler
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setPage(1);
      fetchProducts(value, 1, true);
    }, 500);
  };

  // Sort products
  const sortedProducts = React.useMemo(() => {
    if (!products.length) return [];
    
    const sorted = [...products];
    switch (sortOrder) {
      case "low":
        return sorted.sort((a, b) => a.price - b.price);
      case "high":
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted; // Default order (relevance or as returned from API)
    }
  }, [products, sortOrder]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        🔍 Search Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
        <div>
          <h3 className="font-semibold text-lg mb-2">Sort by Price</h3>
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="default">Default (Relevance)</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="md:col-span-3">
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search for cement, TMT bars, bricks..."
            value={query}
            onChange={handleSearch}
            className="w-full border p-4 pl-12 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-4 top-4 text-gray-400" />
        </div>

        <InfiniteScroll
          dataLength={sortedProducts.length}
          next={() => fetchProducts(query, page)}
          hasMore={hasMore}
          loader={
            <div className="text-center py-4">
              <p>Loading more products...</p>
            </div>
          }
          endMessage={
            <p className="text-center text-gray-500 py-4">
              {sortedProducts.length > 0 
                ? "You've reached the end of results" 
                : "No products found"}
            </p>
          }
          scrollThreshold="100px"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((item) => (
              <SearchProductCard item={item} key={item._id} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Search;