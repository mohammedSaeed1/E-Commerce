import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { useContext, useState, useEffect, useRef } from "react"; 
import { userContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import ThemeToggleIcon from "../ThemeToggleIcon/ThemeToggleIcon";

export default function Navbar() {
  const { numCartItems, setCartProducts, setNumCartItems } = useContext(CartContext);
  const { userToken, setUserToken, userName, userEmail } = useContext(userContext);
  const { setUserWishlist, userWishlistCount } = useContext(WishlistContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, profileOpen])

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
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-slate-100 py-3.5 md:flex md:justify-evenly md:items-center px-4">

      {/* Logo + Mobile Theme + Cart/Wishlist */}
      <div className="flex justify-between items-center md:flex-none w-full md:w-auto">
        <div className="logo">
          <img src={logo} alt="FreshCart" />
        </div>

        <div className="flex items-center gap-7 md:hidden">
          <ThemeToggleIcon />
          {userToken && (
            <div className="w-[100px]">
              <Link to="/cart" className="relative ms-6">
                <i className="fa-solid fa-cart-shopping text-xl text-black"></i>
                {numCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                    {numCartItems}
                  </span>
                )}
              </Link>
              <Link to="/wishlist" className="relative ms-2.5">
                <i className="far fa-heart text-xl text-black"></i>
                {userWishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#FF3366] text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                    {userWishlistCount}
                  </span>
                )}
              </Link>
            </div>
          )}
          {userToken && (
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <i className="fa-solid fa-bars text-3xl"></i>
            </button>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <ul className={`md:flex md:items-center md:gap-x-4 ${menuOpen && !profileOpen ? "flex flex-col mt-2 items-end px-2" : "hidden md:flex"}`}>
        {userToken &&
          menuItems.map((item) => (
            <li key={item.name} className="py-1.5 md:py-0.5 text-gray-900">
              <NavLink onClick={() => setMenuOpen(false)} to={item.to}>
                {item.name} <i className={`fa-solid ms-1 ${item.icon}`}></i>
              </NavLink>
            </li>
          ))}

        {/* Profile Dropdown (Mobile) */}
        {userToken && (
          <li className="md:hidden py-1.5 relative"> 
            <button onClick={() => {
                setProfileOpen(!profileOpen);
                setMenuOpen(false); // إغلاق قائمة التنقل الرئيسية
            }} 
            className="flex items-center gap-2">
              <span>Profile</span>
              <i className="fa-solid fa-user dark-text-white"></i> 
            </button>
          </li>
        )}
      </ul>
      
      {/* (Profile Dropdown Mobile) */}
      {userToken && profileOpen && (
          <div className="absolute top-[68px] right-4 md:hidden z-50">
            <div className="mt-2 w-44 rounded-md shadow-md bg-gray-100 dark:bg-gray-800">
                <div className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                  <div className="font-medium text-lg dark:text-white">{userName}</div>
                  <div className="text-sm truncate dark:text-white">{userEmail}</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <Link to="/personalInformation" onClick={() => setProfileOpen(false)} className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                      Personal Information
                    </Link>
                  </li>
                  <li>
                    <Link to="/changepassword" onClick={() => setProfileOpen(false)} className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                      Change Password
                    </Link>
                  </li>
                </ul>
                <div className="border-t border-gray-300 dark:border-gray-700">
                  <button onClick={signout} className="block w-full text-left px-4 py-2 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                    Sign out
                  </button>
                </div>
              </div>
          </div>
      )}


      {/* Desktop Right Icons */}
      {userToken && (
        <div className="hidden md:flex items-center justify-around gap-12 w-[400px]">
          <Link to="/cart" className="relative">
            <i className="fa-solid fa-cart-shopping text-xl text-black"></i>
            {numCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                {numCartItems}
              </span>
            )}
          </Link>
          <Link to="/wishlist" className="relative -ml-20">
            <i className="far fa-heart text-xl text-black"></i>
            {userWishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF3366] text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                {userWishlistCount}
              </span>
            )}
          </Link>

          <ThemeToggleIcon />

          {/* Profile Desktop */}
          <div className="relative dark:text-white">
            <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 ">
              <i className="fa-solid fa-user text-black"></i> 
              <span className="text-black">Profile</span>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-md shadow-md bg-gray-100 dark:bg-gray-800 z-50">
                <div className="px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                  <div className="font-medium text-lg">{userName}</div>
                  <div className="text-sm truncate">{userEmail}</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <Link to="/personalInformation" onClick={() => setProfileOpen(false)} className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                      Personal Information
                    </Link>
                  </li>
                  <li>
                    <Link to="/changepassword" onClick={() => setProfileOpen(false)} className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                      Change Password
                    </Link>
                  </li>
                </ul>
                <div className="border-t border-gray-300 dark:border-gray-700">
                  <button onClick={signout} className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}