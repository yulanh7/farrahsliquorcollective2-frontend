// store/index.ts

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import offerReducer from "./offerSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    offer: offerReducer,
    user: userReducer, // Add the new reducer for businessOwner and userId
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
