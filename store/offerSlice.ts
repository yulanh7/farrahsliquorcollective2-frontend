import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./types";
import { fetchAllOffers, getDefaultCouponData, fetchCoupon } from "../api/api";

interface OfferState {
  offerLoading: boolean;
  allOffers: any;
  offer: any;
  defaultOffer: any | null; // Replace `any` with the actual type for default offer
  error: string | null;
}

const initialState: OfferState = {
  offerLoading: false,
  allOffers: null,
  offer: null,
  defaultOffer: null,
  error: null,
};

const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    getAllOffersStart(state) {
      state.offerLoading = true;
      state.error = null;
    },
    getAllOffersSuccess(state, action: PayloadAction<any>) {
      state.offerLoading = false;
      state.allOffers = action.payload;
      state.error = null;
    },
    getAllOffersFailure(state, action: PayloadAction<string>) {
      state.offerLoading = false;
      state.error = action.payload;
    },
    getDefaultOfferStart(state) {
      state.offerLoading = true;
      state.error = null;
    },
    getDefaultOfferSuccess(state, action: PayloadAction<any>) {
      state.offerLoading = false;
      state.defaultOffer = action.payload;
      state.error = null;
    },
    getDefaultOfferFailure(state, action: PayloadAction<string>) {
      state.offerLoading = false;
      state.error = action.payload;
    },
    getOfferStart(state) {
      state.offerLoading = true;
      state.error = null;
    },
    getOfferSuccess(state, action: PayloadAction<any>) {
      state.offerLoading = false;
      state.offer = action.payload;
      state.error = null;
    },
    getOfferFailure(state, action: PayloadAction<string>) {
      state.offerLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getAllOffersStart,
  getAllOffersSuccess,
  getAllOffersFailure,
  getDefaultOfferStart,
  getDefaultOfferSuccess,
  getDefaultOfferFailure,
  getOfferStart,
  getOfferSuccess,
  getOfferFailure,
} = offerSlice.actions;

export default offerSlice.reducer;

export const fetchAllOffersSlice =
  (payload: { userHash: string }): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(getAllOffersStart());
      const response = await fetchAllOffers(payload); // API call using axios
      dispatch(getAllOffersSuccess(response));
    } catch (error) {
      dispatch(getAllOffersFailure((error as Error).message));
    }
  };
export const fetchDefaultOfferSlice =
  (payload: { userHash: string }): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(getDefaultOfferStart());
      const response = await getDefaultCouponData(payload); // API call using axios
      dispatch(getDefaultOfferSuccess(response));
    } catch (error) {
      dispatch(getDefaultOfferFailure((error as Error).message));
    }
  };
export const fetchOfferSlice =
  (payload: { _id: string }): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(getOfferStart());
      const response = await fetchCoupon(payload); // API call using axios
      dispatch(getOfferSuccess(response));
    } catch (error) {
      dispatch(getOfferFailure((error as Error).message));
    }
  };
