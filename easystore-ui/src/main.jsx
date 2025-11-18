import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { About } from "./components/About.jsx";
import { Contact, contactAction } from "./components/Contact.jsx";
import { Login } from "./components/Login..jsx";
import { Cart } from "./components/Cart.jsx";
import { Home, productsLoader } from "./components/home/Home.jsx";
import { ErrorPage } from "./components/ErrorPage.jsx";
import { Register } from "./components/Register.jsx";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer } from "react-toastify";
import {
  getProductDetails,
  ProductDetail,
} from "./components/product/ProductDetail.jsx";
import { CartContext, CartProvider } from "./store/cart-content.jsx";

const routerDefinitions = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} loader={productsLoader} />
    <Route path="/home" element={<Home />} loader={productsLoader} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} action={contactAction} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/cart" element={<Cart />} />
    <Route
      path="/products/:productId"
      element={<ProductDetail />}
      loader={getProductDetails}
    />
  </Route>
);

const appRouter = createBrowserRouter(routerDefinitions);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={appRouter} />
    </CartProvider>
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      draggable
      pauseOnHover
      transition={Bounce}
    />
  </StrictMode>
);
