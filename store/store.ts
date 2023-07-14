import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { postsReducer, usersReducer } from "./reducers";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export interface ThunkDispatch<
  TState,
  TExtraThunkArg,
  TBasicAction extends Action
> {
  <TReturnType>(
    thunkAction: ThunkAction<TReturnType, TState, TExtraThunkArg, TBasicAction>
  ): TReturnType;
  <A extends TBasicAction>(action: A): A;
  // This overload is the union of the two above (see TS issue #14107).
  <TReturnType, TAction extends TBasicAction>(
    action:
      | TAction
      | ThunkAction<TReturnType, TState, TExtraThunkArg, TBasicAction>
  ): TAction | TReturnType;
}
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Create a custom hook to get the AppDispatch type
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
