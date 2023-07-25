// store/index.ts

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import offerReducer from "./offerSlice";

const store = configureStore({
  reducer: {
    offer: offerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
