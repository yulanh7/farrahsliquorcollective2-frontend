import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./types";
import {
  optIn,
  submitUnsubscribe,
  getUserInfo,
  sendFeedback,
  login,
} from "../api/api";
import Router from "next/router";

interface UserData {
  subsciption: any; // Replace any with the actual type for subsciption
  userWithData: any; // Replace any with the actual type for user
  userInfo: any;
  feedback: any;
  token: any;
  submitUserLoading: boolean;
  submitUserError: string | null;
  submitUserMessage: string | null;
}

const initialState: UserData = {
  subsciption: null,
  userWithData: null,
  userInfo: null,
  feedback: null,
  token: null,
  submitUserLoading: false,
  submitUserError: null,
  submitUserMessage: null,
};

const useSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetForm: (state) => {
      state.submitUserError = null;
      state.submitUserMessage = null;
    },
    setUnsubsciption: (state, action: PayloadAction<any[]>) => {
      state.subsciption = action.payload;
    },
    setUserWithData: (state, action: PayloadAction<any>) => {
      state.userWithData = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
    },
    setFeedback: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
    },
    submitUserStart: (state) => {
      state.submitUserLoading = true;
      state.submitUserError = null;
      state.submitUserMessage = null;
    },
    submitLoginSuccess: (state, action: PayloadAction<any>) => {
      state.submitUserLoading = false;
      state.submitUserMessage = "Fetch successfully";
      state.token = action.payload;
    },
    submitUserFailure: (state, action: PayloadAction<any>) => {
      state.submitUserLoading = false;
      state.submitUserMessage = null;
      state.submitUserError = action.payload;
    },
  },
});

export const {
  setUnsubsciption,
  setUserWithData,
  setUserInfo,
  setFeedback,
  submitUserStart,
  submitLoginSuccess,
  submitUserFailure,
} = useSlice.actions;
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
      // document.cookie = `userHash=${user.userHash};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/`;
      // window.location.href = "/offer-receipt";
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
      const { userGet } = await getUserInfo(payload);
      if (userGet && !userGet.subscriptionStatus && !userGet) {
        window.location.href = "/detail";
      }
      dispatch(setUserInfo(userGet));
    } catch (error) {
      console.error("Error submitting payload:", error);
    }
  };

export const unsubscribeSlice =
  (payload: {
    userHash: string;
    endpoint: string;
  }): AppThunk<Promise<void>> => // Add <Promise<void>> to specify the return type
  async (dispatch) => {
    try {
      await submitUnsubscribe(payload);
    } catch (error) {
      console.error("Error submitting payload:", error);
    }
  };

export const sendFeedbackSlice =
  (payload: {
    feedback: string;
    phone: string;
    name: string;
    email: string;
  }): AppThunk<Promise<void>> => // Add <Promise<void>> to specify the return type
  async (dispatch) => {
    try {
      await sendFeedback(payload);
    } catch (error) {
      console.error("Error submitting payload:", error);
    }
  };

export const loginSlice =
  (payload: {
    username: string;
    password: string;
  }): AppThunk<Promise<void>> => // Add <Promise<void>> to specify the return type
  async (dispatch) => {
    try {
      dispatch(submitUserStart());
      const { token } = await login(payload);
      dispatch(submitLoginSuccess(token));
      localStorage.setItem("farrahsliquorcollectiveToken", token);
      Router.push("/admin"); // Navigate to home page
    } catch (error: any) {
      dispatch(submitUserFailure(error.message));
    }
  };
