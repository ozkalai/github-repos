import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import userReducer from "./slices/user";
import searchReducer from "./slices/search";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  search: searchReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export const store = setupStore();

export const getToken = (state: RootState) => state.auth.token;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
