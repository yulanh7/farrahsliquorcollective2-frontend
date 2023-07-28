import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./types";
import { optIn, submitUnsubscribe, getUserInfo } from "../api/api";

interface UserData {
  subsciption: any; // Replace any with the actual type for subsciption
  userWithData: any; // Replace any with the actual type for user
  userInfo: any;
}

const initialState: UserData = {
  subsciption: null,
  userWithData: null,
  userInfo: null,
};

const useSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUnsubsciption: (state, action: PayloadAction<any[]>) => {
      state.subsciption = action.payload;
    },
    setUserWithData: (state, action: PayloadAction<any>) => {
      state.userWithData = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUnsubsciption, setUserWithData, setUserInfo } =
  useSlice.actions;
export default useSlice.reducer;

export const optInSlice =
  (payload: {
    userHash: string;
    endpoint?: string;
    expirationTime: number | null;
    keys: Record<string, string>;
  }): AppThunk<Promise<void>> => // Add <Promise<void>> to specify the return type
  async (dispatch) => {
    try {
      const { user } = await optIn(payload);
      dispatch(setUserWithData(user));
      document.cookie = `userHash=${user.userHash};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/`;
      window.location.href = "/offer-receipt";
    } catch (error) {
      console.error("Error submitting payload:", error);
    }
  };
export const getUserInfoSlice =
  (payload: {
    userHash: string;
    endpoint?: string;
    expirationTime: number | null;
    keys: Record<string, string>;
  }): AppThunk<Promise<void>> => // Add <Promise<void>> to specify the return type
  async (dispatch) => {
    try {
      const userInfo = await getUserInfo(payload);
      dispatch(setUserInfo(userInfo));
    } catch (error) {
      console.error("Error submitting payload:", error);
    }
  };

export const unsubscribeSlice =
  (payload: {
    userHash: string;
  }): AppThunk<Promise<void>> => // Add <Promise<void>> to specify the return type
  async (dispatch) => {
    try {
      await submitUnsubscribe(payload);
    } catch (error) {
      console.error("Error submitting payload:", error);
    }
  };
