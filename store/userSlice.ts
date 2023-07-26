import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./types";
import { pushSubscribe, getUser } from "../api/api";

interface UserData {
  subsciption: any[]; // Replace any with the actual type for subsciption
  user: any; // Replace any with the actual type for user
}

const initialState: UserData = {
  subsciption: [],
  user: null,
};

const useSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSubsciption: (state, action: PayloadAction<any[]>) => {
      state.subsciption = action.payload;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

export const { setSubsciption, setUser } = useSlice.actions;
export default useSlice.reducer;

// Thunk to submit payload to external API
export const pushSubscribeSlice =
  (payload: { companyName: string; userId: string }): AppThunk =>
  async (dispatch) => {
    try {
      const subsciption = await pushSubscribe(payload);

      dispatch(setSubsciption(subsciption));
    } catch (error) {
      console.error("Error submitting payload:", error);
    }
  };

export const getUserSlice =
  (payload: {
    companyName: string;
    userHash: string;
    endpoint?: string; // Make 'endpoint' optional
    expirationTime: number | null; // Change to 'number | null'
    keys: Record<string, string>;
  }): AppThunk =>
  async (dispatch) => {
    try {
      const subsciption = await getUser(payload);
      dispatch(setSubsciption(subsciption));
    } catch (error) {
      console.error("Error submitting payload:", error);
    }
  };
