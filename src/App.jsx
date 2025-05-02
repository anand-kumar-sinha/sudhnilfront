import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Collection from "./pages/collection";
import About from "./pages/about";
import Contact from "./pages/contact";
import Product from "./pages/Product";
import Cart from "./pages/cart";
import Login from "./pages/login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Verify from "./pages/Verify";
import { ToastContainer, toast } from "react-toastify";
import BottomNavBar from "./components/BottomNavBar";

const App = () => {
  return (
    <div className="px-4 sm:px-5[vw] md:px-7[vw] lg:px-[9vw] mb-6">
      {/* we are adding nav bar on top so it is available on all pages */}
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        {/* created 9 route for 9 pages */}
        <Route path="/" element={<Home />} />
        <Route path="collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* using product Id we will get particular product on page */}
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
      <Footer />
      <BottomNavBar />
    </div>
  );
};

export default App;
