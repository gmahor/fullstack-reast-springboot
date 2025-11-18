import { faShoppingBasket, faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../store/cart-content";

export const Header = () => {
  const { totalQuantity } = useCart();

  const navLinkClass = "text-center text-lg font-semibold  py-2 ";

  const navLinkStyle = {textDecoration: "none"};

  return (
    <header className="border-b border-gray-300 sticky top-0 z-20 bg-gray-100">
      <div className="flex items-center justify-between mx-auto max-w-[1152px] px-6 py-4">
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
            </li>
            <li>
              <NavLink to="/cart" className="relative text-primary py-2">
                <FontAwesomeIcon className="text-primary w-6" icon={faShoppingBasket} />
                <div className="absolute -top-2 -right-6 text-xs bg-yellow-400 text-black font-semibold rounded-full px-2 py-1 leading-none">
                  {totalQuantity}
                </div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
