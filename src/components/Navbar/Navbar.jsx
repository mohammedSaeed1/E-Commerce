import { Link, NavLink, useNavigate } from "react-router-dom";
import lightLogo from "../../assets/images/oneclickpick-logo.svg";
import darkLogo from "../../assets/images/oneclickpick-logo-dark.svg";
import { useContext, useState, useEffect, useRef } from "react";
import { userContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { numCartItems, setCartProducts, setNumCartItems } = useContext(CartContext);
  const { userToken, setUserToken, userName, userEmail } = useContext(userContext);
  const { setUserWishlist, userWishlistCount, setUserWishlistProductsById, setUserWishlistCount } = useContext(WishlistContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  useEffect(() => {
    if (userToken) {
      setMenuOpen(false);
      setProfileOpen(false);
    }
  }, [userToken]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
        setProfileOpen(false);
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
    setUserWishlistCount(0);
    setUserWishlistProductsById([]);
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
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-100 dark:bg-[#1B1B1F] py-3.5 px-4 lg:px-6"
    >
      {/* ── Single row on lg+, stacked on smaller ── */}
      <div className="flex items-center justify-between lg:justify-evenly gap-4">

        {/* Logo */}
        <div className="logo flex-shrink-0">
          <Link to="/">
            {theme === "dark"
              ? <img src={darkLogo} alt="OneClickPick" className="h-8" />
              : <img src={lightLogo} alt="OneClickPick" className="h-8" />}
          </Link>
        </div>

        {/* Nav links — hidden on mobile, visible from lg */}
        {userToken && (
          <ul className="hidden lg:flex items-center gap-x-5">
            {menuItems.map((item) => (
              <li key={item.name} className="text-gray-900 dark:text-white whitespace-nowrap">
                <NavLink to={item.to} className="hover:text-green-600 transition-colors">
                  {item.name} <i className={`fa-solid ms-1 ${item.icon}`}></i>
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        {/* Right-side controls */}
        <div className="flex items-center gap-4 flex-shrink-0">

          {/* Theme toggle (always visible) */}
          <button
            onClick={toggleTheme}
            className="cursor-pointer transition-transform duration-300 hover:scale-110"
            aria-label="Toggle theme"
          >
            {theme === "light"
              ? <Sun className="text-yellow-500 w-6 h-6 transition-transform duration-500 hover:rotate-90" />
              : <Moon className="text-blue-400 w-6 h-6 transition-transform duration-500 hover:-rotate-90" />}
          </button>

          {/* Cart + Wishlist (visible when logged in) */}
          {userToken && (
            <>
              <Link to="/cart" className="relative" aria-label="Cart">
                <i className="fa-solid fa-cart-shopping text-xl text-black dark:text-white"></i>
                {numCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                    {numCartItems}
                  </span>
                )}
              </Link>

              <Link to="/wishlist" className="relative" aria-label="Wishlist">
                <i className="far fa-heart text-xl text-black dark:text-white"></i>
                {userWishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#FF3366] text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                    {userWishlistCount}
                  </span>
                )}
              </Link>

              {/* Profile dropdown (desktop lg+) */}
              <div className="relative hidden lg:block dark:text-white">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 text-black dark:text-white"
                >
                  <i className="fa-solid fa-user"></i>
                  <span>Profile</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-44 rounded-md shadow-md bg-gray-100 dark:bg-gray-800 z-50">
                    <div className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                      <div className="font-medium text-lg dark:text-white">{userName}</div>
                      <div className="text-sm truncate dark:text-white">{userEmail}</div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      <li>
                        <Link
                          to="/personalInformation"
                          onClick={() => setProfileOpen(false)}
                          className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          Personal Information
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/changepassword"
                          onClick={() => setProfileOpen(false)}
                          className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          Change Password
                        </Link>
                      </li>
                    </ul>
                    <div className="border-t border-gray-300 dark:border-gray-700">
                      <button
                        onClick={signout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Hamburger (mobile + tablet, hidden on lg+) */}
              <button
                onClick={() => { setMenuOpen(!menuOpen); setProfileOpen(false); }}
                className="lg:hidden"
                aria-label="Open menu"
              >
                <i className="fa-solid fa-bars text-2xl dark:text-white"></i>
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Mobile / Tablet dropdown menu (< lg) ── */}
      {menuOpen && userToken && (
        <div className="lg:hidden mt-3 rounded-md bg-white dark:bg-gray-800 shadow-md overflow-hidden">
          <ul className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <i className={`fa-solid ${item.icon} w-4 text-green-600`}></i>
                  {item.name}
                </NavLink>
              </li>
            ))}

            {/* Profile section inside mobile menu */}
            <li>
              <button
                onClick={() => { setProfileOpen(!profileOpen); }}
                className="flex items-center gap-3 w-full px-5 py-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <i className="fa-solid fa-user w-4 text-green-600"></i>
                Profile
                <i className={`fa-solid fa-chevron-${profileOpen ? "up" : "down"} ml-auto text-xs text-gray-400`}></i>
              </button>

              {profileOpen && (
                <div className="bg-gray-50 dark:bg-gray-900 px-5 pb-2">
                  <div className="py-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="font-medium dark:text-white">{userName}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{userEmail}</div>
                  </div>
                  <Link
                    to="/personalInformation"
                    onClick={() => { setMenuOpen(false); setProfileOpen(false); }}
                    className="block py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-green-600"
                  >
                    Personal Information
                  </Link>
                  <Link
                    to="/changepassword"
                    onClick={() => { setMenuOpen(false); setProfileOpen(false); }}
                    className="block py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-green-600"
                  >
                    Change Password
                  </Link>
                  <button
                    onClick={signout}
                    className="block w-full text-left py-2 text-sm text-red-500 hover:text-red-600"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}