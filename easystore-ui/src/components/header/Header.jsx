import {
  faAngleDown,
  faShoppingBasket,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  logout,
  selectIsAuthenticated,
  selectUser,
} from "../../store/auth-slice";
import { selectTotalQuantity } from "../../store/cart-slice";

export const Header = () => {
  const totalQuantity = useSelector(selectTotalQuantity);
  const location = useLocation();
  const useMenuRef = useRef();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const isAdmin = user?.roles?.includes("ROLE_ADMIN");
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isAdminMenuOpen, setAdminMenuOpen] = useState(false);

  const toggleAdminMenu = () => setAdminMenuOpen((prev) => !prev);
  const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);

  useEffect(() => {
    setAdminMenuOpen(false);
    setUserMenuOpen(false);
    const handleClickOutSide = (e) => {
      if (useMenuRef.current && !useMenuRef.current.contains(e.target)) {
        setAdminMenuOpen(false);
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
  }, [location.pathname]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/home");
  };

  const navLinkClass = "text-center text-lg font-semibold  py-2 ";

  const navLinkStyle = { textDecoration: "none" };

  const dropdownLinkClass =
    "block w-full text-left px-2 py-2 text-lg font-primary font-semibold text-primary dark:text-light hover:bg-gray-100 dark:hover:bg-gray-600";

  return (
    <header className="border-b border-gray-300 sticky top-0 z-20 bg-gray-100">
      <div className="flex items-center justify-between mx-auto max-w-6xl px-6 py-4">
        <Link to="/" className={`text-primary ${navLinkClass}`}>
          <FontAwesomeIcon icon={faTags} className="h-8 w-8" />
          <span className="font-bold">Eazy Sticker</span>
        </Link>
        <nav className="flex items-center py-2 z-10">
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/home"
                style={navLinkStyle}
                className={({ isActive }) =>
                  isActive
                    ? ` text-white bg-primary rounded md:rounded-lg ${navLinkClass}`
                    : navLinkClass
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                style={navLinkStyle}
                className={({ isActive }) =>
                  isActive
                    ? `underline text-white bg-primary rounded md:rounded-lg ${navLinkClass}`
                    : navLinkClass
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                style={navLinkStyle}
                className={({ isActive }) =>
                  isActive
                    ? `text-white bg-primary rounded md:rounded-lg ${navLinkClass}`
                    : navLinkClass
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              {isAuthenticated ? (
                <div className="relative" ref={useMenuRef}>
                  <button
                    onClick={toggleUserMenu}
                    className="relative text-primary"
                  >
                    <span className="{navLinkClass}">
                      {`Hello ${
                        user.name.length > 5
                          ? `${user.name.slice(0, 5)}...`
                          : user.name
                      }`}
                    </span>
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className="text-primary w-6 h-6"
                    />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 w-48 bg-normalbg dark:bg-darkbg border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-20 transition ease-in-out duration-200">
                      <ul className="py-2">
                        <li>
                          <Link
                            to="/profile"
                            style={navLinkStyle}
                            className={dropdownLinkClass}
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/orders"
                            style={navLinkStyle}
                            className={dropdownLinkClass}
                          >
                            Orders
                          </Link>
                        </li>
                        {isAdmin && (
                          <li>
                            <button
                              onClick={toggleAdminMenu}
                              className={`${dropdownLinkClass} flex items-center justify-between`}
                            >
                              Admin
                              <FontAwesomeIcon icon={faAngleDown} />
                            </button>

                            {isAdminMenuOpen && (
                              <ul>
                                <li>
                                  <Link
                                    to="/admin/orders"
                                    style={navLinkStyle}
                                    className={dropdownLinkClass}
                                  >
                                    Orders
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/admin/messages"
                                    style={navLinkStyle}
                                    className={dropdownLinkClass}
                                  >
                                    Messages
                                  </Link>
                                </li>
                              </ul>
                            )}
                          </li>
                        )}

                        <li>
                          <Link
                            to="/home"
                            style={navLinkStyle}
                            onClick={handleLogout}
                            className={dropdownLinkClass}
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to="/login"
                  style={navLinkStyle}
                  className={({ isActive }) =>
                    isActive
                      ? `text-white bg-primary rounded md:rounded-lg ${navLinkClass}`
                      : navLinkClass
                  }
                >
                  Login
                </NavLink>
              )}
            </li>
            <li>
              <NavLink to="/cart" className="relative text-primary py-2">
                <FontAwesomeIcon
                  className="text-primary w-6"
                  icon={faShoppingBasket}
                />
                <div className="absolute -top-2 -right-6 text-xs bg-yellow-400 text-black font-semibold rounded-full px-2 py-1 leading-none">
                  {totalQuantity || 0}
                </div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
