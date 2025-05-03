// Layout.jsx
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import BottomNavBar from "./components/BottomNavBar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  
  return (
    <div className="px-4 sm:px-5[vw] md:px-7[vw] md:mb-24 lg:px-[9vw] mb-16">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Outlet /> {/* This renders the current route */}
      <Footer />
      <BottomNavBar />
    </div>
  );
};

export default Layout;
