import { Link } from "react-router-dom";
import { ProductPrice } from "./ProductPrice";
import { useContext } from "react";
import { useCart } from "../../store/cart-content";

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="w-72 rounded-md mx-auto border border-gray-300 shadow-md overflow-hidden flex flex-col bg-white hover:shadow-lg transition">
      <Link
        to={`/products/${product.productId}`}
        className="relative w-full h-72 border-gray-300"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
        />
      </Link>
      <div className="relative h-48 p-4 flex flex-col font-primary">
        <h2 className="text-xl font-semibold text-primary mb-2">
          {product.name}
        </h2>
        <p className="text-base text-gray-600 mb-4">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="bg-lighter text-primary font-medium text-sm py-2 px-4 rounded-tl-md">
            <ProductPrice currency="$" price={product.price} />
          </div>
          <div>
            <button
              className="bg-primary dark:bg-light text-white dark:text-primary font-medium text-sm py-2 px-4 rounded-md hover:cursor-pointer"
              onClick={() => addToCart(product, 1)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
