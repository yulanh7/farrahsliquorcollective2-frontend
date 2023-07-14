import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post, User } from "./types";

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialPostsState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

const initialUsersState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initialPostsState,
  reducers: {
    fetchPostsSuccess(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
      state.error = null;
    },
    fetchPostsFailure(state, action: PayloadAction<string>) {
      state.posts = [];
      state.error = action.payload;
    },
    setPostsLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

const usersSlice = createSlice({
  name: "users",
  initialState: initialUsersState,
  reducers: {
    fetchUsersSuccess(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
      state.error = null;
    },
    fetchUsersFailure(state, action: PayloadAction<string>) {
      state.users = [];
      state.error = action.payload;
    },
    setUsersLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { fetchPostsSuccess, fetchPostsFailure, setPostsLoading } =
  postsSlice.actions;
export const { fetchUsersSuccess, fetchUsersFailure, setUsersLoading } =
  usersSlice.actions;

export const postsReducer = postsSlice.reducer;
export const usersReducer = usersSlice.reducer;
