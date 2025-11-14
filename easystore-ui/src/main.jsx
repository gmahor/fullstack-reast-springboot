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
import { Contact } from "./components/Contact.jsx";
import { Login } from "./components/Login..jsx";
import { Cart } from "./components/Cart.jsx";
import { Home, productsLoader } from "./components/home/Home.jsx";
import { ErrorPage } from "./components/ErrorPage.jsx";
import { Register } from "./components/Register.jsx";


const routerDefinitions = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} loader={productsLoader} />
    <Route path="/home" element={<Home />} loader={productsLoader}/>
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/cart" element={<Cart />} />
  </Route>
);

const appRouter = createBrowserRouter(routerDefinitions);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>
);
