import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { IUser } from "./types";
import axios from "axios";

interface UserState {
  user: IUser | undefined;
  status: "loading" | "failed" | "idle";
}

const initialState: UserState = {
  user: undefined,
  status: "idle",
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (userId, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    if (state.auth && state.auth.token) {
      const { data } = await axios.get(`user`, {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      });
      return data;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "idle";
    });
    builder.addCase(fetchUserData.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
