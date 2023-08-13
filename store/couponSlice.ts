import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./types";
import {
  addCoupon,
  addDefaultCoupon,
  fetchDefaultCoupon,
  updateDefaultCoupon,
  redeemCoupon,
  fetchAllCoupons,
  deleteCoupon,
  updateCoupon,
  fetchCoupon,
} from "../api/api";

interface CouponData {
  allCouponsLoading: boolean;
  defaultCouponLoading: boolean;
  couponLoading: boolean;
  allCoupons: any; // Replace any with the actual type for subsciption
  coupon: any; // Replace any with the actual type for subsciption
  defaultCoupon: any;
  error: string | null;
}

const initialState: CouponData = {
  allCouponsLoading: false,
  defaultCouponLoading: false,
  couponLoading: false,
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
      state.allCouponsLoading = true;
      state.error = null;
    },
    getAllCouponsSuccess(state, action: PayloadAction<any>) {
      state.allCouponsLoading = false;
      state.allCoupons = action.payload;
      state.error = null;
    },
    getAllCouponsFailure(state, action: PayloadAction<string>) {
      state.allCouponsLoading = false;
      state.error = action.payload;
    },
    getDefaultCouponStart(state) {
      state.defaultCouponLoading = true;
      state.error = null;
    },
    getDefaultCouponSuccess(state, action: PayloadAction<any>) {
      state.defaultCouponLoading = false;
      state.defaultCoupon = action.payload;
      state.error = null;
    },
    getDefaultCouponFailure(state, action: PayloadAction<string>) {
      state.defaultCouponLoading = false;
      state.error = action.payload;
    },
    getCouponStart(state) {
      state.couponLoading = true;
      state.error = null;
    },
    getCouponSuccess(state, action: PayloadAction<any>) {
      state.couponLoading = false;
      state.coupon = action.payload;
      state.error = null;
    },
    getCouponFailure(state, action: PayloadAction<string>) {
      state.couponLoading = false;
      state.error = action.payload;
    },
    setAddCoupon: (state, action: PayloadAction<any>) => {},
    setUpdateDefaultCoupon: (state, action: PayloadAction<any>) => {},
    setAddDefaultCoupon: (state, action: PayloadAction<any>) => {
      state.coupon = action.payload;
    },
    setDeleteCoupon(state, action: PayloadAction<any>) {},
    setUpdateCoupon(state, action: PayloadAction<any>) {},
  },
});

export const {
  getAllCouponsStart,
  getAllCouponsSuccess,
  getAllCouponsFailure,
  getDefaultCouponStart,
  getDefaultCouponSuccess,
  getDefaultCouponFailure,
  getCouponStart,
  getCouponSuccess,
  getCouponFailure,
  setAddCoupon,
  setAddDefaultCoupon,
  setUpdateDefaultCoupon,
  setDeleteCoupon,
  setUpdateCoupon,
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
    _id: string;
    description: string; // Make 'endpoint' optional
    expireDate: string; // Change to 'string'
    scheduleTime: string; // Change to 'string'
  }): AppThunk<Promise<void>> => // Add <Promise<void>> to specify the return type
  async (dispatch) => {
    try {
      const { coupon } = await updateCoupon(payload);
      dispatch(setAddCoupon(coupon));
      // document.cookie = `couponHash=${coupon.couponHash};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/`;
      // window.location.href = "/offer-receipt";
    } catch (error) {
      console.error("Error submitting payload:", error);
    }
  };
export const redeemCouponSlice =
  (payload: {
    _id: string;
  }): AppThunk<Promise<void>> => // Add <Promise<void>> to specify the return type
  async (dispatch) => {
    try {
      await redeemCoupon(payload);
    } catch (error) {
      console.error("Error submitting payload:", error);
    }
  };
export const deleteCouponSlice =
  (payload: {
    _id: string;
  }): AppThunk<Promise<void>> => // Add <Promise<void>> to specify the return type
  async (dispatch) => {
    try {
      await deleteCoupon(payload);
    } catch (error) {
      console.error("Fail to delete the coupon:", error);
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
      dispatch(getDefaultCouponStart());
      const response = await fetchDefaultCoupon(); // API call using axios
      dispatch(getDefaultCouponSuccess(response));
    } catch (error) {
      dispatch(getDefaultCouponFailure((error as Error).message));
    }
  };
export const fetchCouponSlice =
  (payload: {
    _id: string;
  }): AppThunk<Promise<void>> => // Add <Promise<void>> to specify the return type
  async (dispatch) => {
    try {
      dispatch(getCouponStart());
      const response = await fetchCoupon(payload); // API call using axios
      dispatch(getCouponSuccess(response));
    } catch (error) {
      dispatch(getCouponFailure((error as Error).message));
    }
  };

export const fetchAllCouponSlice =
  (): AppThunk<Promise<void>> => // Add <Promise<void>> to specify the return type
  async (dispatch) => {
    try {
      dispatch(getAllCouponsStart());
      const response = await fetchAllCoupons(); // API call using axios
      dispatch(getAllCouponsSuccess(response));
    } catch (error) {
      dispatch(getAllCouponsFailure((error as Error).message));
    }
  };
