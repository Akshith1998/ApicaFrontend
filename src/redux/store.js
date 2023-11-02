import { configureStore } from "@reduxjs/toolkit";
import { lruSlice } from "./lruSlice";

export default configureStore({
    reducer: {
      lru: lruSlice.reducer
    },
  });