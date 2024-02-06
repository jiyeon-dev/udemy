import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import uiReducer from "./ui";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
  },
});

export default store;
