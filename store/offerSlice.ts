import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./types";
import { getOffersData } from "../api/api";

interface OfferState {
  loading: boolean;
  data: any;
  error: string | null;
}

const initialState: OfferState = {
  loading: false,
  data: null,
  error: null,
};

const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    getOfferStart(state) {
      state.loading = true;
      state.error = null;
    },
    getOfferSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    getOfferFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getOfferStart, getOfferSuccess, getOfferFailure } =
  offerSlice.actions;

export default offerSlice.reducer;

export const fetchUserData = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getOfferStart());
    const response = await getOffersData(); // API call using axios
    dispatch(getOfferSuccess(response));
  } catch (error) {
    dispatch(getOfferFailure((error as Error).message));
  }
};
