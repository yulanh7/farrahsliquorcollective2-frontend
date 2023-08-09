import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./types";
import {
  addCoupon,
  addDefaultCoupon,
  fetchDefaultCoupon,
  updateDefaultCoupon,
} from "../api/api";

interface CouponData {
  allCouponSLoading: boolean;
  defaultCouponLoading: boolean;
  allCoupons: any; // Replace any with the actual type for subsciption
  coupon: any; // Replace any with the actual type for subsciption
  defaultCoupon: any;
  error: string | null;
}

const initialState: CouponData = {
  allCouponSLoading: false,
  defaultCouponLoading: false,
  allCoupons: null, // Replace any with the actual type for subsciption
  coupon: null, // Replace any with the actual type for subsciption
  defaultCoupon: null,
  error: null,
};

const useSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    getAllCouponsStart(state) {
      state.allCouponSLoading = true;
      state.error = null;
    },
    getAllCouponsSuccess(state, action: PayloadAction<any>) {
      state.allCouponSLoading = false;
      state.allCoupons = action.payload;
      state.error = null;
    },
    getAllCouponsFailure(state, action: PayloadAction<string>) {
      state.allCouponSLoading = false;
      state.error = action.payload;
    },
    getDefaultCouponsStart(state) {
      state.defaultCouponLoading = true;
      state.error = null;
    },
    getDefaultCouponsSuccess(state, action: PayloadAction<any>) {
      state.defaultCouponLoading = false;
      state.defaultCoupon = action.payload;
      state.error = null;
    },
    getDefaultCouponsFailure(state, action: PayloadAction<string>) {
      state.defaultCouponLoading = false;
      state.error = action.payload;
    },
    setAddCoupon: (state, action: PayloadAction<any>) => {
      state.allCoupons = action.payload;
    },
    setUpdateDefaultCoupon: (state, action: PayloadAction<any>) => {
      // state.allCoupons = action.payload;
    },
    setAddDefaultCoupon: (state, action: PayloadAction<any>) => {
      state.coupon = action.payload;
    },
  },
});

export const {
  getAllCouponsStart,
  getAllCouponsSuccess,
  getAllCouponsFailure,
  getDefaultCouponsStart,
  getDefaultCouponsSuccess,
  getDefaultCouponsFailure,
  setAddCoupon,
  setAddDefaultCoupon,
  setUpdateDefaultCoupon,
} = useSlice.actions;
export default useSlice.reducer;

export const addCouponSlice =
  (payload: {
    description: string; // Make 'endpoint' optional
    expireDate: string; // Change to 'string'
    scheduleTime: string; // Change to 'string'
  }): AppThunk<Promise<void>> => // Add <Promise<void>> to specify the return type
  async (dispatch) => {
    try {
      const { coupon } = await addCoupon(payload);
      dispatch(setAddCoupon(coupon));
      // document.cookie = `couponHash=${coupon.couponHash};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/`;
      // window.location.href = "/offer-receipt";
    } catch (error) {
      console.error("Error submitting payload:", error);
    }
  };
export const updateCouponSlice =
  (payload: {
    id: string;
    description: string; // Make 'endpoint' optional
    expireDate: string; // Change to 'string'
    scheduleTime: string; // Change to 'string'
  }): AppThunk<Promise<void>> => // Add <Promise<void>> to specify the return type
  async (dispatch) => {
    try {
      const { coupon } = await addCoupon(payload);
      dispatch(setAddCoupon(coupon));
      // document.cookie = `couponHash=${coupon.couponHash};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/`;
      // window.location.href = "/offer-receipt";
    } catch (error) {
      console.error("Error submitting payload:", error);
    }
  };

export const addDefaultCouponSlice =
  (payload: {
    description: string; // Make 'endpoint' optional
    expireDate: string; // Change to 'string'
  }): AppThunk<Promise<void>> => // Add <Promise<void>> to specify the return type
  async (dispatch) => {
    try {
      const { coupon } = await addDefaultCoupon(payload);
      dispatch(setAddCoupon(coupon));
      // document.cookie = `couponHash=${coupon.couponHash};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/`;
      // window.location.href = "/offer-receipt";
    } catch (error) {
      console.error("Error submitting payload:", error);
    }
  };

export const updateDefaultCouponSlice =
  (payload: {
    description: string; // Make 'endpoint' optional
    expireDate: string; // Change to 'string'
  }): AppThunk<Promise<void>> => // Add <Promise<void>> to specify the return type
  async (dispatch) => {
    try {
      const { coupon } = await updateDefaultCoupon(payload);
      dispatch(setUpdateDefaultCoupon(coupon));
      // document.cookie = `couponHash=${coupon.couponHash};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/`;
      // window.location.href = "/offer-receipt";
    } catch (error) {
      console.error("Error submitting payload:", error);
    }
  };

export const fetchDefaultCouponSlice =
  (): AppThunk<Promise<void>> => // Add <Promise<void>> to specify the return type
  async (dispatch) => {
    try {
      dispatch(getDefaultCouponsStart());
      const response = await fetchDefaultCoupon(); // API call using axios
      dispatch(getDefaultCouponsSuccess(response));
    } catch (error) {
      dispatch(getDefaultCouponsFailure((error as Error).message));
    }
  };
