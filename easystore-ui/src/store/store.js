import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-slice";
import authReducer from "./auth-slice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});

store.subscribe(() => {
  try {
    // CART persistence
    const cart = store.getState().cart;
    
    localStorage.setItem("cart", JSON.stringify(cart));

    // AUTH persistence
    const authState = store.getState().auth;
    if (authState.isAuthenticated) { 
      localStorage.setItem("jwtToken", authState.jwtToken);
      localStorage.setItem("user", JSON.stringify(authState.user));
    } else {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("user");
    }
  } catch (error) {
    console.error("Failed to save state to localStorage:", error);
  }
});

export default store;