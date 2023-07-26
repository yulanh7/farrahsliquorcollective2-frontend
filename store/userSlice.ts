import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./types";
import { pushSubscribe } from "../api/api";

interface AppState {
  businessOwner: string | null;
  userId: string | null;
}

const initialState: AppState = {
  businessOwner: null,
  userId: null,
};

const useSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setBusinessOwner: (state, action: PayloadAction<string | null>) => {
      state.businessOwner = action.payload;
    },
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
    },
  },
});

export const { setBusinessOwner, setUserId } = useSlice.actions;
export default useSlice.reducer;

// Thunk to submit payload to external API
export const submitPayload =
  (payload: { businessOwner: string; userId: string }): AppThunk =>
  async (dispatch) => {
    try {
      await pushSubscribe(payload);
      dispatch(setBusinessOwner(payload.businessOwner));
      dispatch(setUserId(payload.userId));
    } catch (error) {
      console.error("Error submitting payload:", error);
    }
  };
