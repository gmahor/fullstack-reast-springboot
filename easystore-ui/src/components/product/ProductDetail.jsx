import {
  faArrowLeft,
  faShoppingBasket,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import { useCart } from "../../store/cart-content";

export const ProductDetail = () => {
  // const params = useParams(); // fetch productId
  const product = useLoaderData();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const zoomRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState("center");
  const { addToCart } = useCart();

  const handleAddCart = () => {
    if (quantity < 1) return;
    addToCart(product, quantity);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      zoomRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  const handleMouseEnter = () => setIsHovering(true);

  const handleMouseLeave = () => {
    setIsHovering(false);
    setBackgroundPosition("center");
  };

  const handleViewCart = () => navigate("/cart");

  return (
    <div className="min-h-[852px] flex flex-col items-center justify-start px-6 py-8 font-primary bg-normalbg dark:bg-darkbg">
      <div className="w-full max-w-5xl mx-auto px-6 mb-4">
        <Link
          to="/home"
          className="inline-flex items-center text-primary dark:text-light font-medium hover:text-dark dark:hover:text-lighter"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back To All Products
        </Link>
      </div>

      <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row md:space-x-8 px-6 p-8">
        {/* Product Image */}
        <div
          ref={zoomRef}
          onMouseMove={isHovering ? handleMouseMove : null}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="w-full md:w-1/2 h-94 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg overflow-hidden bg-cover"
          style={{
            backgroundImage: `url(${product.imageUrl})`,
            backgroundSize: isHovering ? "200%" : "cover",
            backgroundPosition: backgroundPosition,
          }}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full opacity-0"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 flex flex-col space-y-6 mt-8 md:mt-0">
          <div>
            <h1 className="text-3xl font-extrabold text-primary dark:text-light mb-4">
              {product.name}
            </h1>
            <p className="text-lg text-dark dark:text-lighter mb-4">
              {product.description}
            </p>
            <div className="text-2xl font-bold text-primary dark:text-light">
              ${product.price}
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            {/* Quantity Input */}
            <div className="flex items-center space-x-4">
              <label
                htmlFor="quantity"
                className="text-primary dark:text-light"
              >
                Qty:
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-16 px-2 py-1 border rounded-md focus:ring focus:ring-light dark:focus:ring-gray-600 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Add to Cart Button */}
            <button
              className="w-full px-4 py-2 my-2 bg-primary dark:bg-light text-white dark:text-black rounded-md text-lg font-semibold hover:bg-dark dark:hover:bg-lighter transition"
              onClick={handleAddCart}
            >
              Add to Cart
              <FontAwesomeIcon icon={faShoppingCart} className="ml-2" />
            </button>

            {/* View Cart Button */}
            <button
              onClick={handleViewCart}
              className="w-full px-4 py-2 bg-primary dark:bg-light text-white dark:text-black rounded-md text-lg font-semibold hover:bg-dark dark:hover:bg-lighter transition"
            >
              View Cart
              <FontAwesomeIcon icon={faShoppingBasket} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Api Call
export async function getProductDetails({ params }) {
  const { productId } = params;
  if (!productId) {
    throw new Response("ProductId is required", { status: 400 });
  }

  try {
    const response = await apiClient.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to fetch product",
      {
        status: error.response?.status || 500,
      }
    );
  }
}
