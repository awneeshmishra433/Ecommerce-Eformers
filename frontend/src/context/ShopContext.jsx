import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { products as assetsProducts } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 40;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // Coupon / Promo state and configuration
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const promoCodes = {
    WELCOME10: 10,
    SAVE20: 20,
    SPECIAL25: 25,
  };

  const applyCoupon = (code) => {
    if (!code) return null;
    const key = String(code).toUpperCase();
    const val = promoCodes[key];
    if (val) {
      setCouponCode(key);
      setCouponDiscount(val);
      toast.success(`Promo code applied! ${val}% discount`);
      return val;
    }
    toast.error("Invalid promo code");
    return null;
  };

  const removeCoupon = () => {
    setCouponCode("");
    setCouponDiscount(0);
    toast.info("Promo code removed");
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please Select a Size");
      return;
    }
    const prevCart = structuredClone(cartItems);
    let cartData = structuredClone(cartItems);
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
    // Optimistically update UI
    setCartItems(cartData);
    // If not logged in, just confirm locally
    if (!token) {
      toast.success("Item added to cart");
      return;
    }

    try {
      const resp = await axios.post(
        backendUrl + "/api/cart/add",
        { itemId, size },
        { headers: { token } }
      );
      if (resp.data && resp.data.success) {
        // sync with server's canonical cart
        setCartItems(resp.data.cartData || cartData);
        toast.success(resp.data.message || "Item added to cart");
      } else {
        // revert optimistic update
        setCartItems(prevCart);
        toast.error(resp.data.message || "Could not add item to cart");
      }
    } catch (error) {
      console.log(error);
      setCartItems(prevCart);
      toast.error(error.message || "Network error adding to cart");
    }
  };
  // Safely parse quantity values coming from different sources (number, string, wrapped object)
  const parseQuantity = (q) => {
    if (q == null) return 0;
    if (typeof q === "number") return q;
    if (typeof q === "string") {
      const num = Number(q);
      return isNaN(num) ? 0 : num;
    }
    if (typeof q === "object") {
      const vals = Object.values(q);
      if (vals.length === 1) {
        const num = Number(vals[0]);
        return isNaN(num) ? 0 : num;
      }
    }
    return 0;
  };

  const getCartCount = () => {
    let totalCount = 0;
    // Only count items for which we have product metadata to avoid phantom counts
    for (const items in cartItems) {
      const itemInfo = products.find((product) => product._id === items);
      if (!itemInfo) continue;
      for (const item in cartItems[items]) {
        try {
          const qty = parseQuantity(cartItems[items][item]);
          if (qty > 0) totalCount += qty;
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      }
    }
    return totalCount;
  };

const updateQuantity = async (itemId, size, quantity) => {
  const prevCart = structuredClone(cartItems);
  let cartItemCopy = structuredClone(cartItems);

  if (quantity <= 0) {
    if (cartItemCopy[itemId]) {
      delete cartItemCopy[itemId][size];

      // remove product if no sizes left
      if (Object.keys(cartItemCopy[itemId]).length === 0) {
        delete cartItemCopy[itemId];
      }
    }
  } else {
    if (!cartItemCopy[itemId]) cartItemCopy[itemId] = {};
    cartItemCopy[itemId][size] = quantity;
  }

  setCartItems(cartItemCopy);

  if (!token) return;

  try {
    const resp = await axios.post(
      backendUrl + "/api/cart/update",
      { itemId, size, quantity },
      { headers: { token } }
    );

    if (resp.data?.success) {
      setCartItems(resp.data.cartData || cartItemCopy);
    } else {
      setCartItems(prevCart);
      toast.error(resp.data.message || "Could not update cart");
    }
  } catch (error) {
    setCartItems(prevCart);
    toast.error(error.message || "Network error updating cart");
  }
};
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setSearchVisible(true);
    } else {
      setSearchVisible(false);
    }
  }, [location]);

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      // If we don't have product metadata yet (or it doesn't exist), skip it
      if (!itemInfo) continue;
      for (const item in cartItems[items]) {
        try {
          const qty = parseQuantity(cartItems[items][item]);
          if (qty > 0) {
            // compute price based on selected size; try pricePerKg first, else derive from product.price and sizes
            const sizeStr = item;
            const numMatch = sizeStr ? String(sizeStr).match(/[0-9]+(?:\.[0-9]+)?/) : null;
            const numeric = numMatch ? parseFloat(numMatch[0]) : null;

            let unitPrice = itemInfo.price || 0;

            // If a pricePerKg exists and we have numeric size, use it
            if (itemInfo.pricePerKg && numeric) {
              unitPrice = itemInfo.pricePerKg * numeric;
            } else {
              // Otherwise compute proportional price based on product.price and smallest size
              const sizesNumeric = (itemInfo.sizes || [])
                .map((s) => {
                  const m = String(s).match(/[0-9]+(?:\.[0-9]+)?/);
                  return m ? parseFloat(m[0]) : null;
                })
                .filter(Boolean)
                .sort((a, b) => a - b);

              const smallest = sizesNumeric && sizesNumeric.length > 0 ? sizesNumeric[0] : null;
              if (smallest && itemInfo.price && numeric) {
                const pricePerUnit = itemInfo.price / smallest;
                unitPrice = pricePerUnit * numeric;
              }
            }

            totalAmount += unitPrice * qty;
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
        // Fallback to assets products if backend fails
        setProducts(assetsProducts);
      }
    } catch (error) {
      console.error(error);
      // Use assets products when backend is not available
      setProducts(assetsProducts);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getProductsData();
  }, []);

  // Poll products every 60 seconds to keep frontend in sync with backend
  useEffect(() => {
    if (!backendUrl) return;
    const id = setInterval(() => {
      getProductsData();
    }, 60000);
    return () => clearInterval(id);
  }, [backendUrl]);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  // When token changes (login/logout), sync cart with server or clear it
  useEffect(() => {
    if (token) {
      getUserCart(token);
    } else {
      setCartItems({});
    }
  }, [token]);

  const value = {
    products,
    getProductsData,
    currency,
    delivery_fee,
    search,
    setSearch,
    setShowSearch,
    showSearch,
    searchVisible,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    setCartItems,
    // Coupon values & helpers
    couponCode,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    // Add more context functions as needed...

    // Add more context values as needed...
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
