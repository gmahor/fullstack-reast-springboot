import { faShoppingBasket, faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Header = () => {
  const navLinkClass =
    "text-center text-lg font-primary font-semibold text-primary py-6";
  return (
    <header className="border-b border-gray-300 sticky top-0 z-20 bg-gray-100">
      <div className="flex items-center justify-between mx-auto max-w-[1152px] px-6 py-4">
        <a href="/" className={navLinkClass}>
          <FontAwesomeIcon icon={faTags} className="h-8 w-8" />
          <span className="font-bold">Eazy Sticker</span>
        </a>
        <nav className="flex items-center py-2 z-10">
          <ul className="flex space-x-6">
            <li>
              <a href="/" className={navLinkClass}>
                Home
              </a>
            </li>
            <li>
              <a href="/about" className={navLinkClass}>
                About
              </a>
            </li>
            <li>
              <a href="/contact" className={navLinkClass}>
                Contact
              </a>
            </li>
            <li>
              <a href="/login" className={navLinkClass}>
                Login
              </a>
            </li>
            <li>
              <a href="/cart" className="text-primary py-2">
                <FontAwesomeIcon icon={faShoppingBasket} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
