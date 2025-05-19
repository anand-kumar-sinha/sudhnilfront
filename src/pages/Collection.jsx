import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const ITEMS_PER_PAGE = 12;

const Collection = () => {
  const {
    products,
    categories,
    fetchProductByCategory,
    getProductsData,
    hasMoreProducts,
  } = useContext(ShopContext);

  const location = useLocation();
  const { id } = location.state || {};

  const [showFilter, setShowFilter] = useState(false);
  const [sortType, setSortType] = useState("relevant");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState(id || "0");

  // Load initial products
  useEffect(() => {
    if (currentCategory === "0") {
      getProductsData(1, ITEMS_PER_PAGE);
    } else {
      fetchProductByCategory(currentCategory, 1, ITEMS_PER_PAGE);
    }
  }, [currentCategory]);

  // Sort whenever sortType or products change
  useEffect(() => {
    if (!products) return;

    let sorted = [...products];
    switch (sortType) {
      case "low-high":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setSortedProducts(sorted);
  }, [products, sortType]);

  const toggleCategory = (catId) => {
    setPage(1);
    setCurrentCategory(catId);
  };

  const loadMoreProducts = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    if (currentCategory === "0") {
      getProductsData(nextPage, ITEMS_PER_PAGE);
    } else {
      fetchProductByCategory(currentCategory, nextPage, ITEMS_PER_PAGE);
    }
  };

  const displayProducts = sortType === "relevant" ? products : sortedProducts;

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 mb-4 pt-10 border-t">
      {/* Filter Sidebar */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            alt="dropdown"
          />
        </p>

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2" onChange={() => toggleCategory("0")}>
              <input type="radio" name="category" className="w-3" value="0" />
              All
            </label>
            {categories?.map((cat) => (
              <label
                key={cat._id}
                className="flex gap-2"
                onChange={() => toggleCategory(cat._id)}
              >
                <input
                  type="radio"
                  name="category"
                  className="w-3"
                  value={cat.categoryName}
                />
                {cat.categoryName}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Products Display */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border-gray-300 border-2 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Price Low to High</option>
            <option value="high-low">Sort by: Price High to Low</option>
          </select>
        </div>

        <InfiniteScroll
          dataLength={displayProducts.length}
          next={loadMoreProducts}
          hasMore={hasMoreProducts}
          loader={<p>Loading...</p>}
          endMessage={<p>No more products</p>}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {displayProducts && displayProducts.length > 0 ? (
              displayProducts.map((item, index) => (
                <ProductItem key={index} item={item} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products found.
              </p>
            )}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Collection;
