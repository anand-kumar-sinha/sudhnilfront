import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import Review from "../components/Review";

const Product = () => {
  const { productId } = useParams();
  const { productDataById, currency, addToCart, addToWishlist, singleProduct } =
    useContext(ShopContext);
  const [image, setImage] = useState(singleProduct?.image[0]);
  const [size, setSize] = useState("");
  const [wishlistAdded, setWishlistAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("description"); // NEW: state for tabs

  const handleAddToWishlist = (productId) => {
    addToWishlist({ productId });
    setWishlistAdded(true);
    setTimeout(() => setWishlistAdded(false), 2000);
  };

  useEffect(() => {
    productDataById(productId);
    setImage(singleProduct?.image[0]);
  }, [productId]);
  
  useEffect(() => {
    setImage(singleProduct?.image[0]);
  }, [singleProduct]);

  return  (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full ">
            {singleProduct?.image?.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%] ">
            <img className="w-full h-auto max-w-full" src={image} alt="" />
          </div>
        </div>

        {/* product info */}
        <div className="flex-1 ">
          <h1 className="font-medium text-2xl mt-2">{singleProduct?.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {singleProduct?.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {singleProduct?.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {singleProduct?.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => addToCart(singleProduct?._id, size)}
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
            >
              Add To Cart
            </button>
            <button
              onClick={() => handleAddToWishlist(singleProduct?._id)}
              className="border border-black text-black px-8 py-3 text-sm hover:bg-black hover:text-white transition-colors"
            >
              Add to Wishlist
            </button>
          </div>
          {wishlistAdded && (
            <p className="text-green-600 mt-2 text-sm">Added to wishlist!</p>
          )}
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description and review section */}
      <div className="mt-20">
        <div className="flex border-b">
          <button
            className={`px-5 py-3 text-sm border-r ${
              activeTab === "description" ? "font-semibold text-black" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`px-5 py-3 text-sm ${
              activeTab === "reviews" ? "font-semibold text-black" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({singleProduct?.reviews?.length || 0})
          </button>
        </div>

        {activeTab === "description" ? (
          <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
            <p>
              An e-commerce website is an online platform that facilitates the
              buying and selling of products or services over the internet. It
              serves as a virtual marketplace where businesses and individuals can
              showcase their products, interact with customers, and conduct
              transactions without the need for physical presence. E-commerce
              websites have gained immense popularity due to their convenience,
              accessibility and the global reach they offer.
            </p>
            <p>
              E-commerce websites typically display products or services along
              with detailed descriptions, images, prices, and any available
              variations (e.g., sizes, colors). Each product usually has its own
              dedicated page with relevant information.
            </p>
          </div>
        ) : (
          <Review productId={singleProduct?._id}/>
        )}
      </div>

      {/* Related products */}
      <RelatedProducts
        category={singleProduct?.category}
        subCategory={singleProduct?.subCategory}
      />
    </div>
  ) 
};

export default Product;
