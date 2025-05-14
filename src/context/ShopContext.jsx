import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();
const ShopContextProvider = (props) => {
  // const backandUrl = "http://localhost:4000";
  const backandUrl = "https://ecomm-backend-tau.vercel.app";
  const currency = "₹";
  const delivery_fee = 40;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [banner, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState();
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState();

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);
    if (!size) {
      toast.error("select product size");
      return;
    }

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backandUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };
  useEffect(() => {}, [cartItems]);

  const addToWishlist = async ({ productId }) => {
    if (token) {
      try {
        const response = await axios.post(
          backandUrl + "/api/whislist/add",
          { productId },
          { headers: { token } }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    }
    return totalCount;
  };
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        setLoading(true);
        await axios.post(
          backandUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );

        setLoading(false);
      } catch (error) {
        setLoading(false);

        toast.error(error.message);
      }
    }
  };

  const fetchUser = async (token) => {
    try {
      setLoading(true);
      const response = await axios.post(
        backandUrl + "/api/user/me",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setUser(response.data.data);
        setLoading(false);
        return response.data;
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchCategory = async (token) => {
    try {
      setLoading(true);
      const response = await axios.get(
        backandUrl + "/api/category/fetch",

        { headers: { token } }
      );
      if (response.data.success) {
        setLoading(false);
        setCategories(response.data.category);
        return response.data;
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(backandUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);

      toast.error(error.message);
    }
  };

  const getBannersData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(backandUrl + "/api/banner/fetch");
      if (response.data.success) {
        setBanners(response.data.banner);
      } else {
        toast.error(response.data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(backandUrl + "/api/address/fetch", {
        headers: { token: localStorage.getItem("token") },
      });
      if (response.data.success) {
        setAddresses(response.data.address);
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const getUserCart = async (token) => {
    try {
      setLoading(true);
      const response = await axios.post(
        backandUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setLoading(false);
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const fetchProductByCategory = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        backandUrl + `/api/product/category/${id}`
      );
      if (response.data.success) {
        setProducts(response.data.products);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
    getBannersData();
    fetchCategory();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
      fetchUser(localStorage.getItem("token"));
    }
  }, []);
  const value = {
    products,
    setProducts,
    banner,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backandUrl,
    token,
    setToken,
    categories,
    user,
    loading,
    setLoading,
    addToWishlist,
    addresses,
    setAddresses,
    fetchAddresses,
    fetchProductByCategory,
    getProductsData
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
