import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, cartItems, updateQuantity, backendUrl } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(true);

  // Helper to extract numeric value from size string (e.g. "35kg" -> 35)
  const parseSizeNumeric = (s) => {
    if (!s) return null;
    const m = String(s).match(/[0-9]+(?:\.[0-9]+)?/);
    return m ? parseFloat(m[0]) : null;
  };

  // Detect unit (kg or L)
const detectUnit = (sizes = []) => {
  for (const s of sizes) {
    const lower = String(s).toLowerCase();
    if (lower.includes("kg")) return "kg";
    if (lower.includes("l")) return "L";
  }
  return "";
};

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        setProductData(null);
      // try find in products first
      if (products && products.length > 0) {
        const found = products.find((item) => item._id === productId);
        if (found) {
          if (!mounted) return;
          setProductData(found);
          setImage(found.image && found.image.length ? found.image[0] : "");
          if (found.sizes && found.sizes.length > 0) setSize(found.sizes[0]);
            setLoading(false);
            return;
        }
      }
      // fallback: fetch single product from backend
      try {
        if (!backendUrl) {
            if (mounted) {
              setProductData(null);
              setLoading(false);
            }
          return;
        }
        const axios = (await import("axios")).default;
        const resp = await axios.post(backendUrl + "/api/product/single", { productId });
        if (resp.data && resp.data.success && resp.data.singleProduct) {
          const p = resp.data.singleProduct;
          if (mounted) {
            setProductData(p);
            setImage(p.image && p.image.length ? p.image[0] : "");
            if (p.sizes && p.sizes.length > 0) setSize(p.sizes[0]);
              setLoading(false);
          }
        } else {
          if (mounted) {
            setProductData(null);
              setLoading(false);
          }
        }
      } catch (err) {
          console.error("Product fetch error:", err);
          if (mounted) {
            setProductData(null);
            setLoading(false);
          }
      }
      } catch (outerErr) {
        console.error("Unexpected error in product loader:", outerErr);
        if (mounted) {
          setProductData(null);
          setLoading(false);
        }
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [productId, products, backendUrl]);

  // ----- Price calculation (derived state) -----
const unit = detectUnit(productData?.sizes || []);

const smallestSizeValue = productData?.sizes
  ?.map(parseSizeNumeric)
  ?.filter(Boolean)
  ?.sort((a, b) => a - b)?.[0];

const pricePerUnit =
  smallestSizeValue && productData?.price
    ? productData.price / smallestSizeValue
    : null;

const selectedSizeValue = parseSizeNumeric(size);

const displayedPrice =
  pricePerUnit && selectedSizeValue
    ? pricePerUnit * selectedSizeValue
    : productData?.price;

  // Get current quantity for selected size
  const getCurrentQuantity = () => {
    if (!size || !cartItems[productId]) return 0;
    return cartItems[productId][size] || 0;
  };

  // Handle quantity increment
  const incrementQuantity = () => {
    if (!size) {
      toast.error("Please select a quantity");
      return;
    }
    const currentQty = getCurrentQuantity();
    updateQuantity(productId, size, currentQty + 1);
  };

  // Handle quantity decrement
  const decrementQuantity = () => {
    if (!size) {
      toast.error("Please select a quantity");
      return;
    }
    const currentQty = getCurrentQuantity();
    if (currentQty > 0) {
      updateQuantity(productId, size, currentQty - 1);
    }
  };

  // Handle add to cart (for first time addition)
  const handleAddToCart = () => {
    if (!size) {
      toast.error("Please select a quantity");
      return;
    }
    addToCart(productId, size);
  };

  const currentQuantity = getCurrentQuantity();

  if (loading) return <div className="py-10">Loading product...</div>;

  if (productData === null) return <div className="py-10">Product not found.</div>;

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData?.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={productData.name}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                onClick={() => setImage(img)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full h-auto" />
          </div>
        </div>
        {/* Product Information */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
  {currency}
  {displayedPrice?.toLocaleString("en-IN")}
</p>

{pricePerUnit && (
  <p className="text-sm text-gray-500 mt-1">
    {currency}
    {pricePerUnit.toLocaleString("en-IN")} / {unit}
  </p>
)}

          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Quantity</p>
            <div className="flex gap-2">
              {(productData.sizes && productData.sizes.length > 0
                ? productData.sizes
                : ["35kg", "50kg", "100kg"]).map((item, index) => (
                <button
                  key={index}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Display and Controls */}
          {size && currentQuantity > 0 && (
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-medium">Quantity in cart:</span>
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={decrementQuantity}
                  className="px-3 py-1 hover:bg-gray-100 text-lg font-medium"
                  disabled={currentQuantity <= 0}
                >
                  −
                </button>
                <span className="px-4 py-1 border-x border-gray-300 min-w-[50px] text-center">
                  {currentQuantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="px-3 py-1 hover:bg-gray-100 text-lg font-medium"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Add to Cart or Update Quantity */}
          <div className="flex gap-3">
            <button
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
              onClick={handleAddToCart}
            >
              {currentQuantity > 0 ? "ADD MORE TO CART" : "ADD TO CART"}
            </button>
          </div>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 flex mt-5 flex-col gap-1">
            <p className="">100% Original Products</p>
            <p>Cash On Delivery is available on this products</p>
            <p>Easy Return and Replacement Policy within 24 hours for defected or different Items</p>
          </div>
        </div>
      </div>
      {/* Description and Review System */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews(122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            This product listing includes essential details for farm use—quality, recommended application or usage, and packaging options—to help you make confident purchase decisions.
          </p>
          <p>
            For inputs like fertilizers and pesticides, always follow label directions and local guidelines. For fresh produce and grains, check packaging weight and storage recommendations.
          </p>
        </div>
      </div>

      {/* Display related products */}
      <RelatedProducts
        category={productData.category}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;