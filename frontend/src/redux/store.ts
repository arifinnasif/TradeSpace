import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/AuthSlice";

const Store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default Store;
