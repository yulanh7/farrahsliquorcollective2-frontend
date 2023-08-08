import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./types";
import { addCoupon } from "../api/api";

interface CouponData {
  coupon: any; // Replace any with the actual type for subsciption
  // couponInfo: any;
}

const initialState: CouponData = {
  coupon: null,
};

const useSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    setAddCoupon: (state, action: PayloadAction<any>) => {
      state.coupon = action.payload;
    },
  },
});

export const { setAddCoupon } = useSlice.actions;
export default useSlice.reducer;

export const addCouponSlice =
  (payload: {
    company: string;
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
