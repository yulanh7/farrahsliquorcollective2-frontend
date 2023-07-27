import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./types";
import { getOffersData, getDefaultOfferData } from "../api/api";

interface OfferState {
  allOfferLoading: boolean;
  defaultOfferLoading: boolean;
  allOffers: any;
  defaultOffer: any | null; // Replace `any` with the actual type for default offer
  error: string | null;
}

const initialState: OfferState = {
  allOfferLoading: false,
  defaultOfferLoading: false,
  allOffers: null,
  defaultOffer: null,
  error: null,
};

const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    getOfferStart(state) {
      state.allOfferLoading = true;
      state.error = null;
    },
    getOfferSuccess(state, action: PayloadAction<any>) {
      state.allOfferLoading = false;
      state.allOffers = action.payload;
      state.error = null;
    },
    getOfferFailure(state, action: PayloadAction<string>) {
      state.allOfferLoading = false;
      state.error = action.payload;
    },
    getDefaultOfferStart(state) {
      state.defaultOfferLoading = true;
      state.error = null;
    },
    getDefaultOfferSuccess(state, action: PayloadAction<any>) {
      state.defaultOfferLoading = false;
      state.allOffers = action.payload;
      state.error = null;
    },
    getDefaultOfferFailure(state, action: PayloadAction<string>) {
      state.defaultOfferLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getOfferStart,
  getOfferSuccess,
  getOfferFailure,
  getDefaultOfferStart,
  getDefaultOfferSuccess,
  getDefaultOfferFailure,
} = offerSlice.actions;

export default offerSlice.reducer;

export const fetchAllOffers = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getOfferStart());
    const response = await getOffersData(); // API call using axios
    dispatch(getOfferSuccess(response));
  } catch (error) {
    dispatch(getOfferFailure((error as Error).message));
  }
};
export const fetchDefaultOffer =
  (payload: { userHash: string }): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(getDefaultOfferStart());
      const response = await getDefaultOfferData(payload); // API call using axios
      dispatch(getDefaultOfferSuccess(response));
    } catch (error) {
      dispatch(getDefaultOfferFailure((error as Error).message));
    }
  };
