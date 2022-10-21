import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface AuthState {
  token: string | undefined;
}

const initialState: AuthState = {
  token: undefined,
};

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | undefined>) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = counterSlice.actions;

export const getToken = (state: RootState) => state.auth.token;

export default counterSlice.reducer;
