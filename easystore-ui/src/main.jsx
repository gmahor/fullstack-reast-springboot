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
import {
  AdminOrders,
  adminOrdersLoader,
} from "./components/admin/AdminOrders.jsx";
import { Messages, messagesLoader } from "./components/admin/Messages.jsx";
import { Cart } from "./components/Cart.jsx";
import { Checkout } from "./components/Checkout.jsx";
import { Contact, contactAction } from "./components/Contact.jsx";
import { ErrorPage } from "./components/ErrorPage.jsx";
import { Home, productsLoader } from "./components/home/Home.jsx";
import { Login, loginApi } from "./components/Login.jsx"; // ✅ fixed typo
import { Orders, ordersLoader } from "./components/Orders.jsx";
import {
  getProductDetails,
  ProductDetail,
} from "./components/product/ProductDetail.jsx";
import {
  Profile,
  profileAction,
  profileLoader,
} from "./components/Profile.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { Register, registerAction } from "./components/Register.jsx";
import "./index.css";
import { AuthProvider } from "./store/auth-context.jsx";
import { CartProvider } from "./store/cart-content.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { OrderSuccess } from "./components/OrderSuccess.jsx";

const stripePromise = loadStripe("pk_test_...");

const routerDefinitions = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} loader={productsLoader} />
    <Route path="/home" element={<Home />} loader={productsLoader} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} action={contactAction} />
    <Route path="/login" element={<Login />} action={loginApi} />
    <Route path="/register" element={<Register />} action={registerAction} />
    <Route path="/cart" element={<Cart />} />
    <Route
      path="/products/:productId"
      element={<ProductDetail />}
      loader={getProductDetails}
    />
    <Route element={<ProtectedRoute />}>
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route
        path="/profile"
        element={<Profile />}
        loader={profileLoader}
        action={profileAction}
        shouldRevalidate={({ actionResult }) => !actionResult?.success}
      />
      <Route path="/orders" element={<Orders />} loader={ordersLoader} />
      <Route
        path="/admin/orders"
        element={<AdminOrders />}
        loader={adminOrdersLoader}
      />
      <Route
        path="/admin/messages"
        element={<Messages />}
        loader={messagesLoader}
      />
    </Route>
  </Route>
);

const appRouter = createBrowserRouter(routerDefinitions);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={appRouter} fallbackElement={<p>Loading...</p>} />
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
    </Elements>
  </StrictMode>
);
