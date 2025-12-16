import React, { useContext, useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets.js";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";
import { toast } from "react-toastify";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    searchVisible,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
    getProductsData,
  } = useContext(ShopContext);

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/login");
    setCartItems({});
    setProfileOpen(false);
  };

  // Close profile menu on outside click or ESC
  useEffect(() => {
    const onDocClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setProfileOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-28 sm:w-36" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-gray-700 text-lg">
        <NavLink className="flex flex-col items-center gap-1" to="/">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to="/collection">
          <p>Collection</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to="/schemes">
          <p>Schemes</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to="/about">
          <p>About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to="/contact">
          <p>Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        {/* <NavLink
          className="flex flex-col items-center gap-1"
          to="https://e-farmer-admin-pannel.vercel.app"
          target="_blank"
        >
          <p className="px-2 rounded-md text-gray-700 border bg-slate-300 ">
            Admin Panel
          </p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink> */}
      </ul>
      <div className="flex items-center gap-6">
        <button
          aria-label="Open search"
          className="p-1"
          onClick={() => setShowSearch(true)}
        >
          <img
            src={assets.search_icon}
            alt="Search Icon"
            className="w-5 cursor-pointer"
          />
        </button>
        <div className="relative group" ref={profileRef}>
          <button
            aria-haspopup="menu"
            aria-expanded={profileOpen}
            onClick={() => (token ? setProfileOpen((p) => !p) : navigate("/login"))}
            className="p-1 rounded"
          >
            <img src={assets.profile_icon} alt="Profile Icon" className="w-5 cursor-pointer" />
          </button>

          {/* Desktop dropdown (hover or click) */}
          {token && (
            <div
              className={`absolute right-0 mt-3 ${profileOpen ? "block" : "hidden"} md:group-hover:block z-50`}
              role="menu"
              aria-label="Profile menu"
            >
              <div className="flex flex-col gap-2 w-40 py-3 px-4 bg-white text-gray-700 rounded shadow-lg">
                <button className="text-left py-2 hover:text-black" onClick={() => { navigate("/profile"); setProfileOpen(false); }} role="menuitem">My Profile</button>
                <button className="text-left py-2 hover:text-black" onClick={() => { navigate("/orders"); setProfileOpen(false); }} role="menuitem">Orders</button>
                <button className="text-left py-2 text-red-600 hover:text-red-800" onClick={logout} role="menuitem">Logout</button>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="Cart Icon" className="w-7 min-w-7" />
          {getCartCount() > 0 && (
            <p className="absolute right-[-5px] bottom-[-5px] w-5 text-center leading-5 bg-black text-white aspect-square rounded-full text-[10px]">
              {getCartCount()}
            </p>
          )}
        </Link>
        <img
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
          onClick={() => setVisible(true)}
        />
      </div>
      {/* Side bar hamburger menu for smaller screen */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        } z-50`}
        style={{ zIndex: 9999 }}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex items-center gap-4 p-3 cursor-pointer"
            onClick={() => setVisible(false)}
          >
            <img
              src={assets.dropdown_icon}
              alt="Dropdown Icon"
              className="h-4 rotate-180"
            />
            <p>Back</p>
          </div>
          <NavLink
            className="py-6 pl-6 border text-lg"
            onClick={() => setVisible(false)}
            to="/"
          >
            <p>Home</p>
          </NavLink>
          <NavLink
            className="py-6 pl-6 border text-lg"
            onClick={() => setVisible(false)}
            to="/collection"
          >
            <p>Collection</p>
          </NavLink>
          <NavLink
            className="py-6 pl-6 border text-lg"
            onClick={() => setVisible(false)}
            to="/schemes"
          >
            <p>Schemes</p>
          </NavLink>
          <NavLink
            className="py-6 pl-6 border text-lg"
            onClick={() => setVisible(false)}
            to="/about"
          >
            <p>About</p>
          </NavLink>
          <NavLink
            className="py-6 pl-6 border text-lg"
            onClick={() => setVisible(false)}
            to="/contact"
          >
            <p>Contact</p>
          </NavLink>
          {token && (
            <div className="border-t mt-4">
              <button className="w-full text-left py-6 pl-6 border-t text-lg" onClick={() => { navigate('/profile'); setVisible(false); }}>My Profile</button>
              <button className="w-full text-left py-6 pl-6 border-t text-lg" onClick={() => { navigate('/orders'); setVisible(false); }}>Orders</button>
              <button className="w-full text-left py-6 pl-6 border-t text-lg text-red-600" onClick={() => { logout(); setVisible(false); }}>Logout</button>
            </div>
          )}
          <NavLink
            className="py-4 pl-6 border"
            onClick={() => setVisible(false)}
            to="https://forever-admin-pannel.vercel.app"
            target="_blank"
          >
            <p>Admin Panel</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;