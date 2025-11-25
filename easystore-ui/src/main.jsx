import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import { About } from "./components/About.jsx";
import { AdminOrders } from "./components/admin/AdminOrders.jsx";
import { Messages } from "./components/admin/Messages.jsx";
import { Cart } from "./components/Cart.jsx";
import { Checkout } from "./components/Checkout.jsx";
import { Contact, contactAction } from "./components/Contact.jsx";
import { ErrorPage } from "./components/ErrorPage.jsx";
import { Home, productsLoader } from "./components/home/Home.jsx";
import { Login, loginApi } from "./components/Login..jsx";
import { Orders } from "./components/Orders.jsx";
import {
  getProductDetails,
  ProductDetail,
} from "./components/product/ProductDetail.jsx";
import { Profile } from "./components/Profile.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { Register, registerAction } from "./components/Register.jsx";
import "./index.css";
import { AuthProvider } from "./store/auth-context.jsx";
import { CartProvider } from "./store/cart-content.jsx";

const routerDefinitions = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} loader={productsLoader} />
    <Route path="/home" element={<Home />} loader={productsLoader} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} action={contactAction} />
    <Route path="/login" element={<Login />} action={loginApi} />
    <Route path="/register" element={<Register />} action={registerAction}/>
    <Route path="/cart" element={<Cart />} />
    <Route
      path="/products/:productId"
      element={<ProductDetail />}
      loader={getProductDetails}
    />
    <Route element={<ProtectedRoute />}>
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/admin/messages" element={<Messages />} />
    </Route>
  </Route>
);

const appRouter = createBrowserRouter(routerDefinitions);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={appRouter} />
      </CartProvider>
    </AuthProvider>
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
