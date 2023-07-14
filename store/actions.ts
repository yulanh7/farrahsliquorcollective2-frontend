import { AppThunk } from "./store";
import {
  fetchPostsSuccess,
  fetchPostsFailure,
  setPostsLoading,
  fetchUsersSuccess,
  fetchUsersFailure,
  setUsersLoading,
} from "./reducers";
import { fetchPosts, fetchUsers } from "./api";

export const fetchPostsAsync = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setPostsLoading(true));
    const response = await fetchPosts();
    dispatch(fetchPostsSuccess(response.data));
    dispatch(setPostsLoading(false));
  } catch (error: any) {
    dispatch(fetchPostsFailure(error.message));
    dispatch(setPostsLoading(false));
  }
};

export const fetchUsersAsync = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setUsersLoading(true));
    const response = await fetchUsers();
    dispatch(fetchUsersSuccess(response.data));
    dispatch(setUsersLoading(false));
  } catch (error: any) {
    dispatch(fetchUsersFailure(error.message));
    dispatch(setUsersLoading(false));
  }
};
