import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import BottomNavBar from "./components/BottomNavBar";
import Footer from "./components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="px-4 sm:px-5[vw] md:px-7[vw] lg:px-[9vw] mb-16">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      {children}
      <Footer />
      <BottomNavBar />
    </div>
  );
};

export default Layout;
