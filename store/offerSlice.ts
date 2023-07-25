import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./types";
import { getOffersData } from "../api/api";

interface UserState {
  loading: boolean;
  data: any;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  data: null,
  error: null,
};

const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    getUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    getUserSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    getUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getUserStart, getUserSuccess, getUserFailure } =
  offerSlice.actions;

export default offerSlice.reducer;

export const fetchUserData = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getUserStart());
    const response = await getOffersData(); // API call using axios
    dispatch(getUserSuccess(response));
  } catch (error) {
    dispatch(getUserFailure((error as Error).message));
  }
};
