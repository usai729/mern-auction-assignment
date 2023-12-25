import { configureStore } from "@reduxjs/toolkit";

import UserReducer from "./Slices/UserSlice";
import { apiSlice } from "./api/apiSlice";

export default configureStore({
  reducer: { user: UserReducer, [apiSlice.reducerPath]: apiSlice.reducer },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
