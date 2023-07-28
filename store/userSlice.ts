import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./types";
import { optIn, submitUnsubscribe } from "../api/api";

interface UserData {
  subsciption: any; // Replace any with the actual type for subsciption
  userWithData: any; // Replace any with the actual type for user
}

const initialState: UserData = {
  subsciption: null,
  userWithData: null,
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
  },
});

export const { setUnsubsciption, setUserWithData } = useSlice.actions;
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
