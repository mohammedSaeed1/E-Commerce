import { Link, NavLink, useNavigate } from "react-router-dom";
import lightLogo from "../../assets/images/freshcart-logo.svg";
import darkLogo from "../../assets/images/freshcart-logo-dark.svg";
import { useContext, useState, useEffect, useRef } from "react"; 
import { userContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { numCartItems, setCartProducts, setNumCartItems } = useContext(CartContext);
  const { userToken, setUserToken, userName, userEmail } = useContext(userContext);
  const { setUserWishlist, userWishlistCount } = useContext(WishlistContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const navRef = useRef(null);

  useEffect(() => {
    if (userToken) {
      setMenuOpen(false);
      setProfileOpen(false);
    }
  }, [userToken]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        if (menuOpen || profileOpen) {
          setMenuOpen(false);
          setProfileOpen(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen, profileOpen]);

  function signout() {
    localStorage.removeItem("userToken");
    setUserToken("");
    setCartProducts([]);
    setUserWishlist([]);
    setNumCartItems(0);
    navigate("/login");
  }

  const menuItems = [
    { name: "Home", to: "", icon: "fa-house" },
    { name: "Products", to: "products", icon: "fa-store" },
    { name: "Brands", to: "brands", icon: "fa-copyright" },
    { name: "Categories", to: "categories", icon: "fa-list" },
    { name: "Orders", to: "allorders", icon: "fa-bag-shopping" },
  ];

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-slate-100 dark:bg-[#1B1B1F] py-3.5 md:flex md:justify-evenly md:items-center px-4">

      {/* Logo + Mobile Theme + Cart/Wishlist */}
      <div className="flex justify-between items-center md:flex-none w-full md:w-auto">
        
        <div className="logo">
          <Link to={`/`}>
          {theme === "dark" ? <img src={darkLogo} alt="FreshCart" /> : <img src={lightLogo} alt="FreshCart" />}
          </Link>
        </div>

        <div className="flex items-center gap-7 md:hidden">
          {/* Theme toggle */}
          <div onClick={toggleTheme} className="cursor-pointer transition-transform duration-300 sm:hover:scale-110">
            {theme === "light" ? (
              <Sun className="text-yellow-500 w-7 h-7 transition-transform duration-500 hover:rotate-90" />
            ) : (
              <Moon className="text-blue-400 w-7 h-7 transition-transform duration-500 hover:-rotate-90" />
            )}
          </div>

          {userToken && (
            <div className="w-[100px] flex gap-10 ">
              <Link to="/cart" className="relative pl-5 ">
                <i className="fa-solid fa-cart-shopping text-xl text-black dark:text-white"></i>
                {numCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-md">{numCartItems}</span>
                )}
              </Link>
              <Link to="/wishlist" className="relative -ml-7">
                <i className="far fa-heart text-xl text-black dark:text-white"></i>
                {userWishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#FF3366] text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-md">{userWishlistCount}</span>
                )}
              </Link>
            </div>
          )}

          {userToken && (
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <i className="fa-solid fa-bars text-3xl dark:text-white"></i>
            </button>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <ul className={`md:flex md:items-center md:gap-x-4 ${menuOpen && !profileOpen ? "flex flex-col mt-2 items-end px-2 " : "hidden md:flex"}`}>
        {userToken && menuItems.map(item => (
          <li key={item.name} className="py-1.5 md:py-0.5 text-gray-900 dark:text-white  ">
            <NavLink onClick={() => setMenuOpen(false)} to={item.to}>
              {item.name} <i className={`fa-solid ms-1 ${item.icon}`}></i>
            </NavLink>
          </li>
        ))}

        {/* Profile Dropdown (Mobile) */}
        {userToken && (
          <li className="md:hidden py-1.5 relative dark:text-white">
            <button onClick={() => {
              setProfileOpen(!profileOpen);
              setMenuOpen(false);
            }} className="flex items-center gap-2">
              <span className="dark:text-white">Profile</span>
              <i className="fa-solid fa-user dark:text-white"></i>
            </button>
          </li>
        )}
      </ul>

      {/* Profile Dropdown Mobile */}
      {userToken && profileOpen && (
        <div className="absolute top-[68px] right-4 md:hidden z-50">
          <div className="mt-2 w-44 rounded-md shadow-md bg-gray-100 dark:bg-gray-800">
            <div className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
              <div className="font-medium text-lg dark:text-white">{userName}</div>
              <div className="text-sm truncate dark:text-white">{userEmail}</div>
            </div>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <Link to="/personalInformation" onClick={() => setProfileOpen(false)} className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">Personal Information</Link>
              </li>
              <li>
                <Link to="/changepassword" onClick={() => setProfileOpen(false)} className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">Change Password</Link>
              </li>
            </ul>
            <div className="border-t border-gray-300 dark:border-gray-700">
              <button onClick={signout} className="block w-full text-left px-4 py-2 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">Sign out</button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Right Icons */}

        {/* Theme toggle */}
          <div onClick={toggleTheme} className="cursor-pointer hidden md:flex transition-transform duration-300 sm:hover:scale-110">
            {theme === "light" ? (
              <Sun className="text-yellow-500 w-7 h-7 transition-transform duration-500 hover:rotate-90" />
            ) : (
              <Moon className="text-blue-400 w-7 h-7 transition-transform duration-500 hover:-rotate-90" />
            )}
          </div>


      {userToken && (
        <div className="hidden md:flex items-center justify-around w-[250px] me-5">
          <Link to="/cart" className="relative pl-1">
            <i className="fa-solid fa-cart-shopping text-xl text-black dark:text-white"></i>
            {numCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-md">{numCartItems}</span>
            )}
          </Link>
          <Link to="/wishlist" className="relative -ml-10">
            <i className="far fa-heart text-xl text-black dark:text-white"></i>
            {userWishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF3366] text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-md">{userWishlistCount}</span>
            )}
          </Link>
          {/* Profile Desktop */}
          <div className="relative dark:text-white">
            <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2">
              <i className="fa-solid fa-user text-black dark:text-white"></i>
              <span className="text-black dark:text-white">Profile</span>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-md shadow-md bg-gray-100 dark:bg-gray-800 z-50">
                <div className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                  <div className="font-medium text-lg">{userName}</div>
                  <div className="text-sm truncate">{userEmail}</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <Link to="/personalInformation" onClick={() => setProfileOpen(false)} className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">Personal Information</Link>
                  </li>
                  <li>
                    <Link to="/changepassword" onClick={() => setProfileOpen(false)} className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">Change Password</Link>
                  </li>
                </ul>
                <div className="border-t border-gray-300 dark:border-gray-700">
                  <button onClick={signout} className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">Sign out</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </nav>
  );
}
